import React from "react";
import { useCartStore } from "../stores/useCartStore";
import { convertToUSCurrency } from "../utils/helpers";

export const Product = ({ product }) => {
  const { thumbnail, title, price, discountPercentage } = product;
  const discountedPrice = ((price * (100 - discountPercentage)) / 100).toFixed(
    2
  );
  const addItem = useCartStore((state) => state.addItem);
  const itemQuantity = useCartStore((state) =>
    state.getItemQuantity(product.id)
  );
  const loading = useCartStore((state) => state.isLoading);

  const handleAddToCart = async () => {
    try {
      await addItem(product);
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  };

  return (
    <div className="m-16 flex h-[350px] w-[300px] flex-col items-center justify-center rounded-2xl shadow-lg">
      <div className="h-full w-full overflow-hidden rounded-2xl">
        <img
          src={thumbnail}
          alt={title}
          className="h-full w-full object-contain"
        />
      </div>
      <div className="w-full text-center">
        <p className="font-bold">{title}</p>
        <div className="flex items-center justify-center gap-x-3">
          <p className="ml-2 text-sm text-red-500">
            -{parseInt(discountPercentage)}% off
          </p>
          <p className="text-md font-bold text-blue-600">
            {convertToUSCurrency(discountedPrice)}
          </p>
        </div>
        <div className="text-sm text-gray-500">
          <span>Typical price: </span>
          <span className="line-through">{convertToUSCurrency(price)}</span>
        </div>
        <div className="my-4 flex justify-center">
          <div
            className="border-black-200 flex w-[200px] justify-center rounded-full border bg-zinc-100 px-4 py-2 font-bold text-black hover:bg-gray-300"
            onClick={handleAddToCart}
          >
            {itemQuantity > 0 ? (
              <div>
                <button disabled={loading}>
                  Add to Cart (<span>{itemQuantity})</span>
                </button>
              </div>
            ) : (
              <button disabled={loading}>Add to Cart</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
