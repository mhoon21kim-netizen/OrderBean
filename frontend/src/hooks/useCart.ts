/**
 * Cart Context 사용을 위한 Hook
 * Fast Refresh 호환성을 위해 별도 파일로 분리
 */

import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};


