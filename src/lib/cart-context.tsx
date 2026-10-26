import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@workspace/api-client-react";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  addItem: (product: Product) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
}

const CART_STORAGE_KEY = "alfavogue-cart";
const CartContext = createContext<CartContextValue | null>(null);

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored) as CartItem[];
    return Array.isArray(parsed)
      ? parsed.filter((item) => item?.product?.id && item.quantity > 0)
      : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCart);

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartContextValue>(() => {
    const totalItems = items.reduce((total, item) => total + item.quantity, 0);
    const subtotal = items.reduce(
      (total, item) => total + (item.product.price ?? 0) * item.quantity,
      0,
    );

    return {
      items,
      totalItems,
      subtotal,
      addItem: (product) => {
        setItems((currentItems) => {
          const existing = currentItems.find((item) => item.product.id === product.id);
          if (existing) {
            return currentItems.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            );
          }
          return [...currentItems, { product, quantity: 1 }];
        });
      },
      updateQuantity: (productId, quantity) => {
        setItems((currentItems) =>
          quantity > 0
            ? currentItems.map((item) =>
                item.product.id === productId ? { ...item, quantity } : item,
              )
            : currentItems.filter((item) => item.product.id !== productId),
        );
      },
      removeItem: (productId) => {
        setItems((currentItems) =>
          currentItems.filter((item) => item.product.id !== productId),
        );
      },
      clearCart: () => setItems([]),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
}