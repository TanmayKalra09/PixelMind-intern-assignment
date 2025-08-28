'use client';
import React from 'react';
import { useStore } from '../store/useStore';

export default function ProductModal() {
  const product = useStore((s) => s.modalProduct);
  const closeModal = useStore((s) => s.closeModal);
  const addToCart = useStore((s) => s.addToCart);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white/95 backdrop-blur-md rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-slate-200/50">
        <div className="bg-gradient-to-r from-blue-50 to-slate-50 px-6 py-5 border-b border-slate-200/50">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold text-slate-900 line-clamp-2 leading-tight">
                {product.title}
              </h2>
            </div>
            <button 
              onClick={closeModal}
              className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors duration-200 group"
            >
              <svg className="w-5 h-5 text-slate-600 group-hover:text-slate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
              <div className="relative bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-2xl p-6 border border-slate-200/50">
                <div className="aspect-square flex items-center justify-center">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="max-w-full max-h-full object-contain drop-shadow-lg hover:scale-105 transition-transform duration-300" 
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl pointer-events-none"></div>
              </div>
            </div>

            <div className="lg:col-span-3 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Product Details
                </h3>
                <p className="text-slate-700 leading-relaxed bg-slate-50/50 rounded-xl p-4 border border-slate-200/50">
                  {product.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-xl p-4 border border-slate-200/50">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    <span className="font-semibold text-slate-900">Price</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">${product.price}</div>
                </div>

                <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-4 border border-slate-200/50">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <span className="font-semibold text-slate-900">Category</span>
                  </div>
                  <div className="text-lg font-medium text-slate-700 capitalize">{product.category}</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-200/50">
                <button
                  onClick={() => addToCart(product)}
                  className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-xl transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 flex items-center justify-center gap-2 group"
                >
                  <svg className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-2 5m0 0h14m-14 0a1 1 0 102 0m12 0a1 1 0 102 0" />
                  </svg>
                  Add to Cart
                </button>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}