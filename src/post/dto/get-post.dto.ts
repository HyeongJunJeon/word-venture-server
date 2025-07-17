import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Level } from '../type/post.type';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class GetPostDto extends PaginationDto {
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
