import React, { useState, useEffect } from "react";
import { useProductsStore } from "../stores/useProductsStore";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = useProductsStore((state) => state.categories);
  const fetchCategories = useProductsStore((state) => state.fetchCategories);
  const searchProducts = useProductsStore((state) => state.searchProducts);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    searchProducts(query.trim(), selectedCategory.trim());
  }, [query, selectedCategory, searchProducts]);

  return (
    <div className="flex flex-col items-center justify-center py-6 text-center sm:flex-row">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        className="mb-2 mr-2 rounded border border-gray-300 px-2 py-1 sm:mb-0 sm:mr-2"
      />
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="rounded border border-gray-300 px-2 py-1"
      >
        <option value="">All categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};
