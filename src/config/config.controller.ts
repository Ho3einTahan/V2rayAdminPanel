import { Controller, Get, Render } from '@nestjs/common';

@Controller('config')
export class ConfigController {


    @Get('add')
    @Render('config')
    showAddConfigPage() {
        return { data: { address: ['example1.com', 'example2.com'] } };
    }
    
}
