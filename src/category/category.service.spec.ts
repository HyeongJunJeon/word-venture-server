import { Test, TestingModule } from '@nestjs/testing';
import { LangCategoryService } from './category.service';

describe('LangCategoryService', () => {
  let service: LangCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LangCategoryService],
    }).compile();

    service = module.get<LangCategoryService>(LangCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
