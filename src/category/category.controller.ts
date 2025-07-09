import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LangCategoryService } from './category.service';
import { CreateLangCategoryDto } from './dto/create-lang_category.dto';
import { UpdateLangCategoryDto } from './dto/update-lang_category.dto';

@Controller('lang-category')
export class LangCategoryController {
  constructor(private readonly langCategoryService: LangCategoryService) {}

  @Post()
  create(@Body() createLangCategoryDto: CreateLangCategoryDto) {
    return this.langCategoryService.create(createLangCategoryDto);
  }

  @Get()
  findAll() {
    return this.langCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.langCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLangCategoryDto: UpdateLangCategoryDto,
  ) {
    return this.langCategoryService.update(+id, updateLangCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.langCategoryService.remove(+id);
  }
}
