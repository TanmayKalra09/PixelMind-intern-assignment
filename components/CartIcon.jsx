'use client';
import React from 'react';
import { useStore } from '../store/useStore';

export default function CartIcon({ onOpen }) {
  const cart = useStore((s) => s.cart);
  const totalCount = cart.reduce((sum, it) => sum + it.qty, 0);

  return (
    <div className="fixed right-6 bottom-6 z-40">
      <button
        onClick={onOpen}
        className="relative bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg"
      >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-2 5m0 0h14m-14 0a1 1 0 102 0m12 0a1 1 0 102 0" />
          </svg>
        {totalCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
            {totalCount}
          </span>
        )}
      </button>
    </div>
  );
}