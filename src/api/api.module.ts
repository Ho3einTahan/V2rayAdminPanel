import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ApiController } from './api.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { V2rayConfigEntity } from 'src/entities/v2ray.config.entity';
import { AuthModule } from 'src/auth/auth.module';
import { ApiService } from './api.service';
import { ServersModule } from 'src/servers/servers.module';
import { PricingService } from 'src/pricing/pricing.service';
import { PricingModule } from 'src/pricing/pricing.module';

@Module({
  imports: [TypeOrmModule.forFeature([V2rayConfigEntity]), AuthModule, ServersModule, PricingModule,
  ],
  providers: [ApiService],
  controllers: [ApiController]
})
export class ApiModule { }