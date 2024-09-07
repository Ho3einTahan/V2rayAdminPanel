import { Controller, Get, Render, Req, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import { UserService } from './user/user.service';
import { JwtAuthGuard } from './common/guards/jwt.auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,private readonly userService:UserService) { }

  @Get()
  @Render('index')
 async getIndex(@Req() req: Request, @Res() res: Response) {
      
    const users=await this.userService.getAllUsers();

    const success = req.flash('success');

    return {
      data: users,
      success: success,
    };

  }


}
