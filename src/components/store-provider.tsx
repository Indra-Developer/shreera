"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { products, type Product } from "@/data/catalog";

export type CartItem = Product & {
  lineId: string;
  quantity: number;
  color: string;
  size: string;
};

type StoreContextValue = {
  cartItems: CartItem[];
  wishlistIds: string[];
  cartCount: number;
  wishlistCount: number;
  addToCart: (product: Product, options?: { color?: string; size?: string; quantity?: number }) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  removeFromCart: (lineId: string) => void;
  clearCart: () => void;
  isWishlisted: (productId: string) => boolean;
  toggleWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
};

const storageKey = "shreera-store-state";
const defaultColors = ["Royal Blue", "Lavender", "Peach"];
const defaultColorFor = (product: Product) => product.name.includes("Lavender") ? "Purple" : product.name.includes("Peach") ? "Peach" : product.name.includes("Green") ? "Green" : product.name.includes("Beige") ? "Gold" : "Royal Blue";

const lineIdFor = (productId: string, color: string, size: string) => `${productId}::${color.toLowerCase().replace(/\s+/g, "-")}::${size.toLowerCase().replace(/\s+/g, "-")}`;

const initialCart: CartItem[] = products.slice(0, 3).map((product, index) => ({
  ...product,
  lineId: lineIdFor(product.id, defaultColors[index], "Free Size"),
  quantity: 1,
  color: defaultColors[index],
  size: "Free Size",
}));

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCart);
  const [wishlistIds, setWishlistIds] = useState<string[]>(products.map((product) => product.id));
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = window.localStorage.getItem(storageKey);
        if (saved) {
          const parsed = JSON.parse(saved) as { cartItems?: CartItem[]; wishlistIds?: string[] };
          if (Array.isArray(parsed.cartItems)) setCartItems(parsed.cartItems);
          if (Array.isArray(parsed.wishlistIds)) setWishlistIds(parsed.wishlistIds);
        }
      } catch {
        // Keep the illustrated starter state when local storage is unavailable.
      }
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(storageKey, JSON.stringify({ cartItems, wishlistIds }));
  }, [cartItems, hydrated, wishlistIds]);

  const value = useMemo<StoreContextValue>(() => ({
    cartItems,
    wishlistIds,
    cartCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
    wishlistCount: wishlistIds.length,
    addToCart: (product, options = {}) => {
      const color = options.color ?? defaultColorFor(product);
      const size = options.size ?? "Free Size";
      const quantity = Math.max(1, options.quantity ?? 1);
      const lineId = lineIdFor(product.id, color, size);
      setCartItems((current) => {
        const existing = current.find((item) => item.lineId === lineId);
        if (existing) return current.map((item) => item.lineId === lineId ? { ...item, quantity: item.quantity + quantity } : item);
        return [...current, { ...product, lineId, quantity, color, size }];
      });
    },
    updateQuantity: (lineId, quantity) => setCartItems((current) => quantity <= 0 ? current.filter((item) => item.lineId !== lineId) : current.map((item) => item.lineId === lineId ? { ...item, quantity } : item)),
    removeFromCart: (lineId) => setCartItems((current) => current.filter((item) => item.lineId !== lineId)),
    clearCart: () => setCartItems([]),
    isWishlisted: (productId) => wishlistIds.includes(productId),
    toggleWishlist: (productId) => setWishlistIds((current) => current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId]),
    removeFromWishlist: (productId) => setWishlistIds((current) => current.filter((id) => id !== productId)),
    clearWishlist: () => setWishlistIds([]),
  }), [cartItems, wishlistIds]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used inside StoreProvider");
  return context;
}
