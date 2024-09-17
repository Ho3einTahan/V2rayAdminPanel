import { Controller, Get, Render, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import { from } from 'rxjs';
import { UserService } from 'src/user/user.service';
@Controller('admin')
export class AdminController {

    constructor(private readonly userService: UserService) { }

    @Get('dashboard')
    @Render('admin-dashboard')
    async getIndex(@Req() req: Request) {
        const users = await this.userService.getAllUsers();
        const success = req.flash('success');
        return { data: users, success: success };
    }

}
