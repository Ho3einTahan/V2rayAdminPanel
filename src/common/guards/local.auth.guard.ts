import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response, Request } from 'express';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {

  // در این متد تمام عملیات اعتبارسنجی و مدیریت خطا انجام می‌شود
  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    try {

      // اجرای استراتژی 
      const result = await super.canActivate(context) as boolean;

      // define request.user in strategy
      const user = request.user;

      // if not /api route
      if (user && user['role'] != 'admin' && !request.url.startsWith('/api')) {
        throw new UnauthorizedException('دسترسی محدود شده کاربر مدیر نمیباشد');
      }

      return result; // در صورت موفقیت true برمی‌گ  رداند

    } catch (err) {

      if (err instanceof UnauthorizedException) {

        if (request.url.startsWith('/api')) {
          response.status(404).json({ message: err.message });
        }
        else {
          request.flash('error', err.message);
          response.redirect('/auth/login');
        }

      }
      
      return false;

    }
    
  }

}
