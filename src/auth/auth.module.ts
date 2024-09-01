import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity'; 
import { SessionSerializer } from '../passport/serialize-deserialize-passport'; 
import { LocalStrategy } from 'src/passport/local.strategy';

@Module({
  imports: [
    PassportModule.register({ session: true }), // اضافه کردن PassportModule برای پشتیبانی از سشن
    forwardRef(() => UserModule), // جلوگیری از وابستگی دایره‌ای
    TypeOrmModule.forFeature([UserEntity]), // اصلاح مسیر و تعریف موجودیت‌ها
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, SessionSerializer], // اضافه کردن LocalStrategy و SessionSerializer به providers
})
export class AuthModule {}
