# OlderBean 테스트 가이드

이 문서는 OlderBean 프로젝트의 테스트 케이스 실행 방법과 테스트 구조를 설명합니다.

## 테스트 구조

### 백엔드 테스트

백엔드 테스트는 Jest와 Supertest를 사용하여 작성되었습니다.

```
backend/
├── __tests__/
│   ├── setup.js              # 테스트 환경 설정
│   ├── auth.test.js          # 인증 API 테스트
│   ├── menus.test.js         # 메뉴 API 테스트
│   ├── orders.test.js        # 주문 API 테스트
│   └── integration.test.js  # 통합 테스트
└── jest.config.js            # Jest 설정
```

#### 테스트 범위

1. **인증 테스트 (auth.test.js)**
   - 회원가입 (성공/실패 케이스)
   - 로그인 (성공/실패 케이스)
   - 인증 미들웨어 검증
   - 토큰 검증

2. **메뉴 테스트 (menus.test.js)**
   - 메뉴 목록 조회
   - 메뉴 상세 조회
   - 메뉴 생성 (관리자)
   - 메뉴 수정 (관리자)
   - 메뉴 삭제 (관리자)
   - 권한 검증

3. **주문 테스트 (orders.test.js)**
   - 주문 생성
   - 주문 내역 조회
   - 주문 상세 조회
   - 주문 상태 업데이트 (관리자)
   - 권한 및 유효성 검증

4. **통합 테스트 (integration.test.js)**
   - 전체 주문 플로우 테스트
   - 헬스 체크
   - 404 핸들러

### 프론트엔드 테스트

프론트엔드 테스트는 Vitest와 React Testing Library를 사용하여 작성되었습니다.

```
frontend/
├── src/
│   └── __tests__/
│       ├── setup.ts              # 테스트 환경 설정
│       ├── App.test.tsx          # App 컴포넌트 테스트
│       ├── services/
│       │   └── api.test.ts       # API 서비스 테스트
│       ├── components/
│       │   ├── MenuCard.test.tsx
│       │   └── OrderItem.test.tsx
│       ├── pages/
│       │   ├── MenuPage.test.tsx
│       │   └── OrderPage.test.tsx
│       └── utils/
│           └── auth.test.ts      # 인증 유틸리티 테스트
└── vitest.config.ts              # Vitest 설정
```

## 테스트 실행 방법

### 백엔드 테스트 실행

```bash
cd backend
npm install
npm test
```

특정 테스트 파일만 실행:
```bash
npm test -- auth.test.js
```

커버리지 확인:
```bash
npm test -- --coverage
```

### 프론트엔드 테스트 실행

```bash
cd frontend
npm install
npm test
```

테스트 UI 모드:
```bash
npm run test:ui
```

커버리지 확인:
```bash
npm run test:coverage
```

## 테스트 환경 설정

### 백엔드

테스트 환경에서는 별도의 테스트 데이터베이스를 사용하는 것을 권장합니다.

환경 변수 설정:
```env
NODE_ENV=test
TEST_DATABASE_URL=postgresql://user:password@localhost:5432/orderbean_test
JWT_SECRET=test-secret-key
```

### 프론트엔드

프론트엔드 테스트는 jsdom 환경에서 실행되며, 별도의 환경 설정이 필요하지 않습니다.

## 테스트 케이스 상세

### 인증 API 테스트

- ✅ 새로운 사용자 회원가입 성공
- ✅ 관리자 회원가입 성공
- ✅ 중복 이메일 회원가입 실패
- ✅ 필수 필드 누락 시 실패
- ✅ 잘못된 이메일 형식 실패
- ✅ 짧은 비밀번호 실패
- ✅ 올바른 자격증명으로 로그인 성공
- ✅ 잘못된 이메일/비밀번호로 로그인 실패
- ✅ 토큰 없이 보호된 엔드포인트 접근 실패

### 메뉴 API 테스트

- ✅ 메뉴 목록 조회 (인증 불필요)
- ✅ 메뉴 상세 조회
- ✅ 관리자가 메뉴 생성
- ✅ 일반 사용자 메뉴 생성 실패 (권한 없음)
- ✅ 필수 필드 누락 시 실패
- ✅ 음수 가격 실패
- ✅ 중복 메뉴명 실패
- ✅ 관리자가 메뉴 수정
- ✅ 관리자가 메뉴 삭제

### 주문 API 테스트

- ✅ 사용자가 주문 생성
- ✅ 여러 메뉴를 포함한 주문 생성
- ✅ 토큰 없이 주문 생성 실패
- ✅ 빈 주문 항목 실패
- ✅ 존재하지 않는 메뉴로 주문 실패
- ✅ 사용자가 자신의 주문 내역 조회
- ✅ 페이지네이션 파라미터로 조회
- ✅ 다른 사용자의 주문 조회 불가
- ✅ 관리자가 주문 상태 업데이트
- ✅ 일반 사용자 주문 상태 업데이트 실패
- ✅ 잘못된 상태 값 실패

### 통합 테스트

- ✅ 전체 주문 프로세스 (회원가입 → 메뉴 생성 → 주문 → 상태 업데이트)
- ✅ 헬스 체크 엔드포인트
- ✅ 404 핸들러

## 주의사항

1. **데이터베이스**: 테스트 실행 전 테스트 데이터베이스가 준비되어 있어야 합니다.
2. **의존성**: 테스트 실행 전 `npm install`을 실행하여 모든 의존성을 설치해야 합니다.
3. **환경 변수**: 테스트 환경에 맞는 환경 변수가 설정되어 있어야 합니다.
4. **실제 구현**: 일부 프론트엔드 테스트는 실제 컴포넌트/서비스 구현 후 주석을 해제하고 사용해야 합니다.

## 테스트 커버리지 목표

- 백엔드: 80% 이상
- 프론트엔드: 70% 이상

## 문제 해결

### 백엔드 테스트 실패 시

1. 데이터베이스 연결 확인
2. 환경 변수 설정 확인
3. 테스트 데이터베이스 마이그레이션 실행

### 프론트엔드 테스트 실패 시

1. `node_modules` 삭제 후 재설치
2. Vitest 설정 확인
3. TypeScript 설정 확인

## 추가 리소스

- [Jest 문서](https://jestjs.io/)
- [Supertest 문서](https://github.com/visionmedia/supertest)
- [Vitest 문서](https://vitest.dev/)
- [React Testing Library 문서](https://testing-library.com/react)

