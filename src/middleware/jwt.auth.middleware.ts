import { ForbiddenException, Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {

  constructor(private readonly jwtService: JwtService) { }

  use(req: Request, res: Response, next: NextFunction) {

    const token = this.extractToken(req);

    if (!token) return res.redirect('/auth/login');

    try {

      const payload = this.jwtService.verify(token);

      // بررسی نقش ادمین
      if (payload.role !== 'admin') {
        throw new  ForbiddenException('دسترسی کاربر غیر مجاز کاربر باید مدیر باشد');
      }

      req.user = payload; // اضافه کردن payload به درخواست برای دسترسی آسان‌تر در دیگر قسمت‌ها

      return next();

    } catch (error) {
      return res.redirect('/auth/login');
    }
  }

  private extractToken(req: Request): string | null {
    if (req.cookies && req.cookies['jwt']) {
      return req.cookies['jwt'];
    } else if (req.headers.authorization) {
      const authHeader = req.headers.authorization.split(' ');
      if (authHeader[0] === 'Bearer' && authHeader[1]) {
        return authHeader[1];
      }
    }
    return null;
  }

}
