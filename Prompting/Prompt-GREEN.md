# README.md 테스트 케이스 목록
_Exported on 12/17/2025 at 16:25:09 GMT+9 from Cursor (2.1.50)_

---

**User**

@reports/TEST_COVERAGE_REPORT.md 문서에 있는 테스트 케이스를 분석해서 루트에 있는 README.md 파일에 해야할 목록으로 추가해줘.

---

**Cursor**


`reports/TEST_COVERAGE_REPORT.md`의 테스트 케이스를 분석해 루트 `README.md`에 TODO 목록으로 추가합니다. 먼저 `README.md`를 확인합니다.



`TEST_COVERAGE_REPORT.md`의 테스트 케이스를 분석해 `README.md`의 To-Do List에 추가합니다.


```markdown
# OlderBean ☕

> 바쁜 직장인과 단골 고객을 위한 빠른 커피 사전 주문 웹 서비스

## 📋 목차

- [개요](#개요)
- [주요 기능](#주요-기능)
- [기술 스택](#기술-스택)
- [프로젝트 구조](#프로젝트-구조)
- [시작하기](#시작하기)
- [사용자 가이드](#사용자-가이드)
- [관리자 가이드](#관리자-가이드)
- [API 문서](#api-문서)
- [데이터 모델](#데이터-모델)
- [성공 지표](#성공-지표)
- [향후 계획](#향후-계획)
- [기여하기](#기여하기)

## 🎯 개요

**OlderBean**은 커피 주문 대기 시간과 복잡한 주문 과정을 최소화한 웹 기반 커피 사전 주문 서비스입니다. 

### 프로젝트 목표

- ⚡ **커피 주문 대기 시간 단축** - 평균 주문 완료 시간 15초 이내
- 🔄 **단골 고객의 반복 주문 편의성 극대화** - 재주문 기능 사용률 50% 이상
- 🎯 **최소 기능(MVP) 중심의 안정적인 웹 서비스** - 주문 실패율 1% 이하

### 문제 정의

바쁜 직장인들은 커피를 구매하기 위해 대기와 복잡한 주문 과정에 불필요한 시간을 소비하고 있습니다. OlderBean은 이를 빠르고 간편하게 해결합니다.

## ✨ 주요 기능

### 고객 기능

1. **커피 메뉴 조회** - 메뉴명과 가격이 포함된 커피 메뉴 목록 조회
2. **주문 생성** - 옵션 선택 후 빠른 주문 생성
3. **주문 내역 조회** - 과거 주문 목록을 최신순으로 조회

### 관리자 기능

4. **메뉴 관리 (CRUD)** - 커피 메뉴 추가, 수정, 삭제
5. **주문 상태 관리** - 주문 접수/제조/완료 상태 변경

## 🛠 기술 스택

### Frontend
- React / Vue.js (선택)
- TypeScript
- CSS Framework (Tailwind CSS / Material-UI)

### Backend
- Node.js / Python (Django/FastAPI) / Java (Spring Boot)
- RESTful API
- JWT 인증

### Database
- PostgreSQL / MySQL
- ORM (Prisma / Sequelize / TypeORM)

### DevOps
- Docker
- CI/CD (GitHub Actions)

> **참고**: 기술 스택은 프로젝트 요구사항에 맞게 선택 가능합니다.

## 📁 프로젝트 구조

```
OrderBean/
├── frontend/          # 프론트엔드 애플리케이션
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   └── package.json
├── backend/           # 백엔드 API 서버
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── middleware/
│   └── package.json
├── database/          # 데이터베이스 스키마 및 마이그레이션
│   └── migrations/
├── docs/              # 문서
│   └── API.md
└── README.md
```

## 🚀 시작하기

### 사전 요구사항

- Node.js 18+ (또는 Python 3.9+)
- PostgreSQL 14+ (또는 MySQL 8+)
- npm / yarn / pnpm

### 설치 방법

1. **저장소 클론**
```bash
git clone https://github.com/yourusername/OrderBean.git
cd OrderBean
```

2. **환경 변수 설정**
```bash
# backend/.env
DATABASE_URL=postgresql://user:password@localhost:5432/orderbean
JWT_SECRET=your-secret-key
PORT=3000
```

3. **의존성 설치**
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

4. **데이터베이스 설정**
```bash
# 마이그레이션 실행
npm run migrate

# 시드 데이터 생성 (선택)
npm run seed
```

5. **개발 서버 실행**
```bash
# Backend (터미널 1)
cd backend
npm run dev

# Frontend (터미널 2)
cd frontend
npm run dev
```

애플리케이션은 다음 주소에서 실행됩니다:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000

## 👤 사용자 가이드

### 주문 프로세스

1. **메뉴 조회**
   - 홈 화면에서 커피 메뉴 목록 확인
   - 메뉴명과 가격 정보 확인

2. **주문 생성**
   - 원하는 메뉴 선택
   - 옵션 선택 (사이즈, 샷 추가, 시럽 등)
   - 주문 완료 버튼 클릭

3. **주문 내역 확인**
   - 로그인 후 "주문 내역" 메뉴 접근
   - 최신순으로 정렬된 주문 목록 확인

### UX 흐름

```
[홈] → [메뉴 조회] → [메뉴 선택] → [옵션 선택] → [주문 완료]
```

## 🔐 관리자 가이드

### 관리자 로그인

1. 관리자 계정으로 로그인
2. 관리자 대시보드 접근

### 메뉴 관리

- **메뉴 추가**: 새로운 커피 메뉴 등록
- **메뉴 수정**: 기존 메뉴 정보 업데이트
- **메뉴 삭제**: 메뉴 삭제 (주의: 주문 이력이 있는 경우)

### 주문 상태 관리

- **접수**: 주문 접수 확인
- **제조 중**: 커피 제조 시작
- **완료**: 주문 완료 처리

### 관리자 UX 흐름

```
[관리자 로그인] → [메뉴 관리 / 주문 관리]
```

## 📚 API 문서

### 인증

#### 로그인
```
POST /api/auth/login
Body: { email, password }
Response: { token, user }
```

#### 회원가입
```
POST /api/auth/register
Body: { name, email, password, role }
Response: { token, user }
```

### 메뉴

#### 메뉴 목록 조회
```
GET /api/menus
Response: [{ id, name, price, ... }]
```

#### 메뉴 상세 조회
```
GET /api/menus/:id
Response: { id, name, price, options, ... }
```

### 주문

#### 주문 생성
```
POST /api/orders
Body: { menu_id, options, ... }
Response: { id, status, created_at, ... }
```

#### 주문 내역 조회
```
GET /api/orders
Headers: { Authorization: Bearer <token> }
Response: [{ id, status, items, created_at, ... }]
```

#### 주문 상태 업데이트 (관리자)
```
PATCH /api/orders/:id/status
Body: { status: '접수' | '제조중' | '완료' }
Response: { id, status, ... }
```

> 상세 API 문서는 `docs/API.md` 참고

## 🗄 데이터 모델

### ERD 개요

| 엔티티 | 주요 필드 | 설명 |
|--------|----------|------|
| **User** | `id`, `name`, `email`, `role` | 사용자 정보 (고객/관리자) |
| **Menu** | `id`, `name`, `price`, `description` | 커피 메뉴 정보 |
| **Order** | `id`, `user_id`, `status`, `created_at` | 주문 정보 |
| **OrderItem** | `id`, `order_id`, `menu_id`, `options` | 주문 상세 항목 |

### 주요 관계

- User (1) : Order (N)
- Order (1) : OrderItem (N)
- Menu (1) : OrderItem (N)

## 📊 성공 지표

- ✅ **평균 주문 완료 시간**: 15초 이내
- ✅ **재주문 기능 사용률**: 50% 이상
- ✅ **주문 실패율**: 1% 이하
- ✅ **동시 사용자 처리**: 50명 기준 응답 시간 1초 이내

## 🔮 향후 계획

| ID | 기능 | 설명 | 우선순위 |
|----|------|------|----------|
| FE-01 | 원터치 재주문 | 이전 주문 그대로 재주문 | 높음 |
| FE-02 | 결제 시스템 연동 | 외부 결제 API 연동 (카드, 간편결제) | 중간 |
| FE-03 | 추천 메뉴 | 주문 이력 기반 추천 시스템 | 낮음 |
| FE-04 | 모바일 앱 | React Native / Flutter 앱 개발 | 중간 |
| FE-05 | 푸시 알림 | 주문 상태 변경 시 알림 | 낮음 |

## 🤝 기여하기

기여를 환영합니다! 다음 단계를 따라주세요:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### 코딩 컨벤션

- 코드 스타일: ESLint / Prettier 설정 준수
- 커밋 메시지: Conventional Commits 형식
- 브랜치 네이밍: `feature/`, `fix/`, `docs/` 접두사 사용

## 📝 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

## 👥 팀

- 프로젝트 관리자: [Your Name]
- 개발자: [Team Members]

## 📞 문의

프로젝트 관련 문의사항이 있으시면 이슈를 등록해주세요.

---

**OlderBean** - 빠르고 반복 가능한 커피 주문 경험 ☕

## To-Do List

### 테스트 구현 (백엔드 - 65개 테스트)

#### 인증 API 테스트 (auth.test.js - 10개)
- [ ] 회원가입 테스트 (6개)
  - [ ] 새로운 사용자 회원가입 성공
  - [ ] 관리자 회원가입 성공
  - [ ] 중복 이메일 회원가입 실패
  - [ ] 필수 필드 누락 시 실패
  - [ ] 잘못된 이메일 형식 실패
  - [ ] 짧은 비밀번호 실패
- [ ] 로그인 테스트 (4개)
  - [ ] 올바른 자격증명으로 로그인 성공
  - [ ] 잘못된 이메일로 로그인 실패
  - [ ] 잘못된 비밀번호로 로그인 실패
  - [ ] 필수 필드 누락 시 실패
- [ ] 인증 미들웨어 테스트 (3개)
  - [ ] 토큰 없이 보호된 엔드포인트 접근 실패
  - [ ] 잘못된 토큰으로 접근 실패
  - [ ] 유효한 토큰으로 접근 성공

#### 메뉴 API 테스트 (menus.test.js - 20개)
- [ ] 메뉴 목록 조회 (GET /api/menus - 2개)
  - [ ] 메뉴 목록 조회 성공 (인증 불필요)
  - [ ] 메뉴 목록 형식 검증
- [ ] 메뉴 상세 조회 (GET /api/menus/:id - 3개)
  - [ ] 존재하는 메뉴 상세 조회 성공
  - [ ] 존재하지 않는 메뉴 조회 실패
  - [ ] 잘못된 ID 형식 실패
- [ ] 메뉴 생성 (POST /api/menus - 6개)
  - [ ] 관리자가 메뉴 생성 성공
  - [ ] 일반 사용자 메뉴 생성 실패 (권한 없음)
  - [ ] 토큰 없이 메뉴 생성 실패
  - [ ] 필수 필드 누락 시 실패
  - [ ] 음수 가격 실패
  - [ ] 중복 메뉴명 실패
- [ ] 메뉴 수정 (PATCH /api/menus/:id - 4개)
  - [ ] 관리자가 메뉴 수정 성공
  - [ ] 일반 사용자 메뉴 수정 실패
  - [ ] 존재하지 않는 메뉴 수정 실패
  - [ ] 부분 수정 성공 (일부 필드만)
- [ ] 메뉴 삭제 (DELETE /api/menus/:id - 3개)
  - [ ] 관리자가 메뉴 삭제 성공
  - [ ] 일반 사용자 메뉴 삭제 실패
  - [ ] 존재하지 않는 메뉴 삭제 실패

#### 주문 API 테스트 (orders.test.js - 25개)
- [ ] 주문 생성 (POST /api/orders - 6개)
  - [ ] 사용자가 주문 생성 성공
  - [ ] 여러 메뉴를 포함한 주문 생성 성공
  - [ ] 토큰 없이 주문 생성 실패
  - [ ] 필수 필드 누락 시 실패
  - [ ] 빈 주문 항목 실패
  - [ ] 존재하지 않는 메뉴로 주문 실패
  - [ ] 잘못된 수량 실패
- [ ] 주문 내역 조회 (GET /api/orders - 4개)
  - [ ] 사용자가 자신의 주문 내역 조회 성공
  - [ ] 페이지네이션 파라미터로 조회
  - [ ] 토큰 없이 조회 실패
  - [ ] 다른 사용자의 주문 조회 불가
- [ ] 주문 상세 조회 (GET /api/orders/:id - 4개)
  - [ ] 사용자가 자신의 주문 상세 조회 성공
  - [ ] 존재하지 않는 주문 조회 실패
  - [ ] 다른 사용자의 주문 조회 실패
  - [ ] 토큰 없이 조회 실패
- [ ] 주문 상태 업데이트 (PATCH /api/orders/:id/status - 7개)
  - [ ] 관리자가 주문 상태 업데이트 성공 (접수 → 제조중)
  - [ ] 관리자가 주문 상태 업데이트 성공 (제조중 → 완료)
  - [ ] 일반 사용자 주문 상태 업데이트 실패
  - [ ] 잘못된 상태 값 실패
  - [ ] 존재하지 않는 주문 상태 업데이트 실패
  - [ ] 토큰 없이 업데이트 실패
  - [ ] 취소 상태로 업데이트 성공

#### 통합 테스트 (integration.test.js - 3개)
- [ ] 전체 주문 프로세스 통합 테스트
  - [ ] 관리자 회원가입 및 로그인
  - [ ] 일반 사용자 회원가입 및 로그인
  - [ ] 관리자가 메뉴 생성
  - [ ] 사용자가 메뉴 목록 조회
  - [ ] 사용자가 메뉴 상세 조회
  - [ ] 사용자가 주문 생성
  - [ ] 사용자가 주문 내역 조회
  - [ ] 사용자가 주문 상세 조회
  - [ ] 관리자가 주문 상태 업데이트 (접수 → 제조중)
  - [ ] 사용자가 업데이트된 주문 상태 확인
  - [ ] 관리자가 주문 상태 업데이트 (제조중 → 완료)
  - [ ] 최종 주문 상태 확인
- [ ] 헬스 체크 테스트
  - [ ] GET /api/health - 서버 상태 확인
- [ ] 404 핸들러 테스트
  - [ ] 존재하지 않는 라우트 접근 시 404 반환

### 테스트 구현 (프론트엔드 - 35개 테스트)

#### 컴포넌트 테스트
- [ ] App 컴포넌트 테스트 (2개)
- [ ] MenuCard 컴포넌트 테스트 (3개)
- [ ] OrderItem 컴포넌트 테스트 (3개)

#### 페이지 테스트
- [ ] MenuPage 테스트 (4개)
- [ ] OrderPage 테스트 (3개)

#### 서비스 및 유틸리티 테스트
- [ ] API 서비스 테스트 (15개)
- [ ] 인증 유틸리티 테스트 (5개)

### 추가 테스트 개선 사항
- [ ] 500 에러 처리 테스트 추가
- [ ] 엣지 케이스 테스트 (매우 큰 수량, 특수 문자 입력 등)
- [ ] 동시성 테스트 (동시 주문, 동시 메뉴 수정 등)
- [ ] 성능 테스트 (대량 데이터 처리)
- [ ] 보안 테스트 (SQL 인젝션, XSS 등 보안 취약점)

### 구현 및 리팩토링
- [ ] Implementation
- [ ] Refactoring
```


`TEST_COVERAGE_REPORT.md`의 테스트 케이스를 분석해 `README.md`의 To-Do List에 추가했습니다.

추가된 내용:
- 백엔드 테스트 (65개): 인증 API(10), 메뉴 API(20), 주문 API(25), 통합 테스트(3)
- 프론트엔드 테스트 (35개): 컴포넌트, 페이지, 서비스/유틸리티
- 추가 개선 사항: 500 에러 처리, 엣지 케이스, 동시성, 성능, 보안 테스트

각 항목은 체크박스로 표시되어 진행 상황을 추적할 수 있습니다.



작업 완료. 린터 오류 없습니다. `README.md`의 To-Do List에 테스트 커버리지 보고서의 모든 테스트 케이스가 체크박스 형태로 추가되었습니다.

---

**User**

@README.md (329-345) 

Green 단계에서 최소한의 기능을 구현하고자 하는데 먼저 시나리오를 알려주고 승인 후 진행해줘.

---

**Cursor**


프로젝트 구조와 현재 상태를 확인 중입니다. 확인 후 Green 단계 구현 시나리오를 제시하겠습니다.



Green 단계 구현 시나리오입니다.

## Green 단계 구현 시나리오: 인증 API (최소 기능)

