import React, { useState, useEffect, useRef } from "react";
import { Product } from "../../components/product";
import { useProductsStore } from "../../stores/useProductsStore";
import { ErrorScreen } from "../../components/error";
import { LoadingScreen } from "../../components/loading";
import { SearchBar } from "../../components/search";

export const Products = () => {
  const loadMoreRef = useRef(null);
  const [loadMoreClicked, setLoadMoreClicked] = useState(false);
  const products = useProductsStore((state) => state.products);
  const searchedProducts = useProductsStore((state) => state.searchedProducts);
  const onSearch = useProductsStore((state) => state.onSearch);
  const loading = useProductsStore((state) => state.loading);
  const error = useProductsStore((state) => state.error);
  const [index, setIndex] = useState(9);
  const fetchProducts = useProductsStore((state) => state.fetchProducts);

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [fetchProducts, products.length]);

  useEffect(() => {
    if (loadMoreClicked && products.length > 9 && loadMoreRef.current) {
      loadMoreRef.current.scrollIntoView({
        behavior: "smooth",
      });
      setLoadMoreClicked(false);
    }
  }, [loadMoreClicked, products]);

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error} />;

  const handleLoadMore = () => {
    setIndex(index + 9);
    setLoadMoreClicked(true);
    fetchProducts();
  };

  const handleBackToTop = () => {
    window.scrollTo(0, 0);
  };

  const displayedProducts = onSearch ? searchedProducts : products;

  return (
    <div className="md:mx-[10%]">
      <SearchBar />
      <div className="grid grid-cols-1 justify-items-center md:grid-cols-2 lg:grid-cols-3">
        {displayedProducts.map((product, index) => (
          <Product key={index} product={product} />
        ))}
      </div>
      <div className="mb-11 flex justify-center">
        {!onSearch && products.length && (
          <button
            onClick={handleLoadMore}
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            ref={loadMoreRef}
          >
            Load More
          </button>
        )}
      </div>

      <button
        onClick={handleBackToTop}
        className="fixed bottom-10 right-5 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 15.75 7.5-7.5 7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
};
