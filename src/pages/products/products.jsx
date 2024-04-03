import React, { useState, useEffect, useRef } from "react";
import { useProductsStore } from "../../stores/useProductsStore";
import { ErrorScreen } from "../../components/error";
import { LoadingScreen } from "../../components/loading";
import { SearchBar } from "../../components/search";
import { Product } from "../../components/product";
import { BackToTopButton } from "../../components/backtotop";
import { LoadMoreButton } from "../../components/loadmore";

export const Products = () => {
  const loadMoreRef = useRef(null);
  const [index, setIndex] = useState(9);
  const error = useProductsStore((state) => state.error);
  const loading = useProductsStore((state) => state.loading);
  const products = useProductsStore((state) => state.products);
  const onSearch = useProductsStore((state) => state.onSearch);
  const [loadMoreClicked, setLoadMoreClicked] = useState(false);
  const fetchProducts = useProductsStore((state) => state.fetchProducts);
  const searchedProducts = useProductsStore((state) => state.searchedProducts);

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

  const displayedProducts = onSearch ? searchedProducts : products;

  return (
    <div className="md:mx-[10%]">
      <SearchBar />
      <div className="flex flex-wrap justify-center">
        {displayedProducts.map((product, index) => (
          <Product key={index} product={product} />
        ))}
      </div>
      <LoadMoreButton
        loadMoreRef={loadMoreRef}
        handleLoadMore={handleLoadMore}
      />
      <BackToTopButton />
    </div>
  );
};