### 현재 상태
- 테스트 파일: `auth.test.js` (10개 테스트 케이스)
- 기본 Express 서버 구조 존재
- 필요한 패키지 설치됨 (jsonwebtoken, bcryptjs, sequelize, pg)
- routes, controllers, models, middleware 디렉토리 비어있음

### 구현 계획 (최소 기능)

#### 1단계: 데이터베이스 설정
- [ ] Sequelize 설정 파일 생성 (`src/config/database.js`)
  - 테스트 환경용 인메모리/간단한 DB 연결
  - 또는 SQLite 사용 (개발 단순화)

#### 2단계: User 모델 생성
- [ ] `src/models/User.js` 생성
  - 필드: id, name, email, password, role
  - 비밀번호 해싱 (bcryptjs)
  - 이메일 유니크 제약

#### 3단계: 인증 컨트롤러 (최소 기능)
- [ ] `src/controllers/authController.js` 생성
  - `register`: 사용자 생성, 비밀번호 해싱, JWT 토큰 발급
  - `login`: 이메일/비밀번호 검증, JWT 토큰 발급
  - 유효성 검증 (최소): 필수 필드, 이메일 형식, 비밀번호 길이

#### 4단계: 인증 미들웨어
- [ ] `src/middleware/auth.js` 생성
  - JWT 토큰 검증
  - req.user에 사용자 정보 추가

#### 5단계: 인증 라우트
- [ ] `src/routes/auth.js` 생성
  - POST `/api/auth/register`
  - POST `/api/auth/login`

#### 6단계: 메인 앱에 라우트 연결
- [ ] `src/index.js`에 인증 라우트 연결
- [ ] `/api/orders` 엔드포인트에 인증 미들웨어 적용 (미들웨어 테스트용)

### 구현 전략 (최소 기능)
1. 데이터베이스: SQLite 사용 (설정 단순화)
2. 에러 처리: 기본 에러 메시지만 반환
3. 유효성 검증: 최소 규칙만 적용
4. 보안: 기본 JWT + bcrypt만 사용

### 예상 파일 구조
```
backend/src/
├── config/
│   └── database.js          (새로 생성)
├── models/
│   └── User.js              (새로 생성)
├── controllers/
│   └── authController.js   (새로 생성)
├── middleware/
│   └── auth.js              (새로 생성)
├── routes/
│   └── auth.js              (새로 생성)
└── index.js                 (수정)
```

### 주의사항
- 테스트 통과를 위한 최소 기능만 구현
- 리팩토링은 이후 단계에서 진행
- 실제 프로덕션 로직은 나중에 보완

이 시나리오로 진행할까요? 승인해 주시면 구현을 시작하겠습니다.

```plaintext
backend/src/
├── config/
│   └── database.js          (새로 생성)
├── models/
│   └── User.js              (새로 생성)
├── controllers/
│   └── authController.js   (새로 생성)
├── middleware/
│   └── auth.js              (새로 생성)
├── routes/
│   └── auth.js              (새로 생성)
└── index.js                 (수정)
```

---

**User**

시작해줘.

---

**Cursor**


Green 단계 구현을 시작합니다. 최소 기능으로 테스트를 통과시키는 데 집중합니다.



데이터베이스 설정부터 진행합니다. 테스트 환경에서는 SQLite를 사용해 빠르게 진행합니다.


```javascript
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

// 테스트 환경에서는 SQLite 사용 (빠른 테스트를 위해)
const isTest = process.env.NODE_ENV === 'test';

let sequelize;

if (isTest) {
  // 테스트 환경: SQLite 인메모리 데이터베이스
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false, // 테스트 중 로그 비활성화
  });
} else {
  // 개발/프로덕션 환경: PostgreSQL
  const databaseUrl = process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/orderbean';
  sequelize = new Sequelize(databaseUrl, {
    logging: false,
  });
}

module.exports = sequelize;

```

---

**User**

첨부된 파일을 참고해서 Python + FastAPI + React + Render 를 완벽하게 지원하도록 수정해서, Docs 폴더에 PRD_Up1.md 파일로 다시 작성해줘.

---

**Cursor**


현재 PRD를 확인하고, 이미지의 기술 스택을 반영해 Python + FastAPI + React + Render 기반 PRD를 작성합니다.



Python + FastAPI + React + Render 스택을 반영한 PRD 작성 중입니다.


```markdown
# OlderBean PRD v1.0 (Product Requirements Document)
## Python + FastAPI + React + Render 스택 기반

## 1. 개요 (Overview)

**OlderBean**은 바쁜 직장인과 단골 고객을 위해 대기 시간과 복잡한 주문 과정을 최소화한 웹 기반 커피 사전 주문 서비스이다. 사용자는 웹에서 커피 메뉴를 조회하고, 옵션을 선택해 빠르게 주문하며, 매장에서는 주문을 효율적으로 관리할 수 있다.

본 프로젝트는 **Python FastAPI 백엔드**와 **React 프론트엔드**를 기반으로 하며, **Render** 플랫폼에서 통합 배포되는 풀스택 웹 서비스 구조를 지향한다. 직관적인 UX와 단순한 기능 구성을 통해 **"빠른 주문, 쉬운 반복 주문"** 경험을 제공하는 것을 목표로 한다.

### 프로젝트 목표

* 커피 주문 대기 시간 단축
* 단골 고객의 반복 주문 편의성 극대화
* 최소 기능(MVP) 중심의 안정적인 웹 서비스 구현

---

## 2. 기술 스택 (Technology Stack)

### 2.1 전체 아키텍처

| 계층 (Layer) | 사용 기술 (Technology) | 설명 (Description) |
|------------|----------------------|------------------|
| **프론트엔드 (UI)** | React | 빠른 프로토타입 또는 완성형 웹 인터페이스 |
| **백엔드 (API)** | FastAPI | 비동기 고성능 Python 웹 프레임워크 |
| **데이터베이스** | PostgreSQL | 안정적이고 ORM 기반의 DB 설계 |
| **인증/세션** | FastAPI Users, OAuth2 | 로그인, JWT 인증 |
| **테스트** | pytest | 단위/통합 테스트 |
| **문서화** | Swagger / ReDoc | API 자동 문서 생성 (FastAPI 자동 문서) |
| **배포/환경** | Render | 백엔드, DB, 프론트 통합 실행 환경 구성 |

### 2.2 기술 스택 상세

#### 프론트엔드
- **React**: 컴포넌트 기반 UI 라이브러리
- **TypeScript**: 타입 안정성 보장
- **CSS Framework**: Tailwind CSS 또는 Material-UI
- **상태 관리**: React Context API 또는 Zustand
- **HTTP 클라이언트**: Axios 또는 Fetch API

#### 백엔드
- **FastAPI**: Python 3.9+ 기반 비동기 웹 프레임워크
- **SQLAlchemy**: ORM (Object-Relational Mapping)
- **Alembic**: 데이터베이스 마이그레이션
- **Pydantic**: 데이터 검증 및 설정 관리
- **FastAPI Users**: 사용자 인증 및 관리 라이브러리
- **python-jose**: JWT 토큰 생성 및 검증
- **passlib**: 비밀번호 해싱 (bcrypt)
- **python-multipart**: 파일 업로드 지원

#### 데이터베이스
- **PostgreSQL 14+**: 관계형 데이터베이스
- **SQLAlchemy ORM**: Python ORM
- **Alembic**: 마이그레이션 관리

#### 인증 및 보안
- **FastAPI Users**: 사용자 인증 시스템
- **OAuth2**: 인증 프로토콜
- **JWT (JSON Web Token)**: 토큰 기반 인증
- **bcrypt**: 비밀번호 해싱

#### 테스트
- **pytest**: Python 테스트 프레임워크
- **pytest-asyncio**: 비동기 테스트 지원
- **httpx**: 비동기 HTTP 클라이언트 (테스트용)
- **pytest-cov**: 코드 커버리지 측정

#### 문서화
- **Swagger UI**: FastAPI 자동 생성 API 문서 (interactive)
- **ReDoc**: 대체 API 문서 뷰어
- **OpenAPI 3.0**: API 스펙 표준

#### 배포 및 DevOps
- **Render**: 통합 배포 플랫폼
  - Backend Service: FastAPI 애플리케이션
  - PostgreSQL Database: 관리형 데이터베이스
  - Static Site: React 프론트엔드 (또는 Web Service)
- **GitHub Actions**: CI/CD 파이프라인 (선택사항)
- **Docker**: 컨테이너화 (선택사항)

---

## 3. 문제 정의 (Problem Statement)

바쁜 직장인들은 커피를 구매하기 위해 대기와 복잡한 주문 과정에 불필요한 시간을 소비하고 있으며, 이를 빠르고 간편하게 해결할 수 있는 주문 웹 서비스가 필요하다.

---

## 4. 주요 사용자 (Target Users)

| 사용자 유형     | 설명                       | 주요 목표           |
| ---------- | ------------------------ | --------------- |
| 고객(User)   | 커피를 주문하는 일반 사용자(직장인, 단골) | 빠른 주문, 주문 내역 확인 |
| 관리자(Admin) | 매장 관리자 또는 바리스타           | 메뉴 관리, 주문 상태 관리 |

---

## 5. 핵심 기능 범위 (Scope)

### 고객 기능

1. **커피 메뉴 조회** - 메뉴명과 가격이 포함된 커피 메뉴 목록 조회
2. **주문 생성** - 옵션 선택 후 빠른 주문 생성
3. **주문 내역 조회** - 과거 주문 목록을 최신순으로 조회

### 관리자 기능

4. **메뉴 관리 (CRUD)** - 커피 메뉴 추가, 수정, 삭제
5. **주문 상태 관리** - 주문 접수/제조/완료 상태 변경

---

## 6. 사용자 스토리 (Gherkin Style)

### 기능 1: 커피 메뉴 조회

```
Given 고객이 OlderBean 웹서비스에 접속해 있다
When 고객이 메뉴 조회 화면에 진입한다
Then 시스템은 메뉴명과 가격이 포함된 커피 메뉴 목록을 표시한다
```

### 기능 2: 주문 생성 (옵션 선택)

```
Given 고객이 특정 커피 메뉴를 선택했다
When 고객이 옵션을 선택하고 주문을 완료한다
Then 시스템은 주문을 생성하고 주문 완료 상태를 표시한다
```

### 기능 3: 주문 내역 조회

```
Given 고객이 로그인한 상태이다
When 고객이 주문 내역 화면에 접근한다
Then 시스템은 고객의 과거 주문 목록을 최신순으로 표시한다
```

### 기능 4: 메뉴 관리 (관리자)

```
Given 관리자가 관리자 계정으로 로그인했다
When 관리자가 새로운 커피 메뉴를 등록한다
Then 시스템은 해당 메뉴를 고객 메뉴 화면에 노출한다
```

### 기능 5: 주문 상태 관리 (관리자)

```
Given 관리자가 주문 관리 화면에 접속해 있다
When 관리자가 주문 상태를 변경한다
Then 시스템은 변경된 주문 상태를 고객에게 표시한다
```

---

## 7. 기능 요구사항 (Functional Requirements)

| ID    | 요구사항     | 설명               | 우선순위 |
| ----- | -------- | ---------------- | ---- |
| FR-01 | 메뉴 조회    | 커피 메뉴 목록 및 가격 조회 | 높음   |
| FR-02 | 주문 생성    | 옵션 선택 후 주문 생성    | 높음   |
| FR-03 | 주문 내역 조회 | 사용자 주문 이력 확인     | 중간   |
| FR-04 | 메뉴 관리    | 관리자 메뉴 CRUD      | 중간   |
| FR-05 | 주문 상태 관리 | 주문 접수/제조/완료 관리   | 중간   |

---

## 8. 비기능 요구사항 (Non-Functional Requirements)

| 항목    | 설명                        | 기술적 구현                    |
| ----- | ------------------------- | -------------------------- |
| 성능    | 동시 사용자 50명 기준 응답 시간 1초 이내 | FastAPI 비동기 처리, 데이터베이스 인덱싱 |
| 사용성   | 모바일 대응 반응형 웹              | React 반응형 디자인, Tailwind CSS   |
| 보안    | 관리자/고객 권한 분리              | FastAPI Users, OAuth2, JWT 인증 |
| 유지보수성 | 기능 단위 모듈화 구조              | FastAPI 라우터 모듈화, React 컴포넌트화 |
| 확장성   | 향후 기능 추가 용이성              | 마이크로서비스 아키텍처 준비, API 버전 관리 |
| 문서화   | API 자동 문서 생성              | FastAPI Swagger/ReDoc 자동 생성 |

---

## 9. UX 흐름 (UX Flow)

### 고객 흐름
```
[홈] → [메뉴 조회] → [메뉴 선택] → [옵션 선택] → [주문 완료]
```

### 관리자 흐름
```
[관리자 로그인] → [메뉴 관리 / 주문 관리]
```

---

## 10. 데이터 모델 개요 (ERD 요약)

| 엔티티       | 주요 필드                           | 설명                    |
| --------- | ------------------------------- | --------------------- |
| User      | id, name, email, role, password | 사용자 정보 (고객/관리자)        |
| Menu      | id, name, price, description    | 커피 메뉴 정보              |
| Order     | id, user_id, status, created_at | 주문 정보 (접수/제조중/완료/취소) |
| OrderItem | id, order_id, menu_id, options  | 주문 상세 항목 (옵션 포함)      |

### 주요 관계

- User (1) : Order (N) - 한 사용자는 여러 주문 가능
- Order (1) : OrderItem (N) - 한 주문은 여러 주문 항목 포함
- Menu (1) : OrderItem (N) - 한 메뉴는 여러 주문 항목에 포함

### 데이터베이스 스키마 (SQLAlchemy 모델)

```python
# 예시 구조
class User(Base):
    id: UUID
    email: str (unique)
    name: str
    hashed_password: str
    role: Enum (user, admin)
    is_active: bool
    created_at: datetime

class Menu(Base):
    id: UUID
    name: str (unique)
    price: Decimal
    description: Optional[str]
    is_available: bool
    created_at: datetime

class Order(Base):
    id: UUID
    user_id: UUID (FK -> User)
    status: Enum (접수, 제조중, 완료, 취소)
    created_at: datetime
    updated_at: datetime

class OrderItem(Base):
    id: UUID
    order_id: UUID (FK -> Order)
    menu_id: UUID (FK -> Menu)
    quantity: int
    options: JSON (사이즈, 샷, 시럽 등)
    price: Decimal
```

---

## 11. API 설계 (FastAPI 기반)

### 11.1 API 엔드포인트 구조

#### 인증 API (`/api/auth`)
- `POST /api/auth/register` - 회원가입
- `POST /api/auth/login` - 로그인
- `POST /api/auth/logout` - 로그아웃
- `GET /api/auth/me` - 현재 사용자 정보 조회

#### 메뉴 API (`/api/menus`)
- `GET /api/menus` - 메뉴 목록 조회 (인증 불필요)
- `GET /api/menus/{menu_id}` - 메뉴 상세 조회
- `POST /api/menus` - 메뉴 생성 (관리자)
- `PATCH /api/menus/{menu_id}` - 메뉴 수정 (관리자)
- `DELETE /api/menus/{menu_id}` - 메뉴 삭제 (관리자)

#### 주문 API (`/api/orders`)
- `POST /api/orders` - 주문 생성 (인증 필요)
- `GET /api/orders` - 주문 내역 조회 (인증 필요)
- `GET /api/orders/{order_id}` - 주문 상세 조회 (인증 필요)
- `PATCH /api/orders/{order_id}/status` - 주문 상태 업데이트 (관리자)

### 11.2 API 응답 형식

#### 성공 응답
```json
{
  "data": { ... },
  "message": "Success"
}
```

#### 에러 응답
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message"
  }
}
```

### 11.3 인증 방식

- **JWT 토큰 기반 인증**
- **OAuth2 Password Flow** (FastAPI Users)
- **토큰 위치**: `Authorization: Bearer <token>`
- **토큰 만료**: 24시간 (설정 가능)

---

## 12. 프로젝트 구조

