import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { KakaoStrategy } from './strategy/kakao-strategy';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { KakaoAuthGuard } from './guard/kakao-auth.guard';

@Module({
  imports: [
    ConfigModule,
    JwtModule.register({}),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService, KakaoStrategy, JwtAuthGuard, KakaoAuthGuard],
  exports: [AuthService],
})
export class AuthModule {}
