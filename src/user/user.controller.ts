import { Body, Controller, Get, Post, Render, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Response, Request } from 'express';

@Controller('user')
export class UserController {
    constructor(readonly userService: UserService) {
    }

    @Get('add')
    @Render('add-user')
    getAddUser() {
    }

    @Post('add')
    addNewUser(@Body() body,@Res() res:Response,@Req() req:Request) {
        const { userName, phoneNumber, startServiceDate, endServiceDate, multiUser } = body;
        try {
            this.userService.addUser(userName, phoneNumber, '', multiUser, startServiceDate, endServiceDate);
            req.flash('success','کاربر با موفقیت اضافه شد');
            return res.redirect('/');
        } catch (e) {
            req.flash('error','خطایی در اضافه کردن کاربر رخ داد');
            return res.redirect('/user/add');
        }
    }

}