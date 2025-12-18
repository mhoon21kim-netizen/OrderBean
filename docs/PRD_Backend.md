# OrderBean 백엔드 개발 PRD (Backend Development PRD)

**문서 버전**: 1.0  
**작성 일자**: 2024-12-16  
**기술 스택**: Python FastAPI + PostgreSQL + SQLAlchemy

---

## 1. 개요 (Overview)

본 문서는 OrderBean 프로젝트의 **백엔드 개발**을 위한 상세 요구사항 명세서입니다.  
프론트엔드와의 API 통신을 담당하는 RESTful API 서버 개발을 위한 기술적 요구사항과 구현 가이드를 제공합니다.

### 1.1 목표

- **RESTful API 설계**: 표준 HTTP 메서드와 상태 코드 사용
- **타입 안정성**: Pydantic을 통한 요청/응답 검증
- **비동기 처리**: FastAPI의 async/await 활용
- **확장 가능한 구조**: 모듈화된 코드 구조
- **자동 문서화**: OpenAPI/Swagger 자동 생성

### 1.2 참고 문서

- `PRD_Up1.md`: 전체 프로젝트 PRD
- `API.md`: API 엔드포인트 상세 명세
- `INSTALLATION.md`: 설치 및 환경 설정 가이드

---

## 2. 데이터 모델 (Data Models)

### 2.1 데이터베이스 스키마 설계

#### 2.1.1 Menus (메뉴)

**목적**: 커피 메뉴 정보를 저장하는 테이블

**필드 정의**:

| 필드명 | 타입 | 제약조건 | 설명 |
|--------|------|----------|------|
| `id` | UUID (Primary Key) | NOT NULL, AUTO | 메뉴 고유 식별자 |
| `name` | VARCHAR(100) | NOT NULL, UNIQUE | 커피 이름 |
| `description` | TEXT | NULL | 메뉴 설명 |
| `price` | DECIMAL(10, 2) | NOT NULL, >= 0 | 가격 (원) |
| `image_url` | VARCHAR(500) | NULL | 이미지 URL |
| `stock_quantity` | INTEGER | NOT NULL, DEFAULT 0, >= 0 | 재고 수량 |
| `is_available` | BOOLEAN | NOT NULL, DEFAULT true | 판매 가능 여부 |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | 생성 일시 |
| `updated_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | 수정 일시 |

**인덱스**:
- `idx_menus_name`: `name` 필드 (검색 최적화)
- `idx_menus_is_available`: `is_available` 필드 (필터링 최적화)

**SQLAlchemy 모델 예시**:
```python
class Menu(Base):
    __tablename__ = "menus"
    
    id = Column(UUID, primary_key=True, default=uuid.uuid4)
    name = Column(String(100), nullable=False, unique=True, index=True)
    description = Column(Text, nullable=True)
    price = Column(Numeric(10, 2), nullable=False)
    image_url = Column(String(500), nullable=True)
    stock_quantity = Column(Integer, nullable=False, default=0)
    is_available = Column(Boolean, nullable=False, default=True, index=True)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # 관계
    options = relationship("MenuOption", back_populates="menu", cascade="all, delete-orphan")
    order_items = relationship("OrderItem", back_populates="menu")
```

---

#### 2.1.2 Options (옵션)

**목적**: 메뉴에 연결된 옵션 정보를 저장하는 테이블

**필드 정의**:

| 필드명 | 타입 | 제약조건 | 설명 |
|--------|------|----------|------|
| `id` | UUID (Primary Key) | NOT NULL, AUTO | 옵션 고유 식별자 |
| `menu_id` | UUID (Foreign Key) | NOT NULL | 연결할 메뉴 ID |
| `name` | VARCHAR(100) | NOT NULL | 옵션 이름 (예: "샷 추가", "시럽 추가") |
| `price` | DECIMAL(10, 2) | NOT NULL, DEFAULT 0 | 옵션 가격 (원) |
| `is_required` | BOOLEAN | NOT NULL, DEFAULT false | 필수 옵션 여부 |
| `display_order` | INTEGER | NOT NULL, DEFAULT 0 | 표시 순서 |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | 생성 일시 |
| `updated_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | 수정 일시 |

**제약조건**:
- `menu_id`는 `menus.id`를 참조 (CASCADE DELETE)
- 같은 메뉴 내에서 `name`은 유일해야 함 (UNIQUE constraint on `menu_id`, `name`)

**인덱스**:
- `idx_options_menu_id`: `menu_id` 필드 (JOIN 최적화)
- `idx_options_display_order`: `display_order` 필드 (정렬 최적화)

**SQLAlchemy 모델 예시**:
```python
class MenuOption(Base):
    __tablename__ = "menu_options"
    
    id = Column(UUID, primary_key=True, default=uuid.uuid4)
    menu_id = Column(UUID, ForeignKey("menus.id", ondelete="CASCADE"), nullable=False, index=True)
    name = Column(String(100), nullable=False)
    price = Column(Numeric(10, 2), nullable=False, default=0)
    is_required = Column(Boolean, nullable=False, default=False)
    display_order = Column(Integer, nullable=False, default=0)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # 관계
    menu = relationship("Menu", back_populates="options")
    
    # 제약조건
    __table_args__ = (
        UniqueConstraint('menu_id', 'name', name='uq_menu_option_name'),
    )
```

---

#### 2.1.3 Orders (주문)

**목적**: 주문 정보를 저장하는 테이블

**필드 정의**:

