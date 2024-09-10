

import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Render, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Response } from 'express';
import { readdirSync, mkdirSync, unlinkSync, existsSync } from 'fs';
import { join } from 'path';

const UPLOAD_DIR = 'uploads';

const filePath = join(__dirname, '..', '..', UPLOAD_DIR);

mkdirSync(join(__dirname, '..', '..', UPLOAD_DIR), { recursive: true });


@Controller('apk')
export class ApkController {

    @Get('upload')
    @Render('upload')
    showUplsoadPage() {

        const files = readdirSync(filePath);

        return { files }
    }


    @Post('upload')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './uploads', // مسیر ذخیره فایل‌ها
                filename: (req, file, cb) => {
                    // const randomName = Math.round(Math.random() * 16).toString(16);
                    cb(null, `${file.originalname}`);
                },
            }),
        }),
    )


    @HttpCode(HttpStatus.OK)
    uploadFile(@UploadedFile() file, @Res() res: Response) {
        return res.status(200).json({ message: 'File uploaded successfully', file: file.filename });
    }


    @HttpCode(HttpStatus.OK)
    @Delete('delete/:name')
    deleteApk(@Param('name') name: string, @Res() res: Response) {
        const path = filePath + '/' + name;
        unlinkSync(path);
        return res.status(200).json({ message: 'فایل با موفقیت حذف شد' });
    }


    @Get('download')
    async downloadApk(@Res() res: Response) {
        console.log(filePath);
        if (existsSync(filePath + '/' + 'FastPn.apk')) {
            return res.download(filePath + '/FastPn.apk', function (err) {
                if (err) {
                    return res.status(500).json({ message: 'خطا در دانلود فایل رخ داد' });
                }
            });
        } else {
            return res.status(404).json({ message: 'فایل برای دانلود وجود ندارد' });
        }

    }

}