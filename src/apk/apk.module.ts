import { Module } from '@nestjs/common';
import { ApkController } from './apk.controller';
import { ApkService } from './apk.service';

@Module({
  controllers: [ApkController],
  providers: [ApkService]
})
export class ApkModule {}
