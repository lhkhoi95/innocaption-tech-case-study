import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  items: [],
  total: 0,
  discountedTotal: null,
  totalProducts: 0,
  totalQuantity: 0,
  isLoading: false,
  error: null,

  getItemQuantity: (productId) =>
    useCartStore.getState().items.reduce((total, item) => {
      return item.id === productId ? total + item.quantity : total;
    }, 0),

  addItem: async (product) => {
    set({ isLoading: true, error: null });

    // Get a list of products in the cart. Only get the id and quantity fields.
    const currentItems = get().items;

    // Check if the product is already in the cart.
    const existingItem = currentItems.find((item) => item.id === product.id);

    let updatedItems = [];
    if (existingItem) {
      // If the product is already in the cart, increment its quantity.
      updatedItems = currentItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      // If the product is not in the cart, add it with a quantity of 1.
      updatedItems = [...currentItems, { id: product.id, quantity: 1 }];
    }

    // Sort the updatedItems array by the id property.
    updatedItems.sort((a, b) => a.id - b.id);

    try {
      const requestBody = JSON.stringify({
        userId: 1,
        products: updatedItems,
      });

      const response = await fetch("https://dummyjson.com/carts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: requestBody,
      });

      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }

      const data = await response.json();

      set({
        items: data.products,
        total: data.total,
        discountedTotal: data.discountedTotal,
        totalProducts: data.totalProducts,
        totalQuantity: data.totalQuantity,
        isLoading: false,
      });
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      set({ error, isLoading: false });
    }
  },

  updateQuantity: async (id, quantity) => {
    set({ isLoading: true, error: null });

    const currentItems = useCartStore.getState().items;
    const updatedItems = currentItems
      .map((item) =>
        item.id === id ? { ...item, quantity: Number(quantity) } : item
      )
      .filter((item) => item.quantity > 0);

    const requestBody = JSON.stringify({
      merge: false,
      products: updatedItems,
    });

    try {
      const response = await fetch("https://dummyjson.com/carts/1", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: requestBody,
      });

      if (!response.ok) {
        throw new Error("Failed to update quantity");
      }

      const data = await response.json();

      set({
        items: data.products,
        total: data.total,
        discountedTotal: data.discountedTotal,
        totalProducts: data.totalProducts,
        totalQuantity: data.totalQuantity,
        isLoading: false,
      });
    } catch (error) {
      console.error("Failed to update quantity:", error);
      set({ error, isLoading: false });
    }
  },
}));
