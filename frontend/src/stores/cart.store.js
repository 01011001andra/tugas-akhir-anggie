import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  items: [],

  // =========================
  // INIT FROM API (🔥 FIX UTAMA)
  // =========================
  setFromApi: (apiItems = []) => {
    const mapped = apiItems.map((i) => ({
      cartItemId: i.id,
      productId: i.productId,
      title: i.product?.title,
      price: i.price,
      quantity: i.quantity,
      image: i.product?.image,
      product: i.product,
    }));

    set({ items: mapped });
  },

  // =========================
  // ADD ITEM (OPTIMISTIC)
  // =========================
  addItem: (product, qty = 1) => {
    const items = get().items;
    const exist = items.find((i) => i.productId === product.id);

    if (exist) {
      set({
        items: items.map((i) =>
          i.productId === product.id ? { ...i, quantity: i.quantity + qty } : i
        ),
      });
    } else {
      set({
        items: [
          ...items,
          {
            productId: product.id,
            title: product.title,
            price: product.price,
            quantity: qty,
            image: product.image,
          },
        ],
      });
    }
  },

  // =========================
  // UPDATE QTY
  // =========================
  updateQty: (productId, qty) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.productId === productId ? { ...i, quantity: qty } : i
      ),
    })),

  // =========================
  // REMOVE ITEM
  // =========================
  removeItem: (productId) => {
    set({
      items: get().items.filter((i) => i.productId !== productId),
    });
  },

  // =========================
  // CLEAR CART
  // =========================
  clear: () => set({ items: [] }),

  // =========================
  // DERIVED
  // =========================
  totalQty: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

  subtotal: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
}));
