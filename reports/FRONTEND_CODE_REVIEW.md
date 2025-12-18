# 프런트엔드 코드 리뷰 및 개선 사항

## 🔍 발견된 코드 스멜 및 개선 사항

### 1. **타입 정의 중복 (Type Duplication)**

**문제점:**
- `CartItem` 인터페이스가 `HomePage.tsx`와 `ShoppingCart.tsx`에 중복 정의됨
- `Order` 인터페이스가 `AdminPage.tsx`와 `OrderStatus.tsx`에 중복 정의됨

**위치:**
- `frontend/src/pages/HomePage.tsx:5-12`
- `frontend/src/components/ShoppingCart.tsx:1-8`
- `frontend/src/pages/AdminPage.tsx:6-13`
- `frontend/src/components/OrderStatus.tsx:1-8`

**개선 방안:**
- 공통 타입을 `src/types/` 디렉토리에 중앙 집중화
- `types/index.ts` 파일 생성하여 모든 타입 정의 통합

---

### 2. **인라인 스타일 남용 (Inline Styles Overuse)**

**문제점:**
- 모든 컴포넌트에서 인라인 스타일을 사용하여 코드 가독성 저하
- 스타일 재사용 불가능
- 일관성 있는 디자인 시스템 부재
- 테마 변경이나 반응형 디자인 적용 어려움

**위치:**
- 모든 컴포넌트 파일에서 발견

**개선 방안:**
- CSS Modules 또는 styled-components 도입
- 또는 Tailwind CSS 같은 유틸리티 CSS 프레임워크 사용
- 최소한 공통 스타일을 별도 파일로 분리

---

### 3. **매직 넘버/문자열 (Magic Numbers/Strings)**

**문제점:**
- 하드코딩된 값들이 코드 전반에 산재
- 옵션 가격 (`500원`), 재고 임계값 (`5개`) 등이 직접 하드코딩됨

**위치:**
- `MenuCard.tsx:65` - "샷 추가 (+500원)"
- `HomePage.tsx:44` - `options.includes('샷 추가') ? 500 : 0`
- `InventoryStatus.tsx:15` - `quantity < 5`

**개선 방안:**
- 상수 파일(`constants/index.ts`) 생성
- 설정값을 중앙에서 관리

---

### 4. **상태 관리 부재 (Missing State Management)**

**문제점:**
- 전역 상태 관리 라이브러리 없이 로컬 상태만 사용
- 장바구니 상태가 `HomePage`에만 존재하여 다른 페이지에서 접근 불가
- 주문 데이터가 `AdminPage`에만 존재하여 실제 API 연동 시 문제 발생 가능

**위치:**
- `HomePage.tsx:37` - `cartItems` 상태
- `AdminPage.tsx:16, 27` - `orders`, `inventory` 상태

**개선 방안:**
- Context API 또는 Zustand/Redux 같은 상태 관리 라이브러리 도입
- 전역 상태와 로컬 상태의 명확한 구분

---

### 5. **API 서비스 레이어 부재 (Missing API Service Layer)**

**문제점:**
- `services/` 디렉토리가 비어있음
- API 호출 로직이 없어 실제 백엔드와 연동 불가
- Mock 데이터가 컴포넌트 내부에 하드코딩됨

**위치:**
- `HomePage.tsx:15-34` - `mockMenus` 하드코딩
- `AdminPage.tsx:16-31` - Mock 데이터 하드코딩

**개선 방안:**
- `services/api.ts` 파일 생성
- Axios 인스턴스 설정 및 API 엔드포인트 함수 정의
- Custom hooks (`useMenus`, `useOrders` 등) 생성

---

### 6. **에러 처리 부재 (Missing Error Handling)**

**문제점:**
- API 호출 실패, 네트워크 오류 등에 대한 에러 처리 없음
- 사용자에게 에러 상황을 알리는 UI 없음
- 로딩 상태 표시 없음

**개선 방안:**
- Error Boundary 컴포넌트 추가
- API 호출 시 try-catch 및 에러 상태 관리
- 로딩 스피너 및 에러 메시지 UI 추가

---

### 7. **접근성 (Accessibility) 문제**

**문제점:**
- 버튼에 `aria-label`이 일부만 존재
- 키보드 네비게이션 고려 부족
- 시맨틱 HTML 요소 미사용 (`<header>`, `<main>`, `<nav>` 등)

**위치:**
- `Header.tsx` - `<header>` 태그는 사용하지만 `<nav>` 미사용
- 대부분의 버튼에 접근성 속성 부족

**개선 방안:**
- ARIA 속성 추가
- 시맨틱 HTML 구조 개선
- 키보드 포커스 관리

---

### 8. **컴포넌트 책임 분리 부족 (Poor Separation of Concerns)**

**문제점:**
- `MenuCard` 컴포넌트가 옵션 로직을 내부에 포함
- 옵션 데이터가 하드코딩되어 확장성 부족

**위치:**
- `MenuCard.tsx:58-75` - 옵션 체크박스 하드코딩

**개선 방안:**
- 옵션을 props로 받도록 변경
- 옵션 컴포넌트 분리

---

### 9. **날짜 포맷팅 로직 중복 가능성**

**문제점:**
- `formatDate` 함수가 `OrderStatus` 컴포넌트 내부에만 존재
- 다른 곳에서도 날짜 포맷팅이 필요할 수 있음

**위치:**
- `OrderStatus.tsx:16-22`

**개선 방안:**
- 유틸리티 함수로 분리 (`utils/date.ts`)
- 또는 date-fns 같은 라이브러리 사용

