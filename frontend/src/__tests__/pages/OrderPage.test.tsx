import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// 실제 페이지가 구현되면 import
// import OrderPage from '../../pages/OrderPage';

describe('OrderPage 테스트', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('주문 내역이 로드되면 표시됨', async () => {
    // 실제 구현 후 테스트
    // const mockOrders = [
    //   {
    //     id: 1,
    //     status: '완료',
    //     total_price: 9000,
    //     created_at: '2024-01-01T00:00:00Z',
    //     items: []
    //   }
    // ];
    //
    // vi.spyOn(apiService, 'getOrders').mockResolvedValue(mockOrders);
    //
    // render(
    //   <BrowserRouter>
    //     <OrderPage />
    //   </BrowserRouter>
    // );
    //
    // await waitFor(() => {
    //   expect(screen.getByText(/주문 내역/i)).toBeInTheDocument();
    // });
  });

  it('주문 상태가 정상적으로 표시됨', () => {
    // render(
    //   <BrowserRouter>
    //     <OrderPage />
    //   </BrowserRouter>
    // );
    // expect(screen.getByText('접수')).toBeInTheDocument();
    // expect(screen.getByText('제조중')).toBeInTheDocument();
    // expect(screen.getByText('완료')).toBeInTheDocument();
  });

  it('주문이 없을 때 빈 상태 메시지 표시', async () => {
    // vi.spyOn(apiService, 'getOrders').mockResolvedValue([]);
    //
    // render(
    //   <BrowserRouter>
    //     <OrderPage />
    //   </BrowserRouter>
    // );
    //
    // await waitFor(() => {
    //   expect(screen.getByText(/주문 내역이 없습니다/i)).toBeInTheDocument();
    // });
  });
});





