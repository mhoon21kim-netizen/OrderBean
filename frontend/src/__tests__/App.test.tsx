import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

describe('App 컴포넌트 테스트', () => {
  it('앱이 정상적으로 렌더링됨', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(screen.getByText(/OlderBean/i)).toBeInTheDocument();
  });

  it('홈 페이지 라우트가 정상 작동', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(screen.getByText(/홈 페이지/i)).toBeInTheDocument();
  });
});





