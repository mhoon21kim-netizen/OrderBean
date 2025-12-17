import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// 실제 페이지가 구현되면 import
// import MenuPage from '../../pages/MenuPage';

describe('MenuPage 테스트', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('메뉴 목록이 로드되면 표시됨', async () => {
    // 실제 구현 후 테스트
    // const mockMenus = [
    //   { id: 1, name: '아메리카노', price: 4500 },
    //   { id: 2, name: '카페라떼', price: 5000 }
    // ];
    //
    // vi.spyOn(apiService, 'getMenus').mockResolvedValue(mockMenus);
    //
    // render(
    //   <BrowserRouter>
    //     <MenuPage />
    //   </BrowserRouter>
    // );
    //
    // await waitFor(() => {
    //   expect(screen.getByText('아메리카노')).toBeInTheDocument();
    //   expect(screen.getByText('카페라떼')).toBeInTheDocument();
    // });
  });

  it('메뉴 로딩 중 로딩 표시', () => {
    // render(
    //   <BrowserRouter>
    //     <MenuPage />
    //   </BrowserRouter>
    // );
    // expect(screen.getByText(/로딩/i)).toBeInTheDocument();
  });

  it('메뉴 로드 실패 시 에러 메시지 표시', async () => {
    // vi.spyOn(apiService, 'getMenus').mockRejectedValue(new Error('Network Error'));
    //
    // render(
    //   <BrowserRouter>
    //     <MenuPage />
    //   </BrowserRouter>
    // );
    //
    // await waitFor(() => {
    //   expect(screen.getByText(/에러/i)).toBeInTheDocument();
    // });
  });

  it('메뉴 클릭 시 상세 페이지로 이동', () => {
    // const mockNavigate = vi.fn();
    // vi.mock('react-router-dom', () => ({
    //   ...vi.importActual('react-router-dom'),
    //   useNavigate: () => mockNavigate
    // }));
    //
    // render(
    //   <BrowserRouter>
    //     <MenuPage />
    //   </BrowserRouter>
    // );
    //
    // fireEvent.click(screen.getByText('아메리카노'));
    // expect(mockNavigate).toHaveBeenCalledWith('/menus/1');
  });
});





