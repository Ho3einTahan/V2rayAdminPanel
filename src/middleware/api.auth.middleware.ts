import { ForbiddenException, Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ApiAuthMiddleware implements NestMiddleware {

    constructor(private readonly jwtService: JwtService) { }

    use(req: Request, res: Response, next: NextFunction) {

        const token = this.extractToken(req);

        if (!token) return res.status(403).json({ message: 'خطا در اعتبار سنجی کاربر' });

        try {

            this.jwtService.verify(token);

            return next();

        } catch (error) {
            return res.status(403).json({ message: 'خطا در اعتبار سنجی کاربر' });
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
