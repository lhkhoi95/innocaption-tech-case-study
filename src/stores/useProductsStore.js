import { create } from "zustand";
import { makeApiCall } from "../utils/helpers";

export const useProductsStore = create((set, get) => ({
  products: [],
  searchedProducts: [],
  onSearch: false,
  loading: true,
  error: null,
  categories: [],
  skip: 0,
  limit: 9,

  getItemStock: async (productId) => {
    try {
      const data = await makeApiCall(
        `https://dummyjson.com/products/${productId}?select=stock`,
        "GET"
      );
      return data.stock;
    } catch (error) {
      console.error("Failed to fetch product stock:", error);
      set({ error: error });
    }
  },

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const url = new URL("https://dummyjson.com/products");
      const params = { skip: get().skip, limit: get().limit };
      url.search = new URLSearchParams(params).toString();

      const data = await makeApiCall(url, "GET");

      const currentProductIds = get().products.map((product) => product.id);
      const newProducts = data.products.filter(
        (product) =>
          product.stock > 0 && !currentProductIds.includes(product.id)
      );

      set((state) => ({
        products: [...state.products, ...newProducts],
        loading: false,
        skip: state.skip + state.limit,
      }));
    } catch (error) {
      set({ error: error });
      set({ loading: false });
    }
  },

  fetchCategories: async () => {
    try {
      const data = await makeApiCall(
        "https://dummyjson.com/products/categories",
        "GET"
      );
      const formattedCategories = data.map(
        (category) => category.charAt(0).toUpperCase() + category.slice(1)
      );
      set({ categories: formattedCategories });
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      set({ error: error });
    }
  },

  searchProducts: async (query, selectedCategory) => {
    set({ onSearch: true });
    let url;
    if (selectedCategory) {
      url = new URL(
        `https://dummyjson.com/products/category/${selectedCategory}`
      );
    } else {
      if (query) {
        url = new URL("https://dummyjson.com/products/search");
        const params = { q: query };
        url.search = new URLSearchParams(params).toString();
      } else {
        // Empty the searched products if the query is empty
        set({ searchedProducts: [] });
        set({ onSearch: false });
        return;
      }
    }

    try {
      const data = await makeApiCall(url, "GET");

      let filteredProducts = data.products.filter(
        (product) => product.stock > 0
      );

      // Filter products by query
      if (query && selectedCategory) {
        filteredProducts = filteredProducts.filter((product) =>
          product.title.toLowerCase().includes(query.toLowerCase())
        );
      }
      set({ searchedProducts: filteredProducts });
    } catch (error) {
      console.error("Failed to search products:", error);
    }
  },
}));
