import React from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";

export const Navbar = () => {
  const totalQuantity = useCartStore((state) => state.totalQuantity);
  return (
    <nav className="bg-blue-500">
      <div className="flex justify-end space-x-4 bg-blue-500 p-6 sm:mx-0 md:mx-8">
        <Link to="/products" className="font-semibold text-white">
          Products
        </Link>
        <Link to="/cart" className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
          <span className="absolute right-[-12px] top-[-15px] flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            {totalQuantity}
          </span>
        </Link>
      </div>
    </nav>
  );
};