### 12.1 백엔드 구조 (FastAPI)

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                 # FastAPI 앱 진입점
│   ├── config.py               # 설정 관리 (Pydantic)
│   ├── database.py             # 데이터베이스 연결 (SQLAlchemy)
│   ├── models/                 # SQLAlchemy 모델
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── menu.py
│   │   ├── order.py
│   │   └── order_item.py
│   ├── schemas/                # Pydantic 스키마
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── menu.py
│   │   └── order.py
│   ├── api/                    # API 라우터
│   │   ├── __init__.py
│   │   ├── deps.py             # 의존성 (인증 등)
│   │   ├── routes/
│   │   │   ├── __init__.py
│   │   │   ├── auth.py
│   │   │   ├── menus.py
│   │   │   └── orders.py
│   ├── services/               # 비즈니스 로직
│   │   ├── __init__.py
│   │   ├── auth_service.py
│   │   ├── menu_service.py
│   │   └── order_service.py
│   ├── core/                   # 핵심 설정
│   │   ├── __init__.py
│   │   ├── security.py         # JWT, 비밀번호 해싱
│   │   └── config.py
│   └── migrations/             # Alembic 마이그레이션
│       └── versions/
├── tests/                      # pytest 테스트
│   ├── __init__.py
│   ├── conftest.py            # pytest 설정
│   ├── test_auth.py
│   ├── test_menus.py
│   └── test_orders.py
├── requirements.txt            # Python 의존성
├── requirements-dev.txt        # 개발 의존성
├── .env.example
├── .gitignore
└── README.md
```

### 12.2 프론트엔드 구조 (React)

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/             # 재사용 가능한 컴포넌트
│   │   ├── common/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Loading.tsx
│   │   ├── menu/
│   │   │   └── MenuCard.tsx
│   │   └── order/
│   │       └── OrderItem.tsx
│   ├── pages/                 # 페이지 컴포넌트
│   │   ├── HomePage.tsx
│   │   ├── MenuPage.tsx
│   │   ├── OrderPage.tsx
│   │   ├── LoginPage.tsx
│   │   └── AdminPage.tsx
│   ├── services/              # API 서비스
│   │   ├── api.ts             # Axios 인스턴스
│   │   ├── authService.ts
│   │   ├── menuService.ts
│   │   └── orderService.ts
│   ├── hooks/                 # Custom Hooks
│   │   ├── useAuth.ts
│   │   └── useApi.ts
│   ├── context/               # React Context
│   │   └── AuthContext.tsx
│   ├── utils/                 # 유틸리티 함수
│   │   ├── auth.ts
│   │   └── constants.ts
│   ├── types/                 # TypeScript 타입
│   │   ├── user.ts
│   │   ├── menu.ts
│   │   └── order.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── tsconfig.json
├── vite.config.ts
├── .env.example
└── README.md
```

### 12.3 전체 프로젝트 구조

```
OrderBean/
├── backend/                   # FastAPI 백엔드
│   └── app/
├── frontend/                  # React 프론트엔드
│   └── src/
├── docs/                      # 문서
│   ├── PRD.md
│   ├── PRD_Up1.md
│   ├── API.md
│   └── INSTALLATION.md
├── .github/                   # GitHub Actions (선택)
│   └── workflows/
├── .gitignore
└── README.md
```

---

## 13. 배포 전략 (Render 기반)

### 13.1 Render 서비스 구성

#### 1. PostgreSQL Database (Render Managed PostgreSQL)
- **서비스 타입**: PostgreSQL
- **버전**: PostgreSQL 14+
- **백업**: 자동 백업 활성화
- **연결**: 내부 네트워크 연결

#### 2. Backend Service (FastAPI)
- **서비스 타입**: Web Service
- **빌드 명령**: `pip install -r requirements.txt`
- **시작 명령**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- **환경 변수**:
  - `DATABASE_URL`: Render PostgreSQL 연결 문자열
  - `JWT_SECRET`: JWT 시크릿 키
  - `CORS_ORIGIN`: 프론트엔드 URL
- **헬스 체크**: `/api/health`

#### 3. Frontend Service (React)
- **옵션 A**: Static Site (빌드된 정적 파일)
  - **빌드 명령**: `npm run build`
  - **출력 디렉토리**: `dist`
- **옵션 B**: Web Service (Vite 개발 서버)
  - **빌드 명령**: `npm install`
  - **시작 명령**: `npm run dev -- --host 0.0.0.0 --port $PORT`
- **환경 변수**:
  - `VITE_API_URL`: 백엔드 API URL

### 13.2 배포 워크플로우

1. **코드 푸시**: GitHub 저장소에 코드 푸시
2. **자동 빌드**: Render가 자동으로 변경사항 감지
3. **의존성 설치**: requirements.txt / package.json 기반 설치
4. **마이그레이션 실행**: Alembic 마이그레이션 자동 실행 (선택)
5. **서비스 재시작**: 새 버전 배포 및 재시작
6. **헬스 체크**: 자동 헬스 체크 확인

### 13.3 환경 변수 관리

- **Render Dashboard**: 환경 변수 설정 UI
- **보안**: 민감한 정보는 Render Secrets로 관리
- **환경별 분리**: Development / Staging / Production

---

## 14. 테스트 전략 (pytest 기반)

### 14.1 테스트 구조

```
tests/
├── conftest.py              # pytest 설정 및 fixtures
├── test_auth.py            # 인증 API 테스트
├── test_menus.py           # 메뉴 API 테스트
├── test_orders.py          # 주문 API 테스트
└── test_integration.py     # 통합 테스트
```

### 14.2 테스트 커버리지 목표

- **단위 테스트**: 80% 이상
- **통합 테스트**: 주요 플로우 100%
- **API 엔드포인트**: 100% 커버리지

### 14.3 테스트 실행

```bash
# 모든 테스트 실행
pytest

# 커버리지 포함
pytest --cov=app --cov-report=html

# 특정 테스트 파일
pytest tests/test_auth.py

# 비동기 테스트
pytest -v tests/test_auth.py::test_login
```

---

## 15. API 문서화 (Swagger/ReDoc)

### 15.1 자동 생성 문서

FastAPI는 OpenAPI 스펙을 자동으로 생성하며, 다음 엔드포인트에서 접근 가능:

- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`
- **OpenAPI JSON**: `http://localhost:8000/openapi.json`

### 15.2 문서 커스터마이징

- **태그**: API 그룹화
- **요약 및 설명**: 각 엔드포인트에 대한 상세 설명
- **예시**: 요청/응답 예시 추가
- **응답 모델**: Pydantic 스키마 기반 자동 문서화

---

## 16. 성공 지표 (Success Metrics)

* **평균 주문 완료 시간**: 15초 이내
* **재주문 기능 사용률**: 50% 이상
* **주문 실패율**: 1% 이하
* **API 응답 시간**: 1초 이내 (동시 사용자 50명 기준)
* **테스트 커버리지**: 80% 이상

---

## 17. 향후 확장 계획 (Future Enhancements)

| ID    | 기능        | 설명            | 기술 스택 고려사항           |
| ----- | --------- | ------------- | ---------------------- |
| FE-01 | 원터치 재주문   | 이전 주문 그대로 재주문 | React 상태 관리, FastAPI 캐싱 |
| FE-02 | 결제 시스템 연동 | 외부 결제 API 연동  | FastAPI 외부 API 통합      |
| FE-03 | 추천 메뉴     | 주문 이력 기반 추천   | 머신러닝 모델 통합 (선택)      |
| FE-04 | 실시간 주문 알림 | WebSocket 통신     | FastAPI WebSocket 지원   |
| FE-05 | 모바일 앱     | React Native 앱   | 공통 API 재사용           |

---

## 18. 개발 환경 설정

### 18.1 사전 요구사항

- **Python**: 3.9 이상
- **Node.js**: 18 이상
- **PostgreSQL**: 14 이상 (로컬 개발용)
- **Git**: 버전 관리

### 18.2 백엔드 설정

```bash
# 가상 환경 생성
python -m venv venv

# 가상 환경 활성화
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

# 의존성 설치
pip install -r requirements.txt

# 환경 변수 설정
cp .env.example .env

# 데이터베이스 마이그레이션
alembic upgrade head

# 개발 서버 실행
uvicorn app.main:app --reload
```

### 18.3 프론트엔드 설정

```bash
# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env

# 개발 서버 실행
npm run dev
```

---

## 19. 보안 고려사항

### 19.1 인증 및 권한

- **JWT 토큰**: 안전한 토큰 생성 및 검증
- **비밀번호 해싱**: bcrypt 사용
- **역할 기반 접근 제어 (RBAC)**: 관리자/일반 사용자 분리
- **OAuth2**: 표준 인증 프로토콜 준수

### 19.2 데이터 보안

- **SQL 인젝션 방지**: SQLAlchemy ORM 사용
- **XSS 방지**: React 자동 이스케이프
- **CSRF 보호**: FastAPI CSRF 미들웨어
- **환경 변수**: 민감한 정보는 환경 변수로 관리

### 19.3 API 보안

- **HTTPS**: 프로덕션 환경에서 필수
- **CORS 설정**: 허용된 도메인만 접근
- **Rate Limiting**: API 요청 제한 (선택)
- **입력 검증**: Pydantic 스키마 기반 검증

---

## 20. 성능 최적화

### 20.1 백엔드 최적화

- **비동기 처리**: FastAPI async/await 활용
- **데이터베이스 인덱싱**: 자주 조회되는 필드 인덱스
- **쿼리 최적화**: N+1 쿼리 문제 방지
- **캐싱**: Redis 통합 (선택)

### 20.2 프론트엔드 최적화

- **코드 스플리팅**: React.lazy 사용
- **이미지 최적화**: WebP 형식, lazy loading
- **번들 최적화**: Vite 빌드 최적화
- **API 요청 최적화**: 불필요한 요청 최소화

---

## 21. 모니터링 및 로깅

### 21.1 로깅

- **FastAPI 로깅**: Python logging 모듈
- **구조화된 로그**: JSON 형식 로그
- **로그 레벨**: DEBUG, INFO, WARNING, ERROR

### 21.2 모니터링 (선택)

- **Render Metrics**: Render 대시보드 메트릭
- **에러 추적**: Sentry 통합 (선택)
- **성능 모니터링**: APM 도구 (선택)

---

## 22. 요약

OlderBean은 **"빠르고 반복 가능한 커피 주문 경험"**을 제공하는 것을 목표로 하는 웹 서비스로, **Python FastAPI + React + Render** 스택을 기반으로 최소 기능에 집중한 MVP 설계를 통해 실제 서비스 확장이 가능한 구조를 지향한다.

### 핵심 기술 스택 요약

- ✅ **백엔드**: FastAPI (비동기 고성능 Python 프레임워크)
- ✅ **프론트엔드**: React (컴포넌트 기반 UI)
- ✅ **데이터베이스**: PostgreSQL (안정적인 관계형 DB)
- ✅ **인증**: FastAPI Users + OAuth2 + JWT
- ✅ **테스트**: pytest (단위/통합 테스트)
- ✅ **문서화**: Swagger/ReDoc (자동 생성)
- ✅ **배포**: Render (통합 배포 플랫폼)

---

**문서 버전**: 1.0  
**최종 업데이트**: 2024  
**작성자**: Development Team

```


Python + FastAPI + React + Render 스택을 반영한 PRD 문서를 `docs/PRD_Up1.md`에 작성했습니다.



작업 완료. `docs/PRD_Up1.md` 파일을 생성했습니다.

## 주요 변경 사항

### 기술 스택 반영
- **프론트엔드**: React (TypeScript)
- **백엔드**: FastAPI (Python 3.9+)
- **데이터베이스**: PostgreSQL + SQLAlchemy ORM
- **인증**: FastAPI Users + OAuth2 + JWT
- **테스트**: pytest
- **문서화**: Swagger/ReDoc (FastAPI 자동 생성)
- **배포**: Render (통합 배포 플랫폼)

### 추가된 섹션
1. 기술 스택 상세 설명 (2.2)
2. FastAPI 기반 API 설계 (11)
3. 프로젝트 구조 (12) - FastAPI/React 구조
4. Render 배포 전략 (13)
5. pytest 테스트 전략 (14)
6. API 문서화 (Swagger/ReDoc) (15)
7. 보안 고려사항 (19)
8. 성능 최적화 (20)
9. 모니터링 및 로깅 (21)

### 특징
- Python/FastAPI 기반 백엔드 구조
- React 프론트엔드 구조
- Render 배포 가이드
- pytest 테스트 전략
- FastAPI 자동 문서화 활용

문서는 Python + FastAPI + React + Render 스택을 기준으로 작성되었습니다.

---

**User**

프런트엔드 UI 관련한 PRD를 작성하려고 합니다.

현재 앱에는 ‘사용자' 와 ‘관리자’ 이렇게 2개의 화면이 있습니다. 우선, ‘사용자' 화면의 와이어 프레임을 첨부할테니 ‘사용자' 화면에 대한 PRD를 작성해 Docs 폴더에 저장해 주세요. 그리고 작업한 결과를 Report 폴더에 마크다운 파일로 작성해주세요.

---

**Cursor**


와이어프레임을 분석해 사용자 화면 PRD를 작성합니다. 기존 PRD를 확인해 일관성을 유지합니다.



와이어프레임을 분석해 사용자 화면 PRD를 작성 중입니다.


```markdown
# OlderBean 사용자 화면 UI/UX PRD
## User Interface Product Requirements Document

## 1. 개요 (Overview)

본 문서는 **OlderBean** 커피 주문 서비스의 **사용자 화면(User Interface)**에 대한 상세한 UI/UX 요구사항을 정의합니다. 사용자가 메뉴를 조회하고, 옵션을 선택하여 주문을 완료할 수 있는 직관적이고 효율적인 인터페이스를 제공하는 것을 목표로 합니다.

### 목표

- **빠른 주문**: 15초 이내 주문 완료 가능한 직관적인 UI
- **명확한 정보 전달**: 메뉴 정보, 가격, 옵션이 한눈에 보이는 구조
- **편리한 장바구니**: 실시간 가격 계산 및 주문 관리
- **반응형 디자인**: 모바일 및 데스크톱 환경 모두 지원

---

## 2. 화면 구조 (Screen Structure)

### 2.1 전체 레이아웃

