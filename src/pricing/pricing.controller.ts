import { Body, Controller, Delete, Get, Param, Post, Render, Req, Res, UnauthorizedException } from '@nestjs/common';
import { PricingService } from './pricing.service';
import { Response, Request } from 'express';

@Controller('pricing')
export class PricingController {

    constructor(private pricingService: PricingService) { }


    @Get('')
    @Render('view-pricing')
    async showPricingPage() {
        const pricingData = await this.pricingService.getAllPricing();
        return { pricingData };
    }


    @Get('edit/:id')
    @Render('update-pricing')
    async showUpdatePricingPage(@Param('id') id: string, @Res() res: Response) {

        try {
            const pricingEntity = await this.pricingService.getPricingById(id);
            return {
                'id': id,
                'serviceName': pricingEntity.serviceName,
                'price': pricingEntity.price,
                'duration': pricingEntity.duration,
                'multiUser': pricingEntity.multiUser,
                'platform': pricingEntity.platform,
            }
        } catch (e) {
            return res.status(404).json({ message: 'تعرفه ای با آیدی مورد نظر پیدا نشد' });
        }

    }


    @Get('add')
    @Render('add-pricing')
    showAddPricingPage() { }


    @Post('edit/:id')
    async updatePricing(@Body() body, @Param('id') id: string, @Req() req: Request, @Res() res: Response) {

        try {
            const { serviceName, price, duration, platform, multiUser } = body;
            await this.pricingService.updatePricingById(parseInt(id, 10), serviceName, duration, price, platform, multiUser)
            return res.redirect('/pricing');
        } catch (e) {
            req.flash('خطایی در بروز رسانی تعرفه مورد نظر رخ داد');
            return res.redirect('/');
        }
    }


    @Post('add')
    async addNewPricing(@Body() body, @Res() res: Response) {
        const { serviceName, duration, platform, multiUser, price } = body;
        await this.pricingService.addNewPricing(serviceName, price, duration, multiUser, platform);
        return res.redirect('/pricing');
    }


    @Delete('delete/:id')
    async deletePricing(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
        try {
            await this.pricingService.deletePricingById(parseInt(id, 10));
            return res.status(200).json('تعرفه مورد نظر با موفقیت حذف شد');
        } catch (e) {
            return res.status(403).json({ messagee: 'خطایی در حذف تعرفه مورد نظر رخ داد' });
        }
    }

}
