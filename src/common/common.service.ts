import { Injectable } from '@nestjs/common';
import { PaginationDto } from './dto/pagination.dto';
import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class CommonService {
  applyPaginationParamsToQb<T extends ObjectLiteral>(
    qb: SelectQueryBuilder<T>,
    dto: PaginationDto,
  ) {
    const { page, take } = dto;

    const skip = (page - 1) * take;

    qb.take(take);
    qb.skip(skip);
  }
}
