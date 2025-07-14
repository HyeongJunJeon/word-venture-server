import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entity/user.entity';
import { envVariableKeys } from 'src/common/const/env.const';

interface KakaoUserData {
  kakaoId: string;
  nickname: string;
  email?: string;
  profileImage?: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateKakaoUser(kakaoUserData: KakaoUserData): Promise<User> {
    const { kakaoId, nickname, email, profileImage } = kakaoUserData;

    let user = await this.userRepository.findOne({
      where: { kakaoId },
    });

    if (!user) {
      user = this.userRepository.create({
        kakaoId,
        nickname,
        email: email || `kakao_${kakaoId}@kakao.user`,
        profileImage,
      });
      await this.userRepository.save(user);
    }

    return user;
  }

  async generateToken(user: User, type: 'access' | 'refresh') {
    const payload =
      type === 'access'
        ? {
            sub: user.id,
            kakaoId: user.kakaoId,
            nickname: user.nickname,
          }
        : {
            sub: user.id,
            type,
          };

    const secretKey =
      type === 'access'
        ? this.configService.get<string>(envVariableKeys.accessTokenSecret)
        : this.configService.get<string>(envVariableKeys.refreshTokenSecret);

    return await this.jwtService.signAsync(payload, {
      secret: secretKey,
      expiresIn: type === 'access' ? '1h' : '30d',
    });
  }

  async validateRefreshToken(refreshToken: string): Promise<User> {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get<string>(
          envVariableKeys.refreshTokenSecret,
        ),
      });

      if (payload.type !== 'refresh') {
        throw new UnauthorizedException('유효하지 않은 refresh token입니다.');
      }

      const user = await this.userRepository.findOne({
        where: { id: payload.sub },
      });

      if (!user) {
        throw new UnauthorizedException('사용자를 찾을 수 없습니다.');
      }

      return user;
    } catch {
      throw new UnauthorizedException('유효하지 않은 refresh token입니다.');
    }
  }

  async reissueToken(refreshToken: string) {
    const user = await this.validateRefreshToken(refreshToken);
    const newAccessToken = await this.generateToken(user, 'access');

    return {
      accessToken: newAccessToken,
    };
  }

  async kakaoLogin(user: User) {
    const accessToken = await this.generateToken(user, 'access');
    const refreshToken = await this.generateToken(user, 'refresh');

    return {
      user: {
        id: user.id,
        nickname: user.nickname,
        email: user.email,
        profileImage: user.profileImage,
      },
      accessToken,
      refreshToken,
    };
  }
}
