import { Controller, Get } from '@nestjs/common';
import { CommonService } from './common.service';
import { Public } from '../auth/decorator/public.decorator';
import { ApiOperation } from '@nestjs/swagger';

@Controller('common')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @Public()
  @Get('health')
  @ApiOperation({ summary: 'API Health Check' })
  getHealthCheck() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }
}
