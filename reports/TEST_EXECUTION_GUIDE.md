# 테스트 실행 가이드

## 현재 상태

현재 백엔드에는 실제 API 라우트가 구현되어 있지 않아 테스트가 실패할 수 있습니다. 
테스트 파일은 작성되었지만, 실제 구현이 필요합니다.

## 테스트 실행 방법

### 방법 1: PowerShell에서 직접 실행

PowerShell 실행 정책 문제가 있는 경우, 다음 중 하나를 시도하세요:

1. **관리자 권한으로 PowerShell 실행 후:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

2. **또는 CMD 사용:**
```cmd
cd backend
npm install
npm test
```

### 방법 2: 테스트 파일 검증만 실행

```bash
cd backend
node __tests__/test-runner.js
```

## 테스트 실행 전 준비사항

### 1. 백엔드 의존성 설치

```bash
cd backend
npm install
```

필요한 패키지:
- jest (테스트 프레임워크)
- supertest (HTTP 테스트)
- 기타 프로젝트 의존성

### 2. 환경 변수 설정

`backend/.env` 파일 생성:

```env
NODE_ENV=test
PORT=8000
DATABASE_URL=postgresql://user:password@localhost:5432/orderbean_test
JWT_SECRET=test-secret-key
JWT_EXPIRES_IN=1h
CORS_ORIGIN=http://localhost:3000
```

### 3. 데이터베이스 준비

테스트용 데이터베이스가 필요합니다:

```sql
CREATE DATABASE orderbean_test;
```

### 4. 실제 API 구현

테스트가 통과하려면 다음 라우트가 구현되어 있어야 합니다:

- `POST /api/auth/register` - 회원가입
- `POST /api/auth/login` - 로그인
- `GET /api/menus` - 메뉴 목록
- `GET /api/menus/:id` - 메뉴 상세
- `POST /api/menus` - 메뉴 생성 (관리자)
- `PATCH /api/menus/:id` - 메뉴 수정 (관리자)
- `DELETE /api/menus/:id` - 메뉴 삭제 (관리자)
- `POST /api/orders` - 주문 생성
- `GET /api/orders` - 주문 내역 조회
- `GET /api/orders/:id` - 주문 상세 조회
- `PATCH /api/orders/:id/status` - 주문 상태 업데이트 (관리자)

## 테스트 실행

### 백엔드 테스트

```bash
cd backend
npm test
```

특정 테스트만 실행:
```bash
npm test -- auth.test.js
npm test -- menus.test.js
npm test -- orders.test.js
npm test -- integration.test.js
```

커버리지 확인:
```bash
npm test -- --coverage
```

### 프론트엔드 테스트

```bash
cd frontend
npm install
npm test
```

테스트 UI 모드:
```bash
npm run test:ui
```

## 예상되는 테스트 결과

### 현재 상태 (구현 전)

대부분의 테스트가 실패할 것입니다:
- ❌ 라우트가 없어서 404 에러
- ❌ 컨트롤러가 없어서 기능 미작동
- ✅ 헬스 체크 테스트만 통과 가능

### 구현 후

모든 테스트가 통과해야 합니다:
- ✅ 인증 API 테스트
- ✅ 메뉴 API 테스트
- ✅ 주문 API 테스트
- ✅ 통합 테스트

## 문제 해결

### 1. "Cannot find module" 오류

```bash
npm install
```

### 2. 데이터베이스 연결 오류

- 데이터베이스가 실행 중인지 확인
- `.env` 파일의 DATABASE_URL 확인
- 테스트 데이터베이스가 생성되었는지 확인

### 3. 포트 충돌

다른 포트를 사용하거나 기존 프로세스를 종료:
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

### 4. Jest 실행 오류

```bash
npm install --save-dev jest supertest
```

## 다음 단계

1. ✅ 테스트 파일 작성 완료
2. ⏳ 실제 API 라우트 구현 필요
3. ⏳ 컨트롤러 구현 필요
4. ⏳ 데이터베이스 모델 구현 필요
5. ⏳ 미들웨어 구현 필요 (인증, 권한 등)

구현이 완료되면 테스트를 실행하여 모든 케이스가 통과하는지 확인하세요.

