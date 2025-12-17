interface DashboardStats {
  totalOrders: number;
  receivedOrders: number;
  inProgressOrders: number;
  completedOrders: number;
}

interface AdminDashboardProps {
  stats: DashboardStats;
}

function AdminDashboard({ stats }: AdminDashboardProps) {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>관리자 대시보드</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1rem'
      }}>
        <div style={{
          padding: '1.5rem',
          backgroundColor: '#fff',
          borderRadius: '8px',
          border: '1px solid #ddd',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>총 주문</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333' }}>
            {stats.totalOrders}
          </div>
        </div>
        
        <div style={{
          padding: '1.5rem',
          backgroundColor: '#fff',
          borderRadius: '8px',
          border: '1px solid #ddd',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>주문 접수</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333' }}>
            {stats.receivedOrders}
          </div>
        </div>
        
        <div style={{
          padding: '1.5rem',
          backgroundColor: '#fff',
          borderRadius: '8px',
          border: '1px solid #ddd',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>제조 중</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333' }}>
            {stats.inProgressOrders}
          </div>
        </div>
        
        <div style={{
          padding: '1.5rem',
          backgroundColor: '#fff',
          borderRadius: '8px',
          border: '1px solid #ddd',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>제조 완료</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333' }}>
            {stats.completedOrders}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
