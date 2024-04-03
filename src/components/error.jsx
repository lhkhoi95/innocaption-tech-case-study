import React from "react";

export const ErrorScreen = ({ error }) => (
  <div className="flex h-screen flex-col items-center justify-center bg-red-100 text-red-700">
    <div className="max-w-md rounded bg-white p-8 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">Oops! An error occurred.</h2>
      <p className="text-red-500">{error}</p>
      <button className="mt-4 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-700">
        Try Again
      </button>
    </div>
  </div>
);
