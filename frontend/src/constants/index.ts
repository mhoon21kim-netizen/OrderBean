/**
 * 상수 정의
 * 하드코딩된 값들을 중앙에서 관리
 */

/**
 * 옵션 가격
 */
export const OPTION_PRICES = {
  SHOT_ADD: 500,
  SYRUP_ADD: 0,
} as const;

/**
 * 옵션 이름
 */
export const OPTION_NAMES = {
  SHOT_ADD: '샷 추가',
  SYRUP_ADD: '시럽 추가',
} as const;

/**
 * 재고 임계값
 */
export const INVENTORY_THRESHOLDS = {
  WARNING: 5,
  OUT_OF_STOCK: 0,
} as const;

/**
 * 주문 상태
 */
export const ORDER_STATUS = {
  RECEIVED: '주문접수',
  IN_PROGRESS: '제조중',
  COMPLETED: '제조완료',
} as const;

/**
 * 주문 상태 타입
 */
export type OrderStatusType = typeof ORDER_STATUS[keyof typeof ORDER_STATUS];

/**
 * 색상 테마
 */
export const COLORS = {
  PRIMARY: '#4CAF50',
  PRIMARY_HOVER: '#45a049',
  SECONDARY: '#2196F3',
  WARNING: '#ff9800',
  ERROR: '#f44336',
  ERROR_DARK: '#c62828',
  SUCCESS: '#4CAF50',
  TEXT_PRIMARY: '#333',
  TEXT_SECONDARY: '#666',
  TEXT_LIGHT: '#999',
  BORDER: '#ddd',
  BORDER_LIGHT: '#e0e0e0',
  BACKGROUND: '#f5f5f5',
  BACKGROUND_LIGHT: '#f9f9f9',
  BACKGROUND_GRAY: '#f0f0f0',
  WHITE: '#fff',
  DISABLED: '#ccc',
} as const;

