import { Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiService } from './api.service';
import { AuthService } from 'src/auth/auth.service';
import { Request, Response } from 'express';
import { LocalAuthGuard } from 'src/common/guards/local.auth.guard';
import { ServersService } from 'src/servers/servers.service';

@Controller('api')
export class ApiController {

    constructor(private serversService: ServersService, private authService: AuthService) { }

    @Get('servers')
    getServers() {
        return this.serversService.getServers();
    }

    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login(@Req() req: Request, @Res() res: Response) {
        const token = await this.authService.login(req.user, req, res);
        return res.status(200).json({ 'message': 'ورود موفقیت آمیز بود', 'token': token });
    }

}
