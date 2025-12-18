/**
 * 환경 변수 설정
 */

export const config = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  useMockData: import.meta.env.VITE_USE_MOCK_DATA === 'true' || false,
  isDevelopment: import.meta.env.DEV,
};

