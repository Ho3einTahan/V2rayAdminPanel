import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Render, Req, Res } from '@nestjs/common';
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

        const { userName, password, startServiceDate, macAddress, endServiceDate, phoneNumber, originalPhoneNumber, status, role, multiUser } = body;

        try {
            await this.userService.updateUserByPhoneNumber(role, originalPhoneNumber, userName, password, macAddress, startServiceDate, endServiceDate, phoneNumber, status, multiUser);
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

    
    @HttpCode(HttpStatus.OK)
    @Delete('delete/:phoneNumber')  // دریافت شماره تلفن از URL
    async deleteUser(
        @Param('phoneNumber') phoneNumber: string,  // اصلاح تایپی از phoneNummber به phoneNumber
        @Req() req: Request, 
        @Res() res: Response
    ) {
        console.log('Request received to delete user with phone number:', phoneNumber);  // بررسی شماره تلفن
        try {
            console.log('Deleting user with phone number:', phoneNumber);
            await this.userService.deleteUserByPhoneNumber(phoneNumber);
            req.flash('success', `کاربر ${phoneNumber} با موفقیت حذف شد`);
            console.log('User deleted successfully');
            return res.status(200).json({ message: 'کاربر با موفقیت حذف شد' });
        } catch (err) {
            console.error('Error deleting user:', err);
            req.flash('error', 'خطا در حذف کاربر: ' + err.toString());
            return res.status(500).json({ message: 'خطا در حذف کاربر: ' + err.toString() });
        }
    }
    


}