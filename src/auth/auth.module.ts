import { Module, forwardRef } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { jwtConstants } from '../constant/constants';
import { LocalStrategy } from 'src/auth/local.strategy';
import { LocalJwtStrategy } from 'src/auth/jwt.strategy';
import { PassportModule, PassportStrategy } from '@nestjs/passport';

@Module({
  imports: [
    forwardRef(() => UserModule), // جلوگیری از وابستگی دایره‌ای
    TypeOrmModule.forFeature([UserEntity]), // اصلاح مسیر و تعریف موجودیت‌ها
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register(
      {
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '600s' },
      }
    ),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
  // export for api route
  exports: [AuthService],
  // LocalJwtStrategy  اگر نیاز بود از گارد استفاده کنم
})
export class AuthModule { }
