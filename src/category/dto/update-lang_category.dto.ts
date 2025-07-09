import { PartialType } from '@nestjs/mapped-types';
import { CreateLangCategoryDto } from './create-lang_category.dto';

export class UpdateLangCategoryDto extends PartialType(CreateLangCategoryDto) {}