```
┌─────────────────────────────────────────┐
│           헤더 영역 (Header)              │
│  [COZY 로고]    [주문하기] [관리자]        │
├─────────────────────────────────────────┤
│                                         │
│         메뉴 표시 영역 (Menu Grid)        │
│  ┌─────┐  ┌─────┐  ┌─────┐              │
│  │카드1│  │카드2│  │카드3│              │
│  └─────┘  └─────┘  └─────┘              │
│                                         │
├─────────────────────────────────────────┤
│         장바구니 영역 (Shopping Cart)     │
│  ┌───────────────────────────────────┐  │
│  │ 장바구니                          │  │
│  │ - 메뉴1 (옵션) X 1   4,500원      │  │
│  │ - 메뉴2 X 2           8,000원      │  │
│  │ 총 금액: 12,500원                 │  │
│  │ [주문하기]                         │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

### 2.2 화면 구성 요소

1. **헤더 (Header)**
2. **메뉴 그리드 (Menu Grid)**
3. **장바구니 (Shopping Cart)**

---

## 3. 상세 컴포넌트 명세

### 3.1 헤더 영역 (Header)

#### 3.1.1 레이아웃

```
┌────────────────────────────────────────────┐
│  COZY    [주문하기]  [관리자]              │
└────────────────────────────────────────────┘
```

#### 3.1.2 구성 요소

| 요소 | 설명 | 스타일 |
|------|------|--------|
| **로고** | "COZY" 텍스트 또는 이미지 로고 | 왼쪽 정렬, 브랜드 색상 |
| **주문하기 버튼** | 주문 내역 페이지로 이동 | 오른쪽 정렬, 버튼 스타일 |
| **관리자 버튼** | 관리자 페이지로 이동 (권한 필요) | 오른쪽 정렬, 버튼 스타일 |

#### 3.1.3 기능 요구사항

- **로고 클릭**: 홈 화면으로 이동
- **주문하기 버튼**: 
  - 클릭 시 주문 내역 페이지로 이동
  - 로그인 상태 확인 필요
  - 비로그인 시 로그인 페이지로 리다이렉트
- **관리자 버튼**:
  - 관리자 권한이 있는 경우에만 표시
  - 클릭 시 관리자 대시보드로 이동

#### 3.1.4 디자인 요구사항

- **높이**: 60-80px
- **배경색**: 흰색 또는 브랜드 색상
- **테두리**: 하단에 얇은 구분선 (선택)
- **반응형**: 모바일에서는 햄버거 메뉴로 변경 가능

---

### 3.2 메뉴 표시 영역 (Menu Grid)

#### 3.2.1 레이아웃

```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│  메뉴 카드 1  │  │  메뉴 카드 2  │  │  메뉴 카드 3  │
│             │  │             │  │             │
│  [이미지]    │  │  [이미지]    │  │  [이미지]    │
│  메뉴명      │  │  메뉴명      │  │  메뉴명      │
│  가격        │  │  가격        │  │  가격        │
│  설명        │  │  설명        │  │  설명        │
│  [옵션]      │  │  [옵션]      │  │  [옵션]      │
│  [담기]      │  │  [담기]      │  │  [담기]      │
└─────────────┘  └─────────────┘  └─────────────┘
```

#### 3.2.2 메뉴 카드 구성 요소

| 요소 | 설명 | 필수 여부 |
|------|------|----------|
| **메뉴 이미지** | 커피 메뉴 사진 | 선택 (플레이스홀더 제공) |
| **메뉴명** | 메뉴 이름 (예: "아메리카노(ICE)") | 필수 |
| **가격** | 기본 가격 (예: "4,000원") | 필수 |
| **설명** | 메뉴에 대한 간단한 설명 | 선택 |
| **옵션 체크박스** | 추가 옵션 선택 (샷 추가, 시럽 추가 등) | 선택 |
| **담기 버튼** | 장바구니에 추가 | 필수 |

#### 3.2.3 메뉴 카드 상세 명세

##### 3.2.3.1 메뉴 이미지
- **크기**: 카드 너비에 맞춤, 비율 유지 (16:9 또는 1:1)
- **플레이스홀더**: 이미지가 없는 경우 기본 이미지 표시
- **로딩**: 이미지 로딩 중 스켈레톤 UI 표시
- **에러 처리**: 이미지 로드 실패 시 플레이스홀더 표시

##### 3.2.3.2 메뉴명
- **표시 형식**: 메뉴명 (온도/타입)
  - 예: "아메리카노(ICE)", "아메리카노(HOT)", "카페라떼"
- **스타일**: 굵은 글씨, 카드 상단에 위치
- **길이 제한**: 긴 메뉴명은 말줄임표 처리

##### 3.2.3.3 가격
- **표시 형식**: 숫자 + "원" (예: "4,000원")
- **천 단위 구분**: 콤마로 구분
- **스타일**: 강조 색상, 메뉴명 아래 위치
- **실시간 업데이트**: 옵션 선택 시 가격 자동 업데이트

##### 3.2.3.4 설명
- **내용**: 메뉴에 대한 간단한 설명
- **길이 제한**: 1-2줄, 초과 시 말줄임표 처리
- **스타일**: 작은 글씨, 회색 계열
- **선택 사항**: 설명이 없는 경우 표시하지 않음

##### 3.2.3.5 옵션 체크박스
- **옵션 종류**:
  - 샷 추가 (+500원)
  - 시럽 추가 (+0원 또는 +가격)
  - 기타 커스터마이징 옵션
- **표시 형식**: 체크박스 + 옵션명 + 추가 가격
- **동작**:
  - 체크 시: 옵션 선택, 가격에 추가
  - 체크 해제 시: 옵션 제거, 가격에서 차감
- **가격 업데이트**: 옵션 선택/해제 시 카드 내 가격 실시간 업데이트

##### 3.2.3.6 담기 버튼
- **위치**: 카드 하단
- **스타일**: 주요 액션 버튼 (브랜드 색상)
- **동작**:
  - 클릭 시: 선택된 옵션과 함께 장바구니에 추가
  - 성공 피드백: 토스트 메시지 또는 버튼 애니메이션
  - 장바구니 아이콘 업데이트: 장바구니 아이템 수 표시

#### 3.2.4 그리드 레이아웃

- **데스크톱**: 3열 그리드 (최대 3개 카드 가로 배치)
- **태블릿**: 2열 그리드
- **모바일**: 1열 그리드 (세로 스크롤)
- **간격**: 카드 간 적절한 여백 (16-24px)
- **스크롤**: 메뉴가 많을 경우 세로 스크롤

#### 3.2.5 기능 요구사항

- **메뉴 목록 조회**: 
  - 페이지 로드 시 자동으로 메뉴 목록 API 호출
  - 로딩 상태 표시 (스켈레톤 UI)
  - 에러 처리 (에러 메시지 표시)
- **옵션 선택**:
  - 체크박스로 옵션 선택/해제
  - 선택된 옵션은 시각적으로 강조
  - 가격 실시간 계산 및 표시
- **장바구니 추가**:
  - "담기" 버튼 클릭 시 장바구니에 추가
  - 중복 메뉴 추가 시 수량 증가 또는 별도 항목으로 추가 (설정 가능)
  - 성공 피드백 제공

---

### 3.3 장바구니 영역 (Shopping Cart)

#### 3.3.1 레이아웃

```
┌──────────────────────────────────────┐
│ 장바구니                              │
├──────────────────────────────────────┤
│ • 아메리카노(ICE) (샷 추가) X 1       │
│   4,500원                            │
│                                      │
│ • 아메리카노(HOT) X 2                 │
│   8,000원                            │
├──────────────────────────────────────┤
│ 총 금액: 12,500원                    │
│                                      │
│        [주문하기]                     │
└──────────────────────────────────────┘
```

#### 3.3.2 구성 요소

| 요소 | 설명 | 필수 여부 |
|------|------|----------|
| **장바구니 헤더** | "장바구니" 제목 | 필수 |
| **주문 항목 목록** | 장바구니에 담긴 메뉴 목록 | 필수 |
| **총 금액** | 모든 항목의 합계 가격 | 필수 |
| **주문하기 버튼** | 주문 완료 버튼 | 필수 |

#### 3.3.3 상세 명세

##### 3.3.3.1 장바구니 헤더
- **텍스트**: "장바구니"
- **스타일**: 굵은 글씨, 영역 상단에 위치
- **아이콘**: 장바구니 아이콘 추가 가능 (선택)

##### 3.3.3.2 주문 항목 목록

각 주문 항목은 다음 정보를 포함:

- **메뉴명**: 선택한 메뉴 이름
- **옵션 표시**: 선택한 옵션이 있는 경우 괄호 안에 표시
  - 예: "아메리카노(ICE) (샷 추가)"
- **수량**: X 1, X 2 등
- **가격**: 해당 항목의 총 가격 (단가 × 수량 + 옵션 가격)

**항목 표시 형식**:
```
• 아메리카노(ICE) (샷 추가) X 1
  4,500원
```

**추가 기능** (선택 사항):
- **수량 조절**: +/- 버튼으로 수량 증가/감소
- **삭제 버튼**: 항목 제거 버튼
- **빈 장바구니**: 장바구니가 비어있을 때 안내 메시지 표시

##### 3.3.3.3 총 금액
- **표시 형식**: "총 금액: 12,500원"
- **스타일**: 굵은 글씨, 강조 색상
- **위치**: 항목 목록 하단, 주문하기 버튼 위
- **실시간 업데이트**: 항목 추가/삭제/수량 변경 시 자동 계산

##### 3.3.3.4 주문하기 버튼
- **위치**: 장바구니 영역 하단 중앙
- **스타일**: 주요 액션 버튼 (큰 크기, 브랜드 색상)
- **비활성화 조건**: 
  - 장바구니가 비어있을 때 비활성화
  - 로그인하지 않은 경우 비활성화 또는 로그인 페이지로 이동
- **동작**:
  - 클릭 시: 주문 확인 페이지로 이동 또는 주문 API 호출
  - 성공 시: 주문 완료 페이지로 이동
  - 실패 시: 에러 메시지 표시

#### 3.3.4 디자인 요구사항

- **위치**: 화면 하단 고정 또는 스크롤 가능한 사이드바
- **배경색**: 밝은 회색 또는 흰색
- **테두리**: 둥근 모서리, 그림자 효과 (선택)
- **반응형**: 
  - 데스크톱: 화면 하단 또는 오른쪽 사이드바
  - 모바일: 하단 고정 또는 모달 형태

---

## 4. 사용자 플로우 (User Flow)

### 4.1 주문 프로세스

```
1. [홈 화면 진입]
   ↓
2. [메뉴 목록 조회]
   ↓
3. [메뉴 선택]
   ↓
4. [옵션 선택 (선택 사항)]
   ↓
5. [담기 버튼 클릭]
   ↓
6. [장바구니에 추가 확인]
   ↓
7. [추가 메뉴 선택 또는 주문하기]
   ↓
8. [주문하기 버튼 클릭]
   ↓
9. [로그인 확인]
   ↓ (로그인 필요 시)
10. [주문 확인 페이지]
   ↓
11. [주문 완료]
```

### 4.2 상세 시나리오

#### 시나리오 1: 첫 주문
1. 사용자가 홈 화면에 접속
2. 메뉴 목록이 자동으로 로드됨
3. 원하는 메뉴 카드에서 옵션 선택 (선택 사항)
4. "담기" 버튼 클릭
5. 장바구니에 항목 추가 확인 (토스트 메시지)
6. 장바구니에서 총 금액 확인
7. "주문하기" 버튼 클릭
8. 로그인 페이지로 이동 (비로그인 시)
9. 로그인 후 주문 확인 페이지로 이동
10. 주문 완료

#### 시나리오 2: 여러 메뉴 주문
1. 첫 번째 메뉴를 장바구니에 추가
2. 두 번째 메뉴를 장바구니에 추가
3. 장바구니에서 각 항목 확인
4. 총 금액 확인
5. "주문하기" 버튼 클릭
6. 주문 완료

---

## 5. 상태 관리 (State Management)

### 5.1 주요 상태

| 상태 | 설명 | 저장 위치 |
|------|------|----------|
| **메뉴 목록** | 전체 메뉴 데이터 | React State / Context |
| **장바구니** | 선택한 메뉴 및 옵션 | React State / Context / LocalStorage |
| **사용자 정보** | 로그인한 사용자 정보 | Context / LocalStorage |
| **선택된 옵션** | 각 메뉴 카드에서 선택한 옵션 | 컴포넌트 State |

### 5.2 장바구니 데이터 구조

```typescript
interface CartItem {
  id: string;              // 고유 ID
  menuId: string;          // 메뉴 ID
  menuName: string;        // 메뉴명
  basePrice: number;       // 기본 가격
  options: string[];       // 선택한 옵션 목록
  optionPrices: number[];  // 각 옵션의 추가 가격
  quantity: number;        // 수량
  totalPrice: number;      // 총 가격 (단가 + 옵션 가격) × 수량
}

interface Cart {
  items: CartItem[];
  totalAmount: number;     // 전체 총액
}
```

---

## 6. 인터랙션 디자인 (Interaction Design)

### 6.1 버튼 인터랙션

#### 담기 버튼
- **기본 상태**: 브랜드 색상, 호버 시 약간 어두워짐
- **클릭 시**: 
  - 버튼 애니메이션 (약간 확대 후 원래 크기)
  - 성공 토스트 메시지 표시
  - 장바구니 아이콘 업데이트 (아이템 수 증가)

#### 주문하기 버튼
- **활성 상태**: 브랜드 색상, 클릭 가능
- **비활성 상태**: 회색, 클릭 불가
- **로딩 상태**: 클릭 시 로딩 스피너 표시
- **성공 시**: 주문 완료 페이지로 이동

### 6.2 옵션 선택 인터랙션

- **체크박스 클릭**: 
  - 즉시 체크/언체크
  - 가격 실시간 업데이트
  - 선택된 옵션은 시각적으로 강조

### 6.3 피드백

- **성공 피드백**: 
  - 토스트 메시지 (2-3초 표시)
  - 버튼 애니메이션
- **에러 피드백**: 
  - 에러 메시지 표시
  - 필수 필드 하이라이트
- **로딩 피드백**: 
  - 스켈레톤 UI
  - 로딩 스피너

---

## 7. 반응형 디자인 (Responsive Design)

### 7.1 브레이크포인트

| 디바이스 | 너비 | 레이아웃 |
|---------|------|---------|
| 모바일 | < 768px | 1열 그리드, 하단 장바구니 |
| 태블릿 | 768px - 1024px | 2열 그리드, 하단 또는 사이드 장바구니 |
| 데스크톱 | > 1024px | 3열 그리드, 하단 또는 사이드 장바구니 |

### 7.2 모바일 최적화

- **터치 친화적**: 버튼 크기 최소 44px × 44px
- **스와이프 제스처**: 메뉴 카드 스와이프 (선택)
- **하단 고정**: 장바구니를 하단에 고정하여 항상 접근 가능
- **간소화된 UI**: 불필요한 요소 제거

---

## 8. 접근성 (Accessibility)

### 8.1 WCAG 준수

- **키보드 네비게이션**: 모든 인터랙티브 요소에 키보드 접근 가능
- **스크린 리더 지원**: 적절한 ARIA 레이블 및 역할
- **색상 대비**: 최소 4.5:1 대비율 유지
- **포커스 표시**: 명확한 포커스 인디케이터

### 8.2 구현 사항

- **시맨틱 HTML**: 적절한 HTML 태그 사용
- **ARIA 레이블**: 버튼, 체크박스에 설명 추가
- **키보드 단축키**: Tab, Enter, Space 키 지원

---

## 9. 성능 요구사항 (Performance Requirements)

### 9.1 로딩 시간

- **초기 로딩**: 2초 이내
- **메뉴 목록 로딩**: 1초 이내
- **이미지 로딩**: Lazy loading 적용

### 9.2 최적화

- **코드 스플리팅**: React.lazy 사용
- **이미지 최적화**: WebP 형식, 적절한 크기
- **캐싱**: 메뉴 데이터 캐싱
- **번들 크기**: 최소화

---

## 10. 에러 처리 (Error Handling)

### 10.1 에러 시나리오

| 에러 상황 | 처리 방법 |
|----------|---------|
| 메뉴 목록 로드 실패 | 에러 메시지 표시, 재시도 버튼 |
| 장바구니 추가 실패 | 에러 토스트 메시지 |
| 주문 실패 | 에러 메시지, 주문 재시도 가능 |
| 네트워크 오류 | 오프라인 메시지, 재연결 안내 |

### 10.2 사용자 피드백

- **명확한 에러 메시지**: 사용자가 이해할 수 있는 메시지
- **해결 방법 제시**: 재시도 버튼 또는 안내
- **시각적 표시**: 에러 아이콘 또는 색상

---

## 11. 테스트 요구사항 (Testing Requirements)

### 11.1 UI 테스트

- **컴포넌트 테스트**: 각 컴포넌트의 렌더링 및 동작 확인
- **통합 테스트**: 사용자 플로우 테스트
- **시각적 회귀 테스트**: 스타일 변경 감지

### 11.2 사용성 테스트

- **사용자 테스트**: 실제 사용자 대상 테스트
- **A/B 테스트**: 디자인 변형 테스트 (선택)

---

## 12. 구현 우선순위 (Implementation Priority)

### Phase 1 (MVP)
- ✅ 헤더 영역
- ✅ 메뉴 카드 기본 구조
- ✅ 장바구니 기본 기능
- ✅ 주문하기 버튼

### Phase 2 (향상)
- 옵션 선택 기능
- 수량 조절 기능
- 장바구니 항목 삭제
- 로딩 상태 개선

### Phase 3 (최적화)
- 애니메이션 추가
- 접근성 개선
- 성능 최적화
- 고급 피드백

---

## 13. 디자인 가이드라인 (Design Guidelines)

### 13.1 색상

- **브랜드 색상**: COZY 브랜드 색상 (와이어프레임 기준: 다크 그린)
- **주요 액션**: 브랜드 색상
- **텍스트**: 
  - 제목: 다크 그레이 (#333333)
  - 본문: 중간 그레이 (#666666)
  - 보조 텍스트: 밝은 그레이 (#999999)

### 13.2 타이포그래피

- **제목**: 굵은 글씨, 큰 크기
- **본문**: 일반 글씨, 중간 크기
- **가격**: 굵은 글씨, 강조 색상

### 13.3 간격

- **카드 간격**: 16-24px
- **내부 여백**: 16px
- **섹션 간격**: 32-48px

---

## 14. API 연동 (API Integration)

### 14.1 필요한 API 엔드포인트

| API | 메서드 | 설명 |
|-----|--------|------|
| `/api/menus` | GET | 메뉴 목록 조회 |
| `/api/menus/{id}` | GET | 메뉴 상세 조회 |
| `/api/orders` | POST | 주문 생성 |
| `/api/auth/login` | POST | 로그인 (주문 시 필요) |

### 14.2 데이터 형식

#### 메뉴 목록 응답
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "아메리카노(ICE)",
      "price": 4000,
      "description": "간단한 설명...",
      "image_url": "https://...",
      "options": [
        {
          "id": "shot",
          "name": "샷 추가",
          "price": 500
        }
      ]
    }
  ]
}
```

---

## 15. 향후 개선 사항 (Future Enhancements)

