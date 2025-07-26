import React, { createContext, useContext } from 'react';
import { useCart as useCartHook } from '../hooks/useCart';

const CartContext = createContext<ReturnType<typeof useCartHook> | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const cart = useCartHook();
  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
