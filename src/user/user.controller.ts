import { Body, Controller, Get, Post, Render, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Response,Request} from 'express';

@Controller('user')
export class UserController {
    constructor(readonly userService: UserService) {
    }

    @Get('login')
    @Render('login')
    showLoginPage() {
        return {};
    }

    @Post('login')
    async handleLogin(@Body() body, @Res() res: Response,@Req() req:Request) {
        const { email, passeord } = body;

        const user = await this.userService.login(email, passeord);
        console.log(user);
        if (user) {
            req.flash('error', 'Invalid credentials');
            req.flash('error','');
            return res.redirect('/');
        }
        else {
            return res.redirect('/checkout');
        }
    }

}