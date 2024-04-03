import React from "react";
import { useProductsStore } from "../stores/useProductsStore";

export const LoadMoreButton = ({ loadMoreRef, handleLoadMore }) => {
  const products = useProductsStore((state) => state.products);
  const onSearch = useProductsStore((state) => state.onSearch);
  return (
    <div className="mb-11 flex justify-center">
      {!onSearch && products.length && (
        <button
          onClick={handleLoadMore}
          className="rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-700"
          ref={loadMoreRef}
        >
          Load More
        </button>
      )}
    </div>
  );
};
