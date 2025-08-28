'use client';
import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../utils/fetcher';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import AddProductForm from '../components/AddProductForm';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import CartIcon from '../components/CartIcon';
import { useStore } from '../store/useStore';

export default function Page() {
  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 1000 * 60,
  });

  const localProducts = useStore((s) => s.localProducts);
  const openModal = useStore((s) => s.openModal);
  const modalProduct = useStore((s) => s.modalProduct);
  const closeModal = useStore((s) => s.closeModal);
  const [showAddPage, setShowAddPage] = useState(false);

  const [showCart, setShowCart] = useState(false);
  const cart = useStore((s) => s.cart);
  const removeFromCart = useStore((s) => s.removeFromCart);
  const clearCart = useStore((s) => s.clearCart);
  const search = useStore((s) => s.search);
  const category = useStore((s) => s.category);

  const combined = useMemo(() => [...localProducts, ...products], [localProducts, products]);

  const filtered = useMemo(() => {
    let list = combined;
    if (category && category !== 'all') list = list.filter((p) => p.category === category);
    if (search) list = list.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));
    return list;
  }, [combined, category, search]);

  if (isLoading) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8 flex items-center justify-center">
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-slate-600 font-medium">Loading products...</span>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-8 text-center">
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">Failed to load products</h3>
        <p className="text-slate-600">Please try refreshing the page</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto p-6">
        <header className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200/50 p-6 mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent">
                Tanmay Kalra || tanmaykalra0910@gmail.com
              </h1>
              <p className="text-slate-600 mt-1">Pixel Mind Frontend Intern Assignment</p>
            </div>
            
            <div className="flex flex-wrap gap-3 items-center w-full lg:w-auto">
              <SearchBar />
              <FilterBar />
              <button 
                onClick={() => setShowAddPage((s) => !s)} 
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-medium transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
              >
                Add Product
              </button>
            </div>
          </div>
        </header>

        <main>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-2 5m0 0h14m-14 0a1 1 0 102 0m12 0a1 1 0 102 0" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No products found</h3>
              <p className="text-slate-600">Try adjusting your search or filters</p>
            </div>
          )}
        </main>

        {showAddPage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-slate-200/50 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-slate-50 px-6 py-4 border-b border-slate-200/50">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">Add New Product</h3>
                    <p className="text-slate-600 text-sm mt-1">Create a new product listing</p>
                  </div>
                  <button 
                    onClick={() => setShowAddPage(false)} 
                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors duration-200"
                  >
                    <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="p-6">
                <AddProductForm onClose={() => setShowAddPage(false)} />
              </div>
            </div>
          </div>
        )}

        <ProductModal />

        <CartIcon onOpen={() => setShowCart(true)} />

        {showCart && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/20 backdrop-blur-sm p-4">
            <div className="bg-white rounded-t-3xl w-full max-w-3xl shadow-2xl border-t border-slate-200/50 max-h-[80vh] overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-slate-50 px-6 py-5 border-b border-slate-200/50">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">Shopping Cart</h3>
                    <p className="text-slate-600 text-sm mt-1">
                      {cart.length === 0 ? 'Your cart is empty' : `${cart.length} item${cart.length > 1 ? 's' : ''} in cart`}
                    </p>
                  </div>
                  <div className="flex gap-2 items-center">
                    {cart.length > 0 && (
                      <button 
                        onClick={() => { clearCart(); setShowCart(false); }} 
                        className="px-4 py-2 border border-slate-300 hover:border-slate-400 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors duration-200 text-sm font-medium"
                      >
                        Clear Cart
                      </button>
                    )}
                    <button 
                      onClick={() => setShowCart(false)} 
                      className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors duration-200"
                    >
                      <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
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
                    </div>
                    <h4 className="text-lg font-medium text-slate-900 mb-2">Your cart is empty</h4>
                    <p className="text-slate-600">Add some products to get started</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((i) => (
                      <div key={i.id} className="bg-slate-50/50 rounded-xl p-4 border border-slate-200/50 hover:bg-slate-50 transition-colors duration-200">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-white rounded-lg border border-slate-200 overflow-hidden flex-shrink-0">
                            <img src={i.image} alt={i.title} className="w-full h-full object-contain" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-slate-900 truncate">{i.title}</h4>
                            <div className="flex items-center gap-4 mt-2">
                              <span className="text-sm text-slate-600 bg-slate-200/70 px-2 py-1 rounded-md">
                                Qty: {i.qty}
                              </span>
                              <span className="text-lg font-semibold text-blue-600">
                                ${(i.price * i.qty).toFixed(2)}
                              </span>
                            </div>
                          </div>
                          
                          <button 
                            onClick={() => removeFromCart(i.id)} 
                            className="text-red-500 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors duration-200"
                            title="Remove from cart"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    <div className="border-t border-slate-200 pt-4 mt-6">
                      <div className="flex justify-between items-center text-lg font-semibold">
                        <span className="text-slate-900">Total:</span>
                        <span className="text-blue-600">
                          ${cart.reduce((sum, item) => sum + (item.price * item.qty), 0).toFixed(2)}
                        </span>
                      </div>
                      <button className="w-full mt-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-medium transition-all duration-200 shadow-sm hover:shadow-md active:scale-95">
                        Proceed to Checkout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}