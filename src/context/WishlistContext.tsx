import React, { createContext, useContext } from 'react';
import { useWishlist as useWishlistHook } from '../hooks/useWishlist';

const WishlistContext = createContext<ReturnType<typeof useWishlistHook> | null>(null);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const wishlist = useWishlistHook();
  return <WishlistContext.Provider value={wishlist}>{children}</WishlistContext.Provider>;
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
