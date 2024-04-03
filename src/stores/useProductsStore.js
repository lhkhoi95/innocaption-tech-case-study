import { create } from "zustand";

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
      const response = await fetch(
        `https://dummyjson.com/products/${productId}?select=stock`
      );
      const data = await response.json();
      return data.stock;
    } catch (error) {
      console.error("Failed to fetch product stock:", error);
    }
  },

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const url = new URL("https://dummyjson.com/products");
      const params = { skip: get().skip, limit: get().limit };
      url.search = new URLSearchParams(params).toString();

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        set({ error: data.message || "Something went wrong", loading: false });
        return;
      }

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
      set({ error: error, loading: false });
    }
  },

  fetchCategories: async () => {
    try {
      const response = await fetch("https://dummyjson.com/products/categories");
      const data = await response.json();
      const formattedCategories = data.map(
        (category) => category.charAt(0).toUpperCase() + category.slice(1)
      );
      set({ categories: formattedCategories });
    } catch (error) {
      console.error("Failed to fetch categories:", error);
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
      const response = await fetch(url);
      const data = await response.json();
      // If query and selectedCategory are not empty, filter the products to match both constraints.
      if (query && selectedCategory) {
        set({
          searchedProducts: data.products.filter(
            (product) =>
              product.stock > 0 &&
              product.title.toLowerCase().includes(query.toLowerCase())
          ),
        });
      } else {
        set({
          searchedProducts: data.products.filter(
            (product) => product.stock > 0
          ),
        });
      }
    } catch (error) {
      console.error("Failed to search products:", error);
    }
  },
}));
