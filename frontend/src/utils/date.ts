/**
 * 날짜 관련 유틸리티 함수
 */

/**
 * 날짜를 포맷팅하는 함수
 * @param date - Date 객체 또는 ISO 문자열
 * @returns 포맷팅된 날짜 문자열 (예: "12월 16일 14:30")
 */
export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return '날짜 형식 오류';
  }
  
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');
  
  return `${month}월 ${day}일 ${hours}:${minutes}`;
};

/**
 * 날짜를 상세 포맷으로 변환
 * @param date - Date 객체 또는 ISO 문자열
 * @returns 상세 포맷 문자열 (예: "2024년 12월 16일 14:30")
 */
export const formatDateDetailed = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return '날짜 형식 오류';
  }
  
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');
  
  return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
};

