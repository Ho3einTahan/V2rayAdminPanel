import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // اجرا میشود deserialize
    if (req.isAuthenticated()) {
      return next();
    } else {
      return res.redirect('/auth/login');
    }
  }
}
