import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import ErrorBoundary from './components/ErrorBoundary';
import { CartProvider } from './contexts/CartContext';
import { OrderProvider } from './contexts/OrderContext';

function App() {
  return (
    <ErrorBoundary>
      <CartProvider>
        <OrderProvider>
          <Router>
            <div className="App" style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
              <Header />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/orders" element={<div style={{ padding: '2rem' }}>주문 내역 페이지 (구현 예정)</div>} />
                <Route path="/admin" element={<AdminPage />} />
              </Routes>
            </div>
          </Router>
        </OrderProvider>
      </CartProvider>
    </ErrorBoundary>
  );
}

export default App;

