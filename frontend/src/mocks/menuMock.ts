/**
 * 메뉴 Mock 데이터
 * 백엔드 서버가 없을 때 사용하는 더미 데이터
 */

import { Menu } from '../types';

export const mockMenus: Menu[] = [
  {
    id: '1',
    name: '아메리카노(ICE)',
    price: 4000,
    description: '시원하고 깔끔한 아이스 아메리카노',
  },
  {
    id: '2',
    name: '아메리카노(HOT)',
    price: 4000,
    description: '따뜻하고 진한 핫 아메리카노',
  },
  {
    id: '3',
    name: '카페라떼',
    price: 5000,
    description: '부드러운 우유와 에스프레소의 조화',
  },
  {
    id: '4',
    name: '카푸치노',
    price: 5000,
    description: '우유 거품이 올라간 부드러운 커피',
  },
  {
    id: '5',
    name: '바닐라라떼',
    price: 5500,
    description: '바닐라 시럽이 들어간 달콤한 라떼',
  },
];


