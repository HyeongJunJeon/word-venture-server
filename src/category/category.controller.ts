import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly CategoryService: CategoryService) {}

  @ApiOperation({ summary: '카테고리 생성' })
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.CategoryService.create(createCategoryDto);
  }

  @ApiOperation({ summary: '모든 카테고리 조회' })
  @Get()
  findAll() {
    return this.CategoryService.findAll();
  }

  @ApiOperation({ summary: '카테고리 상세 조회' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.CategoryService.findOne(+id);
  }

  @ApiOperation({ summary: '카테고리 수정' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() UpdateCategoryDto: UpdateCategoryDto,
  ) {
    return this.CategoryService.update(+id, UpdateCategoryDto);
  }

  @ApiOperation({ summary: '카테고리 삭제' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.CategoryService.remove(+id);
  }
}
