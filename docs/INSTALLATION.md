# OlderBean 설치 및 실행 가이드

이 문서는 OlderBean 프로젝트를 로컬 환경에 설치하고 실행하는 방법을 단계별로 안내합니다.

## 📋 목차

- [사전 요구사항](#사전-요구사항)
- [프로젝트 클론](#프로젝트-클론)
- [환경 변수 설정](#환경-변수-설정)
- [의존성 설치](#의존성-설치)
- [데이터베이스 설정](#데이터베이스-설정)
- [서버 실행](#서버-실행)
- [문제 해결](#문제-해결)

---

## 사전 요구사항

다음 소프트웨어가 설치되어 있어야 합니다:

### 필수 요구사항

| 소프트웨어 | 최소 버전 | 설치 확인 방법 |
|----------|---------|--------------|
| **Node.js** | 18.0.0 이상 | `node --version` |
| **npm** | 9.0.0 이상 | `npm --version` |
| **PostgreSQL** | 14.0 이상 | `psql --version` |
| **Git** | 2.0.0 이상 | `git --version` |

### 선택적 요구사항

- **yarn** 또는 **pnpm** (npm 대신 사용 가능)
- **Docker** (컨테이너 환경에서 실행 시)

### 설치 방법

#### Windows

1. **Node.js 설치**
   - [Node.js 공식 웹사이트](https://nodejs.org/)에서 LTS 버전 다운로드
   - 설치 프로그램 실행 후 기본 설정으로 설치

2. **PostgreSQL 설치**
   - [PostgreSQL 공식 웹사이트](https://www.postgresql.org/download/windows/)에서 다운로드
   - 설치 시 기본 포트(5432)와 비밀번호 설정

3. **Git 설치**
   - [Git 공식 웹사이트](https://git-scm.com/download/win)에서 다운로드
   - 기본 설정으로 설치

#### macOS

```bash
# Homebrew를 사용한 설치
brew install node
brew install postgresql@14
brew install git

# PostgreSQL 서비스 시작
brew services start postgresql@14
```

#### Linux (Ubuntu/Debian)

```bash
# Node.js 설치 (NodeSource 저장소 사용)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# PostgreSQL 설치
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib

# PostgreSQL 서비스 시작
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

---

## 프로젝트 클론

### GitHub에서 클론

```bash
# 저장소 클론
git clone https://github.com/yourusername/OrderBean.git

# 프로젝트 디렉토리로 이동
cd OrderBean
```

### 로컬 프로젝트인 경우

이미 프로젝트가 로컬에 있다면 다음 단계로 진행하세요.

---

## 환경 변수 설정

### Backend 환경 변수

1. `backend` 디렉토리로 이동:
```bash
cd backend
```

2. `.env` 파일 생성:
```bash
# Windows (PowerShell)
Copy-Item env.example .env

# macOS/Linux
cp env.example .env
```

3. `.env` 파일 편집:
```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/orderbean

# Server
PORT=8000
NODE_ENV=development

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=24h

# CORS
CORS_ORIGIN=http://localhost:3000
```

**중요 사항:**
- `DATABASE_URL`의 `username`과 `password`를 PostgreSQL 설정에 맞게 변경
- `JWT_SECRET`은 프로덕션 환경에서 반드시 강력한 랜덤 문자열로 변경
- 데이터베이스 이름(`orderbean`)은 원하는 이름으로 변경 가능

### Frontend 환경 변수 (필요한 경우)

일반적으로 프론트엔드는 별도의 환경 변수가 필요하지 않지만, API URL을 변경해야 하는 경우:

1. `frontend` 디렉토리에 `.env` 파일 생성:
```env
VITE_API_URL=http://localhost:8000/api
```

---

## 의존성 설치

### Backend 의존성 설치

```bash
# backend 디렉토리에서
cd backend
npm install
```

설치가 완료되면 `node_modules` 폴더가 생성됩니다.

### Frontend 의존성 설치

```bash
# frontend 디렉토리에서
cd ../frontend
npm install
```

### 설치 문제 해결

**문제: npm install 실패**
```bash
# 캐시 정리 후 재시도
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**문제: 권한 오류 (macOS/Linux)**
```bash
# sudo 없이 설치 (권장)
# 또는 npm config set prefix ~/.npm-global 사용
```

---

## 데이터베이스 설정

### PostgreSQL 데이터베이스 생성

1. **PostgreSQL 접속:**
```bash
# Windows (명령 프롬프트)
psql -U postgres

# macOS/Linux
sudo -u postgres psql
```

2. **데이터베이스 및 사용자 생성:**
```sql
-- 데이터베이스 생성
CREATE DATABASE orderbean;

-- 사용자 생성 (선택사항)
CREATE USER orderbean_user WITH PASSWORD 'your_password';

-- 권한 부여
GRANT ALL PRIVILEGES ON DATABASE orderbean TO orderbean_user;

-- 연결
\c orderbean
```

3. **PostgreSQL 종료:**
```sql
\q
```

### 데이터베이스 마이그레이션 실행

마이그레이션 스크립트가 준비되어 있다면:

```bash
# backend 디렉토리에서
cd backend
npm run migrate
```

### 시드 데이터 생성 (선택사항)

초기 테스트 데이터를 생성하려면:

```bash
npm run seed
```

**참고:** 마이그레이션 및 시드 스크립트는 프로젝트 구현 단계에서 추가됩니다.

---

## 서버 실행

### 개발 모드 실행

프로젝트는 프론트엔드와 백엔드를 별도의 터미널에서 실행해야 합니다.

#### 터미널 1: Backend 서버

```bash
# backend 디렉토리로 이동
cd backend

# 개발 서버 실행
npm run dev
```

성공 메시지:
```
🚀 OlderBean API Server is running on http://localhost:8000
```

#### 터미널 2: Frontend 서버

```bash
# frontend 디렉토리로 이동
cd frontend

# 개발 서버 실행
npm run dev
```

성공 메시지:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

### 프로덕션 모드 실행

#### Backend 빌드 및 실행

```bash
cd backend
npm start
```

#### Frontend 빌드

```bash
cd frontend
npm run build
```

빌드된 파일은 `frontend/dist` 디렉토리에 생성됩니다.

### 접속 확인

브라우저에서 다음 주소로 접속:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/api/health

Backend Health Check 응답 예시:
```json
{
  "status": "ok",
  "message": "OlderBean API Server is running"
}
```

---

## 문제 해결

### 일반적인 문제

#### 1. 포트가 이미 사용 중입니다

**에러 메시지:**
```
Error: listen EADDRINUSE: address already in use :::8000
```

**해결 방법:**
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:8000 | xargs kill -9
```

또는 `.env` 파일에서 다른 포트로 변경:
```env
PORT=8001
```

#### 2. 데이터베이스 연결 실패

**에러 메시지:**
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**해결 방법:**
- PostgreSQL 서비스가 실행 중인지 확인
- `.env` 파일의 `DATABASE_URL`이 올바른지 확인
- PostgreSQL 사용자 권한 확인

```bash
# PostgreSQL 서비스 상태 확인 (macOS/Linux)
sudo systemctl status postgresql

# PostgreSQL 서비스 시작
sudo systemctl start postgresql
```

#### 3. 모듈을 찾을 수 없습니다

**에러 메시지:**
```
Error: Cannot find module 'express'
```

**해결 방법:**
```bash
# 의존성 재설치
rm -rf node_modules package-lock.json
npm install
```

#### 4. CORS 오류

**에러 메시지:**
```
Access to XMLHttpRequest has been blocked by CORS policy
```

**해결 방법:**
- Backend의 `.env` 파일에서 `CORS_ORIGIN`이 프론트엔드 URL과 일치하는지 확인
- Backend 서버가 실행 중인지 확인

#### 5. TypeScript 컴파일 오류

**해결 방법:**
```bash
# TypeScript 재설치
cd frontend
npm install --save-dev typescript @types/react @types/react-dom
```

### 로그 확인

#### Backend 로그
- 콘솔에 직접 출력됩니다
- 에러는 빨간색으로 표시됩니다

#### Frontend 로그
- 브라우저 개발자 도구 (F12) → Console 탭
- Network 탭에서 API 요청 확인

### 추가 도움말

문제가 지속되면:
1. 프로젝트 이슈 페이지에 문제 보고
2. 로그 메시지와 함께 에러 상세 정보 제공
3. 운영 체제 및 Node.js 버전 정보 포함

---

## 다음 단계

설치 및 실행이 완료되었다면:

1. [API 문서](./API.md)를 확인하여 API 엔드포인트 확인
2. [PRD 문서](./PRD.md)를 확인하여 프로젝트 요구사항 확인
3. 개발 시작!

---

**설치 및 실행 관련 문의사항이 있으시면 이슈를 등록해주세요.**

