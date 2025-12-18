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

