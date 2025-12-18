/**
 * 주문 Context
 * 전역 주문 상태 관리
 */

import React, { createContext, useContext, ReactNode } from 'react';
import { Order } from '../types';
import { OrderStatusType } from '../constants';
import { useOrders } from '../hooks/useOrders';

interface OrderContextType {
  orders: Order[];
  loading: boolean;
  error: ReturnType<typeof useOrders>['error'];
  createOrder: (cartItems: Parameters<typeof useOrders>['createOrder'][0]) => Promise<Order | null>;
  updateOrderStatus: (id: string, status: OrderStatusType) => Promise<void>;
  refetch: () => Promise<void>;
  isMockData: boolean;
}

export const OrderContext = createContext<OrderContextType | undefined>(undefined);

interface OrderProviderProps {
  children: ReactNode;
}

export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
  const {
    orders,
    loading,
    error,
    createOrder,
    updateOrderStatus,
    refetch,
    isMockData,
  } = useOrders();

  const value: OrderContextType = {
    orders,
    loading,
    error,
    createOrder,
    updateOrderStatus,
    refetch,
    isMockData,
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};

