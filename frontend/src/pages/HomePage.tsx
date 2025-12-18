import MenuCard from '../components/MenuCard';
import ShoppingCart from '../components/ShoppingCart';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { useMenus } from '../hooks/useMenus';
import { useCart } from '../hooks/useCart';
import { useOrderContext } from '../hooks/useOrderContext';

function HomePage() {
  const { menus, loading, error, refetch, isMockData } = useMenus();
  const { items, addItem, removeItem, clearCart } = useCart();
  const { createOrder } = useOrderContext();

  const handleAddToCart = (menuId: string, options: string[]) => {
    const menu = menus.find(m => m.id === menuId);
    if (!menu) return;
    addItem(menu, options);
  };

  const handleOrder = async () => {
    if (items.length === 0) return;
    
    try {
      const order = await createOrder(items);
      if (order) {
        clearCart();
        alert('주문이 완료되었습니다!');
      }
    } catch (err) {
      console.error('주문 실패:', err);
      alert('주문 처리 중 오류가 발생했습니다.');
    }
  };

  if (loading) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <LoadingSpinner message="메뉴를 불러오는 중..." />
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem'
    }}>
      <h1 style={{ marginBottom: '2rem', fontSize: '2rem' }}>메뉴</h1>
      
      {isMockData && (
        <div style={{
          padding: '0.75rem 1rem',
          backgroundColor: '#e7f3ff',
          border: '1px solid #2196F3',
          borderRadius: '4px',
          marginBottom: '1rem',
          fontSize: '0.9rem',
          color: '#0d47a1'
        }}>
          ℹ️ 개발 모드: 백엔드 서버에 연결할 수 없어 샘플 메뉴를 표시합니다. 주문 기능은 로컬에서만 작동합니다.
        </div>
      )}
      
      <ErrorMessage error={error} onRetry={refetch} />
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {menus.map(menu => (
          <MenuCard
            key={menu.id}
            id={menu.id}
            name={menu.name}
            price={menu.price}
            description={menu.description}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      <ShoppingCart
        items={items}
        onRemoveItem={removeItem}
        onOrder={handleOrder}
      />
    </div>
  );
}

export default HomePage;

