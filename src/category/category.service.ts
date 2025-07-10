import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entity/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const { name } = createCategoryDto;

    const category = await this.categoryRepository.findOne({ where: { name } });

    if (category) {
      throw new BadRequestException('이미 존재하는 카테고리입니다.');
    }
    return this.categoryRepository.save(createCategoryDto);
  }

  findAll() {
    return this.categoryRepository.find();
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({ where: { id } });

    if (!category) {
      throw new NotFoundException('존재하지 않는 카테고리입니다.');
    }

    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);

    if (!category) {
      throw new NotFoundException('존재하지 않는 카테고리입니다.');
    }

    await this.categoryRepository.update(id, updateCategoryDto);

    return this.findOne(id);
  }

  async remove(id: number) {
    const category = await this.findOne(id);

    if (!category) {
      throw new NotFoundException('존재하지 않는 카테고리입니다.');
    }

    return this.categoryRepository.delete(id);
  }
}
