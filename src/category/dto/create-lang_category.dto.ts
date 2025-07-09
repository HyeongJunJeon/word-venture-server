import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLangCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
