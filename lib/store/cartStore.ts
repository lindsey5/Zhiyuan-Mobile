import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type CartState = {
  cart: CartItem[];
  addItem: (item: CartItem) => void;
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

      addItem: (item) => {
        const existing = get().cart.find((i) => i._id === item._id);

        if (existing) {
          set({
            cart: get().cart.map((i) => i._id === item._id ? 
            { ...i, quantity: i.quantity + item.quantity, amount: i.amount + item.amount }
            : i),
          });
        } else {
          set({ cart: [...get().cart, item] });
        }
      },

      removeItem: (id) =>{
        console.log(id)
        set({
          cart: get().cart.filter((item) => item._id !== id),
        })
      },

      increaseQuantity: (id) =>
        set({
          cart: get().cart.map((item) =>
            item._id === id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }),

      decreaseQuantity: (id) =>
        set({
          cart: get()
            .cart.map((item) =>
              item._id === id
                ? { ...item, quantity: item.quantity - 1 }
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