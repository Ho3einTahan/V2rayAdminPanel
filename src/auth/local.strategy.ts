import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from 'src/auth/auth.service';
import { Request } from 'express';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'phoneNumber',
      passReqToCallback: true,  // اضافه کردن این گزینه برای دسترسی به req
    });
  }

  async validate(req: Request, phoneNumber: string, password: string): Promise<any> {

    const macAddress = req.body['macAddress'];

    const user = await this.authService.validateUser(phoneNumber, password, macAddress);
    
    return user;
  }
}
