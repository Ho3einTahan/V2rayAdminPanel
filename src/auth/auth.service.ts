import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  
  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) { }

  async authenticateAdmin(phoneNumber: string, password: string): Promise<UserEntity> {
    const admin = await this.userRepository.findOne({ where: { phoneNumber, role: 'admin' } });
    if (admin && await bcrypt.compare(password, admin.password)) {
      return admin;
    }
    return null;
  }

}