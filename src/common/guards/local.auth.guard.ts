import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response, Request } from 'express';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    try {
      // اجرای استراتژی و اعتبارسنجی
      const result = await super.canActivate(context) as boolean;

      // کاربر در request تعریف شده است
      const user = request.user;

      // بررسی نقش کاربر و مسدود کردن دسترسی به جز ادمین‌ها
      if (user && user['role'] != 'admin' && !request.url.startsWith('/api')) {
        throw new UnauthorizedException('دسترسی محدود شده کاربر مدیر نمیباشد');
      }

      return result; // در صورت موفقیت true برمی‌گرداند

    } catch (err) {
      if (err instanceof UnauthorizedException) {
        // مدیریت خطا برای درخواست‌های API و ریدایرکت به صفحه لاگین در سایر درخواست‌ها
        if (request.url.startsWith('/api')) {
          response.status(404).json({ message: err.message });
        } else {
          request.flash('error', err.message);
          response.redirect('/auth/login');
        }
      }

      return false;
    }
  }
}
