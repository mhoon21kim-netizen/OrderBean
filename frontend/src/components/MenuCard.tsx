import { useState } from 'react';

interface MenuCardProps {
  id: string;
  name: string;
  price: number;
  description?: string;
  onAddToCart: (menuId: string, options: string[]) => void;
}

function MenuCard({ id, name, price, description, onAddToCart }: MenuCardProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOptionToggle = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter(opt => opt !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(id, selectedOptions);
    setSelectedOptions([]); // 옵션 초기화
  };

  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      backgroundColor: '#fff'
    }}>
      <div style={{
        width: '100%',
        height: '150px',
        backgroundColor: '#f0f0f0',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#999'
      }}>
        [이미지]
      </div>
      <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{name}</h3>
      <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 'bold', color: '#333' }}>
        {price.toLocaleString()}원
      </p>
      {description && (
        <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>
          {description}
        </p>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={selectedOptions.includes('샷 추가')}
            onChange={() => handleOptionToggle('샷 추가')}
          />
          <span>샷 추가 (+500원)</span>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={selectedOptions.includes('시럽 추가')}
            onChange={() => handleOptionToggle('시럽 추가')}
          />
          <span>시럽 추가 (+0원)</span>
        </label>
      </div>
      <button
        onClick={handleAddToCart}
        style={{
          marginTop: '1rem',
          padding: '0.75rem',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '1rem',
          fontWeight: 'bold'
        }}
      >
        담기
      </button>
    </div>
  );
}

export default MenuCard;