- **즐겨찾기 메뉴**: 자주 주문하는 메뉴 저장
- **주문 이력**: 과거 주문 내역에서 빠른 재주문
- **검색 기능**: 메뉴명으로 검색
- **필터링**: 카테고리별 필터 (ICE/HOT, 가격대 등)
- **추천 메뉴**: 인기 메뉴 또는 개인화 추천

---

**문서 버전**: 1.0  
**최종 업데이트**: 2024  
**작성자**: Development Team

```


작업 결과를 Reports 폴더에 마크다운 파일로 작성 중입니다.


```markdown
# 사용자 화면 UI/UX PRD 작성 보고서

## 📋 작업 개요

**작업 일자**: 2024  
**작업 내용**: OlderBean 사용자 화면 UI/UX PRD 문서 작성  
**작성 파일**: `docs/PRD_User_UI.md`

---

## 🎯 작업 목표

와이어프레임을 기반으로 사용자 화면에 대한 상세한 UI/UX 요구사항 문서를 작성하여, 개발팀이 일관된 사용자 인터페이스를 구현할 수 있도록 가이드를 제공합니다.

---

## 📐 와이어프레임 분석

### 분석된 화면 구성

와이어프레임을 분석한 결과, 사용자 화면은 다음과 같이 구성되어 있습니다:

#### 1. 헤더 영역
- **로고**: "COZY" 브랜드명
- **주문하기 버튼**: 주문 내역 페이지로 이동
- **관리자 버튼**: 관리자 페이지로 이동

#### 2. 메뉴 표시 영역
- **레이아웃**: 3열 그리드 (데스크톱 기준)
- **메뉴 카드 구성**:
  - 메뉴 이미지 (플레이스홀더)
  - 메뉴명 (예: "아메리카노(ICE)")
  - 가격 (예: "4,000원")
  - 설명 (예: "간단한 설명...")
  - 옵션 체크박스:
    - 샷 추가 (+500원)
    - 시럽 추가 (+0원)
  - "담기" 버튼

#### 3. 장바구니 영역
- **헤더**: "장바구니"
- **주문 항목 목록**:
  - 메뉴명 + 옵션 + 수량 + 가격
  - 예: "아메리카노(ICE) (샷 추가) X 1" - 4,500원
- **총 금액**: "총 금액: 12,500원"
- **주문하기 버튼**: 주문 완료 버튼

---

## 📝 작성된 PRD 내용

### 주요 섹션

1. **개요 (Overview)**
   - 문서 목적 및 목표 정의
   - 빠른 주문, 명확한 정보 전달, 편리한 장바구니, 반응형 디자인 목표

2. **화면 구조 (Screen Structure)**
   - 전체 레이아웃 다이어그램
   - 화면 구성 요소 설명

3. **상세 컴포넌트 명세**
   - **헤더 영역**: 레이아웃, 구성 요소, 기능 요구사항, 디자인 요구사항
   - **메뉴 표시 영역**: 
     - 메뉴 카드 상세 명세 (이미지, 메뉴명, 가격, 설명, 옵션, 담기 버튼)
     - 그리드 레이아웃 (반응형)
     - 기능 요구사항
   - **장바구니 영역**:
     - 주문 항목 목록 구조
     - 총 금액 계산
     - 주문하기 버튼 동작

4. **사용자 플로우 (User Flow)**
   - 주문 프로세스 플로우차트
   - 상세 시나리오 (첫 주문, 여러 메뉴 주문)

5. **상태 관리 (State Management)**
   - 주요 상태 정의
   - 장바구니 데이터 구조 (TypeScript 인터페이스)

6. **인터랙션 디자인 (Interaction Design)**
   - 버튼 인터랙션 (담기, 주문하기)
   - 옵션 선택 인터랙션
   - 피드백 메커니즘

7. **반응형 디자인 (Responsive Design)**
   - 브레이크포인트 정의 (모바일, 태블릿, 데스크톱)
   - 모바일 최적화 전략

8. **접근성 (Accessibility)**
   - WCAG 준수 사항
   - 구현 사항 (시맨틱 HTML, ARIA 레이블)

9. **성능 요구사항 (Performance Requirements)**
   - 로딩 시간 목표
   - 최적화 전략

10. **에러 처리 (Error Handling)**
    - 에러 시나리오 및 처리 방법
    - 사용자 피드백

11. **테스트 요구사항 (Testing Requirements)**
    - UI 테스트
    - 사용성 테스트

12. **구현 우선순위 (Implementation Priority)**
    - Phase 1 (MVP)
    - Phase 2 (향상)
    - Phase 3 (최적화)

13. **디자인 가이드라인 (Design Guidelines)**
    - 색상 팔레트
    - 타이포그래피
    - 간격 규칙

14. **API 연동 (API Integration)**
    - 필요한 API 엔드포인트
    - 데이터 형식 예시

15. **향후 개선 사항 (Future Enhancements)**
    - 즐겨찾기, 주문 이력, 검색, 필터링, 추천 메뉴

---

## ✅ 작성 완료 항목

### 문서 구조
- [x] 개요 및 목표 정의
- [x] 화면 구조 다이어그램
- [x] 컴포넌트 상세 명세
- [x] 사용자 플로우 정의
- [x] 상태 관리 구조
- [x] 인터랙션 디자인
- [x] 반응형 디자인 가이드
- [x] 접근성 요구사항
- [x] 성능 요구사항
- [x] 에러 처리 전략
- [x] 테스트 요구사항
- [x] 구현 우선순위
- [x] 디자인 가이드라인
- [x] API 연동 명세
- [x] 향후 개선 사항

### 상세 명세
- [x] 헤더 영역 상세 명세
- [x] 메뉴 카드 각 요소별 상세 명세
- [x] 장바구니 영역 상세 명세
- [x] 데이터 구조 정의 (TypeScript 인터페이스)
- [x] 사용자 시나리오 작성
- [x] 반응형 브레이크포인트 정의
- [x] API 데이터 형식 예시

---

## 📊 문서 통계

| 항목 | 수량 |
|------|------|
| **총 섹션 수** | 15개 |
| **주요 컴포넌트** | 3개 (헤더, 메뉴 그리드, 장바구니) |
| **사용자 플로우** | 2개 시나리오 |
| **데이터 구조** | 2개 인터페이스 (CartItem, Cart) |
| **API 엔드포인트** | 4개 |
| **반응형 브레이크포인트** | 3개 (모바일, 태블릿, 데스크톱) |
| **구현 단계** | 3단계 (Phase 1-3) |

---

## 🎨 주요 특징

### 1. 상세한 컴포넌트 명세
- 각 UI 요소에 대한 상세한 설명
- 레이아웃 다이어그램 포함
- 스타일 및 디자인 요구사항 명시

### 2. 사용자 중심 설계
- 명확한 사용자 플로우 정의
- 실제 사용 시나리오 포함
- 피드백 메커니즘 명시

### 3. 개발자 친화적
- TypeScript 인터페이스 제공
- API 연동 명세 포함
- 상태 관리 구조 정의

### 4. 반응형 및 접근성
- 다양한 디바이스 지원
- WCAG 준수 사항 포함
- 모바일 최적화 전략

### 5. 실용적 우선순위
- MVP 기능 우선 정의
- 단계별 구현 계획
- 향후 개선 사항 제시

---

## 🔄 다음 단계

### 즉시 진행 가능
1. **관리자 화면 PRD 작성**: 사용자 화면과 일관성 유지
2. **디자인 시스템 구축**: 색상, 타이포그래피, 컴포넌트 라이브러리
3. **프로토타입 제작**: Figma 또는 유사 도구로 인터랙티브 프로토타입

### 개발 준비
1. **컴포넌트 구조 설계**: React 컴포넌트 계층 구조
2. **상태 관리 설계**: Context API 또는 상태 관리 라이브러리 선택
3. **API 연동 준비**: 백엔드 API 스펙 확인 및 연동 계획

### 테스트 준비
1. **테스트 시나리오 작성**: 사용자 플로우 기반 테스트 케이스
2. **접근성 테스트 계획**: WCAG 준수 확인 계획
3. **성능 테스트 계획**: 로딩 시간 및 최적화 확인

---

## 📁 파일 정보

### 생성된 파일
- **경로**: `docs/PRD_User_UI.md`
- **형식**: Markdown
- **크기**: 약 600+ 줄
- **언어**: 한국어

### 관련 파일
- `docs/PRD_Up1.md`: 전체 프로젝트 PRD (Python + FastAPI + React + Render)
- `docs/PRD.md`: 기존 PRD 문서

---

## ✨ 주요 성과

1. **완전한 UI/UX 명세서 작성**: 와이어프레임을 기반으로 상세한 요구사항 문서화
2. **개발 가이드 제공**: 개발팀이 바로 구현할 수 있는 상세한 가이드
3. **일관성 확보**: 전체 프로젝트 PRD와 일관된 구조 및 스타일
4. **확장 가능한 구조**: 향후 기능 추가를 고려한 구조

---

## 📝 참고 사항

### 와이어프레임 기반 분석
- 실제 와이어프레임의 모든 요소를 분석하여 PRD에 반영
- 시각적 요소뿐만 아니라 인터랙션까지 상세히 명세

### 기존 PRD와의 연계
- `PRD_Up1.md`의 기술 스택 (React, FastAPI)과 일관성 유지
- API 연동 부분은 백엔드 API 스펙과 연계 가능

### 확장성 고려
- 향후 기능 추가를 위한 구조적 여유 확보
- 모듈화된 컴포넌트 구조 제안

---

**작업 완료 일자**: 2024  
**작성자**: Development Team  
**문서 버전**: 1.0

---

## 📌 체크리스트

### 문서 품질 확인
- [x] 모든 섹션이 완성되었는가?
- [x] 와이어프레임의 모든 요소가 반영되었는가?
- [x] 개발자가 이해하기 쉬운가?
- [x] 디자이너가 참고하기 적합한가?
- [x] 일관된 스타일과 형식을 유지하는가?

### 기술적 정확성
- [x] 데이터 구조가 명확한가?
- [x] API 연동 명세가 정확한가?
- [x] 상태 관리 구조가 적절한가?
- [x] 반응형 디자인이 실현 가능한가?

### 사용자 경험
- [x] 사용자 플로우가 명확한가?
- [x] 인터랙션이 자연스러운가?
- [x] 피드백 메커니즘이 적절한가?
- [x] 에러 처리가 충분한가?

---

**보고서 작성 완료** ✅

```


작업 완료. 사용자 화면 UI/UX PRD를 작성하고 작업 결과 보고서를 생성했습니다.

## 생성된 파일

### 1. PRD 문서
- **경로**: `docs/PRD_User_UI.md`
- **내용**: 사용자 화면에 대한 UI/UX 요구사항 문서

### 2. 작업 보고서
- **경로**: `reports/PRD_User_UI_Report.md`
- **내용**: 작업 내용 및 결과 요약

## 주요 작성 내용

### PRD 문서 구성 (15개 섹션)

1. 개요 및 목표
2. 화면 구조: 헤더, 메뉴 그리드, 장바구니
3. 상세 컴포넌트 명세
   - 헤더: 로고, 주문하기, 관리자 버튼
   - 메뉴 카드: 이미지, 메뉴명, 가격, 설명, 옵션, 담기 버튼
   - 장바구니: 주문 항목 목록, 총 금액, 주문하기 버튼
4. 사용자 플로우: 주문 프로세스 및 시나리오
5. 상태 관리: TypeScript 인터페이스 포함
6. 인터랙션 디자인: 버튼, 옵션 선택, 피드백
7. 반응형 디자인: 모바일/태블릿/데스크톱 브레이크포인트
8. 접근성: WCAG 준수 사항
9. 성능 요구사항: 로딩 시간 및 최적화
10. 에러 처리: 에러 시나리오 및 대응
11. 테스트 요구사항: UI 테스트 및 사용성 테스트
12. 구현 우선순위: Phase 1-3 단계별 계획
13. 디자인 가이드라인: 색상, 타이포그래피, 간격
14. API 연동: 필요한 엔드포인트 및 데이터 형식
15. 향후 개선 사항: 즐겨찾기, 검색, 추천 등

## 와이어프레임 반영 사항

- 헤더: COZY 로고, 주문하기/관리자 버튼
- 메뉴 카드: 3열 그리드, 이미지/메뉴명/가격/설명/옵션/담기 버튼
- 장바구니: 주문 항목 목록, 총 금액, 주문하기 버튼
- 옵션: 샷 추가(+500원), 시럽 추가(+0원) 등

## 특징

- 개발자 가이드: TypeScript 인터페이스, API 명세 포함
- 디자이너 가이드: 색상, 타이포그래피, 간격 규칙 명시
- 사용자 중심: 명확한 플로우와 시나리오 제공
- 확장성: 향후 기능 추가를 고려한 구조

두 파일 모두 생성되었으며, 린터 오류는 없습니다.

---

**User**

다음, ‘관리자' 화면의 와이어 프레임을 첨부할테니 ‘관리자' 화면에 대한 PRD를 작성해 Docs 폴더에 저장해 주세요. 그리고 작업한 결과를 Report 폴더에 마크다운 파일로 작성해 주세요.

---

**Cursor**


관리자 화면 와이어프레임을 분석해 PRD를 작성하고, 작업 결과 보고서를 생성합니다.


```markdown
# OlderBean 관리자 화면 UI/UX PRD
## Admin Interface Product Requirements Document

## 1. 개요 (Overview)

본 문서는 **OlderBean** 커피 주문 서비스의 **관리자 화면(Admin Interface)**에 대한 상세한 UI/UX 요구사항을 정의합니다. 매장 관리자 또는 바리스타가 메뉴 재고를 관리하고, 주문 상태를 실시간으로 확인 및 업데이트할 수 있는 효율적인 인터페이스를 제공하는 것을 목표로 합니다.

### 목표

- **실시간 주문 관리**: 주문 현황을 한눈에 파악하고 빠르게 처리
- **재고 관리**: 메뉴별 재고 수량을 쉽게 조절
- **대시보드**: 주요 통계를 한 화면에서 확인
- **빠른 작업 처리**: 최소 클릭으로 주문 상태 변경

---

## 2. 화면 구조 (Screen Structure)

### 2.1 전체 레이아웃

