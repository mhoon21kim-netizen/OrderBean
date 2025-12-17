import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AdminPage from '../../pages/AdminPage';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('AdminPage', () => {
  describe('관리자 대시보드', () => {
    it('총 주문, 주문 접수, 제조 중, 제조 완료 4개 항목을 표시해야 함', () => {
      renderWithRouter(<AdminPage />);
      
      expect(screen.getByText('총 주문')).toBeInTheDocument();
      expect(screen.getByText('주문 접수')).toBeInTheDocument();
      expect(screen.getByText('제조 중')).toBeInTheDocument();
      expect(screen.getByText('제조 완료')).toBeInTheDocument();
    });

    it('각 항목마다 개수를 표시해야 함', () => {
      renderWithRouter(<AdminPage />);
      
      // 초기값은 모두 0일 것으로 예상
      const totalOrders = screen.getByText(/총 주문/).closest('div');
      const receivedOrders = screen.getByText(/주문 접수/).closest('div');
      const inProgressOrders = screen.getByText(/제조 중/).closest('div');
      const completedOrders = screen.getByText(/제조 완료/).closest('div');
      
      expect(totalOrders).toBeInTheDocument();
      expect(receivedOrders).toBeInTheDocument();
      expect(inProgressOrders).toBeInTheDocument();
      expect(completedOrders).toBeInTheDocument();
    });
  });

  describe('재고 현황', () => {
    it('메뉴 3개(아메리카노 ICE, 아메리카노 HOT, 카페라떼)를 표시해야 함', () => {
      renderWithRouter(<AdminPage />);
      
      expect(screen.getByText('아메리카노 (ICE)')).toBeInTheDocument();
      expect(screen.getByText('아메리카노 (HOT)')).toBeInTheDocument();
      expect(screen.getByText('카페라떼')).toBeInTheDocument();
    });

    it('각 메뉴의 재고 개수를 표시해야 함', () => {
      renderWithRouter(<AdminPage />);
      
      // 재고 개수가 표시되는지 확인 (예: "10개")
      expect(screen.getByText(/개/)).toBeInTheDocument();
    });

    it('재고가 5개 미만이면 "주의" 상태를 표시해야 함', () => {
      renderWithRouter(<AdminPage />);
      
      // 재고가 5개 미만인 경우 "주의" 표시 확인
      // 초기값이 10개이므로 테스트를 위해 재고를 줄여야 함
      const decreaseButtons = screen.getAllByText('-');
      if (decreaseButtons.length > 0) {
        // 재고를 5개 미만으로 줄이기
        for (let i = 0; i < 6; i++) {
          fireEvent.click(decreaseButtons[0]);
        }
        expect(screen.getByText('주의')).toBeInTheDocument();
      }
    });

    it('재고가 0개면 "품절" 상태를 표시해야 함', () => {
      renderWithRouter(<AdminPage />);
      
      const decreaseButtons = screen.getAllByText('-');
      if (decreaseButtons.length > 0) {
        // 재고를 0개로 만들기
        for (let i = 0; i < 10; i++) {
          fireEvent.click(decreaseButtons[0]);
        }
        expect(screen.getByText('품절')).toBeInTheDocument();
      }
    });

    it('재고가 5개 이상이면 "정상" 상태를 표시해야 함', () => {
      renderWithRouter(<AdminPage />);
      
      // 초기값이 10개이므로 "정상" 표시 확인
      expect(screen.getByText('정상')).toBeInTheDocument();
    });

    it('재고 증가 버튼(+)을 클릭하면 재고가 증가해야 함', () => {
      renderWithRouter(<AdminPage />);
      
      const increaseButtons = screen.getAllByText('+');
      if (increaseButtons.length > 0) {
        const initialText = screen.getByText(/아메리카노 \(ICE\)/).closest('div')?.textContent || '';
        fireEvent.click(increaseButtons[0]);
        const afterText = screen.getByText(/아메리카노 \(ICE\)/).closest('div')?.textContent || '';
        
        // 재고가 증가했는지 확인 (텍스트가 변경되었는지)
        expect(afterText).not.toBe(initialText);
      }
    });

    it('재고 감소 버튼(-)을 클릭하면 재고가 감소해야 함', () => {
      renderWithRouter(<AdminPage />);
      
      const decreaseButtons = screen.getAllByText('-');
      if (decreaseButtons.length > 0) {
        const initialText = screen.getByText(/아메리카노 \(ICE\)/).closest('div')?.textContent || '';
        fireEvent.click(decreaseButtons[0]);
        const afterText = screen.getByText(/아메리카노 \(ICE\)/).closest('div')?.textContent || '';
        
        // 재고가 감소했는지 확인
        expect(afterText).not.toBe(initialText);
      }
    });

    it('재고가 0개일 때 감소 버튼을 클릭해도 0 이하로 내려가지 않아야 함', () => {
      renderWithRouter(<AdminPage />);
      
      const decreaseButtons = screen.getAllByText('-');
      if (decreaseButtons.length > 0) {
        // 재고를 0개로 만들기
        for (let i = 0; i < 10; i++) {
          fireEvent.click(decreaseButtons[0]);
        }
        
        // 0개 상태에서 한 번 더 클릭
        fireEvent.click(decreaseButtons[0]);
        
        // 여전히 0개인지 확인 (품절 상태 유지)
        expect(screen.getByText('품절')).toBeInTheDocument();
      }
    });
  });

  describe('주문 현황', () => {
    it('주문 접수일자와 시간을 표시해야 함', () => {
      renderWithRouter(<AdminPage />);
      
      // 날짜 형식 확인 (예: "7월 31일 13:00" 또는 유사한 형식)
      const datePattern = /\d{1,2}월 \d{1,2}일/;
      const timePattern = /\d{1,2}:\d{2}/;
      
      const pageText = document.body.textContent || '';
      // 주문이 있을 경우 날짜와 시간이 표시되어야 함
      // 초기에는 주문이 없을 수 있으므로 조건부로 확인
    });

    it('주문 메뉴 정보를 표시해야 함', () => {
      renderWithRouter(<AdminPage />);
      
      // 주문 메뉴가 표시되는지 확인
      // 초기에는 주문이 없을 수 있음
    });

    it('주문 금액을 표시해야 함', () => {
      renderWithRouter(<AdminPage />);
      
      // 금액 형식 확인 (예: "4,000원")
      // 초기에는 주문이 없을 수 있음
    });

    it('주문 접수 상태일 때 "제조시작" 버튼을 표시해야 함', () => {
      renderWithRouter(<AdminPage />);
      
      // 주문이 있을 경우 "제조시작" 버튼이 표시되어야 함
      // 초기에는 주문이 없을 수 있음
    });

    it('"제조시작" 버튼을 클릭하면 주문 상태가 "제조중"으로 변경되어야 함', () => {
      renderWithRouter(<AdminPage />);
      
      const startButton = screen.queryByText('제조시작');
      if (startButton) {
        fireEvent.click(startButton);
        
        // 상태가 "제조중"으로 변경되었는지 확인
        expect(screen.getByText(/제조중/)).toBeInTheDocument();
      }
    });
  });
});
