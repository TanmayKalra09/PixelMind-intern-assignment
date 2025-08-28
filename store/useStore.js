import { create } from 'zustand'

export const useStore = create((set, get) => ({
  search: '',
  category: 'all',
  setSearch: (s) => set({ search: s }),
  setCategory: (c) => set({ category: c }),

  modalProduct: null,
  openModal: (product) => set({ modalProduct: product }),
  closeModal: () => set({ modalProduct: null }),

  localProducts: [],
  addLocalProduct: (product) => set((state) => ({ localProducts: [product, ...state.localProducts] })),

  cart: [], 
  addToCart: (product) =>
    set((state) => {
      const exists = state.cart.find((p) => p.id === product.id)
      if (exists) {
        return { cart: state.cart.map((p) => (p.id === product.id ? { ...p, qty: p.qty + 1 } : p)) }
      }
      return { cart: [...state.cart, { ...product, qty: 1 }] }
    }),
  removeFromCart: (id) =>
    set((state) => ({ cart: state.cart.filter((p) => p.id !== id) })),
  clearCart: () => set({ cart: [] })
}));