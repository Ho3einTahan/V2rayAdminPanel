import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth/auth.service";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy} from 'passport-local'
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'phoneNumber', passwordField: 'password' });
  }

  async validate(phoneNumber: string, password: string): Promise<any> {
    const user = await this.authService.authenticateAdmin(phoneNumber, password);
    if (!user) {
      return null;
    }
    return user;
  }

}
