import { Injectable } from '@nestjs/common';
import { CreateLangCategoryDto } from './dto/create-lang_category.dto';
import { UpdateLangCategoryDto } from './dto/update-lang_category.dto';

@Injectable()
export class LangCategoryService {
  create(createLangCategoryDto: CreateLangCategoryDto) {
    return 'This action adds a new langCategory';
  }

  findAll() {
    return `This action returns all langCategory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} langCategory`;
  }

  update(id: number, updateLangCategoryDto: UpdateLangCategoryDto) {
    return `This action updates a #${id} langCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} langCategory`;
  }
}