| 필드명 | 타입 | 제약조건 | 설명 |
|--------|------|----------|------|
| `id` | UUID (Primary Key) | NOT NULL, AUTO | 주문 고유 식별자 |
| `user_id` | UUID (Foreign Key) | NOT NULL | 주문한 사용자 ID |
| `status` | ENUM | NOT NULL, DEFAULT '주문접수' | 주문 상태 |
| `total_price` | DECIMAL(10, 2) | NOT NULL, >= 0 | 총 주문 금액 |
| `order_date` | TIMESTAMP | NOT NULL, DEFAULT NOW() | 주문 일시 |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | 생성 일시 |
| `updated_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | 수정 일시 |

**주문 상태 (ENUM)**:
- `주문접수` (RECEIVED)
- `제조중` (IN_PROGRESS)
- `제조완료` (COMPLETED)
- `취소` (CANCELLED)

**인덱스**:
- `idx_orders_user_id`: `user_id` 필드 (사용자별 조회 최적화)
- `idx_orders_status`: `status` 필드 (상태별 필터링 최적화)
- `idx_orders_order_date`: `order_date` 필드 (날짜별 정렬 최적화)

**SQLAlchemy 모델 예시**:
```python
class OrderStatus(str, Enum):
    RECEIVED = "주문접수"
    IN_PROGRESS = "제조중"
    COMPLETED = "제조완료"
    CANCELLED = "취소"

class Order(Base):
    __tablename__ = "orders"
    
    id = Column(UUID, primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID, ForeignKey("users.id"), nullable=False, index=True)
    status = Column(Enum(OrderStatus), nullable=False, default=OrderStatus.RECEIVED, index=True)
    total_price = Column(Numeric(10, 2), nullable=False)
    order_date = Column(DateTime, nullable=False, default=datetime.utcnow, index=True)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # 관계
    user = relationship("User", back_populates="orders")
    items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")
