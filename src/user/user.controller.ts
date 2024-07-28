import { Body, Controller, Get, Post, Render, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Response, Request } from 'express';

@Controller('user')
export class UserController {
    constructor(readonly userService: UserService) {
    }

    @Get('login')
    @Render('login')
    showLoginPage(@Req() req: Request) {

        const error = req.flash('error');
        const success = req.flash('success');

        return { success, error };
    }

    
    @Post('login')
    async handleLogin(@Body() body, @Res() res: Response, @Req() req: Request) {
        const { email, password } = body;

        const user = await this.userService.login(email, password);

        if (user) {
            // req.session = email; // ذخیره ایمیل در سشن

            req.flash('success', 'ورود شما موفقیت آمیز  بود .');
            return res.redirect('/');
        }
        else {
            req.flash('error', 'نام کاربری یا کلمه عبور اشتباه است .');
            return res.redirect('/user/login');
        }

    }


    @Get('register')
    @Render('register')
    showRegisterPage(@Req() req: Request) {
        const error = req.flash('error');
        return { error };
    }


    @Post('register')
    async handleRegister(@Body() body, @Res() res: Response, @Req() req: Request) {

        const { email, password } = body;

        const user = await this.userService.register(email, password);

        if (user) {
            req.flash('success', 'کابر یا موفقیت ثبت شد .');
            res.redirect('/user/login');
        } else {
            req.flash('error', 'کاربری با این ایمیل ثبت شده است');
            res.redirect('/user/register');
        }

    }


}