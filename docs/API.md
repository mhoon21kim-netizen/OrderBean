# OlderBean API 문서

## 기본 정보

- Base URL: `http://localhost:8000/api`
- 인증 방식: JWT Bearer Token
- Content-Type: `application/json`

## 인증 (Authentication)

### 회원가입

```http
POST /api/auth/register
```

**Request Body:**
```json
{
  "name": "홍길동",
  "email": "user@example.com",
  "password": "password123",
  "role": "user"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "홍길동",
    "email": "user@example.com",
    "role": "user"
  }
}
```

### 로그인

```http
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "홍길동",
    "email": "user@example.com",
    "role": "user"
  }
}
```

## 메뉴 (Menu)

### 메뉴 목록 조회

```http
GET /api/menus
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "아메리카노",
    "price": 4500,
    "description": "진한 에스프레소에 물을 더한 커피",
    "image": "https://example.com/americano.jpg",
    "created_at": "2024-01-01T00:00:00Z"
  }
]
```

### 메뉴 상세 조회

```http
GET /api/menus/:id
```

**Response:**
```json
{
  "id": 1,
  "name": "아메리카노",
  "price": 4500,
  "description": "진한 에스프레소에 물을 더한 커피",
  "options": {
    "size": ["small", "medium", "large"],
    "shot": ["1", "2", "3"],
    "syrup": ["vanilla", "caramel", "hazelnut"]
  },
  "image": "https://example.com/americano.jpg",
  "created_at": "2024-01-01T00:00:00Z"
}
```

### 메뉴 생성 (관리자)

```http
POST /api/menus
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "name": "카페라떼",
  "price": 5000,
  "description": "에스프레소에 스팀 밀크를 더한 커피",
  "options": {
    "size": ["small", "medium", "large"],
    "shot": ["1", "2"],
    "syrup": ["vanilla", "caramel"]
  }
}
```

### 메뉴 수정 (관리자)

```http
PATCH /api/menus/:id
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "name": "카페라떼",
  "price": 5500,
  "description": "업데이트된 설명"
}
```

### 메뉴 삭제 (관리자)

```http
DELETE /api/menus/:id
Authorization: Bearer <admin_token>
```

## 주문 (Order)

### 주문 생성

```http
POST /api/orders
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "items": [
    {
      "menu_id": 1,
      "quantity": 2,
      "options": {
        "size": "large",
        "shot": "2",
        "syrup": "vanilla"
      }
    }
  ]
}
```

**Response:**
```json
{
  "id": 1,
  "user_id": 1,
  "status": "접수",
  "items": [
    {
      "id": 1,
      "menu_id": 1,
      "menu_name": "아메리카노",
      "quantity": 2,
      "price": 4500,
      "options": {
        "size": "large",
        "shot": "2",
        "syrup": "vanilla"
      }
    }
  ],
  "total_price": 9000,
  "created_at": "2024-01-01T00:00:00Z"
}
```

### 주문 내역 조회

```http
GET /api/orders
Authorization: Bearer <token>
```

**Query Parameters:**
- `limit` (optional): 페이지당 항목 수 (기본값: 10)
- `offset` (optional): 페이지 오프셋 (기본값: 0)

**Response:**
```json
[
  {
    "id": 1,
    "user_id": 1,
    "status": "완료",
    "items": [...],
    "total_price": 9000,
    "created_at": "2024-01-01T00:00:00Z"
  }
]
```

### 주문 상세 조회

```http
GET /api/orders/:id
Authorization: Bearer <token>
```

**Response:**
```json
{
  "id": 1,
  "user_id": 1,
  "status": "접수",
  "items": [...],
  "total_price": 9000,
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

### 주문 상태 업데이트 (관리자)

```http
PATCH /api/orders/:id/status
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "status": "제조중"
}
```

**가능한 상태 값:**
- `접수`
- `제조중`
- `완료`
- `취소`

## 에러 응답

모든 에러는 다음 형식으로 반환됩니다:

```json
{
  "error": {
    "message": "에러 메시지",
    "code": "ERROR_CODE"
  }
}
```

### 에러 코드

- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Internal Server Error

