/**
 * 주문 관련 Custom Hook
 */

import { useState, useEffect } from 'react';
import { Order } from '../types';
import { OrderStatusType, ORDER_STATUS } from '../constants';
import { orderService, handleApiError, ApiError } from '../services/api';
import { config } from '../config/env';
import { mockOrders } from '../mocks/orderMock';

interface UseOrdersReturn {
  orders: Order[];
  loading: boolean;
  error: ApiError | null;
  refetch: () => Promise<void>;
  createOrder: (cartItems: Parameters<typeof orderService.create>[0]) => Promise<Order | null>;
  updateOrderStatus: (id: string, status: OrderStatusType) => Promise<void>;
  isMockData: boolean;
}

/**
 * 주문 목록을 관리하는 Hook
 * 백엔드 서버가 없을 경우 Mock 데이터를 사용
 */
export const useOrders = (): UseOrdersReturn => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ApiError | null>(null);
  const [isMockData, setIsMockData] = useState<boolean>(false);

  const fetchOrders = async () => {
    // Mock 데이터 사용 설정이 켜져 있으면 Mock 데이터 사용
    if (config.useMockData) {
      setLoading(true);
      setError(null);
      // 시뮬레이션을 위한 약간의 지연
      await new Promise(resolve => setTimeout(resolve, 500));
      setOrders(mockOrders);
      setIsMockData(true);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setIsMockData(false);
      const data = await orderService.getAll();
      setOrders(data);
    } catch (err) {
      const apiError = handleApiError(err);
      
      // Network Error인 경우 개발 환경에서 Mock 데이터 사용
      if (config.isDevelopment && apiError.message.includes('Network Error')) {
        console.warn('백엔드 서버에 연결할 수 없습니다. Mock 데이터를 사용합니다.');
        setOrders(mockOrders);
        setIsMockData(true);
        setError(null); // Mock 데이터 사용 시 에러 숨김
      } else {
        setError(apiError);
      }
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (cartItems: Parameters<typeof orderService.create>[0]): Promise<Order | null> => {
    // Mock 데이터 모드에서는 로컬에서 주문 생성
    if (isMockData || config.useMockData) {
      const newOrder: Order = {
        id: `mock-${Date.now()}`,
        menuName: cartItems[0]?.menuName || '주문',
        quantity: cartItems.reduce((sum, item) => sum + item.quantity, 0),
        price: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        status: ORDER_STATUS.RECEIVED,
        createdAt: new Date(),
      };
      setOrders((prev) => [newOrder, ...prev]);
      return newOrder;
    }

    try {
      setError(null);
      const newOrder = await orderService.create(cartItems);
      setOrders((prev) => [newOrder, ...prev]);
      return newOrder;
    } catch (err) {
      setError(handleApiError(err));
      return null;
    }
  };

  const updateOrderStatus = async (id: string, status: OrderStatusType) => {
    // Mock 데이터 모드에서는 로컬에서 상태 업데이트
    if (isMockData || config.useMockData) {
      setOrders((prev) =>
        prev.map((order) => (order.id === id ? { ...order, status } : order))
      );
      return;
    }

    try {
      setError(null);
      const updatedOrder = await orderService.updateStatus(id, status);
      setOrders((prev) =>
        prev.map((order) => (order.id === id ? updatedOrder : order))
      );
    } catch (err) {
      setError(handleApiError(err));
      throw err;
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    orders,
    loading,
    error,
    refetch: fetchOrders,
    createOrder,
    updateOrderStatus,
    isMockData,
  };
};

