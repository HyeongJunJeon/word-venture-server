import { Module } from '@nestjs/common';
import { LangCategoryService } from './category.service';
import { LangCategoryController } from './category.controller';

@Module({
  controllers: [LangCategoryController],
  providers: [LangCategoryService],
})
export class CategoryModule {}
