// src/context/CartContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // ✅ Load cart safely from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const parsed = JSON.parse(storedCart);

        // Ensure all items have correct structure
        const fixedCart = parsed.map(item => ({
          ...item,
          quantity: item.quantity || 1,
          preu: Number(item.preu) || 0
        }));

        setCart(fixedCart);
      } catch (error) {
        console.error("Error loading cart:", error);
        setCart([]);
      }
    }
  }, []);

  // ✅ Save cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ✅ Add product
  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);

      if (existing) {
        return prevCart.map(item =>
          item.id === product.id
            ? {
                ...item,
                quantity: (item.quantity || 1) + quantity
              }
            : item
        );
      }

      return [
        ...prevCart,
        {
          ...product,
          quantity: quantity || 1,
          preu: Number(product.preu) || 0
        }
      ];
    });
  };

  // ✅ Remove product
  const removeFromCart = (productId) => {
    setCart(prevCart =>
      prevCart.filter(item => item.id !== productId)
    );
  };

  // ✅ Update quantity
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) return;

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  // ✅ Clear cart
  const clearCart = () => {
    setCart([]);
  };

  // ✅ SAFE total calculation (NO MORE NaN)
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = Number(item.preu) || 0;
      const quantity = item.quantity || 1;
      return total + price * quantity;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        calculateTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ✅ Custom hook
export const useCart = () => useContext(CartContext);