```
┌─────────────────────────────────────────┐
│           헤더 영역 (Header)              │
│  [COZY 로고]    [주문하기] [관리자] ✓     │
├─────────────────────────────────────────┤
│                                         │
│      관리자 대시보드 (Admin Dashboard)    │
│  ┌───────────────────────────────────┐  │
│  │ 총 주문: 1  접수: 1  제조중: 0   │  │
│  │ 제조 완료: 0                     │  │
│  └───────────────────────────────────┘  │
│                                         │
│      재고 현황 (Inventory Status)         │
│  ┌─────┐  ┌─────┐  ┌─────┐            │
│  │메뉴1│  │메뉴2│  │메뉴3│            │
│  │10개 │  │10개 │  │10개 │            │
│  │[-][+]│  │[-][+]│  │[-][+]│            │
│  └─────┘  └─────┘  └─────┘            │
│                                         │
│      주문 현황 (Order Status)            │
│  ┌───────────────────────────────────┐  │
│  │ 7월 31일 13:00                    │  │
│  │ 아메리카노(ICE) x 1                │  │
│  │ 4,000원                           │  │
│  │ [주문 접수]                        │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

### 2.2 화면 구성 요소

1. **헤더 (Header)**
2. **관리자 대시보드 (Admin Dashboard)**
3. **재고 현황 (Inventory Status)**
4. **주문 현황 (Order Status)**

---

## 3. 상세 컴포넌트 명세

### 3.1 헤더 영역 (Header)

#### 3.1.1 레이아웃

```
┌────────────────────────────────────────────┐
│  COZY    [주문하기]  [관리자] ✓             │
└────────────────────────────────────────────┘
```

#### 3.1.2 구성 요소

| 요소 | 설명 | 스타일 |
|------|------|--------|
| **로고** | "COZY" 텍스트 또는 이미지 로고 | 왼쪽 정렬, 브랜드 색상 |
| **주문하기 버튼** | 사용자 주문 화면으로 이동 | 오른쪽 정렬, 버튼 스타일 |
| **관리자 버튼** | 관리자 화면 (현재 활성화 상태) | 오른쪽 정렬, 활성화 표시 (✓ 또는 하이라이트) |

#### 3.1.3 기능 요구사항

- **로고 클릭**: 홈 화면으로 이동
- **주문하기 버튼**: 
  - 클릭 시 사용자 주문 화면으로 이동
  - 관리자 권한 유지 (세션 유지)
- **관리자 버튼**:
  - 현재 관리자 화면에 있음을 시각적으로 표시
  - 클릭 시 관리자 대시보드로 이동 (현재 페이지 새로고침)

#### 3.1.4 디자인 요구사항

- **높이**: 60-80px
- **배경색**: 흰색 또는 브랜드 색상
- **활성화 표시**: 관리자 버튼에 체크 표시(✓) 또는 배경색 변경
- **반응형**: 모바일에서는 햄버거 메뉴로 변경 가능

---

### 3.2 관리자 대시보드 (Admin Dashboard)

#### 3.2.1 레이아웃

```
┌──────────────────────────────────────────┐
│ 관리자 대시보드                           │
├──────────────────────────────────────────┤
│ 총 주문: 1    주문 접수: 1    제조 중: 0  │
│ 제조 완료: 0                             │
└──────────────────────────────────────────┘
```

#### 3.2.2 구성 요소

| 요소 | 설명 | 필수 여부 |
|------|------|----------|
| **섹션 제목** | "관리자 대시보드" | 필수 |
| **총 주문 수** | 전체 주문 건수 | 필수 |
| **주문 접수** | 접수 상태인 주문 수 | 필수 |
| **제조 중** | 제조 중인 주문 수 | 필수 |
| **제조 완료** | 완료된 주문 수 | 필수 |

#### 3.2.3 상세 명세

##### 3.2.3.1 통계 카드

각 통계는 카드 형태로 표시되며 다음 정보를 포함:

- **라벨**: 통계 항목명 (예: "총 주문", "주문 접수")
- **값**: 숫자 (예: "1", "0")
- **아이콘**: 시각적 구분을 위한 아이콘 (선택)

**표시 형식**:
```
┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐
│ 총 주문  │  │ 주문 접수 │  │ 제조 중  │  │ 제조 완료 │
│    1    │  │    1    │  │    0    │  │    0    │
└─────────┘  └─────────┘  └─────────┘  └─────────┘
```

##### 3.2.3.2 실시간 업데이트

- **자동 새로고침**: 주문 상태 변경 시 자동으로 통계 업데이트
- **업데이트 주기**: 5-10초 간격 (설정 가능)
- **시각적 피드백**: 값이 변경될 때 애니메이션 효과 (선택)

#### 3.2.4 디자인 요구사항

- **레이아웃**: 4개 카드를 가로로 배치 (반응형: 모바일에서는 2x2 그리드)
- **카드 스타일**: 
  - 배경색: 흰색 또는 밝은 회색
  - 테두리: 얇은 테두리 또는 그림자
  - 둥근 모서리
- **색상 구분**: 각 통계별로 색상 구분 가능 (선택)
  - 총 주문: 기본 색상
  - 주문 접수: 파란색
  - 제조 중: 주황색
  - 제조 완료: 초록색

---

### 3.3 재고 현황 (Inventory Status)

#### 3.3.1 레이아웃

```
┌──────────────────────────────────────────┐
│ 재고 현황                                 │
├──────────────────────────────────────────┤
│ ┌─────────┐  ┌─────────┐  ┌─────────┐  │
│ │아메리카노│  │아메리카노│  │카페라떼  │  │
│ │  (ICE) │  │  (HOT)  │  │         │  │
│ │  10개  │  │  10개   │  │  10개   │  │
│ │ [-][+] │  │ [-][+]  │  │ [-][+]  │  │
│ └─────────┘  └─────────┘  └─────────┘  │
└──────────────────────────────────────────┘
```

#### 3.3.2 구성 요소

| 요소 | 설명 | 필수 여부 |
|------|------|----------|
| **섹션 제목** | "재고 현황" | 필수 |
| **메뉴 카드** | 각 메뉴별 재고 정보 | 필수 |
| **메뉴명** | 메뉴 이름 | 필수 |
| **재고 수량** | 현재 재고 수량 | 필수 |
| **수량 조절 버튼** | +/- 버튼 | 필수 |

#### 3.3.3 메뉴 카드 상세 명세

##### 3.3.3.1 메뉴 카드 구성

각 메뉴 카드는 다음 정보를 포함:

- **메뉴명**: 메뉴 이름 (예: "아메리카노 (ICE)")
- **재고 수량**: 현재 재고 수량 (예: "10개")
- **수량 조절 버튼**: 
  - 감소 버튼 (-)
  - 증가 버튼 (+)

##### 3.3.3.2 수량 조절 기능

- **감소 버튼 (-)**:
  - 클릭 시 재고 수량 1 감소
  - 최소값: 0 (음수 불가)
  - 즉시 저장 또는 일괄 저장 (설정 가능)
- **증가 버튼 (+)**:
  - 클릭 시 재고 수량 1 증가
  - 최대값: 제한 없음 (또는 설정 가능)
  - 즉시 저장 또는 일괄 저장 (설정 가능)

##### 3.3.3.3 재고 부족 알림 (선택)

- **재고 부족 기준**: 설정 가능 (예: 5개 이하)
- **시각적 표시**: 
  - 재고 부족 시 경고 색상 (주황색/빨간색)
  - 아이콘 표시 (선택)
- **알림**: 재고가 0이 되면 알림 표시

#### 3.3.4 그리드 레이아웃

- **데스크톱**: 3-4열 그리드
- **태블릿**: 2-3열 그리드
- **모바일**: 1-2열 그리드
- **간격**: 카드 간 적절한 여백 (16-24px)
- **스크롤**: 메뉴가 많을 경우 세로 스크롤

#### 3.3.5 기능 요구사항

- **재고 목록 조회**: 
  - 페이지 로드 시 자동으로 재고 목록 API 호출
  - 로딩 상태 표시
  - 에러 처리
- **수량 조절**:
  - +/- 버튼으로 수량 증가/감소
  - 변경 사항 즉시 반영 (UI 업데이트)
  - 서버에 저장 (즉시 또는 일괄)
- **저장 방식**:
  - **옵션 A**: 즉시 저장 (각 버튼 클릭 시 API 호출)
  - **옵션 B**: 일괄 저장 ("저장" 버튼으로 모든 변경사항 저장)

---

### 3.4 주문 현황 (Order Status)

#### 3.4.1 레이아웃

```
┌──────────────────────────────────────────┐
│ 주문 현황                                 │
├──────────────────────────────────────────┤
│ ┌────────────────────────────────────┐  │
│ │ 7월 31일 13:00                     │  │
│ │ 아메리카노(ICE) x 1                 │  │
│ │ 4,000원                            │  │
│ │ [주문 접수]                         │  │
│ └────────────────────────────────────┘  │
│                                         │
│ ┌────────────────────────────────────┐  │
│ │ (다른 주문들...)                   │  │
│ └────────────────────────────────────┘  │
└──────────────────────────────────────────┘
```

#### 3.4.2 구성 요소

| 요소 | 설명 | 필수 여부 |
|------|------|----------|
| **섹션 제목** | "주문 현황" | 필수 |
| **주문 카드** | 각 주문에 대한 정보 | 필수 |
| **주문 시간** | 주문 일시 | 필수 |
| **주문 항목** | 주문한 메뉴 및 수량 | 필수 |
| **주문 금액** | 주문 총액 | 필수 |
| **상태 버튼** | 주문 상태 변경 버튼 | 필수 |

#### 3.4.3 주문 카드 상세 명세

##### 3.4.3.1 주문 카드 구성

각 주문 카드는 다음 정보를 포함:

- **주문 시간**: 주문 일시 (예: "7월 31일 13:00")
- **주문 항목**: 
  - 메뉴명 및 옵션
  - 수량
  - 예: "아메리카노(ICE) x 1"
- **주문 금액**: 주문 총액 (예: "4,000원")
- **상태 버튼**: 주문 상태에 따른 액션 버튼

##### 3.4.3.2 주문 상태 및 버튼

주문 상태에 따라 다른 버튼이 표시됩니다:

| 주문 상태 | 표시 버튼 | 동작 |
|----------|----------|------|
| **접수 대기** | "주문 접수" | 접수 상태로 변경 |
| **접수** | "제조 시작" | 제조 중 상태로 변경 |
| **제조 중** | "제조 완료" | 완료 상태로 변경 |
| **완료** | "완료" (비활성) | 더 이상 액션 없음 |

**버튼 스타일**:
- **활성 버튼**: 주요 액션 색상 (브랜드 색상)
- **비활성 버튼**: 회색, 클릭 불가

##### 3.4.3.3 주문 정렬

- **기본 정렬**: 최신 주문이 상단에 표시
- **필터링**: 상태별 필터링 (선택)
  - 전체
  - 접수 대기
  - 접수
  - 제조 중
  - 완료

##### 3.4.3.4 주문 상세 정보 (확장 가능)

주문 카드 클릭 시 상세 정보 표시 (선택):
- 고객 정보
- 주문 옵션 상세
- 주문 메모
- 주문 이력

#### 3.4.5 디자인 요구사항

- **카드 스타일**: 
  - 배경색: 흰색
  - 테두리: 얇은 테두리 또는 그림자
  - 둥근 모서리
- **상태별 색상**: 주문 상태에 따른 색상 구분 (선택)
  - 접수 대기: 파란색
  - 접수: 주황색
  - 제조 중: 노란색
  - 완료: 초록색
- **스크롤**: 주문이 많을 경우 세로 스크롤

---

## 4. 사용자 플로우 (User Flow)

### 4.1 관리자 작업 프로세스

```
1. [관리자 로그인]
   ↓
2. [관리자 대시보드 진입]
   ↓
3. [주문 현황 확인]
   ↓
4. [주문 상태 업데이트]
   ↓
5. [재고 관리]
   ↓
6. [통계 확인]
```

### 4.2 상세 시나리오

#### 시나리오 1: 주문 접수 및 처리
1. 관리자가 관리자 화면에 접속
2. 대시보드에서 "주문 접수: 1" 확인
3. 주문 현황 섹션에서 새 주문 확인
4. "주문 접수" 버튼 클릭
5. 주문 상태가 "접수"로 변경
6. 대시보드 통계 자동 업데이트
7. "제조 시작" 버튼 클릭
8. 주문 상태가 "제조 중"으로 변경
9. 제조 완료 후 "제조 완료" 버튼 클릭
10. 주문 상태가 "완료"로 변경

#### 시나리오 2: 재고 관리
1. 관리자가 재고 현황 섹션 확인
2. 특정 메뉴의 재고가 부족함을 확인
3. 해당 메뉴의 "+" 버튼 클릭하여 재고 증가
4. 변경 사항 즉시 저장 (또는 일괄 저장)
5. 재고 수량 업데이트 확인

#### 시나리오 3: 통계 모니터링
1. 관리자가 대시보드에서 전체 통계 확인
2. 각 상태별 주문 수 확인
3. 실시간 업데이트 확인
4. 특정 상태의 주문이 많을 경우 대응

---

## 5. 상태 관리 (State Management)

### 5.1 주요 상태

| 상태 | 설명 | 저장 위치 |
|------|------|----------|
| **주문 목록** | 전체 주문 데이터 | React State / Context |
| **재고 목록** | 메뉴별 재고 데이터 | React State / Context |
| **대시보드 통계** | 주문 통계 데이터 | React State / Context |
| **사용자 정보** | 관리자 정보 | Context / LocalStorage |
| **필터 상태** | 주문 필터 상태 | 컴포넌트 State |

### 5.2 데이터 구조

#### 주문 데이터 구조
```typescript
interface Order {
  id: string;              // 주문 ID
  userId: string;          // 사용자 ID
  status: OrderStatus;     // 주문 상태
  items: OrderItem[];      // 주문 항목
  totalAmount: number;     // 총 금액
  createdAt: string;       // 주문 일시
  updatedAt: string;       // 업데이트 일시
}

