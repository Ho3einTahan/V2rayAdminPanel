import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import {Response,Request} from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>, private jwtService: JwtService) { }

  async validateUser(phoneNumber: string, password: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { phoneNumber } });
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async login(user: any, req: Request, res: Response) :Promise<string> {

    const payload = { username: user.userName, sub: user.id, role: user.role };

    const token = this.jwtService.sign(payload);

    if (!req.url.startsWith('/api')) {
      // تنظیم کوکی JWT
      res.cookie('jwt', token, {
        httpOnly: true, // جلوگیری از دسترسی جاوااسکریپت به کوکی
        secure: true,   // فقط در HTTPS
        sameSite: 'strict', // جلوگیری از ارسال کوکی در درخواست‌های cross-site
        expires: new Date(Date.now() + 6000000) // زمان انقضای کوکی: 10 دقیقه (600000 میلی‌ثانیه)
      });
    }

    return token;
  }


}