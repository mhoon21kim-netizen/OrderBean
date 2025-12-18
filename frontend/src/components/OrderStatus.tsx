import { Order } from '../types';
import { ORDER_STATUS, OrderStatusType } from '../constants';
import { formatDate } from '../utils/date';
import { formatPrice } from '../utils/format';

interface OrderStatusProps {
  orders: Order[];
  onStatusChange: (orderId: string, newStatus: OrderStatusType) => void;
}

function OrderStatus({ orders, onStatusChange }: OrderStatusProps) {

  return (
    <div>
      <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>주문 현황</h2>
      
      {orders.length === 0 ? (
        <div style={{
          padding: '2rem',
          backgroundColor: '#fff',
          borderRadius: '8px',
          border: '1px solid #ddd',
          textAlign: 'center',
          color: '#666'
        }}>
          주문이 없습니다.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {orders.map((order) => (
            <div
              key={order.id}
              style={{
                padding: '1.5rem',
                backgroundColor: '#fff',
                borderRadius: '8px',
                border: '1px solid #ddd'
              }}
            >
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>
                  {formatDate(order.createdAt)}
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
                  {order.menuName} x {order.quantity}
                </div>
                <div style={{ fontSize: '1rem', color: '#333' }}>
                  {formatPrice(order.price)}
                </div>
              </div>
              
              <div>
                {order.status === ORDER_STATUS.RECEIVED && (
                  <button
                    onClick={() => onStatusChange(order.id, ORDER_STATUS.IN_PROGRESS)}
                    style={{
                      padding: '0.75rem 1.5rem',
                      backgroundColor: '#4CAF50',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontWeight: 'bold'
                    }}
                  >
                    제조시작
                  </button>
                )}
                {order.status === ORDER_STATUS.IN_PROGRESS && (
                  <div style={{
                    display: 'inline-block',
                    padding: '0.5rem 1rem',
                    backgroundColor: '#ff9800',
                    color: 'white',
                    borderRadius: '4px',
                    fontSize: '0.9rem',
                    fontWeight: 'bold'
                  }}>
                    제조 중
                  </div>
                )}
                {order.status === ORDER_STATUS.COMPLETED && (
                  <div style={{
                    display: 'inline-block',
                    padding: '0.5rem 1rem',
                    backgroundColor: '#2196F3',
                    color: 'white',
                    borderRadius: '4px',
                    fontSize: '0.9rem',
                    fontWeight: 'bold'
                  }}>
                    제조 완료
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderStatus;
