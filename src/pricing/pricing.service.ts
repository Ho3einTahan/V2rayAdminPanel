import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PricingEntity } from 'src/entities/pricing.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PricingService {

    constructor(@InjectRepository(PricingEntity) private pricingEntity: Repository<PricingEntity>) { }


    async getAllPricing() {
        return await this.pricingEntity.find();
    }


    async addNewPricing(serviceName: string, price: string, duration: string, multiUser: string, platform: string) {

        const pricingEntity = new PricingEntity();

        pricingEntity.serviceName = serviceName;
        pricingEntity.price = price;
        pricingEntity.duration = duration;
        pricingEntity.multiUser = multiUser;
        pricingEntity.platform = platform;


        await this.pricingEntity.save(pricingEntity);

    }


    async getPricingById(id: string): Promise<PricingEntity> {
        return await this.pricingEntity.findOne({ where: { id: parseInt(id, 10) } });
    }


    async updatePricingById(id: number, serviceName: string, duration: string, price: string, platform: string,multiUser:string) {
        
            const updatedPricing = {
                serviceName: serviceName,
                duration: duration,
                price: price,
                multiUser:multiUser,
                platform: platform,
            };

            await this.pricingEntity.update({ id: id }, updatedPricing)
    }


    async deletePricingById(id:number){
        await this.pricingEntity.delete({id:id});
    }

}
