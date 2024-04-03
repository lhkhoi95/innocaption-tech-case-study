import React, { useEffect, useState } from "react";
import { useCartStore } from "../../stores/useCartStore";
import { useProductsStore } from "../../stores/useProductsStore";
import { convertToUSCurrency } from "../../utils/helpers";
import emptyCartImage from "../../assets/empty-cart.png";
import { ErrorScreen } from "../../components/error";

export const Cart = () => {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const discountedTotal = useCartStore((state) => state.discountedTotal);
  const { getItemStock } = useProductsStore();
  const total = useCartStore((state) => state.total);
  const [stock, setStock] = useState({});
  const error = useCartStore((state) => state.error);

  useEffect(() => {
    const fetchStock = async () => {
      for (const item of items) {
        const productStock = await getItemStock(item.id);
        setStock((prevStock) => ({ ...prevStock, [item.id]: productStock }));
      }
    };

    fetchStock();
  }, [items, getItemStock]);

  if (error) return <ErrorScreen error={error.toString()} />;

  if (items.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center text-xl style={{ height: 'calc(100vh - 100px)' }}">
        <div className="p-4">
          <img
            src={emptyCartImage}
            alt="Empty Cart"
            className="h-64 w-52 object-cover"
          />
          <p className="text-center">Your cart is empty</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:mx-[20%]">
      <h2 className="mb-4 text-2xl font-bold">Cart</h2>
      <div className="flex items-center justify-between border-b border-gray-200 p-2">
        <p className="font-semibold">Product</p>
        <div className="flex items-center">
          <p className="mr-8 font-semibold">Quantity</p>
          <p className="font-semibold">Action</p>
        </div>
      </div>
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between border-b border-gray-200 p-2"
        >
          <img
            src={item.thumbnail}
            alt={item.title}
            className="mr-4 h-16 w-16 object-cover"
          />
          <div className="flex-1">
            <p className="font-bold">{item.title}</p>
            <p className="flex gap-x-1">
              <span className="text-gray-400 line-through"></span>
              <span className="text-gray-400 line-through">
                {convertToUSCurrency(item.price)}
              </span>
              <span className="text-blue-600">
                {convertToUSCurrency(
                  item.price - item.price * (item.discountPercentage / 100)
                )}
              </span>
            </p>
          </div>
          <div className="mr-4 flex w-20 items-center justify-end">
            <select
              value={item.quantity}
              onChange={(e) => updateQuantity(item.id, e.target.value)}
              className="border px-2 py-1"
            >
              {[...Array(stock[item.id]).keys()].map((value) => (
                <option key={value} value={value + 1}>
                  {value + 1}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => updateQuantity(item.id, 0)}
            className="ml-2 text-red-500"
          >
            Remove
          </button>
        </div>
      ))}
      <div className="mt-8">
        <h2 className="mb-4 text-2xl font-bold">Cart Totals</h2>
        <div className="mb-4 flex justify-between">
          <span className="text-lg">Total:</span>
          <span className="text-lg">{convertToUSCurrency(total)}</span>
        </div>
        <div className="mb-4 flex justify-between">
          <span className="text-lg">You save:</span>
          <span className="text-lg">
            {convertToUSCurrency(total - discountedTotal)}
          </span>
        </div>
        <div className="mb-8 flex justify-between">
          <span className="text-lg">Final amount:</span>
          <span className="text-lg">
            {convertToUSCurrency(discountedTotal)}
          </span>
        </div>
        <button className="w-full rounded bg-blue-500 px-4 py-2 text-lg font-bold text-white">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};
