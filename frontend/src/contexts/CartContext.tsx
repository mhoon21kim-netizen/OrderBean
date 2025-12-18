/**
 * 장바구니 Context
 * 전역 장바구니 상태 관리
 */

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { CartItem, Menu } from '../types';
import { OPTION_NAMES, OPTION_PRICES } from '../constants';

interface CartContextType {
  items: CartItem[];
  addItem: (menu: Menu, options: string[]) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalAmount: number;
  itemCount: number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

/**
 * 옵션 가격 계산
 */
const calculateOptionPrice = (options: string[]): number => {
  let price = 0;
  if (options.includes(OPTION_NAMES.SHOT_ADD)) {
    price += OPTION_PRICES.SHOT_ADD;
  }
  // 시럽 추가는 무료
  return price;
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((menu: Menu, options: string[]) => {
    const optionPrice = calculateOptionPrice(options);
    const totalPrice = menu.price + optionPrice;
    const sortedOptions = [...options].sort();

    setItems((prevItems) => {
      // 같은 메뉴와 같은 옵션을 가진 기존 항목 확인
      const existingItem = prevItems.find((item) => {
        const itemSortedOptions = [...item.options].sort();
        return (
          item.menuId === menu.id &&
          JSON.stringify(itemSortedOptions) === JSON.stringify(sortedOptions)
        );
      });

      if (existingItem) {
        // 수량 증가
        return prevItems.map((item) =>
          item.id === existingItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // 새 항목 추가
        const newItem: CartItem = {
          id: `${Date.now()}-${Math.random()}`,
          menuId: menu.id,
          menuName: menu.name,
          price: totalPrice,
          options: sortedOptions,
          quantity: 1,
        };
        return [...prevItems, newItem];
      }
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const value: CartContextType = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalAmount,
    itemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

