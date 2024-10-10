import { Test, TestingModule } from '@nestjs/testing';
import { ApkService } from './apk.service';

describe('ApkService', () => {
  let service: ApkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApkService],
    }).compile();

    service = module.get<ApkService>(ApkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