enum OrderStatus {
  PENDING = '접수 대기',
  RECEIVED = '접수',
  IN_PROGRESS = '제조 중',
  COMPLETED = '완료',
  CANCELLED = '취소'
}
```

#### 재고 데이터 구조
```typescript
interface Inventory {
  menuId: string;          // 메뉴 ID
  menuName: string;        // 메뉴명
  quantity: number;       // 재고 수량
  minStock: number;      // 최소 재고 (선택)
  updatedAt: string;      // 업데이트 일시
}
```

#### 대시보드 통계 구조
```typescript
interface DashboardStats {
  totalOrders: number;     // 총 주문 수
  receivedOrders: number;  // 접수 주문 수
  inProgressOrders: number; // 제조 중 주문 수
  completedOrders: number;  // 완료 주문 수
}
```

---

## 6. 인터랙션 디자인 (Interaction Design)

### 6.1 버튼 인터랙션

#### 주문 상태 변경 버튼
- **기본 상태**: 브랜드 색상, 클릭 가능
- **클릭 시**: 
  - 로딩 스피너 표시
  - API 호출
  - 성공 시 상태 업데이트 및 통계 갱신
  - 실패 시 에러 메시지 표시

#### 재고 수량 조절 버튼
- **+ 버튼**: 
  - 클릭 시 수량 1 증가
  - 즉시 UI 업데이트
  - 저장 확인 (즉시 또는 일괄)
- **- 버튼**: 
  - 클릭 시 수량 1 감소
  - 최소값(0) 도달 시 비활성화
  - 즉시 UI 업데이트
  - 저장 확인 (즉시 또는 일괄)

### 6.2 실시간 업데이트

- **폴링**: 주문 상태 변경을 주기적으로 확인 (5-10초)
- **WebSocket**: 실시간 업데이트 (선택, 향후 구현)
- **시각적 피드백**: 새 주문 도착 시 알림 (선택)

### 6.3 피드백

- **성공 피드백**: 
  - 토스트 메시지 (2-3초 표시)
  - 상태 변경 애니메이션
- **에러 피드백**: 
  - 에러 메시지 표시
  - 재시도 버튼 제공
- **로딩 피드백**: 
  - 버튼에 로딩 스피너
  - 전체 화면 로딩 (초기 로드 시)

---

## 7. 반응형 디자인 (Responsive Design)

### 7.1 브레이크포인트

| 디바이스 | 너비 | 레이아웃 |
|---------|------|---------|
| 모바일 | < 768px | 1열 그리드, 세로 스크롤 |
| 태블릿 | 768px - 1024px | 2열 그리드 |
| 데스크톱 | > 1024px | 3-4열 그리드 |

### 7.2 모바일 최적화

- **터치 친화적**: 버튼 크기 최소 44px × 44px
- **간소화된 UI**: 불필요한 요소 제거
- **스와이프 제스처**: 주문 카드 스와이프로 상태 변경 (선택)
- **하단 고정**: 중요한 액션 버튼 하단 고정 (선택)

---

## 8. 접근성 (Accessibility)

### 8.1 WCAG 준수

- **키보드 네비게이션**: 모든 인터랙티브 요소에 키보드 접근 가능
- **스크린 리더 지원**: 적절한 ARIA 레이블 및 역할
- **색상 대비**: 최소 4.5:1 대비율 유지
- **포커스 표시**: 명확한 포커스 인디케이터

### 8.2 구현 사항

- **시맨틱 HTML**: 적절한 HTML 태그 사용
- **ARIA 레이블**: 버튼, 상태에 설명 추가
- **키보드 단축키**: 
  - Tab: 다음 요소
  - Enter/Space: 버튼 클릭
  - 화살표 키: 카드 간 이동 (선택)

---

## 9. 성능 요구사항 (Performance Requirements)

### 9.1 로딩 시간

- **초기 로딩**: 2초 이내
- **주문 목록 로딩**: 1초 이내
- **재고 목록 로딩**: 1초 이내
- **통계 업데이트**: 0.5초 이내

### 9.2 최적화

- **코드 스플리팅**: React.lazy 사용
- **가상화**: 주문 목록이 많을 경우 가상 스크롤 (선택)
- **캐싱**: 재고 데이터 캐싱
- **폴링 최적화**: 필요한 경우에만 업데이트

---

## 10. 에러 처리 (Error Handling)

### 10.1 에러 시나리오

| 에러 상황 | 처리 방법 |
|----------|---------|
| 주문 목록 로드 실패 | 에러 메시지 표시, 재시도 버튼 |
| 주문 상태 변경 실패 | 에러 메시지, 원래 상태로 복구 |
| 재고 업데이트 실패 | 에러 메시지, 변경 사항 롤백 |
| 네트워크 오류 | 오프라인 메시지, 재연결 안내 |
| 권한 오류 | 권한 없음 메시지, 로그인 페이지로 이동 |

### 10.2 사용자 피드백

- **명확한 에러 메시지**: 사용자가 이해할 수 있는 메시지
- **해결 방법 제시**: 재시도 버튼 또는 안내
- **시각적 표시**: 에러 아이콘 또는 색상

---

## 11. 보안 요구사항 (Security Requirements)

### 11.1 인증 및 권한

- **관리자 인증**: 관리자 권한이 있는 사용자만 접근 가능
- **JWT 토큰**: 인증 토큰 검증
- **세션 관리**: 자동 로그아웃 (일정 시간 비활성 시)
- **권한 검증**: 각 API 호출 시 권한 확인

### 11.2 데이터 보호

- **민감 정보**: 고객 정보는 필요한 경우에만 표시
- **입력 검증**: 재고 수량 등 입력값 검증
- **CSRF 보호**: CSRF 토큰 사용

---

## 12. 테스트 요구사항 (Testing Requirements)

### 12.1 UI 테스트

- **컴포넌트 테스트**: 각 컴포넌트의 렌더링 및 동작 확인
- **통합 테스트**: 관리자 플로우 테스트
- **시각적 회귀 테스트**: 스타일 변경 감지

### 12.2 기능 테스트

- **주문 상태 변경**: 각 상태 변경 버튼 동작 확인
- **재고 관리**: 수량 조절 기능 확인
- **통계 업데이트**: 실시간 통계 업데이트 확인
- **에러 처리**: 각 에러 시나리오 테스트

### 12.3 사용성 테스트

- **관리자 테스트**: 실제 관리자 대상 테스트
- **작업 효율성**: 작업 완료 시간 측정
- **학습 곡선**: 새로운 관리자의 학습 시간 측정

---

## 13. 구현 우선순위 (Implementation Priority)

### Phase 1 (MVP)
- ✅ 헤더 영역
- ✅ 관리자 대시보드 기본 통계
- ✅ 재고 현황 기본 기능
- ✅ 주문 현황 기본 기능
- ✅ 주문 상태 변경 버튼

### Phase 2 (향상)
- 주문 필터링 기능
- 재고 부족 알림
- 주문 상세 정보 모달
- 실시간 업데이트 개선

### Phase 3 (최적화)
- WebSocket 실시간 통신
- 주문 검색 기능
- 통계 차트/그래프
- 고급 필터링 및 정렬

---

## 14. 디자인 가이드라인 (Design Guidelines)

### 14.1 색상

- **브랜드 색상**: COZY 브랜드 색상
- **상태 색상**: 
  - 접수 대기: 파란색 (#3B82F6)
  - 접수: 주황색 (#F97316)
  - 제조 중: 노란색 (#EAB308)
  - 완료: 초록색 (#22C55E)
- **에러 색상**: 빨간색 (#EF4444)
- **텍스트**: 
  - 제목: 다크 그레이 (#333333)
  - 본문: 중간 그레이 (#666666)
  - 보조 텍스트: 밝은 그레이 (#999999)

### 14.2 타이포그래피

- **제목**: 굵은 글씨, 큰 크기
- **본문**: 일반 글씨, 중간 크기
- **숫자**: 굵은 글씨, 강조 색상 (통계)

### 14.3 간격

- **카드 간격**: 16-24px
- **내부 여백**: 16px
- **섹션 간격**: 32-48px

---

## 15. API 연동 (API Integration)

### 15.1 필요한 API 엔드포인트

| API | 메서드 | 설명 |
|-----|--------|------|
| `/api/admin/dashboard/stats` | GET | 대시보드 통계 조회 |
| `/api/admin/inventory` | GET | 재고 목록 조회 |
| `/api/admin/inventory/{id}` | PATCH | 재고 수량 업데이트 |
| `/api/admin/orders` | GET | 주문 목록 조회 |
| `/api/admin/orders/{id}/status` | PATCH | 주문 상태 변경 |

### 15.2 데이터 형식

#### 대시보드 통계 응답
```json
{
  "data": {
    "totalOrders": 1,
    "receivedOrders": 1,
    "inProgressOrders": 0,
    "completedOrders": 0
  }
}
```

#### 재고 목록 응답
```json
{
  "data": [
    {
      "menuId": "uuid",
      "menuName": "아메리카노 (ICE)",
      "quantity": 10,
      "minStock": 5
    }
  ]
}
```

#### 주문 목록 응답
```json
{
  "data": [
    {
      "id": "uuid",
      "status": "접수 대기",
      "items": [
        {
          "menuName": "아메리카노(ICE)",
          "quantity": 1,
          "options": []
        }
      ],
      "totalAmount": 4000,
      "createdAt": "2024-07-31T13:00:00Z"
    }
  ]
}
```

---

## 16. 향후 개선 사항 (Future Enhancements)

- **주문 검색**: 고객명, 주문 ID로 검색
- **통계 차트**: 시간대별 주문 통계 시각화
- **알림 시스템**: 새 주문 도착 시 알림
- **일괄 작업**: 여러 주문 상태 일괄 변경
- **재고 자동 주문**: 재고 부족 시 자동 주문 알림
- **주문 이력**: 주문 상태 변경 이력 조회
- **고객 관리**: 고객 정보 조회 및 관리
- **매출 통계**: 일일/월별 매출 통계

---

## 17. 사용자 화면과의 연계

### 17.1 일관성 유지

- **헤더**: 사용자 화면과 동일한 헤더 구조
- **디자인 시스템**: 동일한 색상, 타이포그래피, 간격 사용
- **네비게이션**: 사용자 화면과 관리자 화면 간 쉬운 전환

### 17.2 데이터 동기화

- **주문 상태**: 사용자가 주문한 주문의 상태가 관리자 화면에 실시간 반영
- **재고**: 관리자가 재고를 변경하면 사용자 화면의 메뉴 가용성에 반영

---

**문서 버전**: 1.0  
**최종 업데이트**: 2024  
**작성자**: Development Team

```


작업 결과 보고서 작성 중입니다.


```markdown
# 관리자 화면 UI/UX PRD 작성 보고서

## 📋 작업 개요

**작업 일자**: 2024  
**작업 내용**: OlderBean 관리자 화면 UI/UX PRD 문서 작성  
**작성 파일**: `docs/PRD_Admin_UI.md`

---

## 🎯 작업 목표

와이어프레임을 기반으로 관리자 화면에 대한 상세한 UI/UX 요구사항 문서를 작성하여, 개발팀이 일관된 관리자 인터페이스를 구현할 수 있도록 가이드를 제공합니다.

---

## 📐 와이어프레임 분석

### 분석된 화면 구성

와이어프레임을 분석한 결과, 관리자 화면은 다음과 같이 구성되어 있습니다:

#### 1. 헤더 영역
- **로고**: "COZY" 브랜드명
- **주문하기 버튼**: 사용자 주문 화면으로 이동
- **관리자 버튼**: 관리자 화면 (현재 활성화 상태 표시 ✓)

#### 2. 관리자 대시보드
- **섹션 제목**: "관리자 대시보드"
- **통계 카드**:
  - 총 주문: 1
  - 주문 접수: 1
  - 제조 중: 0
  - 제조 완료: 0

#### 3. 재고 현황
- **섹션 제목**: "재고 현황"
- **메뉴 카드** (그리드 레이아웃):
  - 각 카드 구성:
    - 메뉴명 (예: "아메리카노 (ICE)")
    - 재고 수량 (예: "10개")
    - 수량 조절 버튼: "-" 및 "+" 버튼

#### 4. 주문 현황
- **섹션 제목**: "주문 현황"
- **주문 카드**:
  - 주문 시간: "7월 31일 13:00"
  - 주문 항목: "아메리카노(ICE) x 1"
  - 주문 금액: "4,000원"
  - 상태 버튼: "주문 접수" (상태에 따라 변경)

---

## 📝 작성된 PRD 내용

### 주요 섹션

1. **개요 (Overview)**
   - 문서 목적 및 목표 정의
   - 실시간 주문 관리, 재고 관리, 대시보드, 빠른 작업 처리 목표

2. **화면 구조 (Screen Structure)**
   - 전체 레이아웃 다이어그램
   - 화면 구성 요소 설명 (헤더, 대시보드, 재고 현황, 주문 현황)

3. **상세 컴포넌트 명세**
   - **헤더 영역**: 
     - 사용자 화면과 동일한 구조
     - 관리자 버튼 활성화 표시
   - **관리자 대시보드**: 
     - 통계 카드 상세 명세
     - 실시간 업데이트 메커니즘
     - 색상 구분 전략
   - **재고 현황**: 
     - 메뉴 카드 구조
     - 수량 조절 기능 (+/- 버튼)
     - 재고 부족 알림 (선택)
     - 저장 방식 (즉시/일괄)
   - **주문 현황**: 
     - 주문 카드 상세 구조
     - 주문 상태별 버튼 (접수 대기 → 접수 → 제조 중 → 완료)
     - 주문 정렬 및 필터링

4. **사용자 플로우 (User Flow)**
   - 관리자 작업 프로세스 플로우차트
   - 상세 시나리오:
     - 주문 접수 및 처리
     - 재고 관리
     - 통계 모니터링

5. **상태 관리 (State Management)**
   - 주요 상태 정의
   - 데이터 구조 (TypeScript 인터페이스):
     - Order (주문)
     - OrderStatus (주문 상태 enum)
     - Inventory (재고)
     - DashboardStats (대시보드 통계)

6. **인터랙션 디자인 (Interaction Design)**
   - 주문 상태 변경 버튼 인터랙션
   - 재고 수량 조절 버튼 인터랙션
   - 실시간 업데이트 메커니즘
   - 피드백 메커니즘

7. **반응형 디자인 (Responsive Design)**
   - 브레이크포인트 정의 (모바일, 태블릿, 데스크톱)
   - 모바일 최적화 전략

8. **접근성 (Accessibility)**
   - WCAG 준수 사항
   - 구현 사항 (시맨틱 HTML, ARIA 레이블, 키보드 단축키)

9. **성능 요구사항 (Performance Requirements)**
   - 로딩 시간 목표
   - 최적화 전략 (코드 스플리팅, 가상화, 캐싱, 폴링 최적화)

10. **에러 처리 (Error Handling)**
    - 에러 시나리오 및 처리 방법
    - 사용자 피드백

11. **보안 요구사항 (Security Requirements)**
    - 인증 및 권한 관리
    - 데이터 보호
    - CSRF 보호

12. **테스트 요구사항 (Testing Requirements)**
    - UI 테스트
    - 기능 테스트
    - 사용성 테스트

13. **구현 우선순위 (Implementation Priority)**
    - Phase 1 (MVP): 기본 기능
    - Phase 2 (향상): 필터링, 알림, 상세 정보
    - Phase 3 (최적화): WebSocket, 검색, 통계 차트

14. **디자인 가이드라인 (Design Guidelines)**
    - 색상 팔레트 (상태별 색상 포함)
    - 타이포그래피
    - 간격 규칙

15. **API 연동 (API Integration)**
    - 필요한 API 엔드포인트 (5개)
    - 데이터 형식 예시:
      - 대시보드 통계 응답
      - 재고 목록 응답
      - 주문 목록 응답

16. **향후 개선 사항 (Future Enhancements)**
    - 주문 검색, 통계 차트, 알림 시스템, 일괄 작업 등

17. **사용자 화면과의 연계**
    - 일관성 유지
    - 데이터 동기화

---

## ✅ 작성 완료 항목

### 문서 구조
- [x] 개요 및 목표 정의
- [x] 화면 구조 다이어그램
- [x] 컴포넌트 상세 명세 (4개 주요 컴포넌트)
- [x] 사용자 플로우 정의
- [x] 상태 관리 구조
- [x] 인터랙션 디자인
- [x] 반응형 디자인 가이드
- [x] 접근성 요구사항
- [x] 성능 요구사항
- [x] 에러 처리 전략
- [x] 보안 요구사항
- [x] 테스트 요구사항
- [x] 구현 우선순위
- [x] 디자인 가이드라인
- [x] API 연동 명세
- [x] 향후 개선 사항
- [x] 사용자 화면과의 연계

### 상세 명세
- [x] 헤더 영역 상세 명세 (활성화 표시 포함)
- [x] 관리자 대시보드 통계 카드 상세 명세
- [x] 재고 현황 메뉴 카드 및 수량 조절 기능
- [x] 주문 현황 주문 카드 및 상태 변경 버튼
- [x] 데이터 구조 정의 (TypeScript 인터페이스 4개)
- [x] 사용자 시나리오 작성 (3개)
- [x] 반응형 브레이크포인트 정의
- [x] API 데이터 형식 예시 (3개)
- [x] 주문 상태별 버튼 매핑 테이블

---

## 📊 문서 통계

| 항목 | 수량 |
|------|------|
| **총 섹션 수** | 17개 |
| **주요 컴포넌트** | 4개 (헤더, 대시보드, 재고 현황, 주문 현황) |
| **사용자 플로우** | 3개 시나리오 |
| **데이터 구조** | 4개 인터페이스 (Order, OrderStatus, Inventory, DashboardStats) |
| **API 엔드포인트** | 5개 |
| **주문 상태** | 5개 (접수 대기, 접수, 제조 중, 완료, 취소) |
| **반응형 브레이크포인트** | 3개 (모바일, 태블릿, 데스크톱) |
| **구현 단계** | 3단계 (Phase 1-3) |

---

## 🎨 주요 특징

### 1. 관리자 특화 기능
- **실시간 통계**: 대시보드에서 주문 현황을 한눈에 파악
- **빠른 상태 변경**: 주문 상태를 최소 클릭으로 변경
- **재고 관리**: 직관적인 +/- 버튼으로 재고 조절
- **상태별 색상 구분**: 주문 상태를 색상으로 시각화

### 2. 사용자 화면과의 일관성
- **동일한 헤더 구조**: 사용자 화면과 동일한 헤더 사용
- **일관된 디자인 시스템**: 색상, 타이포그래피, 간격 규칙 공유
- **데이터 동기화**: 주문 상태 변경이 사용자 화면에 실시간 반영

### 3. 개발자 친화적
- **TypeScript 인터페이스**: 명확한 데이터 구조 정의
- **API 연동 명세**: 필요한 엔드포인트 및 데이터 형식 제공
- **상태 관리 구조**: React State/Context 기반 구조 제안

### 4. 실용적 우선순위
- **MVP 기능 우선**: Phase 1에서 핵심 기능만 구현
- **단계별 확장**: Phase 2-3에서 고급 기능 추가
- **향후 개선 사항**: 확장 가능한 구조 제안

### 5. 보안 및 성능
- **권한 관리**: 관리자 인증 및 권한 검증
- **성능 최적화**: 폴링, 캐싱, 가상화 전략
- **에러 처리**: 포괄적인 에러 시나리오 및 대응 방법

---

## 🔄 사용자 화면 PRD와의 비교

### 공통점
- 동일한 헤더 구조
- 일관된 디자인 시스템
- 유사한 문서 구조 및 형식
- TypeScript 인터페이스 사용
- 반응형 디자인 가이드

### 차이점
- **관리자 화면 특화 기능**:
  - 대시보드 통계
  - 재고 관리
  - 주문 상태 변경
- **상태 관리 복잡도**: 관리자 화면이 더 많은 상태 관리 필요
- **보안 요구사항**: 관리자 화면에 보안 섹션 추가
- **실시간 업데이트**: 관리자 화면에 폴링/WebSocket 고려

---

## 🔄 다음 단계

### 즉시 진행 가능
1. **디자인 시스템 구축**: 사용자 화면과 관리자 화면 공통 컴포넌트 라이브러리
2. **프로토타입 제작**: Figma 또는 유사 도구로 인터랙티브 프로토타입
3. **API 스펙 확인**: 백엔드 API 스펙과 PRD의 API 명세 일치 확인

### 개발 준비
1. **컴포넌트 구조 설계**: 
   - 공통 컴포넌트 (Header, Card 등)
   - 관리자 전용 컴포넌트 (Dashboard, InventoryCard, OrderCard 등)
2. **상태 관리 설계**: 
   - Context API 또는 Zustand 선택
   - 실시간 업데이트 전략 (폴링 vs WebSocket)
3. **권한 관리 설계**: 
   - 인증 미들웨어
   - 라우트 보호

### 테스트 준비
1. **테스트 시나리오 작성**: 
   - 주문 상태 변경 플로우
   - 재고 관리 플로우
   - 통계 업데이트 확인
2. **보안 테스트 계획**: 
   - 권한 검증 테스트
   - 인증 토큰 검증 테스트
3. **성능 테스트 계획**: 
   - 폴링 주기 최적화
   - 대량 주문 처리 테스트

---

## 📁 파일 정보

### 생성된 파일
- **경로**: `docs/PRD_Admin_UI.md`
- **형식**: Markdown
- **크기**: 약 700+ 줄
- **언어**: 한국어

### 관련 파일
- `docs/PRD_User_UI.md`: 사용자 화면 PRD
- `docs/PRD_Up1.md`: 전체 프로젝트 PRD (Python + FastAPI + React + Render)
- `docs/PRD.md`: 기존 PRD 문서

---

## ✨ 주요 성과

1. **완전한 관리자 UI/UX 명세서 작성**: 와이어프레임을 기반으로 상세한 요구사항 문서화
2. **사용자 화면과의 일관성 확보**: 동일한 디자인 시스템 및 구조 유지
3. **개발 가이드 제공**: 개발팀이 바로 구현할 수 있는 상세한 가이드
4. **보안 및 성능 고려**: 관리자 화면 특성에 맞는 보안 및 성능 요구사항 포함
5. **확장 가능한 구조**: 향후 기능 추가를 고려한 구조

---

## 📝 참고 사항

### 와이어프레임 기반 분석
- 실제 와이어프레임의 모든 요소를 분석하여 PRD에 반영
- 시각적 요소뿐만 아니라 인터랙션까지 상세히 명세
- 주문 상태 변경 플로우를 명확히 정의

### 기존 PRD와의 연계
- `PRD_Up1.md`의 기술 스택 (React, FastAPI)과 일관성 유지
- `PRD_User_UI.md`와 일관된 구조 및 스타일 유지
- API 연동 부분은 백엔드 API 스펙과 연계 가능

### 확장성 고려
- 향후 기능 추가를 위한 구조적 여유 확보
- 모듈화된 컴포넌트 구조 제안
- 실시간 통신 (WebSocket) 고려

### 관리자 특화 고려사항
- **보안**: 관리자 권한 검증, 세션 관리
- **성능**: 실시간 업데이트를 위한 폴링/WebSocket 전략
- **사용성**: 빠른 작업 처리를 위한 최소 클릭 설계
- **확장성**: 향후 통계, 알림, 검색 기능 추가 고려

---

**작업 완료 일자**: 2024  
**작성자**: Development Team  
**문서 버전**: 1.0

---

## 📌 체크리스트

### 문서 품질 확인
- [x] 모든 섹션이 완성되었는가?
- [x] 와이어프레임의 모든 요소가 반영되었는가?
- [x] 개발자가 이해하기 쉬운가?
- [x] 디자이너가 참고하기 적합한가?
- [x] 일관된 스타일과 형식을 유지하는가?
- [x] 사용자 화면 PRD와 일관성이 있는가?

### 기술적 정확성
- [x] 데이터 구조가 명확한가?
- [x] API 연동 명세가 정확한가?
- [x] 상태 관리 구조가 적절한가?
- [x] 반응형 디자인이 실현 가능한가?
- [x] 보안 요구사항이 충분한가?

### 사용자 경험
- [x] 관리자 플로우가 명확한가?
- [x] 인터랙션이 자연스러운가?
- [x] 피드백 메커니즘이 적절한가?
- [x] 에러 처리가 충분한가?
- [x] 작업 효율성이 고려되었는가?

### 관리자 특화 기능
- [x] 주문 상태 변경 플로우가 명확한가?
- [x] 재고 관리 기능이 직관적인가?
- [x] 대시보드 통계가 유용한가?
- [x] 실시간 업데이트 전략이 적절한가?

---

## 🔗 관련 문서 링크

- [사용자 화면 PRD](./PRD_User_UI_Report.md)
- [전체 프로젝트 PRD](../docs/PRD_Up1.md)
- [API 문서](../docs/API.md)

---

**보고서 작성 완료** ✅

```


