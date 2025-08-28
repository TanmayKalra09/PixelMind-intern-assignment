'use client';
import React from 'react';
import { useStore } from '../store/useStore';

export default function ProductCard({ product }) {
  const openModal = useStore((s) => s.openModal);
  const addToCart = useStore((s) => s.addToCart);

  return (
    <article
      className="group bg-white/80 backdrop-blur-sm rounded-2xl p-5 flex flex-col justify-between border border-slate-200/50 hover:border-blue-200/70 hover:shadow-xl hover:shadow-blue-100/30 transition-all duration-300 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
      onClick={() => openModal(product)}
    >
      <div className="relative h-48 flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-xl overflow-hidden mb-4">
        <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <img 
          src={product.image} 
          alt={product.title} 
          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105" 
        />
      </div>

      <div className="flex-1 space-y-3">
        <h3 className="font-semibold text-slate-900 text-base line-clamp-2 group-hover:text-blue-900 transition-colors duration-200">
          {product.title}
        </h3>
        <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between mb-3">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
            ${product.price}
          </div>
          <span className="text-xs font-medium px-3 py-1.5 bg-gradient-to-r from-slate-100 to-blue-50 text-slate-700 rounded-full border border-slate-200/50">
            {product.category}
          </span>
        </div>
        
        <button
          onClick={(e) => { 
            e.stopPropagation(); 
            addToCart(product); 
          }}
          className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-medium rounded-xl transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 flex items-center justify-center gap-2 group"
        >
          <svg
            className="w-4 h-4 transition-transform duration-200 group-hover:scale-110"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-2 5m0 0h14m-14 0a1 1 0 102 0m12 0a1 1 0 102 0" />
          </svg>
          Add to Cart
        </button>
      </div>
    </article>
  );
}