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

### 커밋 오류
- 오류 확인
