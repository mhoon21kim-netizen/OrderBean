/**
 * API 서비스 레이어
 * 백엔드 API와의 통신을 담당하는 서비스 함수들
 */

import axios, { AxiosInstance, AxiosError } from 'axios';
import { Menu, Order, CartItem } from '../types';
import { OrderStatusType } from '../constants';

/**
 * Axios 인스턴스 생성
 */
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10초 타임아웃
});

/**
 * 요청 인터셉터 - 토큰 추가
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * 응답 인터셉터 - 에러 처리
 */
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // 인증 실패 시 토큰 제거 및 로그인 페이지로 리다이렉트
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

/**
 * 메뉴 서비스
 */
export const menuService = {
  /**
   * 모든 메뉴 조회
   */
  getAll: async (): Promise<Menu[]> => {
    const response = await api.get<Menu[]>('/menus');
    return response.data;
  },

  /**
   * 메뉴 상세 조회
   */
  getById: async (id: string): Promise<Menu> => {
    const response = await api.get<Menu>(`/menus/${id}`);
    return response.data;
  },
};

/**
 * 주문 서비스
 */
export const orderService = {
  /**
   * 주문 생성
   */
  create: async (cartItems: CartItem[]): Promise<Order> => {
    const response = await api.post<Order>('/orders', {
      items: cartItems.map(item => ({
        menuId: item.menuId,
        quantity: item.quantity,
        options: item.options,
        price: item.price,
      })),
    });
    return response.data;
  },

  /**
   * 주문 목록 조회
   */
  getAll: async (): Promise<Order[]> => {
    const response = await api.get<Order[]>('/orders');
    return response.data;
  },

  /**
   * 주문 상세 조회
   */
  getById: async (id: string): Promise<Order> => {
    const response = await api.get<Order>(`/orders/${id}`);
    return response.data;
  },

  /**
   * 주문 상태 업데이트 (관리자)
   */
  updateStatus: async (id: string, status: OrderStatusType): Promise<Order> => {
    const response = await api.patch<Order>(`/orders/${id}/status`, { status });
    return response.data;
  },
};

/**
 * 재고 서비스
 */
export const inventoryService = {
  /**
   * 재고 목록 조회
   */
  getAll: async () => {
    const response = await api.get('/inventory');
    return response.data;
  },

  /**
   * 재고 업데이트
   */
  update: async (id: string, delta: number) => {
    const response = await api.patch(`/inventory/${id}`, { delta });
    return response.data;
  },
};

/**
 * API 에러 타입
 */
export interface ApiError {
  message: string;
  status?: number;
  data?: unknown;
}

/**
 * API 에러 처리 헬퍼 함수
 */
export const handleApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    return {
      message: error.response?.data?.message || error.message || '알 수 없는 오류가 발생했습니다.',
      status: error.response?.status,
      data: error.response?.data,
    };
  }
  return {
    message: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
  };
};

export default api;

