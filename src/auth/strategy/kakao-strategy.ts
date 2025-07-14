import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-kakao';
import { envVariableKeys } from 'src/common/const/env.const';
import { AuthService } from '../auth.service';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(
    configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: configService.get<string>(envVariableKeys.kakaoClientId)!,
      clientSecret: configService.get<string>(
        envVariableKeys.kakaoClientSecret,
      )!,
      callbackURL: configService.get<string>(envVariableKeys.kakaoCallbackUrl)!,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<any> {
    const { id, username, _json } = profile;

    const kakaoUser = {
      kakaoId: id.toString(),
      nickname: username || _json?.properties?.nickname || `사용자${id}`,
      email: _json?.kakao_account?.email || null,
      profileImage: _json?.properties?.profile_image || null,
    };

    return await this.authService.validateKakaoUser(kakaoUser);
  }
}
