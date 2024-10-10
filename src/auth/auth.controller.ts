import { Controller, Post, Req, Res, UseGuards, Get, Render } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/common/guards/jwt.auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from 'src/common/guards/local.auth.guard';

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
    this.authService.login(req.user,req,res);
    req.flash('success', 'با موفقیت وارد شدید');
    return res.redirect('/admin/dashboard');
  }


}
