import { IsInt, IsOptional } from 'class-validator';

export class PaginationDto {
  @IsInt()
  @IsOptional()
  page: number = 1;

  @IsInt()
  @IsOptional()
  take: number = 10;
}
