import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type CartState = {
  cart: CartItem[];
  addItem: (item: CartItem, stock: number) => void;
  removeItem: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
};

const storage =
  Platform.OS === "web"
    ? createJSONStorage(() => localStorage)
    : createJSONStorage(() => AsyncStorage);

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addItem: (item, stock) => {
        const existing = get().cart.find((i) => i.variant_id === item.variant_id);

        if (existing) {
          const itemQuantity = existing.quantity;
          const totalRequested = itemQuantity + item.quantity;

          const finalQuantity = totalRequested >= stock
            ? stock
            : totalRequested;
          set({
            cart: get().cart.map((i) => i.variant_id === item.variant_id ? 
            { ...i, quantity: finalQuantity, total_amount: i.price * finalQuantity }
            : i),
          });
        } else {
          set({ cart: [...get().cart, item] });
        }
      },

      removeItem: (id) =>{
        set({
          cart: get().cart.filter((item) => item.variant_id !== id),
        })
      },

      increaseQuantity: (id) =>
        set({
          cart: get().cart.map((item) =>
            item.variant_id === id
              ? { ...item, quantity: item.quantity + 1, total_amount: item.amount + item.price }
              : item
          ),
        }),

      decreaseQuantity: (id) =>
        set({
          cart: get()
            .cart.map((item) =>
              item.variant_id === id
                ? { ...item, quantity: item.quantity - 1, total_amount: item.amount - item.price  }
                : item
            )
            .filter((item) => item.quantity > 0),
        }),

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage",
      storage,
    }
  )
);