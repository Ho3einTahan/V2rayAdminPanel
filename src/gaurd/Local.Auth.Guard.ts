import { Injectable, ExecutionContext, UnauthorizedException, CanActivate } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Injectable()
// ابتدا این گارد اجرا می‌شود 
// اجرا می‌شود LocalStrategy سپس 
// SessionSerializer  و بعد از آن 
export class LocalAuthGuard extends AuthGuard('local'){
  
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      // LocalStrategy را اجرا می‌کند
      // اگر null یا undefined برگردد یا خطایی پرتاب شود
      // بلوک catch اجرا می‌شود
      const result = (await super.canActivate(context)) as boolean;
      const request = context.switchToHttp().getRequest();
      // اگر خطایی وجود نداشت، کاربر را 
      // می‌کند serialize 
      await super.logIn(request);
      return result;
    } catch (err) {
      const request = context.switchToHttp().getRequest();
      const response = context.switchToHttp().getResponse<Response>();
      request.flash('error', 'نام کاربری یا کلمه عبور اشتباه است');
      response.redirect('/auth/login');
      return false;
    }
  }
  
}
