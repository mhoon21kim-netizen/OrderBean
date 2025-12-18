/**
 * 포맷팅 관련 유틸리티 함수
 */

/**
 * 가격을 포맷팅하는 함수
 * @param price - 가격 (숫자)
 * @returns 포맷팅된 가격 문자열 (예: "4,000원")
 */
export const formatPrice = (price: number): string => {
  return `${price.toLocaleString()}원`;
};

/**
 * 수량을 포맷팅하는 함수
 * @param quantity - 수량
 * @returns 포맷팅된 수량 문자열 (예: "10개")
 */
export const formatQuantity = (quantity: number): string => {
  return `${quantity}개`;
};

