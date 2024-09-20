import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { DuplicateDataException } from 'src/error-handler/duplicate.data.exception';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) { }


    async addUser(userName: string, phoneNumber: string, password: string, multiUser: string, startServiceDate: string, endServiceDate: string): Promise<UserEntity> {
        // Check if a user with the same phone number or username already exists
        const existingUser = await this.userRepository.findOne({ where: { phoneNumber: phoneNumber } });

        if (existingUser) {
            throw new DuplicateDataException('کاربر مورد نظر وجود دارد');
        }

        // Create a new user entity
        const user = new UserEntity();
        user.phoneNumber = phoneNumber;
        user.userName = userName;
        user.password = password;
        user.startServiceDate = startServiceDate;
        user.endServiceDate = endServiceDate;
        user.multiUser = multiUser;
        user.role = 'user';
        user.status = true;

        // Save the new user
        return await this.userRepository.save(user);
    }


    async findUserByPhoneNumber(phoneNumber: string) {

        const user = await this.userRepository.findOne({ where: { phoneNumber } });

        if (!user) {
            throw new NotFoundException('کاربری با این شماره تلفن یافت نشد');
        }

        return user;
    }


    async getAllUsers(): Promise<UserEntity[]> {
        return await this.userRepository.find({ where: { role: 'user' } });
    }


    async updateUserByPhoneNumber(role: string, originalPhoneNumber: string, userName: string, password: string, macAddress: string, startServiceDate: string, endServiceDate: string, phoneNumber: string, status: string, multiUser: string): Promise<void> {
        const encryptPassword = await bcrypt.hash(password, 10);
        const updatedUserData = {
            userName: userName,
            password: encryptPassword,
            phoneNumber: phoneNumber,
            macAddress: macAddress,
            startServiceDate: startServiceDate,
            endServiceDate: endServiceDate,
            status: status == 'true' ? true : false,
            multiUser: multiUser,
            role: role,
        };

        await this.userRepository.update({ phoneNumber: originalPhoneNumber }, updatedUserData);
    }


    /**
     * 
     * @param phoneNumber 
     */
    async deleteUserByPhoneNumber(phoneNumber: string) {
        await this.userRepository.delete({ phoneNumber: phoneNumber });
    }


}
