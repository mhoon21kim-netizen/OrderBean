import { useState, useMemo } from 'react';
import AdminDashboard from '../components/AdminDashboard';
import InventoryStatus from '../components/InventoryStatus';
import OrderStatus from '../components/OrderStatus';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { InventoryItem, DashboardStats } from '../types';
import { ORDER_STATUS } from '../constants';
import { useOrderContext } from '../hooks/useOrderContext';

function AdminPage() {
  const { orders, loading, error, updateOrderStatus, refetch, isMockData } = useOrderContext();
  
  const [inventory, setInventory] = useState<InventoryItem[]>([
    { id: '1', name: '아메리카노 (ICE)', quantity: 10 },
    { id: '2', name: '아메리카노 (HOT)', quantity: 10 },
    { id: '3', name: '카페라떼', quantity: 10 }
  ]);

  const handleInventoryChange = (id: string, delta: number) => {
    setInventory(inventory.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const handleOrderStatusChange = async (orderId: string, newStatus: OrderStatusType) => {
    try {
      await updateOrderStatus(orderId, newStatus);
    } catch (err) {
      console.error('주문 상태 업데이트 실패:', err);
      alert('주문 상태 업데이트 중 오류가 발생했습니다.');
    }
  };

  const dashboardStats: DashboardStats = useMemo(() => ({
    totalOrders: orders.length,
    receivedOrders: orders.filter(o => o.status === ORDER_STATUS.RECEIVED).length,
    inProgressOrders: orders.filter(o => o.status === ORDER_STATUS.IN_PROGRESS).length,
    completedOrders: orders.filter(o => o.status === ORDER_STATUS.COMPLETED).length
  }), [orders]);

  if (loading) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <LoadingSpinner message="주문 정보를 불러오는 중..." />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <h1 style={{ marginBottom: '2rem', fontSize: '2rem' }}>관리자 대시보드</h1>
        
        {isMockData && (
          <div style={{
            padding: '0.75rem 1rem',
            backgroundColor: '#fff3cd',
            border: '1px solid #ffc107',
            borderRadius: '4px',
            marginBottom: '1rem',
            fontSize: '0.9rem',
            color: '#856404'
          }}>
            ⚠️ Mock 데이터 모드: 백엔드 서버에 연결할 수 없어 샘플 데이터를 표시합니다. 주문 상태 변경은 로컬에서만 저장됩니다.
          </div>
        )}
        
        <ErrorMessage error={error} onRetry={refetch} />
        
        <AdminDashboard stats={dashboardStats} />
        
        <InventoryStatus 
          inventory={inventory}
          onInventoryChange={handleInventoryChange}
        />
        
        <OrderStatus 
          orders={orders}
          onStatusChange={handleOrderStatusChange}
        />
    </div>
  );
}

export default AdminPage;