작업 완료. 관리자 화면 UI/UX PRD와 작업 결과 보고서를 생성했습니다.

## 생성된 파일

### 1. PRD 문서
- **경로**: `docs/PRD_Admin_UI.md`
- **내용**: 관리자 화면에 대한 UI/UX 요구사항 문서

### 2. 작업 보고서
- **경로**: `reports/PRD_Admin_UI_Report.md`
- **내용**: 작업 내용 및 결과 요약

## 주요 작성 내용

### PRD 문서 구성 (17개 섹션)

1. 개요 및 목표
2. 화면 구조: 헤더, 대시보드, 재고 현황, 주문 현황
3. 상세 컴포넌트 명세
   - 헤더: 로고, 주문하기, 관리자 버튼 (활성화 표시)
   - 관리자 대시보드: 총 주문, 접수, 제조 중, 완료 통계
   - 재고 현황: 메뉴별 재고 카드, +/- 수량 조절 버튼
   - 주문 현황: 주문 카드, 상태별 버튼 (접수 대기 → 접수 → 제조 중 → 완료)
4. 사용자 플로우: 주문 처리, 재고 관리, 통계 모니터링 시나리오
5. 상태 관리: TypeScript 인터페이스 (Order, OrderStatus, Inventory, DashboardStats)
6. 인터랙션 디자인: 버튼 인터랙션, 실시간 업데이트, 피드백
7. 반응형 디자인: 모바일/태블릿/데스크톱 브레이크포인트
8. 접근성: WCAG 준수 사항
9. 성능 요구사항: 로딩 시간 및 최적화 전략
10. 에러 처리: 에러 시나리오 및 대응 방법
11. 보안 요구사항: 인증/권한, 데이터 보호 (관리자 화면 특화)
12. 테스트 요구사항: UI/기능/사용성 테스트
13. 구현 우선순위: Phase 1-3 단계별 계획
14. 디자인 가이드라인: 색상(상태별), 타이포그래피, 간격
15. API 연동: 5개 엔드포인트 및 데이터 형식
16. 향후 개선 사항: 검색, 통계 차트, 알림 등
17. 사용자 화면과의 연계: 일관성 유지 및 데이터 동기화

## 와이어프레임 반영 사항

- 헤더: COZY 로고, 주문하기/관리자 버튼 (관리자 활성화 표시)
- 관리자 대시보드: 총 주문, 접수, 제조 중, 완료 통계 카드
- 재고 현황: 메뉴별 재고 카드, 수량 표시, +/- 버튼
- 주문 현황: 주문 시간, 항목, 금액, 상태 변경 버튼

## 주요 특징

### 관리자 특화 기능
- 실시간 통계 대시보드
- 빠른 주문 상태 변경
- 직관적인 재고 관리
- 상태별 색상 구분

### 사용자 화면과의 일관성
- 동일한 헤더 구조
- 공통 디자인 시스템
- 데이터 동기화 고려

### 개발자 가이드
- TypeScript 인터페이스 제공
- API 연동 명세 포함
- 보안 및 성능 요구사항 명시

두 파일 모두 생성되었으며, 린터 오류는 없습니다. 사용자 화면 PRD와 일관된 구조로 작성했습니다.

---

**User**

@README.md (329-345) Green 단계에서 최소한의 기능을 구현하고자 하는데 먼저 시나리오를 알려주고 승인 후 진행해줘.

---

**Cursor**


Green 단계 구현 시나리오를 정리합니다. 현재 상태를 확인 중입니다.



현재 상태 확인 완료. Green 단계 구현 시나리오입니다.

## Green 단계 구현 시나리오: 인증 API (최소 기능)

### 현재 상태
- 데이터베이스 설정 파일 존재 (`src/config/database.js`)
- 기본 Express 서버 구조 존재
- 테스트 파일 존재 (`auth.test.js` - 10개 테스트 케이스)
- routes, controllers, models, middleware 디렉토리 비어있음

### 구현 계획 (최소 기능 - 테스트 통과 목표)

#### 1단계: User 모델 생성
- [ ] `src/models/User.js` 생성
  - 필드: id, name, email, password, role
  - 비밀번호 해싱 (bcryptjs)
  - 이메일 유니크 제약
  - 테스트 환경에서 테이블 자동 생성

#### 2단계: 인증 컨트롤러 (최소 기능)
- [ ] `src/controllers/authController.js` 생성
  - `register`: 
    - 필수 필드 검증 (name, email, password)
    - 이메일 형식 검증 (간단한 정규식)
    - 비밀번호 길이 검증 (최소 6자)
    - 이메일 중복 확인
    - 비밀번호 해싱
    - 사용자 생성
    - JWT 토큰 발급
  - `login`:
    - 필수 필드 검증 (email, password)
    - 이메일로 사용자 조회
    - 비밀번호 검증
    - JWT 토큰 발급

#### 3단계: 인증 미들웨어
- [ ] `src/middleware/auth.js` 생성
  - JWT 토큰 검증
  - req.user에 사용자 정보 추가
  - 에러 처리 (토큰 없음, 잘못된 토큰)

#### 4단계: 인증 라우트
- [ ] `src/routes/auth.js` 생성
  - POST `/api/auth/register`
  - POST `/api/auth/login`
  - GET `/api/orders` (미들웨어 테스트용 - 임시)

#### 5단계: 메인 앱에 라우트 연결
- [ ] `src/index.js` 수정
  - 인증 라우트 연결
  - `/api/orders` 엔드포인트에 인증 미들웨어 적용 (테스트용)

#### 6단계: 테스트 환경 설정
- [ ] `backend/__tests__/setup.js` 수정
  - 데이터베이스 초기화
  - 테스트 전후 테이블 생성/삭제

### 구현 전략 (최소 기능)
1. 데이터베이스: SQLite 인메모리 사용 (테스트 환경)
2. 에러 처리: 기본 에러 메시지만 반환
3. 유효성 검증: 최소 규칙만 적용
4. 보안: 기본 JWT + bcrypt만 사용
5. 리팩토링: 이후 단계에서 진행

### 예상 파일 구조
```
backend/src/
├── config/
│   └── database.js          (이미 존재)
├── models/
│   └── User.js              (새로 생성)
├── controllers/
│   └── authController.js   (새로 생성)
├── middleware/
│   └── auth.js              (새로 생성)
├── routes/
│   └── auth.js              (새로 생성)
└── index.js                 (수정)
```

### 테스트 통과 목표
- ✅ 회원가입 테스트 6개 통과
- ✅ 로그인 테스트 4개 통과
- ✅ 인증 미들웨어 테스트 3개 통과

### 주의사항
- 테스트 통과를 위한 최소 기능만 구현
- 리팩토링은 이후 단계에서 진행
- 실제 프로덕션 로직은 나중에 보완
- 에러 메시지는 테스트가 기대하는 형식으로 반환

이 시나리오로 진행할까요? 승인해 주시면 구현을 시작하겠습니다.

```plaintext
backend/src/
├── config/
│   └── database.js          (이미 존재)
├── models/
│   └── User.js              (새로 생성)
├── controllers/
│   └── authController.js   (새로 생성)
├── middleware/
│   └── auth.js              (새로 생성)
├── routes/
│   └── auth.js              (새로 생성)
└── index.js                 (수정)
```

---

**User**

시작해

---

**Cursor**


Green 단계 구현을 시작합니다. 최소 기능으로 테스트를 통과시키는 데 집중합니다.



User 모델부터 생성합니다.


```javascript
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('user', 'admin'),
    defaultValue: 'user'
  }
}, {
  tableName: 'users',
  timestamps: true,
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, 10);
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        user.password = await bcrypt.hash(user.password, 10);
      }
    }
  }
});

// 비밀번호 검증 메서드
User.prototype.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = User;

```

```javascript
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// JWT 토큰 생성
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET || 'test-secret-key',
    { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
  );
};

// 이메일 형식 검증
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// 회원가입
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // 필수 필드 검증
    if (!name || !email || !password) {
      return res.status(400).json({
        error: {
          message: '필수 필드가 누락되었습니다.',
          code: 'MISSING_FIELDS'
        }
      });
    }

    // 이메일 형식 검증
    if (!isValidEmail(email)) {
      return res.status(400).json({
        error: {
          message: '잘못된 이메일 형식입니다.',
          code: 'INVALID_EMAIL'
        }
      });
    }

    // 비밀번호 길이 검증
    if (password.length < 6) {
      return res.status(400).json({
        error: {
          message: '비밀번호는 최소 6자 이상이어야 합니다.',
          code: 'SHORT_PASSWORD'
        }
      });
    }

    // 이메일 중복 확인
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        error: {
          message: '이미 존재하는 이메일입니다.',
          code: 'EMAIL_EXISTS'
        }
      });
    }

    // 사용자 생성
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'user'
    });

    // 비밀번호 제외하고 사용자 정보 반환
    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    // JWT 토큰 생성
    const token = generateToken(user);

    res.status(201).json({
      token,
      user: userResponse
    });
  } catch (error) {
    next(error);
  }
};

// 로그인
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 필수 필드 검증
    if (!email || !password) {
      return res.status(400).json({
        error: {
          message: '필수 필드가 누락되었습니다.',
          code: 'MISSING_FIELDS'
        }
      });
    }

    // 사용자 조회
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        error: {
          message: '이메일 또는 비밀번호가 올바르지 않습니다.',
          code: 'INVALID_CREDENTIALS'
        }
      });
    }

    // 비밀번호 검증
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: {
          message: '이메일 또는 비밀번호가 올바르지 않습니다.',
          code: 'INVALID_CREDENTIALS'
        }
      });
    }

    // 비밀번호 제외하고 사용자 정보 반환
    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    // JWT 토큰 생성
    const token = generateToken(user);

    res.status(200).json({
      token,
      user: userResponse
    });
  } catch (error) {
    next(error);
  }
};

```

```javascript
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// JWT 인증 미들웨어
const authenticate = async (req, res, next) => {
  try {
    // Authorization 헤더에서 토큰 추출
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: {
          message: '인증 토큰이 필요합니다.',
          code: 'UNAUTHORIZED'
        }
      });
    }

    const token = authHeader.substring(7); // 'Bearer ' 제거

    // 토큰 검증
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'test-secret-key');
    } catch (error) {
      return res.status(401).json({
        error: {
          message: '유효하지 않은 토큰입니다.',
          code: 'INVALID_TOKEN'
        }
      });
    }

    // 사용자 조회 (선택사항 - 토큰에 사용자 정보가 있으면 생략 가능)
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({
        error: {
          message: '사용자를 찾을 수 없습니다.',
          code: 'USER_NOT_FOUND'
        }
      });
    }

    // req.user에 사용자 정보 추가
    req.user = {
      id: user.id,
      email: user.email,
      role: user.role
    };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;

```

```javascript
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// 회원가입
router.post('/register', authController.register);

// 로그인
router.post('/login', authController.login);

module.exports = router;

```


메인 앱에 라우트 연결 및 테스트용 엔드포인트 추가 중.


```javascript
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// 환경 변수 로드
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// 미들웨어
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 데이터베이스 초기화 (테스트 환경)
if (process.env.NODE_ENV === 'test') {
  const sequelize = require('./config/database');
  const User = require('./models/User');
  
  // 테스트 전에 데이터베이스 동기화
  sequelize.sync({ force: false }).catch(console.error);
}

// 라우트
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'OlderBean API Server is running' });
});

// 인증 라우트
app.use('/api/auth', require('./routes/auth'));

// 테스트용 주문 엔드포인트 (인증 미들웨어 테스트용)
const authenticate = require('./middleware/auth');
app.get('/api/orders', authenticate, (req, res) => {
  res.json({ message: 'Orders endpoint - authenticated', user: req.user });
});

// TODO: 라우트 추가
// app.use('/api/menus', require('./routes/menus'));
// app.use('/api/orders', require('./routes/orders'));

// 에러 핸들링 미들웨어
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      code: err.code || 'INTERNAL_ERROR'
    }
  });
});

// 404 핸들러
app.use((req, res) => {
  res.status(404).json({
    error: {
      message: 'Route not found',
      code: 'NOT_FOUND'
    }
  });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`🚀 OlderBean API Server is running on http://localhost:${PORT}`);
});

module.exports = app;


```


테스트 환경 설정 수정 중.


```javascript
// 테스트 환경 설정
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret-key';
process.env.JWT_EXPIRES_IN = '1h';

const sequelize = require('../src/config/database');
const User = require('../src/models/User');

// 테스트 전후 처리
beforeAll(async () => {
  // 테스트 데이터베이스 동기화 (테이블 생성)
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  // 테스트 데이터베이스 정리
  await sequelize.close();
});






```


Jest 설정에 setup.js 추가 중.


```javascript
module.exports = {
  testEnvironment: 'node',
  coveragePathIgnorePatterns: ['/node_modules/', '/database/'],
  testMatch: ['**/__tests__/**/*.test.js'],
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup.js'],
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/index.js',
    '!**/node_modules/**'
  ],
  coverageDirectory: 'coverage',
  verbose: true
};






```

