import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { SessionEntity } from 'src/entities/session.entity';
import { AuthService } from 'src/auth/auth.service';
import { LocalStrategy } from 'src/local.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [TypeOrmModule.forFeature([User,SessionEntity]),PassportModule],
  controllers: [UserController],
  providers: [UserService, AuthService, LocalStrategy],
})
export class UserModule { }
