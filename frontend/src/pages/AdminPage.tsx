import { useState } from 'react';
import AdminDashboard from '../components/AdminDashboard';
import InventoryStatus from '../components/InventoryStatus';
import OrderStatus from '../components/OrderStatus';

interface Order {
  id: string;
  menuName: string;
  quantity: number;
  price: number;
  status: '주문접수' | '제조중' | '제조완료';
  createdAt: Date;
}

function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: '1',
      menuName: '아메리카노(ICE)',
      quantity: 1,
      price: 4000,
      status: '주문접수',
      createdAt: new Date('2024-07-31T13:00:00')
    }
  ]);

  const [inventory, setInventory] = useState([
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

  const handleOrderStatusChange = (orderId: string, newStatus: '주문접수' | '제조중' | '제조완료') => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const dashboardStats = {
    totalOrders: orders.length,
    receivedOrders: orders.filter(o => o.status === '주문접수').length,
    inProgressOrders: orders.filter(o => o.status === '제조중').length,
    completedOrders: orders.filter(o => o.status === '제조완료').length
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <h1 style={{ marginBottom: '2rem', fontSize: '2rem' }}>관리자 대시보드</h1>
        
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
