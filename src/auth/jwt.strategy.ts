import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { jwtConstants } from "src/constant/constants";

@Injectable()
export class LocalJwtStrategy extends PassportStrategy(Strategy) {

    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request) => {
                    let token = null;

                    // بررسی وجود کوکی 'jwt' و استخراج آن
                    if (req.cookies && req.cookies['jwt']) {
                        token = req.cookies['jwt'];
                    }

                    return token;
                }
            ]),
            secretOrKey: jwtConstants.secret, // کلید رمزنگاری توکن
            ignoreExpiration: false, // عدم پذیرش توکن‌های منقضی شده
        });
    }

    async validate(payload: any) {
        
        if (!payload) {
            throw new UnauthorizedException('Invalid token');
        }

        return { userId: payload.sub, username: payload.username };
    }

}