```

---

#### 2.1.4 OrderItems (주문 상세 항목)

**목적**: 주문에 포함된 각 메뉴 항목의 상세 정보를 저장하는 테이블

**필드 정의**:

| 필드명 | 타입 | 제약조건 | 설명 |
|--------|------|----------|------|
| `id` | UUID (Primary Key) | NOT NULL, AUTO | 주문 항목 고유 식별자 |
| `order_id` | UUID (Foreign Key) | NOT NULL | 주문 ID |
| `menu_id` | UUID (Foreign Key) | NOT NULL | 메뉴 ID |
| `quantity` | INTEGER | NOT NULL, > 0 | 수량 |
| `unit_price` | DECIMAL(10, 2) | NOT NULL, >= 0 | 단가 (메뉴 가격 + 옵션 가격) |
| `total_price` | DECIMAL(10, 2) | NOT NULL, >= 0 | 항목 총액 (단가 × 수량) |
| `selected_options` | JSON | NOT NULL | 선택된 옵션 정보 (옵션 ID 배열) |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | 생성 일시 |

**selected_options JSON 구조**:
```json
{
  "option_ids": ["uuid1", "uuid2"],
  "option_names": ["샷 추가", "시럽 추가"],
  "option_prices": [500, 0]
}
```

**인덱스**:
- `idx_order_items_order_id`: `order_id` 필드 (JOIN 최적화)
- `idx_order_items_menu_id`: `menu_id` 필드 (JOIN 최적화)

**SQLAlchemy 모델 예시**:
```python
class OrderItem(Base):
    __tablename__ = "order_items"
    
    id = Column(UUID, primary_key=True, default=uuid.uuid4)
    order_id = Column(UUID, ForeignKey("orders.id", ondelete="CASCADE"), nullable=False, index=True)
    menu_id = Column(UUID, ForeignKey("menus.id"), nullable=False, index=True)
    quantity = Column(Integer, nullable=False)
    unit_price = Column(Numeric(10, 2), nullable=False)
    total_price = Column(Numeric(10, 2), nullable=False)
    selected_options = Column(JSON, nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    
    # 관계
    order = relationship("Order", back_populates="items")
    menu = relationship("Menu", back_populates="order_items")
```

---

#### 2.1.5 Users (사용자) - 참고

**목적**: 사용자 인증 및 권한 관리

**필드 정의**:

| 필드명 | 타입 | 제약조건 | 설명 |
|--------|------|----------|------|
| `id` | UUID (Primary Key) | NOT NULL, AUTO | 사용자 고유 식별자 |
| `email` | VARCHAR(255) | NOT NULL, UNIQUE | 이메일 |
| `name` | VARCHAR(100) | NOT NULL | 이름 |
| `hashed_password` | VARCHAR(255) | NOT NULL | 해시된 비밀번호 |
| `role` | ENUM | NOT NULL, DEFAULT 'user' | 역할 (user, admin) |
| `is_active` | BOOLEAN | NOT NULL, DEFAULT true | 활성 상태 |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | 생성 일시 |

---

### 2.2 엔티티 관계도 (ERD)

```
Users (1) ────< (N) Orders
                        │
                        │ (1)
                        │
                        └───< (N) OrderItems
                                    │
                                    │ (N)
                                    │
Menus (1) ──────────────────────────┘
    │
    │ (1)
    │
    └───< (N) MenuOptions
```

**관계 설명**:
- **Users ↔ Orders**: 1:N (한 사용자는 여러 주문 가능)
- **Orders ↔ OrderItems**: 1:N (한 주문은 여러 주문 항목 포함)
- **Menus ↔ OrderItems**: 1:N (한 메뉴는 여러 주문 항목에 포함)
- **Menus ↔ MenuOptions**: 1:N (한 메뉴는 여러 옵션을 가질 수 있음)

---

## 3. 데이터 스키마를 위한 사용자 흐름 (User Flow for Data Schema)

### 3.1 고객 주문 흐름

#### 3.1.1 메뉴 조회 및 표시

**흐름**:
1. 프론트엔드에서 `GET /api/menus` API 호출
2. 백엔드가 `Menus` 테이블에서 메뉴 정보 조회
3. 응답 데이터:
   - 커피 이름 (`name`)
   - 설명 (`description`)
   - 가격 (`price`)
   - 이미지 URL (`image_url`)
   - 옵션 목록 (`options`)
   - **재고 수량 (`stock_quantity`)은 제외** (고객 화면에는 표시하지 않음)

**API 응답 예시**:
```json
[
  {
    "id": "uuid",
    "name": "아메리카노(ICE)",
    "description": "시원하고 깔끔한 아이스 아메리카노",
    "price": 4000,
    "image_url": "https://example.com/americano.jpg",
    "is_available": true,
    "options": [
      {
        "id": "uuid",
        "name": "샷 추가",
        "price": 500
      },
      {
        "id": "uuid",
        "name": "시럽 추가",
        "price": 0
      }
    ]
  }
]
```

**관리자 화면**:
- 관리자 API (`GET /api/admin/menus`)에서는 `stock_quantity` 포함
- 재고 수량을 관리자 대시보드에 표시

---

#### 3.1.2 장바구니에 메뉴 추가

**흐름**:
1. 사용자가 커피 메뉴 선택
2. 옵션 선택 (샷 추가, 시럽 추가 등)
3. 선택 정보를 프론트엔드 장바구니 상태에 저장
   - 메뉴 ID
   - 수량
   - 선택된 옵션 ID 목록
4. 장바구니 화면에 표시
   - 메뉴 이름
   - 수량
   - 선택된 옵션 이름
   - 항목별 가격 (메뉴 가격 + 옵션 가격) × 수량
   - 총 금액

**프론트엔드 상태 관리**:
- 장바구니는 프론트엔드에서 관리 (Context API)
- 주문 전까지는 데이터베이스에 저장하지 않음

---

#### 3.1.3 주문 생성 및 저장

**흐름**:
1. 사용자가 '주문하기' 버튼 클릭
2. 프론트엔드에서 `POST /api/orders` API 호출
3. 요청 본문:
```json
{
  "items": [
    {
      "menu_id": "uuid",
      "quantity": 2,
      "selected_option_ids": ["option_uuid1", "option_uuid2"]
    }
  ]
}
```

4. 백엔드 처리:
   - **재고 확인**: 주문 수량이 재고보다 많으면 에러 반환
   - **가격 계산**: 메뉴 가격 + 옵션 가격 합계
   - **주문 생성**: `Orders` 테이블에 저장
     - `order_date`: 현재 시간
     - `status`: '주문접수' (기본값)
     - `total_price`: 총 주문 금액
   - **주문 항목 생성**: `OrderItems` 테이블에 저장
     - 메뉴 ID
     - 수량
     - 선택된 옵션 정보 (JSON)
     - 단가 및 총액
   - **재고 차감**: `Menus.stock_quantity` 업데이트

5. 응답: 생성된 주문 정보 반환

**데이터베이스 저장 구조**:

**Orders 테이블**:
```sql
INSERT INTO orders (id, user_id, status, total_price, order_date)
VALUES (uuid, user_uuid, '주문접수', 9000, NOW());
```

**OrderItems 테이블**:
```sql
INSERT INTO order_items (id, order_id, menu_id, quantity, unit_price, total_price, selected_options)
VALUES (
  uuid,
  order_uuid,
  menu_uuid,
  2,
  4500,  -- 메뉴 가격(4000) + 옵션 가격(500)
  9000,  -- 단가(4500) × 수량(2)
  '{"option_ids": ["uuid1", "uuid2"], "option_names": ["샷 추가", "시럽 추가"]}'
);
```

**Menus 테이블 업데이트**:
```sql
UPDATE menus 
SET stock_quantity = stock_quantity - 2 
WHERE id = menu_uuid;
```

---

#### 3.1.4 관리자 주문 현황 표시

**흐름**:
1. 관리자가 관리자 화면 접속
2. 프론트엔드에서 `GET /api/admin/orders` API 호출
3. 백엔드가 `Orders` 테이블에서 모든 주문 조회
4. 주문 정보 반환:
   - 주문 ID
   - 주문 시간 (`order_date`)
   - 주문 상태 (`status`)
   - 주문 내용:
     - 메뉴 이름
     - 수량
     - 선택된 옵션
     - 금액
   - 총 주문 금액

5. 관리자 화면의 '주문 현황' 섹션에 표시

**API 응답 예시**:
```json
[
  {
    "id": "order_uuid",
    "user_id": "user_uuid",
    "status": "주문접수",
    "total_price": 9000,
    "order_date": "2024-12-16T14:30:00Z",
    "items": [
      {
        "id": "item_uuid",
        "menu_name": "아메리카노(ICE)",
        "quantity": 2,
        "unit_price": 4500,
        "total_price": 9000,
        "selected_options": {
          "option_names": ["샷 추가", "시럽 추가"]
        }
      }
    ]
  }
]
```

---

#### 3.1.5 주문 상태 변경

**흐름**:
1. 관리자가 주문 현황에서 '주문접수' 상태의 주문 확인
2. '제조시작' 버튼 클릭
3. 프론트엔드에서 `PATCH /api/orders/{order_id}/status` API 호출
4. 요청 본문:
```json
{
  "status": "제조중"
}
```

5. 백엔드 처리:
   - 주문 상태 검증 (유효한 상태 전이인지 확인)
   - `Orders.status` 필드 업데이트
   - `updated_at` 필드 자동 업데이트

6. 상태 전이:
   - `주문접수` → `제조중` (관리자가 '제조시작' 클릭)
   - `제조중` → `제조완료` (관리자가 '완료' 클릭)

7. 프론트엔드에서 주문 상태 실시간 업데이트

**상태 전이 규칙**:
- `주문접수` → `제조중` ✅
- `제조중` → `제조완료` ✅
- `제조완료` → 변경 불가 ❌
- `주문접수` → `취소` ✅ (사용자 또는 관리자)
- `제조중` → `취소` ✅ (관리자만)

---

### 3.2 관리자 메뉴 관리 흐름

#### 3.2.1 메뉴 목록 조회 (재고 포함)

**흐름**:
1. 관리자가 관리자 화면 접속
2. 프론트엔드에서 `GET /api/admin/menus` API 호출
3. 백엔드가 `Menus` 테이블에서 모든 메뉴 조회
4. 응답에 `stock_quantity` 포함
5. 관리자 화면에 재고 수량 표시

**API 응답 예시**:
```json
[
  {
    "id": "uuid",
    "name": "아메리카노(ICE)",
    "description": "시원하고 깔끔한 아이스 아메리카노",
    "price": 4000,
    "image_url": "https://example.com/americano.jpg",
    "stock_quantity": 98,  // 관리자만 볼 수 있음
    "is_available": true,
    "options": [...]
  }
]
```

---

## 4. API 설계 (API Design)

### 4.1 핵심 API 엔드포인트

#### 4.1.1 메뉴 목록 조회

**엔드포인트**: `GET /api/menus`

**설명**: '주문하기' 메뉴를 클릭하면 데이터베이스에서 커피 메뉴 목록을 불러와서 보여줍니다.

**인증**: 불필요

**Query Parameters**:
- `available_only` (boolean, optional): 판매 가능한 메뉴만 조회 (기본값: true)

**처리 로직**:
1. `Menus` 테이블에서 `is_available = true`인 메뉴 조회
2. 각 메뉴의 연결된 옵션 (`MenuOptions`) 조회
3. `stock_quantity` 필드는 응답에서 제외 (고객 화면용)
4. 메뉴 목록 반환

**응답 예시**:
```json
[
  {
    "id": "uuid-1",
    "name": "아메리카노(ICE)",
    "description": "시원하고 깔끔한 아이스 아메리카노",
    "price": 4000,
    "image_url": "https://example.com/americano.jpg",
    "is_available": true,
    "options": [
      {
        "id": "option-uuid-1",
        "name": "샷 추가",
        "price": 500,
        "is_required": false,
        "display_order": 1
      },
      {
        "id": "option-uuid-2",
        "name": "시럽 추가",
        "price": 0,
        "is_required": false,
        "display_order": 2
      }
    ]
  },
  {
    "id": "uuid-2",
    "name": "카페라떼",
    "description": "부드러운 우유와 에스프레소의 조화",
    "price": 5000,
    "image_url": "https://example.com/latte.jpg",
    "is_available": true,
    "options": [...]
  }
]
```

---

#### 4.1.2 주문 생성

**엔드포인트**: `POST /api/orders`

**설명**: 사용자가 커피를 선택하고 주문하기 버튼을 누르면, 주문정보를 데이터베이스에 저장합니다.

**인증**: 필요 (JWT 토큰)

**요청 본문**:
```json
{
  "items": [
    {
      "menu_id": "uuid-1",
      "quantity": 2,
      "selected_option_ids": ["option-uuid-1", "option-uuid-2"]
    },
    {
      "menu_id": "uuid-2",
      "quantity": 1,
      "selected_option_ids": ["option-uuid-3"]
    }
  ]
}
```

**처리 로직**:

1. **입력 검증**
   - 메뉴 ID 유효성 확인
   - 수량 > 0 확인
   - 옵션 ID 유효성 확인

2. **재고 확인**
   ```python
   for item in items:
       menu = get_menu(item.menu_id)
       if menu.stock_quantity < item.quantity:
           raise InsufficientStockError(
               menu_name=menu.name,
               requested=item.quantity,
               available=menu.stock_quantity
           )
   ```

3. **가격 계산**
   ```python
   total_order_price = 0
   for item in items:
       menu = get_menu(item.menu_id)
       option_price = sum(get_option_price(opt_id) for opt_id in item.selected_option_ids)
       unit_price = menu.price + option_price
       item_total = unit_price * item.quantity
       total_order_price += item_total
   ```

4. **트랜잭션 시작**
   ```python
   async with db.begin():
       # 주문 생성
       order = Order(
           user_id=current_user.id,
           status=OrderStatus.RECEIVED,
           total_price=total_order_price,
           order_date=datetime.utcnow()
       )
       db.add(order)
       await db.flush()  # order.id 생성
       
       # 주문 항목 생성
       for item in items:
           menu = get_menu(item.menu_id)
           option_price = sum(...)
           unit_price = menu.price + option_price
           
           order_item = OrderItem(
               order_id=order.id,
               menu_id=item.menu_id,
               quantity=item.quantity,
               unit_price=unit_price,
               total_price=unit_price * item.quantity,
               selected_options={
                   "option_ids": item.selected_option_ids,
                   "option_names": [get_option_name(opt_id) for opt_id in item.selected_option_ids],
                   "option_prices": [get_option_price(opt_id) for opt_id in item.selected_option_ids]
               }
           )
           db.add(order_item)
           
           # 재고 차감
           menu.stock_quantity -= item.quantity
           if menu.stock_quantity == 0:
               menu.is_available = False
       
       await db.commit()
   ```

5. **응답 반환**
   ```json
   {
     "id": "order-uuid",
     "user_id": "user-uuid",
     "status": "주문접수",
     "total_price": 14000,
     "order_date": "2024-12-16T14:30:00Z",
     "items": [
       {
         "id": "item-uuid-1",
         "menu_id": "uuid-1",
         "menu_name": "아메리카노(ICE)",
         "quantity": 2,
         "unit_price": 4500,
         "total_price": 9000,
         "selected_options": {
           "option_ids": ["option-uuid-1", "option-uuid-2"],
           "option_names": ["샷 추가", "시럽 추가"],
           "option_prices": [500, 0]
         }
       },
       {
         "id": "item-uuid-2",
         "menu_id": "uuid-2",
         "menu_name": "카페라떼",
         "quantity": 1,
         "unit_price": 5000,
         "total_price": 5000,
         "selected_options": {
           "option_ids": ["option-uuid-3"],
           "option_names": ["샷 추가"],
           "option_prices": [500]
         }
       }
     ],
     "created_at": "2024-12-16T14:30:00Z",
     "updated_at": "2024-12-16T14:30:00Z"
   }
   ```

**에러 처리**:
- `400 Bad Request`: 재고 부족, 잘못된 입력
- `404 Not Found`: 존재하지 않는 메뉴/옵션
- `401 Unauthorized`: 인증 실패

---

#### 4.1.3 재고 수정 (주문 시 자동)

**설명**: 주문정보에 따라 메뉴 목록의 재고도 수정합니다.

**처리 시점**: 주문 생성 시 자동으로 처리

**로직**:
```python
# 주문 생성 트랜잭션 내에서
for item in order_items:
    menu = await db.get(Menu, item.menu_id)
    
    # 재고 차감
    menu.stock_quantity -= item.quantity
    
    # 재고가 0이면 판매 불가 처리
    if menu.stock_quantity <= 0:
        menu.stock_quantity = 0
        menu.is_available = False
    
    # 재고가 부족하면 경고 (선택사항)
    if menu.stock_quantity < 5:
        # 로그 기록 또는 알림
        logger.warning(f"Low stock for menu {menu.name}: {menu.stock_quantity}")
```

**재고 복구 (주문 취소 시)**:
```python
# 주문 취소 시
for item in order.items:
    menu = await db.get(Menu, item.menu_id)
    menu.stock_quantity += item.quantity
    if not menu.is_available and menu.stock_quantity > 0:
        menu.is_available = True
```

---

#### 4.1.4 주문 상세 조회

**엔드포인트**: `GET /api/orders/{order_id}`

**설명**: 주문ID를 전달하면 해당 주문정보를 보여줍니다.

**인증**: 필요

**권한**: 본인 주문 또는 관리자만 조회 가능

**처리 로직**:
1. 주문 ID로 `Orders` 테이블 조회
2. 권한 확인 (본인 주문인지 또는 관리자인지)
3. 연결된 `OrderItems` 조회
4. 각 주문 항목의 메뉴 정보 조인
5. 주문 상세 정보 반환

**응답 예시**:
```json
{
  "id": "order-uuid",
  "user_id": "user-uuid",
  "status": "주문접수",
  "total_price": 14000,
  "order_date": "2024-12-16T14:30:00Z",
  "items": [
    {
      "id": "item-uuid-1",
      "menu_id": "uuid-1",
      "menu_name": "아메리카노(ICE)",
      "menu_price": 4000,
      "quantity": 2,
      "unit_price": 4500,
      "total_price": 9000,
      "selected_options": {
        "option_ids": ["option-uuid-1", "option-uuid-2"],
        "option_names": ["샷 추가", "시럽 추가"],
        "option_prices": [500, 0]
      }
    }
  ],
  "created_at": "2024-12-16T14:30:00Z",
  "updated_at": "2024-12-16T14:30:00Z"
}
```

---

### 4.2 관리자 API

#### 4.2.1 관리자 메뉴 목록 조회 (재고 포함)

**엔드포인트**: `GET /api/admin/menus`

**인증**: 필요 (관리자 권한)

**응답**: 고객용 API와 동일하지만 `stock_quantity` 필드 포함

```json
[
  {
    "id": "uuid",
    "name": "아메리카노(ICE)",
    "description": "시원하고 깔끔한 아이스 아메리카노",
    "price": 4000,
    "image_url": "https://example.com/americano.jpg",
    "stock_quantity": 98,  // 관리자만 볼 수 있음
    "is_available": true,
    "options": [...]
  }
]
```

#### 4.2.2 관리자 주문 목록 조회

**엔드포인트**: `GET /api/admin/orders`

**인증**: 필요 (관리자 권한)

**Query Parameters**:
- `status` (string, optional): 상태 필터
- `limit` (integer, optional): 페이지당 항목 수
- `offset` (integer, optional): 페이지 오프셋

**응답**: 모든 사용자의 주문 목록 (최신순)

---

## 5. API 엔드포인트 상세 명세

### 3.1 인증 API (`/api/auth`)

#### 3.1.1 회원가입
- **엔드포인트**: `POST /api/auth/register`
- **인증**: 불필요
- **요청 본문**:
```json
{
  "name": "홍길동",
  "email": "user@example.com",
  "password": "password123",
  "role": "user"
}
```
- **응답**: JWT 토큰 및 사용자 정보

#### 3.1.2 로그인
- **엔드포인트**: `POST /api/auth/login`
- **인증**: 불필요
- **요청 본문**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
- **응답**: JWT 토큰 및 사용자 정보

---

### 3.2 메뉴 API (`/api/menus`)

#### 3.2.1 메뉴 목록 조회
- **엔드포인트**: `GET /api/menus`
- **인증**: 불필요
- **Query Parameters**:
  - `available_only` (boolean, optional): 판매 가능한 메뉴만 조회
  - `limit` (integer, optional): 페이지당 항목 수
  - `offset` (integer, optional): 페이지 오프셋
- **응답**: 메뉴 목록 (옵션 정보 포함)

#### 3.2.2 메뉴 상세 조회
- **엔드포인트**: `GET /api/menus/{menu_id}`
- **인증**: 불필요
- **응답**: 메뉴 상세 정보 및 연결된 옵션 목록

#### 3.2.3 메뉴 생성 (관리자)
- **엔드포인트**: `POST /api/menus`
- **인증**: 필요 (관리자 권한)
- **요청 본문**:
```json
{
  "name": "아메리카노(ICE)",
  "description": "시원하고 깔끔한 아이스 아메리카노",
  "price": 4000,
  "image_url": "https://example.com/americano.jpg",
  "stock_quantity": 100,
  "options": [
    {
      "name": "샷 추가",
      "price": 500,
      "is_required": false,
      "display_order": 1
    },
    {
      "name": "시럽 추가",
      "price": 0,
      "is_required": false,
      "display_order": 2
    }
  ]
}
```

#### 3.2.4 메뉴 수정 (관리자)
- **엔드포인트**: `PATCH /api/menus/{menu_id}`
- **인증**: 필요 (관리자 권한)
- **요청 본문**: 부분 업데이트 가능 (모든 필드 optional)

#### 3.2.5 메뉴 삭제 (관리자)
- **엔드포인트**: `DELETE /api/menus/{menu_id}`
- **인증**: 필요 (관리자 권한)
- **비즈니스 로직**: 주문 이력이 있는 메뉴는 소프트 삭제 (is_available = false)

---

### 3.3 옵션 API (`/api/menus/{menu_id}/options`)

#### 3.3.1 옵션 목록 조회
- **엔드포인트**: `GET /api/menus/{menu_id}/options`
- **인증**: 불필요
- **응답**: 해당 메뉴의 옵션 목록

#### 3.3.2 옵션 추가 (관리자)
- **엔드포인트**: `POST /api/menus/{menu_id}/options`
- **인증**: 필요 (관리자 권한)
- **요청 본문**:
```json
{
  "name": "샷 추가",
  "price": 500,
  "is_required": false,
  "display_order": 1
}
```

#### 3.3.3 옵션 수정 (관리자)
- **엔드포인트**: `PATCH /api/menus/{menu_id}/options/{option_id}`
- **인증**: 필요 (관리자 권한)

#### 3.3.4 옵션 삭제 (관리자)
- **엔드포인트**: `DELETE /api/menus/{menu_id}/options/{option_id}`
- **인증**: 필요 (관리자 권한)

---

### 3.4 주문 API (`/api/orders`)

#### 3.4.1 주문 생성
- **엔드포인트**: `POST /api/orders`
- **인증**: 필요 (일반 사용자)
- **요청 본문**:
```json
{
  "items": [
    {
      "menu_id": "uuid",
      "quantity": 2,
      "selected_option_ids": ["option_uuid1", "option_uuid2"]
    }
  ]
}
```
- **비즈니스 로직**:
  1. 메뉴 존재 여부 확인
  2. 재고 수량 확인
  3. 옵션 유효성 검증
  4. 가격 계산 (메뉴 가격 + 옵션 가격) × 수량
  5. 주문 생성 및 재고 차감

#### 3.4.2 주문 내역 조회
- **엔드포인트**: `GET /api/orders`
- **인증**: 필요
- **Query Parameters**:
  - `status` (string, optional): 상태 필터
  - `limit` (integer, optional): 페이지당 항목 수
  - `offset` (integer, optional): 페이지 오프셋
- **응답**: 사용자 본인의 주문 목록 (최신순)

#### 3.4.3 주문 상세 조회
- **엔드포인트**: `GET /api/orders/{order_id}`
- **인증**: 필요
- **권한**: 본인 주문 또는 관리자만 조회 가능

#### 3.4.4 주문 상태 업데이트 (관리자)
- **엔드포인트**: `PATCH /api/orders/{order_id}/status`
- **인증**: 필요 (관리자 권한)
- **요청 본문**:
```json
{
  "status": "제조중"
}
```
- **상태 전이 규칙**:
  - `주문접수` → `제조중` → `제조완료`
  - `주문접수` → `취소`
  - `제조중` → `취소` (가능)
  - `제조완료` → 변경 불가
  - `취소` → 변경 불가

#### 3.4.5 주문 취소
- **엔드포인트**: `POST /api/orders/{order_id}/cancel`
- **인증**: 필요
- **권한**: 본인 주문 또는 관리자
- **비즈니스 로직**: 취소 시 재고 복구

---

### 3.5 관리자 API (`/api/admin`)

#### 3.5.1 주문 목록 조회 (전체)
- **엔드포인트**: `GET /api/admin/orders`
- **인증**: 필요 (관리자 권한)
- **Query Parameters**: 상태, 날짜 범위 필터링

#### 3.5.2 대시보드 통계
- **엔드포인트**: `GET /api/admin/dashboard`
- **인증**: 필요 (관리자 권한)
- **응답**:
```json
{
  "total_orders": 100,
  "received_orders": 10,
  "in_progress_orders": 5,
  "completed_orders": 85,
  "today_revenue": 500000
}
```

---

## 6. Pydantic 스키마 설계

### 4.1 요청 스키마 (Request Schemas)

#### MenuCreate
```python
class MenuCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    description: Optional[str] = None
    price: Decimal = Field(..., ge=0)
    image_url: Optional[HttpUrl] = None
    stock_quantity: int = Field(default=0, ge=0)
    options: Optional[List[MenuOptionCreate]] = []
```

#### MenuOptionCreate
```python
class MenuOptionCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    price: Decimal = Field(default=0, ge=0)
    is_required: bool = False
    display_order: int = Field(default=0, ge=0)
```

#### OrderCreate
```python
class OrderItemCreate(BaseModel):
    menu_id: UUID
    quantity: int = Field(..., gt=0)
    selected_option_ids: List[UUID] = []

class OrderCreate(BaseModel):
    items: List[OrderItemCreate] = Field(..., min_items=1)
```

### 4.2 응답 스키마 (Response Schemas)

#### MenuResponse
```python
class MenuOptionResponse(BaseModel):
    id: UUID
    name: str
    price: Decimal
    is_required: bool
    display_order: int

class MenuResponse(BaseModel):
    id: UUID
    name: str
    description: Optional[str]
    price: Decimal
    image_url: Optional[str]
    stock_quantity: int
    is_available: bool
    options: List[MenuOptionResponse] = []
    created_at: datetime
    updated_at: datetime
```

#### OrderResponse
```python
class OrderItemResponse(BaseModel):
    id: UUID
    menu_id: UUID
    menu_name: str
    quantity: int
    unit_price: Decimal
    total_price: Decimal
    selected_options: dict

class OrderResponse(BaseModel):
    id: UUID
    user_id: UUID
    status: str
    total_price: Decimal
    items: List[OrderItemResponse]
    order_date: datetime
    created_at: datetime
    updated_at: datetime
```

---

## 7. 비즈니스 로직 (Business Logic)

### 5.1 주문 생성 로직

1. **입력 검증**
   - 메뉴 ID 유효성 확인
   - 수량 > 0 확인
   - 옵션 ID 유효성 확인

2. **재고 확인**
   - 메뉴의 `stock_quantity` 확인
   - 주문 수량이 재고보다 많으면 에러 반환

3. **가격 계산**
   - 메뉴 기본 가격 조회
   - 선택된 옵션 가격 합산
   - 단가 = 메뉴 가격 + 옵션 가격 합계
   - 항목 총액 = 단가 × 수량
   - 주문 총액 = 모든 항목 총액 합계

4. **트랜잭션 처리**
   - 주문 생성
   - 주문 항목 생성
   - 재고 차감 (트랜잭션 내에서)

5. **에러 처리**
   - 재고 부족 시 400 Bad Request
   - 존재하지 않는 메뉴/옵션 시 404 Not Found
   - 트랜잭션 실패 시 롤백

### 5.2 주문 상태 변경 로직

1. **상태 전이 검증**
   - 유효한 상태 전이인지 확인
   - 완료/취소된 주문은 변경 불가

2. **재고 관리**
   - 취소 시 재고 복구
   - 상태 변경 시 로그 기록

### 5.3 메뉴 관리 로직

1. **메뉴 삭제**
   - 주문 이력이 있는 메뉴는 소프트 삭제
   - 주문 이력이 없는 메뉴는 하드 삭제 가능

2. **재고 관리**
   - 재고 수량 업데이트
   - 재고가 0이면 `is_available = false` 자동 설정

---

## 8. 인증 및 권한 (Authentication & Authorization)

### 6.1 JWT 토큰 기반 인증

- **토큰 생성**: `python-jose` 라이브러리 사용
- **토큰 만료**: 24시간 (설정 가능)
- **토큰 갱신**: Refresh Token (선택사항)

### 6.2 역할 기반 접근 제어 (RBAC)

- **일반 사용자 (user)**: 주문 생성, 본인 주문 조회
- **관리자 (admin)**: 모든 권한 (메뉴 관리, 주문 관리)

### 6.3 의존성 주입 (Dependencies)

```python
async def get_current_user(token: str = Depends(oauth2_scheme)) -> User:
    # JWT 토큰 검증 및 사용자 조회
    pass

async def get_current_admin_user(current_user: User = Depends(get_current_user)) -> User:
    # 관리자 권한 확인
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    return current_user
```

---

## 9. 에러 처리 (Error Handling)

### 7.1 에러 응답 형식

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "에러 메시지",
    "details": {}
  }
}
```

### 7.2 주요 에러 코드

| HTTP 상태 코드 | 에러 코드 | 설명 |
|--------------|----------|------|
| 400 | `INVALID_INPUT` | 잘못된 입력 |
| 400 | `INSUFFICIENT_STOCK` | 재고 부족 |
| 401 | `UNAUTHORIZED` | 인증 실패 |
| 403 | `FORBIDDEN` | 권한 없음 |
| 404 | `NOT_FOUND` | 리소스 없음 |
| 409 | `DUPLICATE_MENU` | 중복 메뉴명 |
| 500 | `INTERNAL_ERROR` | 서버 오류 |

### 7.3 커스텀 예외 처리

```python
class InsufficientStockError(HTTPException):
    def __init__(self, menu_name: str, requested: int, available: int):
        super().__init__(
            status_code=400,
            detail={
                "code": "INSUFFICIENT_STOCK",
                "message": f"{menu_name}의 재고가 부족합니다.",
                "details": {
                    "requested": requested,
                    "available": available
                }
            }
        )
```

---

## 10. 데이터베이스 마이그레이션 (Alembic)

### 8.1 마이그레이션 파일 구조

```
migrations/
├── versions/
│   ├── 001_initial_schema.py
│   ├── 002_add_menu_options.py
│   └── 003_add_order_items.py
└── alembic.ini
```

### 8.2 마이그레이션 명령어

```bash
# 마이그레이션 생성
alembic revision --autogenerate -m "description"

# 마이그레이션 적용
alembic upgrade head

# 마이그레이션 롤백
alembic downgrade -1
```

---

## 11. 테스트 전략 (Testing Strategy)

### 9.1 테스트 구조

```
tests/
├── conftest.py              # pytest 설정 및 fixtures
├── test_auth.py            # 인증 API 테스트
├── test_menus.py          # 메뉴 API 테스트
├── test_options.py        # 옵션 API 테스트
├── test_orders.py         # 주문 API 테스트
├── test_services/         # 서비스 레이어 테스트
│   ├── test_menu_service.py
│   └── test_order_service.py
└── test_integration.py    # 통합 테스트
```

### 9.2 테스트 커버리지 목표

- **단위 테스트**: 80% 이상
- **통합 테스트**: 주요 플로우 100%
- **API 엔드포인트**: 100% 커버리지

### 9.3 주요 테스트 케이스

#### 메뉴 API
- 메뉴 목록 조회 (인증 불필요)
- 메뉴 생성 (관리자 권한)
- 메뉴 수정 (관리자 권한)
- 메뉴 삭제 (관리자 권한)
- 중복 메뉴명 방지

#### 주문 API
- 주문 생성 (재고 확인)
- 주문 생성 (재고 부족 시 에러)
- 주문 내역 조회 (본인 주문만)
- 주문 상태 변경 (관리자)
- 주문 취소 (재고 복구)

---

## 12. 성능 최적화

### 10.1 데이터베이스 최적화

- **인덱스**: 자주 조회되는 필드에 인덱스 추가
- **쿼리 최적화**: N+1 쿼리 문제 방지 (eager loading)
- **연결 풀링**: SQLAlchemy connection pool 설정

### 10.2 API 최적화

- **비동기 처리**: FastAPI async/await 활용
- **페이지네이션**: 대량 데이터 조회 시 필수
- **캐싱**: Redis 통합 (선택사항)

---

## 13. 보안 고려사항

### 11.1 입력 검증

- **Pydantic 스키마**: 모든 입력 데이터 검증
- **SQL 인젝션 방지**: SQLAlchemy ORM 사용
- **XSS 방지**: 입력 데이터 이스케이프

### 11.2 인증 보안

- **비밀번호 해싱**: bcrypt 사용
- **JWT 시크릿**: 환경 변수로 관리
- **토큰 만료**: 적절한 만료 시간 설정

### 11.3 CORS 설정

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # 프론트엔드 URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 14. 로깅 및 모니터링

### 12.1 로깅

- **구조화된 로그**: JSON 형식
- **로그 레벨**: DEBUG, INFO, WARNING, ERROR
- **로깅 위치**: 파일 및 콘솔

### 12.2 모니터링

- **헬스 체크**: `/api/health` 엔드포인트
- **에러 추적**: Sentry 통합 (선택사항)
- **성능 모니터링**: APM 도구 (선택사항)

---

## 15. 배포 전략

### 13.1 환경 변수

```env
# 데이터베이스
DATABASE_URL=postgresql://user:password@localhost:5432/orderbean

# JWT
JWT_SECRET=your-secret-key
JWT_ALGORITHM=HS256
JWT_EXPIRATION_HOURS=24

# CORS
CORS_ORIGINS=http://localhost:3000

# 환경
ENVIRONMENT=development
```

### 13.2 Docker 설정 (선택사항)

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

---

## 16. 개발 가이드라인

### 14.1 코드 구조

```
app/
├── main.py                 # FastAPI 앱 진입점
├── config.py               # 설정 관리
├── database.py             # 데이터베이스 연결
├── models/                 # SQLAlchemy 모델
├── schemas/                # Pydantic 스키마
├── api/                    # API 라우터
│   ├── deps.py            # 의존성
│   └── routes/
│       ├── auth.py
│       ├── menus.py
│       └── orders.py
├── services/               # 비즈니스 로직
│   ├── menu_service.py
│   └── order_service.py
└── core/                   # 핵심 설정
    ├── security.py
    └── config.py
```

### 14.2 코딩 컨벤션

- **PEP 8**: Python 스타일 가이드 준수
- **타입 힌팅**: 모든 함수에 타입 힌팅
- **Docstring**: 모든 함수에 docstring 작성
- **에러 처리**: 명확한 에러 메시지

---

## 17. API 문서화

### 15.1 Swagger UI

- **URL**: `http://localhost:8000/docs`
- **자동 생성**: FastAPI가 자동으로 생성
- **인터랙티브 테스트**: 브라우저에서 직접 테스트 가능

### 15.2 ReDoc

- **URL**: `http://localhost:8000/redoc`
- **대체 문서 뷰어**: Swagger의 대안

---

## 18. 체크리스트

### 16.1 개발 전

- [ ] 데이터베이스 스키마 설계 완료
- [ ] API 엔드포인트 명세 완료
- [ ] Pydantic 스키마 정의 완료
- [ ] 테스트 계획 수립

### 16.2 개발 중

- [ ] SQLAlchemy 모델 구현
- [ ] API 라우터 구현
- [ ] 비즈니스 로직 구현
- [ ] 에러 처리 구현
- [ ] 단위 테스트 작성
- [ ] 통합 테스트 작성

### 16.3 배포 전

- [ ] 모든 테스트 통과
- [ ] API 문서 확인
- [ ] 보안 검토
- [ ] 성능 테스트
- [ ] 환경 변수 설정

---

## 19. 참고 자료

- [FastAPI 공식 문서](https://fastapi.tiangolo.com/)
- [SQLAlchemy 공식 문서](https://docs.sqlalchemy.org/)
- [Pydantic 공식 문서](https://docs.pydantic.dev/)
- [Alembic 공식 문서](https://alembic.sqlalchemy.org/)

---

**문서 버전**: 1.0  
**최종 업데이트**: 2024-12-16  
**작성자**: Development Team

