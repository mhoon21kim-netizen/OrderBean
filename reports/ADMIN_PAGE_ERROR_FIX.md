# 관리자 페이지 및 주문창 에러 해결 보고서

**작업 일자**: 2024-12-16  
**문제**: 
1. 관리자 페이지에서 Network Error 발생
2. 주문창의 Mock 데이터 경고 메시지가 에러처럼 보임
**상태**: ✅ 해결 완료

---

## 🔍 발견된 문제

### 1. 관리자 페이지 Network Error

**원인**:
- `useOrders` hook이 백엔드 서버에 주문 데이터를 요청
- 백엔드 서버가 실행되지 않아 Network Error 발생
- `useMenus`와 달리 Mock 데이터 폴백이 없음

**증상**:
- 관리자 대시보드에서 빨간색 에러 박스 표시
- "Network Error" 메시지
- 주문 데이터를 불러올 수 없음

### 2. 주문창 Mock 데이터 경고

**원인**:
- Mock 데이터 사용 중임을 알리는 경고 메시지
- 노란색 배경으로 에러처럼 보임
- 사용자가 이것을 에러로 오인

**증상**:
- "Mock 데이터 모드: 백엔드 서버에 연결할 수 없어 샘플 데이터를 표시합니다." 메시지
- 경고이지만 에러처럼 보이는 디자인

---

## 🔧 해결 방법

### 1. 주문 Mock 데이터 시스템 구축

#### 생성된 파일
- `frontend/src/mocks/orderMock.ts` - 주문 Mock 데이터

#### Mock 데이터 내용
```typescript
export const mockOrders: Order[] = [
  {
    id: '1',
    menuName: '아메리카노(ICE)',
    quantity: 1,
    price: 4000,
    status: ORDER_STATUS.RECEIVED, // 주문접수
    createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30분 전
  },
  {
    id: '2',
    menuName: '카페라떼',
    quantity: 2,
    price: 5000,
    status: ORDER_STATUS.IN_PROGRESS, // 제조중
    createdAt: new Date(Date.now() - 15 * 60 * 1000), // 15분 전
  },
  {
    id: '3',
    menuName: '아메리카노(HOT)',
    quantity: 1,
    price: 4000,
    status: ORDER_STATUS.COMPLETED, // 제조완료
    createdAt: new Date(Date.now() - 60 * 60 * 1000), // 1시간 전
  },
];
```

### 2. useOrders Hook 개선

#### 개선 사항
1. **Mock 데이터 자동 폴백**
   - Network Error 발생 시 개발 환경에서 자동으로 Mock 데이터 사용
   - `useMenus`와 동일한 패턴 적용

2. **Mock 모드에서 주문 생성/수정 지원**
   - Mock 데이터 모드에서도 주문 생성 가능
   - 주문 상태 변경도 로컬에서 작동

3. **isMockData 플래그 추가**
   - Mock 데이터 사용 여부를 반환
   - UI에서 상태 표시에 사용

#### 변경된 코드
```typescript
export const useOrders = (): UseOrdersReturn => {
  const [isMockData, setIsMockData] = useState<boolean>(false);

  const fetchOrders = async () => {
    // Mock 데이터 강제 사용
    if (config.useMockData) {
      setOrders(mockOrders);
      setIsMockData(true);
      return;
    }

    try {
      const data = await orderService.getAll();
      setOrders(data);
    } catch (err) {
      // 개발 환경에서 Network Error 시 Mock 데이터 사용
      if (config.isDevelopment && apiError.message.includes('Network Error')) {
        setOrders(mockOrders);
        setIsMockData(true);
        setError(null);
      }
    }
  };

  const createOrder = async (cartItems) => {
    // Mock 데이터 모드에서는 로컬에서 주문 생성
    if (isMockData || config.useMockData) {
      const newOrder: Order = {
        id: `mock-${Date.now()}`,
        // ... 주문 데이터 생성
      };
      setOrders((prev) => [newOrder, ...prev]);
      return newOrder;
    }
    // 실제 API 호출
  };

  const updateOrderStatus = async (id, status) => {
    // Mock 데이터 모드에서는 로컬에서 상태 업데이트
    if (isMockData || config.useMockData) {
      setOrders((prev) =>
        prev.map((order) => (order.id === id ? { ...order, status } : order))
      );
      return;
    }
    // 실제 API 호출
  };
};
```

