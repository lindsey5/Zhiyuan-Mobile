import { create } from "zustand"

type CartItem = {
    id: number
    name: string
    price: number
    quantity: number
    image: string;
}

type CartState = {
    cart: CartItem[]

    addItem: (item: CartItem) => void
    removeItem: (id: number) => void
    increaseQuantity: (id: number) => void
    decreaseQuantity: (id: number) => void
    clearCart: () => void
}

export const useCartStore = create<CartState>((set) => ({
    cart: [],

    addItem: (item) =>
        set((state) => {
        const existing = state.cart.find((i) => i.id === item.id)

        if (existing) {
            return {
            cart: state.cart.map((i) =>
                i.id === item.id
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            )
            }
        }

        return { cart: [...state.cart, item] }
    }),

    removeItem: (id) =>
        set((state) => ({
        cart: state.cart.filter((item) => item.id !== id)
    })),

    increaseQuantity: (id) =>
        set((state) => ({
        cart: state.cart.map((item) =>
            item.id === id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
    })),

    decreaseQuantity: (id) =>
        set((state) => ({
        cart: state.cart
            .map((item) =>
            item.id === id
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0)
    })),

    clearCart: () => set({ cart: [] })
}))