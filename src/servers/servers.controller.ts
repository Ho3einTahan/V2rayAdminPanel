import { Controller, Get, Render } from '@nestjs/common';

@Controller('servers')
export class ServersController {

    @Get()
    @Render('servers')
    showAddConfigPage() {
        return { data: { address: ['example1.com', 'example2.com'] } };
    }

    @Get('add')
    @Render('add-server')
    showAddServerPage() {
        return { data: { address: ['example1.com', 'example2.com'] } };
    }
    

    @Get('edit')
    @Render('edit-server')
    showEditServerPage() {
        return { data: { address: ['example1.com', 'example2.com'] } };
    }





}
