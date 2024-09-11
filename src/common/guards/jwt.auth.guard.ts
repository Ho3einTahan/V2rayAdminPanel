import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    try {
      // این متد از Passport است و به طور خودکار توکن را از درخواست استخراج و اعتبارسنجی می‌کند
      const result = await super.canActivate(context) as boolean;
      return result;
    } catch (e) {
      response.redirect('/auth/login');
      return false;
    }
  }
}