# OlderBean Backend

## 빠른 시작

### 방법 1: 배치 파일 사용 (Windows)

```bash
start-dev.bat
```

### 방법 2: 수동 실행

1. **의존성 설치**
```bash
npm install
```

2. **환경 변수 설정**
```bash
# env.example을 복사하여 .env 파일 생성
copy env.example .env

# .env 파일을 편집하여 데이터베이스 정보 입력
```

3. **개발 서버 실행**
```bash
npm run dev
```

## PowerShell 실행 정책 문제 해결

PowerShell에서 스크립트 실행이 차단되는 경우:

### 옵션 1: CMD 사용
```bash
# 명령 프롬프트(CMD)를 사용하여 실행
cmd
cd backend
npm install
npm run dev
```

### 옵션 2: PowerShell 실행 정책 변경 (관리자 권한 필요)
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### 옵션 3: 일회성 실행 정책 우회
```powershell
powershell -ExecutionPolicy Bypass -Command "cd backend; npm install; npm run dev"
```

## 서버 접속

서버가 정상적으로 실행되면:
- API 서버: http://localhost:8000
- Health Check: http://localhost:8000/api/health

