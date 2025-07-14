import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { KakaoAuthGuard } from './guard/kakao-auth.guard';

interface RefreshTokenDto {
  refreshToken: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('kakao')
  @UseGuards(KakaoAuthGuard)
  async kakaoLogin() {
    // Guard가 자동으로 처리해서 카카오 로그인 페이지로 리다이렉트
  }

  @Get('kakao/callback')
  @UseGuards(KakaoAuthGuard)
  async kakaoCallback(@Request() req) {
    return this.authService.kakaoLogin(req.user);
  }

  @Post('reissue')
  async reissueToken(@Body() body: RefreshTokenDto) {
    return this.authService.reissueToken(body.refreshToken);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    return {
      user: {
        id: req.user.sub,
        kakaoId: req.user.kakaoId,
        nickname: req.user.nickname,
      },
    };
  }
}
