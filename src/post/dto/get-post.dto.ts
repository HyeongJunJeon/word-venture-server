import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Level } from '../type/post.type';

export class GetPostDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsEnum(Level)
  level?: Level;

  @IsOptional()
  @IsNumber()
  category_id?: number;
}
