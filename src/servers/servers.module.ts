import { Module } from '@nestjs/common';
import { ServersController } from './servers.controller';
import { AuthModule } from 'src/auth/auth.module';
import { ServersService } from './servers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { V2rayConfigEntity } from 'src/entities/v2ray.config.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([V2rayConfigEntity]),
  ],
  controllers: [ServersController],
  providers: [ServersService],
  exports:[ServersService],
})
export class ServersModule { }
