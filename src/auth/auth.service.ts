import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Response, Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import * as jalaali from 'jalaali-js';

@Injectable()
export class AuthService {

  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>, private jwtService: JwtService) { }

  private fromJalaali(jalaaliDate: string): Date {
    const [jy, jm, jd] = jalaaliDate.split('/').map(Number);
    const { gy, gm, gd } = jalaali.toGregorian(jy, jm, jd);
    return new Date(gy, gm - 1, gd);
  }

  private async updateMacAddress(user: UserEntity, macAddress: string): Promise<void> {

    let macAddresses = user.macAddress.split(',');

    macAddresses = macAddresses.filter(addr => addr.trim() != '' && addr != 'null');
    
    const userCount = parseInt(user.multiUser, 10);
    
    // If the new user is going to login to the system
    if (macAddresses.length >= userCount && !macAddresses.includes(macAddress)) {
      throw new UnauthorizedException(`خطای دسترسی این سرویس ${userCount} کاربره است`);
    }

    if (!macAddresses.includes(macAddress)) {
      macAddresses.push(macAddress);
      user.macAddress = macAddresses.join(',');
      await this.userRepository.update(user.id, { macAddress: user.macAddress });
    }


  }

  async validateUser(phoneNumber: string, password: string, macAddress: string): Promise<UserEntity | null> {

    const user = await this.userRepository.findOne({ where: { phoneNumber } });

    if (!user) {
      // اگر کاربر وجود نداشته باشد برای گمراه سازی کاربر
      throw new UnauthorizedException('نام کاربری یا کلمه عبور صحیح نمیباشد');
    }

    // update macAddres if user is not admin
    if (user.role != 'admin') {
      await this.updateMacAddress(user, macAddress);
    }

    // Check user access with serviceDate
    if (user.role !== 'admin') {

      const currentDate = new Date();

      const startServiceDate = this.fromJalaali(user.startServiceDate);
      const endServiceDate = this.fromJalaali(user.endServiceDate);

      if (currentDate < startServiceDate || currentDate > endServiceDate) {
        throw new UnauthorizedException('تاریخ اعتبار سرویس شما به پایان رسیده');
      }

      if (!user.status) {
        throw new UnauthorizedException('دسترسی کاربر محدود شده');
      }

    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('نام کاربری یا کلمه عبور نادرست میباشد');
    }

    return user;
  }

  async login(user: UserEntity, req: Request, res: Response): Promise<string> {
    const payload = { username: user.userName, sub: user.id, role: user.role };
    const token = this.jwtService.sign(payload);

    if (!req.url.startsWith('/api')) {
      res.cookie('jwt', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        expires: new Date(Date.now() + 100 * 60 * 1000), // 100 دقیقه
      });
    }

    return token;
  }
}