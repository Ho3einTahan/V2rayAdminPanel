import { Test, TestingModule } from '@nestjs/testing';
import { ApkController } from './apk.controller';

describe('ApkController', () => {
  let controller: ApkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApkController],
    }).compile();

    controller = module.get<ApkController>(ApkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
