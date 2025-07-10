import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly CategoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.CategoryService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.CategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.CategoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() UpdateCategoryDto: UpdateCategoryDto,
  ) {
    return this.CategoryService.update(+id, UpdateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.CategoryService.remove(+id);
  }
}
