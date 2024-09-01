import { Controller, Post, Req, Res, UseGuards, Get, Render } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../gaurd/Local.Auth.Guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Get('login')
  @Render('login')
  showLoginPage(@Req() req: Request) {
    const error = req.flash('error');
    const success = req.flash('success');
    return { error, success };
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() req, @Res() res: Response) {
    req.flash('success', 'با موفقیت وارد شدید');
    return res.redirect('/');
  }


}
