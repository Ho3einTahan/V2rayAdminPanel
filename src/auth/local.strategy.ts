import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'phoneNumber',
    });
  }

  async validate(phoneNumber: string, password: string, req: Request): Promise<any> {

    const user = await this.authService.validateUser(phoneNumber, password);

    return user;
  }

}
