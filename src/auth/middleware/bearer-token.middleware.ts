import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { NextFunction } from 'express';
import { envVariableKeys } from 'src/common/const/env.const';

@Injectable()
export class BearerTokenMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('토큰이 제공되지 않았습니다.');
    }

    const token = this.validateBearerToken(authHeader);

    const decodedPayload = this.jwtService.decode(token);

    if (decodedPayload.type !== 'access' && decodedPayload.type !== 'refresh') {
      throw new UnauthorizedException('유효하지 않은 토큰입니다.');
    }

    try {
      const secretKey =
        decodedPayload.type === 'access'
          ? this.configService.get<string>(envVariableKeys.accessTokenSecret)
          : this.configService.get<string>(envVariableKeys.refreshTokenSecret);

      const payload = await this.jwtService.verifyAsync(token, {
        secret: secretKey,
      });

      req['user'] = payload;

      next();
    } catch (e) {
      if (e.name === 'TokenExpiredError') {
        throw new UnauthorizedException('토큰이 만료됐습니다.');
      }

      throw new UnauthorizedException('유효하지 않은 토큰입니다.');
    }
  }

  private validateBearerToken(rawToken: string) {
    const bearerSplit = rawToken.split(' ');

    if (bearerSplit.length !== 2) {
      throw new BadRequestException('토큰 포맷이 잘못됐습니다!');
    }

    const [bearer, token] = bearerSplit;

    if (bearer.toLowerCase() !== 'bearer') {
      throw new BadRequestException('토큰 포맷이 잘못됐습니다!');
    }

    return token;
  }
}
