/**
 * 공통 타입 정의
 * 모든 컴포넌트에서 사용하는 타입을 중앙에서 관리
 */

/**
 * 장바구니 항목
 */
export interface CartItem {
  id: string;
  menuId: string;
  menuName: string;
  price: number;
  options: string[];
  quantity: number;
}

/**
 * 주문 정보
 */
export interface Order {
  id: string;
  menuName: string;
  quantity: number;
  price: number;
  status: '주문접수' | '제조중' | '제조완료';
  createdAt: Date | string;
}

/**
 * 메뉴 정보
 */
export interface Menu {
  id: string;
  name: string;
  price: number;
  description?: string;
}

/**
 * 재고 항목
 */
export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
}

/**
 * 대시보드 통계
 */
export interface DashboardStats {
  totalOrders: number;
  receivedOrders: number;
  inProgressOrders: number;
  completedOrders: number;
}

