import { CartItem } from '../types';

interface ShoppingCartProps {
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onOrder: () => void;
}

function ShoppingCart({ items, onRemoveItem, onOrder }: ShoppingCartProps) {
  const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '1.5rem',
      backgroundColor: '#f9f9f9',
      marginTop: '2rem'
    }}>
      <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>장바구니</h2>
      
      {items.length === 0 ? (
        <p style={{ color: '#666' }}>장바구니가 비어있습니다.</p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '1.5rem'
        }}>
          {/* 왼쪽: 주문 내역 */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}>
            {items.map((item) => (
              <div key={item.id} style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto auto',
                gap: '1rem',
                alignItems: 'center',
                padding: '0.75rem',
                backgroundColor: '#fff',
                borderRadius: '4px',
                border: '1px solid #e0e0e0'
              }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
                    {item.menuName}
                  </div>
                  {item.options.length > 0 && (
                    <div style={{ color: '#666', fontSize: '0.9rem' }}>
                      ({item.options.join(', ')})
                    </div>
                  )}
                  <div style={{ color: '#999', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                    {item.price.toLocaleString()}원 × {item.quantity}
                  </div>
                </div>
                <div style={{
                  textAlign: 'right',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  minWidth: '100px'
                }}>
                  {(item.price * item.quantity).toLocaleString()}원
                </div>
                <button
                  onClick={() => onRemoveItem(item.id)}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    whiteSpace: 'nowrap'
                  }}
                >
                  삭제
                </button>
              </div>
            ))}
          </div>

          {/* 오른쪽: 총 금액 및 주문하기 버튼 */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <div style={{
              padding: '1.5rem',
              backgroundColor: '#fff',
              borderRadius: '8px',
              border: '2px solid #4CAF50'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem'
              }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>총 금액</span>
                <span style={{ 
                  fontSize: '1.8rem', 
                  fontWeight: 'bold', 
                  color: '#4CAF50' 
                }}>
                  {totalAmount.toLocaleString()}원
                </span>
              </div>
              <button
                onClick={onOrder}
                disabled={items.length === 0}
                style={{
                  width: '100%',
                  padding: '1rem',
                  backgroundColor: items.length === 0 ? '#ccc' : '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: items.length === 0 ? 'not-allowed' : 'pointer',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (items.length > 0) {
                    e.currentTarget.style.backgroundColor = '#45a049';
                  }
                }}
                onMouseLeave={(e) => {
                  if (items.length > 0) {
                    e.currentTarget.style.backgroundColor = '#4CAF50';
                  }
                }}
              >
                주문하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShoppingCart;

