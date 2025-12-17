interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
}

interface InventoryStatusProps {
  inventory: InventoryItem[];
  onInventoryChange: (id: string, delta: number) => void;
}

function InventoryStatus({ inventory, onInventoryChange }: InventoryStatusProps) {
  const getStatus = (quantity: number): '정상' | '주의' | '품절' => {
    if (quantity === 0) return '품절';
    if (quantity < 5) return '주의';
    return '정상';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case '품절': return '#f44336';
      case '주의': return '#ff9800';
      case '정상': return '#4CAF50';
      default: return '#666';
    }
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>재고 현황</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '1rem'
      }}>
        {inventory.map((item) => {
          const status = getStatus(item.quantity);
          const statusColor = getStatusColor(status);
          
          return (
            <div
              key={item.id}
              style={{
                padding: '1.5rem',
                backgroundColor: '#fff',
                borderRadius: '8px',
                border: '1px solid #ddd'
              }}
            >
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  {item.name}
                </div>
                <div style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                  {item.quantity}개
                </div>
                <div style={{
                  display: 'inline-block',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '4px',
                  backgroundColor: statusColor,
                  color: '#fff',
                  fontSize: '0.9rem',
                  fontWeight: 'bold'
                }}>
                  {status}
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <button
                  onClick={() => onInventoryChange(item.id, -1)}
                  disabled={item.quantity === 0}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    backgroundColor: item.quantity === 0 ? '#ccc' : '#f44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: item.quantity === 0 ? 'not-allowed' : 'pointer',
                    fontSize: '1.2rem',
                    fontWeight: 'bold'
                  }}
                  aria-label="재고 감소"
                >
                  -
                </button>
                <button
                  onClick={() => onInventoryChange(item.id, 1)}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                    fontWeight: 'bold'
                  }}
                  aria-label="재고 증가"
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default InventoryStatus;
