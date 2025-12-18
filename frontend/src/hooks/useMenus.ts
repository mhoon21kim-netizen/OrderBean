/**
 * 메뉴 관련 Custom Hook
 */

import { useState, useEffect } from 'react';
import { Menu } from '../types';
import { menuService, handleApiError, ApiError } from '../services/api';
import { config } from '../config/env';
import { mockMenus } from '../mocks/menuMock';

interface UseMenusReturn {
  menus: Menu[];
  loading: boolean;
  error: ApiError | null;
  refetch: () => Promise<void>;
  isMockData: boolean;
}

/**
 * 메뉴 목록을 가져오는 Hook
 * 백엔드 서버가 없을 경우 Mock 데이터를 사용
 */
export const useMenus = (): UseMenusReturn => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ApiError | null>(null);
  const [isMockData, setIsMockData] = useState<boolean>(false);

  const fetchMenus = async () => {
    // Mock 데이터 사용 설정이 켜져 있으면 Mock 데이터 사용
    if (config.useMockData) {
      setLoading(true);
      setError(null);
      // 시뮬레이션을 위한 약간의 지연
      await new Promise(resolve => setTimeout(resolve, 500));
      setMenus(mockMenus);
      setIsMockData(true);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setIsMockData(false);
      const data = await menuService.getAll();
      setMenus(data);
    } catch (err) {
      const apiError = handleApiError(err);
      
      // Network Error인 경우 개발 환경에서 Mock 데이터 사용
      if (config.isDevelopment && apiError.message.includes('Network Error')) {
        console.warn('백엔드 서버에 연결할 수 없습니다. Mock 데이터를 사용합니다.');
        setMenus(mockMenus);
        setIsMockData(true);
        setError(null); // Mock 데이터 사용 시 에러 숨김
      } else {
        setError(apiError);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  return {
    menus,
    loading,
    error,
    refetch: fetchMenus,
    isMockData,
  };
};

