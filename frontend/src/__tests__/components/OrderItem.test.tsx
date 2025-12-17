import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

// 실제 컴포넌트가 구현되면 import
// import OrderItem from '../../components/OrderItem';

describe('OrderItem 컴포넌트 테스트', () => {
  const mockOrderItem = {
    id: 1,
    menu_id: 1,
    menu_name: '아메리카노',
    quantity: 2,
    price: 4500,
    options: {
      size: 'large',
      shot: '2',
      syrup: 'vanilla'
    }
  };

  it('주문 항목 정보가 정상적으로 표시됨', () => {
    // 실제 구현 후 테스트
    // render(<OrderItem item={mockOrderItem} />);
    // expect(screen.getByText('아메리카노')).toBeInTheDocument();
    // expect(screen.getByText('수량: 2')).toBeInTheDocument();
    // expect(screen.getByText('9,000원')).toBeInTheDocument();
  });

  it('옵션이 정상적으로 표시됨', () => {
    // render(<OrderItem item={mockOrderItem} />);
    // expect(screen.getByText(/large/i)).toBeInTheDocument();
    // expect(screen.getByText(/샷: 2/i)).toBeInTheDocument();
    // expect(screen.getByText(/vanilla/i)).toBeInTheDocument();
  });

  it('옵션이 없을 때도 정상 작동', () => {
    // const itemWithoutOptions = { ...mockOrderItem, options: {} };
    // render(<OrderItem item={itemWithoutOptions} />);
    // expect(screen.getByText('아메리카노')).toBeInTheDocument();
  });
});





