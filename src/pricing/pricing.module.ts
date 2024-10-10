import { Module } from '@nestjs/common';
import { PricingService } from './pricing.service';
import { PricingController } from './pricing.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PricingEntity } from 'src/entities/pricing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PricingEntity])],
  providers: [PricingService],
  controllers: [PricingController],
  exports: [PricingService],
})
export class PricingModule { }