---

### 10. **타입 안정성 문제**

**문제점:**
- `Date.now().toString()`을 ID로 사용하여 타입 안정성 부족
- `createdAt: Date`로 정의했지만 실제로는 문자열일 수 있음

**위치:**
- `HomePage.tsx:65` - `id: Date.now().toString()`
- `AdminPage.tsx:23` - `createdAt: new Date('2024-07-31T13:00:00')`

**개선 방안:**
- UUID 라이브러리 사용
- 날짜 타입을 string 또는 Date로 일관성 있게 정의

---

### 11. **이벤트 핸들러 인라인 스타일 조작**

**문제점:**
- React의 선언적 패턴을 위반
- `onMouseEnter/Leave`에서 직접 스타일 조작

**위치:**
- `ShoppingCart.tsx:136-145`

**개선 방안:**
- CSS 클래스와 상태를 사용하여 스타일 관리
- 또는 CSS-in-JS 라이브러리 사용

---

### 12. **테스트 커버리지 확인 필요**

**문제점:**
- 테스트 파일은 존재하지만 실제 구현과의 동기화 확인 필요
- 컴포넌트들이 테스트 가능한 구조인지 검증 필요

**개선 방안:**
- 테스트 실행 및 커버리지 확인
- 테스트 가능한 구조로 리팩토링

---

### 13. **환경 변수 관리 부재**

**문제점:**
- API URL이 하드코딩되어 있거나 설정 파일 없음
- 개발/프로덕션 환경 구분 없음

**개선 방안:**
- `.env` 파일 사용
- Vite의 환경 변수 기능 활용

---

### 14. **코드 주석 및 문서화 부족**

**문제점:**
- 복잡한 로직에 대한 주석 부족
- 컴포넌트 props에 대한 JSDoc 주석 없음

**개선 방안:**
- 중요한 비즈니스 로직에 주석 추가
- JSDoc 주석으로 컴포넌트 문서화

---

### 15. **성능 최적화 부재**

**문제점:**
- `useMemo`, `useCallback` 같은 최적화 훅 미사용
- 불필요한 리렌더링 가능성

**위치:**
- `HomePage.tsx:39-74` - `handleAddToCart` 함수
- `AdminPage.tsx:49-54` - `dashboardStats` 계산

**개선 방안:**
- `useMemo`로 계산된 값 메모이제이션
- `useCallback`으로 함수 메모이제이션
- React.memo로 컴포넌트 메모이제이션

---

## 📊 우선순위별 개선 권장 사항

### 🔴 높은 우선순위 (즉시 개선 권장)
1. **타입 정의 중복 해결** - 유지보수성에 직접적 영향
2. **API 서비스 레이어 구축** - 실제 기능 구현을 위해 필수
3. **에러 처리 추가** - 사용자 경험 및 안정성
4. **상태 관리 개선** - 확장성 및 유지보수성

### 🟡 중간 우선순위 (단기 개선 권장)
5. **인라인 스타일 개선** - 코드 가독성 및 유지보수성
6. **매직 넘버/문자열 상수화** - 설정 관리 용이성
7. **컴포넌트 책임 분리** - 재사용성 및 테스트 용이성
8. **유틸리티 함수 분리** - 코드 재사용성

### 🟢 낮은 우선순위 (장기 개선 권장)
9. **접근성 개선** - 사용자 경험 향상
10. **성능 최적화** - 대규모 데이터 처리 시 중요
11. **문서화 개선** - 팀 협업 및 유지보수
12. **환경 변수 관리** - 배포 및 환경 구분

---

## 🛠️ 구체적인 리팩토링 제안

### 1. 타입 정의 통합
```typescript
// src/types/index.ts
export interface CartItem {
  id: string;
  menuId: string;
  menuName: string;
  price: number;
  options: string[];
  quantity: number;
}

export interface Order {
  id: string;
  menuName: string;
  quantity: number;
  price: number;
  status: '주문접수' | '제조중' | '제조완료';
  createdAt: Date | string;
}

export interface Menu {
  id: string;
  name: string;
  price: number;
  description?: string;
}
```

### 2. 상수 파일 생성
```typescript
// src/constants/index.ts
export const OPTION_PRICES = {
  SHOT_ADD: 500,
  SYRUP_ADD: 0,
} as const;

export const INVENTORY_THRESHOLDS = {
  WARNING: 5,
  OUT_OF_STOCK: 0,
} as const;

export const ORDER_STATUS = {
  RECEIVED: '주문접수',
  IN_PROGRESS: '제조중',
  COMPLETED: '제조완료',
} as const;
```

### 3. API 서비스 레이어
```typescript
// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
});

export const menuService = {
  getAll: () => api.get('/menus'),
  getById: (id: string) => api.get(`/menus/${id}`),
};

export const orderService = {
  create: (data: CreateOrderDto) => api.post('/orders', data),
  getAll: () => api.get('/orders'),
  updateStatus: (id: string, status: string) => api.patch(`/orders/${id}`, { status }),
};
```

---

## 📝 결론

현재 코드는 기본적인 기능은 구현되어 있으나, 프로덕션 환경에 배포하기 전에 상당한 리팩토링이 필요합니다. 특히 타입 정의 중복, API 서비스 레이어 부재, 에러 처리 부족 등은 우선적으로 개선해야 할 사항입니다.

단계적으로 개선을 진행하면서 테스트를 유지하고, 각 단계마다 기능이 정상 작동하는지 확인하는 것이 중요합니다.

