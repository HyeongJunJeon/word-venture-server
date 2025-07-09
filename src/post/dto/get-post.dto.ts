import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetPostDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsNumber()
  categoryId?: number;
}
