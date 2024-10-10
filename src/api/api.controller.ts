import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiService } from './api.service';
import { AuthService } from 'src/auth/auth.service';
import { Request, Response } from 'express';
import { LocalAuthGuard } from 'src/common/guards/local.auth.guard';
import { ServersService } from 'src/servers/servers.service';
import { UserEntity } from 'src/entities/user.entity';
import { PricingService } from 'src/pricing/pricing.service';

@Controller('api')
export class ApiController {

    constructor(private serversService: ServersService, private authService: AuthService, private pricingService: PricingService) { }

    @Get('servers')
    getServers() {
        return this.serversService.getServers();
    }


    @Get('pricing')
    async getAllPricing() {
        return await this.pricingService.getAllPricing();
    }


    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login(@Req() req: Request, @Res() res: Response) {
        
        const user = req.user as UserEntity;
        const token = await this.authService.login(user, req, res);

        return res.status(200).json({
            'message': 'ورود موفقیت آمیز بود',
            'token': token,
            'startServiceDate': user.startServiceDate,
            'endServiceDate': user.endServiceDate,
            'userName': user.userName,
            'devices': user.multiUser,
        });

    }

}