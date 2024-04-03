import { create } from "zustand";
import { makeApiCall } from "../utils/helpers";

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

    // Get a list of products in the cart.
    const currentItems = get().items;

    // Map over the current items.
    let updatedItems = currentItems.map((item) => {
      // If the item is the product, return a new object with the quantity incremented.
      if (item.id === product.id) {
        return { ...item, quantity: item.quantity + 1 };
      }

      // Otherwise, return the item as is.
      return item;
    });

    // If the product is not in the cart, add it with a quantity of 1.
    if (!updatedItems.find((item) => item.id === product.id)) {
      updatedItems = [...updatedItems, { id: product.id, quantity: 1 }];
    }

    // Sort the updatedItems array by the id property.
    updatedItems.sort((a, b) => a.id - b.id);

    try {
      const requestBody = {
        userId: 1,
        products: updatedItems,
      };

      const data = await makeApiCall(
        "https://dummyjson.com/carts/add",
        "POST",
        requestBody
      );

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

    const requestBody = {
      merge: false,
      products: updatedItems,
    };

    try {
      const data = await makeApiCall(
        "https://dummyjson.com/carts/1",
        "PUT",
        requestBody
      );

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
