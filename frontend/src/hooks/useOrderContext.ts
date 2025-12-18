/**
 * Order Context 사용을 위한 Hook
 * Fast Refresh 호환성을 위해 별도 파일로 분리
 */

import { useContext } from 'react';
import { OrderContext } from '../contexts/OrderContext';

export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrderContext must be used within an OrderProvider');
  }
  return context;
};


