import { Test, TestingModule } from '@nestjs/testing';
import { LangCategoryController } from './category.controller';
import { LangCategoryService } from './category.service';

describe('LangCategoryController', () => {
  let controller: LangCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LangCategoryController],
      providers: [LangCategoryService],
    }).compile();

    controller = module.get<LangCategoryController>(LangCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
