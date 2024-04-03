import React from "react";

export const BackToTopButton = () => {
  const handleBackToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
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
  );
};
