import { createContext, useContext, useState, ReactNode } from "react";

interface CartContextType {
  cartCount: number;
  setCartCount: (count: number) => void;
}

const CartContext = createContext<CartContextType>({ cartCount: 3, setCartCount: () => {} });

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartCount, setCartCount] = useState(3);
  return (
    <CartContext.Provider value={{ cartCount, setCartCount }}>
      {children}
    </CartContext.Provider>
  );
};
