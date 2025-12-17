import { useState } from 'react';
import MenuCard from '../components/MenuCard';
import ShoppingCart from '../components/ShoppingCart';

interface CartItem {
  id: string;
  menuId: string;
  menuName: string;
  price: number;
  options: string[];
  quantity: number;
}

// 임시 메뉴 데이터 (나중에 API에서 가져올 예정)
const mockMenus = [
  {
    id: '1',
    name: '아메리카노(ICE)',
    price: 4000,
    description: '간단한 설명...'
  },
  {
    id: '2',
    name: '아메리카노(HOT)',
    price: 4000,
    description: '간단한 설명...'
  },
  {
    id: '3',
    name: '카페라떼',
    price: 5000,
    description: '간단한 설명...'
  }
];

function HomePage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAddToCart = (menuId: string, options: string[]) => {
    const menu = mockMenus.find(m => m.id === menuId);
    if (!menu) return;

    // 옵션 가격 계산
    const optionPrice = options.includes('샷 추가') ? 500 : 0;
    const totalPrice = menu.price + optionPrice;

    // 같은 메뉴와 같은 옵션을 가진 기존 항목 확인
    const sortedOptions = [...options].sort();
    const existingItem = cartItems.find(item => {
      const itemSortedOptions = [...item.options].sort();
      return item.menuId === menuId && 
             JSON.stringify(itemSortedOptions) === JSON.stringify(sortedOptions);
    });

    if (existingItem) {
      // 수량 증가
      setCartItems(cartItems.map(item =>
        item.id === existingItem.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      // 새 항목 추가
      const newItem: CartItem = {
        id: Date.now().toString(),
        menuId,
        menuName: menu.name,
        price: totalPrice,
        options: sortedOptions,
        quantity: 1
      };
      setCartItems([...cartItems, newItem]);
    }
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleOrder = () => {
    if (cartItems.length === 0) return;
    alert('주문 기능은 구현 예정입니다.');
    // TODO: 주문 API 호출
  };

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem'
    }}>
      <h1 style={{ marginBottom: '2rem', fontSize: '2rem' }}>메뉴</h1>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {mockMenus.map(menu => (
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
        items={cartItems}
        onRemoveItem={handleRemoveItem}
        onOrder={handleOrder}
      />
    </div>
  );
}

export default HomePage;

