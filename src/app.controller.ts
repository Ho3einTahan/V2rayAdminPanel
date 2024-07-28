import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('product')
  getIndex() {
    return { uName: 'hosein', isLogin: false };
  }

  @Get('checkout')
  @Render('checkout')
  getCheckout() {
    return { uName: 'hosein', isLogin: false };
  }

}
