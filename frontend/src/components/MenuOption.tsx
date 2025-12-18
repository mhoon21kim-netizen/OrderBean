/**
 * 메뉴 옵션 컴포넌트
 * 메뉴 옵션 선택 UI를 담당
 */

import { OPTION_NAMES, OPTION_PRICES } from '../constants';
import { formatPrice } from '../utils/format';

export interface MenuOptionItem {
  id: string;
  name: string;
  price: number;
}

interface MenuOptionProps {
  options: MenuOptionItem[];
  selectedOptions: string[];
  onToggle: (optionId: string) => void;
}

function MenuOption({ options, selectedOptions, onToggle }: MenuOptionProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
      {options.map((option) => (
        <label
          key={option.id}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
        >
          <input
            type="checkbox"
            checked={selectedOptions.includes(option.id)}
            onChange={() => onToggle(option.id)}
          />
          <span>
            {option.name} {option.price > 0 && `(+${formatPrice(option.price)})`}
          </span>
        </label>
      ))}
    </div>
  );
}

export default MenuOption;

