# ====================
# Build Stage
# ====================
FROM --platform=linux/amd64 node:20-alpine AS builder

# pnpm 설치
RUN npm install -g pnpm

# 작업 디렉토리 설정
WORKDIR /app

# 의존성 파일 복사 (캐시 최적화를 위해 소스 코드보다 먼저)
COPY package.json pnpm-lock.yaml ./

# 의존성 설치
RUN pnpm install --frozen-lockfile

# 소스 코드 복사 (선택적으로 필요한 파일만)
COPY src ./src
COPY nest-cli.json tsconfig.json tsconfig.build.json ./

# TypeScript 빌드
RUN pnpm run build

# ====================
# Production Stage
# ====================
FROM --platform=linux/amd64 node:20-alpine AS production

# pnpm 설치
RUN npm install -g pnpm

# 작업 디렉토리 설정
WORKDIR /app

# 의존성 파일 복사
COPY package.json pnpm-lock.yaml ./

# 프로덕션 의존성만 설치
RUN pnpm install --prod --frozen-lockfile

# 빌드된 애플리케이션 복사
COPY --from=builder /app/dist ./dist

# 비루트 사용자 생성 및 권한 설정 (보안 강화)
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001 && \
    chown -R nestjs:nodejs /app

USER nestjs

# 포트 노출
EXPOSE 3000

# 기본 환경 변수 설정
ENV NODE_ENV=production \
    PORT=3000

# 헬스체크 추가
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:${PORT:-3000}/common/health || exit 1

# 애플리케이션 실행
CMD ["pnpm", "run", "start:prod"]
