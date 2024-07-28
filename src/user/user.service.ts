import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    async login(email: string, password: string): Promise<boolean> {

        try {

            const user = await this.userRepository.findOne({ where: { email } });

            const isPasswordValid = user && user.password === password;

            return isPasswordValid;
        } catch (error) {
            return false;
        }

    }

    async register(email: string, password: string): Promise<boolean> {

        try {

            const user = this.userRepository.create({ email, password });
            await this.userRepository.save(user);

            return true;
        } catch (error) {
            return false;
        }

    }
}
