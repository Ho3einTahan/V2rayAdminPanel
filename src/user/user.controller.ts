import { Body, Controller, Get, Param, Post, Render, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Response, Request } from 'express';
import { DuplicateDataException } from 'src/error-handler/duplicate.data.exception';

@Controller('user')
export class UserController {
    constructor(readonly userService: UserService) {
    }

    @Get('add')
    @Render('add-user')
    showAddUserPage(@Req() req: Request) {
        const error = req.flash('error');
        return { 'error': error };
    }

    @Get('edit/:phoneNumber')
    @Render('update-user')
    async editUserPage(@Param('phoneNumber') phoneNumber: string, @Req() req: Request) {
        try {
            const user = await this.userService.findUserByPhoneNumber(phoneNumber);
            return { user };
        } catch (error) {
            req.flash('error', error['message']);
            return { error: 'User not found' };
        }
    }

    @Post('edit')
    async updateUserData(@Body() body, @Res() res: Response, @Req() req: Request) {

        const { userName, password, startServiceDate, macAddress, endServiceDate, phoneNumber, originalPhoneNumber, status,role,multiUser} = body;

        try {
            await this.userService.updateUserByPhoneNumber(role,originalPhoneNumber, userName, password, macAddress, startServiceDate, endServiceDate, phoneNumber, status,multiUser);
            req.flash('success', `اطلاعات کاربر ${userName} با موفقیت تغیر یافت`);
        }
        catch (e) {
            req.flash('error', 'خطایی در بروزسانی اطلاعات کاربر مورد نظر رخ داد');
        }
        return res.redirect('/admin/dashboard');
    }

    @Post('add')
    async addNewUser(@Body() body, @Res() res: Response, @Req() req: Request) {
        const { userName, password, phoneNumber, startServiceDate, endServiceDate, multiUser } = body;
        try {
            await this.userService.addUser(userName, phoneNumber, password, multiUser, startServiceDate, endServiceDate);
            req.flash('success', 'کاربر با موفقیت اضافه شد');
            return res.redirect('/admin/dashboard');
        } catch (e) {
            if (e instanceof DuplicateDataException) {
                req.flash('error', e.message);
            }
            return res.redirect('/user/add');
        }
    }

}