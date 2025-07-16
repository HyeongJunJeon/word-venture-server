import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from './decorator/public.decorator';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { KakaoAuthGuard } from './guard/kakao-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '카카오 로그인' })
  @Get('kakao')
  @Public()
  @UseGuards(KakaoAuthGuard)
  async kakaoLogin() {
    // Guard가 자동으로 처리해서 카카오 로그인 페이지로 리다이렉트
  }

  @ApiOperation({ summary: '카카오 login callback' })
  @Get('kakao/callback')
  @Public()
  @UseGuards(KakaoAuthGuard)
  async kakaoCallback(@Request() req) {
    return this.authService.kakaoLogin(req.user);
  }

  @ApiOperation({ summary: '토큰 reissue' })
  @Post('reissue')
  @Public()
  async reissueToken(@Body() body: RefreshTokenDto) {
    return this.authService.reissueToken(body.refreshToken);
  }
}
