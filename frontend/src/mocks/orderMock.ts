/**
 * 주문 Mock 데이터
 * 백엔드 서버가 없을 때 사용하는 더미 데이터
 */

import { Order } from '../types';
import { ORDER_STATUS } from '../constants';

export const mockOrders: Order[] = [
  {
    id: '1',
    menuName: '아메리카노(ICE)',
    quantity: 1,
    price: 4000,
    status: ORDER_STATUS.RECEIVED,
    createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30분 전
  },
  {
    id: '2',
    menuName: '카페라떼',
    quantity: 2,
    price: 5000,
    status: ORDER_STATUS.IN_PROGRESS,
    createdAt: new Date(Date.now() - 15 * 60 * 1000), // 15분 전
  },
  {
    id: '3',
    menuName: '아메리카노(HOT)',
    quantity: 1,
    price: 4000,
    status: ORDER_STATUS.COMPLETED,
    createdAt: new Date(Date.now() - 60 * 60 * 1000), // 1시간 전
  },
];

