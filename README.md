# Word Venture Server

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## 소개

Word Venture는 NestJS 프레임워크를 기반으로 구축되었으며, 개인적인 화상 외국어 학습 기록을 위한 백엔드 서버입니다.

[NESTJS 학습을 위한 프로젝트라 아직 많이 부족합니다.]

## 기술 스택

- **Framework**: [NestJS](https://nestjs.com/)
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Docker + Koyeb
- **Documentation**: Swagger

## API 문서

- API 베이스 URL: [https://wordventure.koyeb.app/](https://wordventure.koyeb.app/)
- Swagger 문서: [https://wordventure.koyeb.app/docs](https://wordventure.koyeb.app/docs)

## 프로젝트 설정

```bash
# 패키지 설치
$ pnpm install
```

## 개발 및 실행

```bash

# watch 모드
$ pnpm run start:dev
```

## 배포

이 프로젝트는 Docker를 사용하여 컨테이너화되어 있으며, Koyeb 플랫폼을 통해 배포됩니다.

### Docker 빌드

```bash
# Docker 이미지 빌드
$ docker build -t gudjun/word-venture-server:[version] .

# Docker 컨테이너 실행
$ docker run -d \ -p 3000:3000 \ --env-file .env.[environment] \ gudjun/word-venture-server:[version]
```

## 프로젝트 구조

```
src/
├── auth/           # 인증 관련 모듈
├── category/       # 카테고리 관련 모듈
├── common/         # 공통 모듈
├── post/           # 게시물 관련 모듈
├── user/           # 사용자 관련 모듈
└── main.ts
```
