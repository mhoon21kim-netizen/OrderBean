import { useState, useMemo } from 'react';
import MenuOption, { MenuOptionItem } from './MenuOption';
import { OPTION_NAMES, OPTION_PRICES } from '../constants';
import { formatPrice } from '../utils/format';

interface MenuCardProps {
  id: string;
  name: string;
  price: number;
  description?: string;
  onAddToCart: (menuId: string, options: string[]) => void;
}

function MenuCard({ id, name, price, description, onAddToCart }: MenuCardProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  // 옵션 목록을 메모이제이션
  const menuOptions: MenuOptionItem[] = useMemo(() => [
    {
      id: OPTION_NAMES.SHOT_ADD,
      name: OPTION_NAMES.SHOT_ADD,
      price: OPTION_PRICES.SHOT_ADD,
    },
    {
      id: OPTION_NAMES.SYRUP_ADD,
      name: OPTION_NAMES.SYRUP_ADD,
      price: OPTION_PRICES.SYRUP_ADD,
    },
  ], []);

  const handleOptionToggle = (optionId: string) => {
    if (selectedOptions.includes(optionId)) {
      setSelectedOptions(selectedOptions.filter(opt => opt !== optionId));
    } else {
      setSelectedOptions([...selectedOptions, optionId]);
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
        {formatPrice(price)}
      </p>
      {description && (
        <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>
          {description}
        </p>
      )}
      <MenuOption
        options={menuOptions}
        selectedOptions={selectedOptions}
        onToggle={handleOptionToggle}
      />
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