### 3. UI 개선

#### 관리자 페이지
- Mock 데이터 사용 시 경고 메시지 표시
- 에러 대신 정보성 메시지로 변경

```typescript
{isMockData && (
  <div style={{...}}>
    ⚠️ Mock 데이터 모드: 백엔드 서버에 연결할 수 없어 샘플 데이터를 표시합니다. 
    주문 상태 변경은 로컬에서만 저장됩니다.
  </div>
)}
```

#### 주문창 (HomePage)
- 경고 메시지 디자인 개선
- 노란색(경고) → 파란색(정보)으로 변경
- 메시지 내용 개선: "개발 모드"로 명시

```typescript
{isMockData && (
  <div style={{...}}>
    ℹ️ 개발 모드: 백엔드 서버에 연결할 수 없어 샘플 메뉴를 표시합니다. 
    주문 기능은 로컬에서만 작동합니다.
  </div>
)}
```

---

## 📁 변경된 파일

### 생성된 파일
- ✅ `frontend/src/mocks/orderMock.ts` - 주문 Mock 데이터

### 수정된 파일
- ✅ `frontend/src/hooks/useOrders.ts` - Mock 데이터 폴백 추가
- ✅ `frontend/src/contexts/OrderContext.tsx` - isMockData 추가
- ✅ `frontend/src/pages/AdminPage.tsx` - Mock 데이터 경고 표시
- ✅ `frontend/src/pages/HomePage.tsx` - 경고 메시지 디자인 개선

---

## ✅ 개선 효과

### 1. 관리자 페이지
- ✅ Network Error 해결
- ✅ Mock 데이터로 대시보드 정상 표시
- ✅ 주문 상태 변경 기능 작동 (로컬)
- ✅ 명확한 상태 표시

### 2. 주문창
- ✅ 경고 메시지가 에러처럼 보이지 않음
- ✅ 정보성 메시지로 개선
- ✅ 사용자 혼란 감소

### 3. 개발 경험
- ✅ 백엔드 없이도 전체 기능 테스트 가능
- ✅ 주문 생성/수정 기능까지 Mock 모드에서 작동
- ✅ 일관된 Mock 데이터 시스템

---

## 🎯 기능 테스트

### Mock 데이터 모드에서 작동하는 기능

1. **메뉴 조회** ✅
   - Mock 메뉴 데이터 표시
   - 메뉴 카드 정상 작동

2. **장바구니** ✅
   - 메뉴 추가/제거
   - 수량 조정
   - 총 금액 계산

3. **주문 생성** ✅
   - Mock 모드에서 주문 생성
   - 로컬 상태에 저장
   - 관리자 페이지에서 확인 가능

4. **주문 관리** ✅
   - 주문 목록 표시
   - 주문 상태 변경 (로컬)
   - 대시보드 통계 표시

---

## 📝 사용 방법

### 백엔드 서버 없이 개발
1. 프런트엔드만 실행
2. 자동으로 Mock 데이터 사용
3. 모든 기능이 로컬에서 작동

### 백엔드 서버 연결 시
1. 백엔드 서버 실행
2. 자동으로 실제 API 데이터 사용
3. Mock 데이터 경고 메시지 사라짐

---

## 🎉 결론

관리자 페이지의 Network Error와 주문창의 경고 메시지 문제를 해결했습니다:

1. ✅ **관리자 페이지**: Mock 데이터 폴백으로 Network Error 해결
2. ✅ **주문창**: 경고 메시지를 정보성 메시지로 개선
3. ✅ **전체 기능**: Mock 모드에서도 주문 생성/수정 가능

이제 백엔드 서버 없이도 프런트엔드의 모든 기능을 개발하고 테스트할 수 있습니다.

---

**작성자**: AI Assistant  
**검토 상태**: ✅ 완료  
**다음 단계**: 추가 Mock 데이터 및 오프라인 모드 지원


