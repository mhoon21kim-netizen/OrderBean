# Network Error 해결 보고서

**작업 일자**: 2024-12-16  
**문제**: 백엔드 서버 미연결 시 Network Error 발생  
**상태**: ✅ 해결 완료

---

## 🔍 발견된 문제

### Network Error 발생 원인

1. **백엔드 서버 미실행**
   - 프런트엔드가 `http://localhost:8000/api/menus`에 요청
   - 백엔드 서버가 실행되지 않아 연결 실패
   - Network Error 발생

2. **에러 처리 부족**
   - 백엔드가 없을 때를 대비한 폴백 메커니즘 없음
   - 개발 환경에서도 실제 API 호출만 시도

3. **사용자 경험 저하**
   - 에러 메시지만 표시되고 기능 사용 불가
   - 개발 중 백엔드 없이 프런트엔드 개발 어려움

---

## 🔧 해결 방법

### 1. Mock 데이터 시스템 구축

#### 생성된 파일
- `frontend/src/config/env.ts` - 환경 변수 설정
- `frontend/src/mocks/menuMock.ts` - 메뉴 Mock 데이터

#### 환경 변수 설정
```typescript
export const config = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  useMockData: import.meta.env.VITE_USE_MOCK_DATA === 'true' || false,
  isDevelopment: import.meta.env.DEV,
};
```

#### Mock 데이터
```typescript
export const mockMenus: Menu[] = [
  { id: '1', name: '아메리카노(ICE)', price: 4000, ... },
  { id: '2', name: '아메리카노(HOT)', price: 4000, ... },
  { id: '3', name: '카페라떼', price: 5000, ... },
  // ... 추가 메뉴
];
```

### 2. useMenus Hook 개선

#### 개선 사항
1. **Mock 데이터 자동 폴백**
   - Network Error 발생 시 개발 환경에서 자동으로 Mock 데이터 사용
   - 사용자에게 경고 메시지 표시

2. **환경 변수 기반 제어**
   - `VITE_USE_MOCK_DATA=true` 설정 시 강제로 Mock 데이터 사용
   - 개발 환경에서 자동 감지

3. **에러 처리 개선**
   - Network Error와 다른 에러 구분
   - Mock 데이터 사용 시 에러 숨김

#### 변경된 코드
```typescript
export const useMenus = (): UseMenusReturn => {
  // ...
  const fetchMenus = async () => {
    // Mock 데이터 강제 사용
    if (config.useMockData) {
      setMenus(mockMenus);
      setIsMockData(true);
      return;
    }

    try {
      const data = await menuService.getAll();
      setMenus(data);
    } catch (err) {
      const apiError = handleApiError(err);
      
      // 개발 환경에서 Network Error 시 Mock 데이터 사용
      if (config.isDevelopment && apiError.message.includes('Network Error')) {
        console.warn('백엔드 서버에 연결할 수 없습니다. Mock 데이터를 사용합니다.');
        setMenus(mockMenus);
        setIsMockData(true);
        setError(null);
      } else {
        setError(apiError);
      }
    }
  };
  // ...
};
```

### 3. UI 개선

#### Mock 데이터 경고 표시
- Mock 데이터 사용 중일 때 사용자에게 알림
- 노란색 배경의 경고 메시지 표시

```typescript
{isMockData && (
  <div style={{...}}>
    ⚠️ Mock 데이터 모드: 백엔드 서버에 연결할 수 없어 샘플 데이터를 표시합니다.
  </div>
)}
```

---

## 📁 변경된 파일

### 생성된 파일
- ✅ `frontend/src/config/env.ts` - 환경 설정
- ✅ `frontend/src/mocks/menuMock.ts` - Mock 데이터

### 수정된 파일
- ✅ `frontend/src/hooks/useMenus.ts` - Mock 데이터 폴백 추가
- ✅ `frontend/src/pages/HomePage.tsx` - Mock 데이터 경고 표시

---

## ✅ 개선 효과

### 1. 개발 경험 개선
- ✅ 백엔드 없이도 프런트엔드 개발 가능
- ✅ Network Error로 인한 개발 중단 방지
- ✅ 빠른 프로토타이핑 가능

### 2. 사용자 경험 개선
- ✅ 에러 대신 Mock 데이터로 기능 사용 가능
- ✅ 명확한 상태 표시 (Mock 데이터 사용 중)
- ✅ 백엔드 연결 시 자동 전환

### 3. 유연성 향상
- ✅ 환경 변수로 Mock 데이터 제어
- ✅ 개발/프로덕션 환경 자동 감지
- ✅ 점진적 API 연동 가능

---

## 🚀 사용 방법

### 1. Mock 데이터 강제 사용
`.env.local` 파일 생성:
```env
VITE_USE_MOCK_DATA=true
```

### 2. 백엔드 서버 연결
백엔드 서버 실행:
```bash
cd backend
npm run dev
```

### 3. 자동 폴백 (기본 동작)
- 개발 환경에서 백엔드 연결 실패 시 자동으로 Mock 데이터 사용
- 별도 설정 불필요

---

## 📝 향후 개선 사항

### 1. 추가 Mock 데이터
- [ ] 주문 Mock 데이터
- [ ] 재고 Mock 데이터
- [ ] 사용자 Mock 데이터

### 2. Mock API 서버
- [ ] MSW (Mock Service Worker) 도입 검토
- [ ] 더 현실적인 API 응답 시뮬레이션

### 3. 에러 처리 개선
- [ ] 재시도 로직 추가
- [ ] 오프라인 모드 지원
- [ ] 더 상세한 에러 메시지

---

## 🎯 검증 결과

### 시나리오 테스트
1. ✅ 백엔드 서버 실행 중: 실제 API 데이터 사용
2. ✅ 백엔드 서버 미실행: Mock 데이터 자동 사용
3. ✅ `VITE_USE_MOCK_DATA=true`: 강제 Mock 데이터 사용
4. ✅ 에러 메시지 표시: Mock 데이터 사용 중 경고 표시

### 린터 검사
- ✅ 모든 파일에서 린터 오류 없음
- ✅ TypeScript 타입 체크 통과

---

## 🎉 결론

Network Error 문제를 해결하고, 백엔드 서버가 없어도 프런트엔드 개발이 가능하도록 개선했습니다. Mock 데이터 시스템을 구축하여:

1. ✅ 개발 경험 대폭 개선
2. ✅ 사용자 경험 향상
3. ✅ 유연한 개발 환경 제공

이제 백엔드 서버 없이도 프런트엔드 기능을 개발하고 테스트할 수 있습니다.

---

**작성자**: AI Assistant  
**검토 상태**: ✅ 완료  
**다음 단계**: 추가 Mock 데이터 및 오프라인 모드 지원

