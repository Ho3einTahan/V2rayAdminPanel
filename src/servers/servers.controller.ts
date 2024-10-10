import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Render, Res, UseGuards } from '@nestjs/common';
import { ServersService } from './servers.service';
import { Response } from 'express';
@Controller('servers')
export class ServersController {

    constructor(private serversService: ServersService) { }

    @Get()
    @Render('servers')
    async showServersList() {
        const servers = await this.serversService.getServers();
        return { data: servers };
    }

    @Get('add')
    @Render('add-server')
    showAddServerPage() {
    }

    @Get('edit/:id')
    @Render('update-server')
    async showEditServerPage(@Param('id') id: string) {
        const server = await this.serversService.getServerById(parseInt(id));
        return { server };
    }


    @Post('add')
    addNewServer(@Body() body, @Res() res: Response) {
        const { serverAddress, countryName } = body;
        this.serversService.createNewServer(serverAddress, countryName);
        return res.redirect('/servers');
    }


    @Post('edit')
    editServer(@Body() body, @Res() res: Response) {
        const { serverAddress, serverName, id, countryName } = body;
        console.log(countryName);
        this.serversService.updateServerById(parseInt(id), serverAddress, countryName);
        return res.redirect('/servers');
    }


    @HttpCode(HttpStatus.OK)
    @Delete('delete/:id')
    async deleteServer(@Param('id') id: string, @Res() res: Response) {
        await this.serversService.deleteServerById(parseInt(id));
        return res.status(200).json({ message: 'سرور با موفقیت حذف شد' });
    }


}
