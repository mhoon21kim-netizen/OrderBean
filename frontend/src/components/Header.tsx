import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      borderBottom: '1px solid #e0e0e0',
      backgroundColor: '#fff'
    }}>
      <Link to="/" style={{ 
        textDecoration: 'none', 
        color: '#333',
        fontSize: '1.5rem',
        fontWeight: 'bold'
      }}>
        OrderBean – 커피주문
      </Link>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/orders" style={{
          textDecoration: 'none',
          padding: '0.5rem 1rem',
          backgroundColor: '#f5f5f5',
          color: '#333',
          borderRadius: '4px',
          border: '1px solid #ddd'
        }}>
          주문하기
        </Link>
        <Link to="/admin" style={{
          textDecoration: 'none',
          padding: '0.5rem 1rem',
          backgroundColor: isAdminPage ? '#4CAF50' : '#f5f5f5',
          color: isAdminPage ? 'white' : '#333',
          borderRadius: '4px',
          border: '1px solid #ddd',
          fontWeight: isAdminPage ? 'bold' : 'normal'
        }}>
          {isAdminPage ? '관리자 ✓' : '관리자'}
        </Link>
      </div>
    </header>
  );
}

export default Header;

