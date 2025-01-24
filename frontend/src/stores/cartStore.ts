import create from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
}

export const useCart = create(
  persist<CartStore>(
    (set) => ({
      items: [],
      addToCart: (item) =>
        set((state) => {
          const existingItem = state.items.find((i) => i._id === item._id);
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: 1 }] };
        }),
      updateQuantity: (itemId, quantity) =>
        set((state) => ({
          items: quantity === 0
            ? state.items.filter((i) => i._id !== itemId)
            : state.items.map((i) =>
                i._id === itemId ? { ...i, quantity } : i
              ),
        })),
      removeFromCart: (itemId) =>
        set((state) => ({
          items: state.items.filter((i) => i._id !== itemId),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
    }
  )
);