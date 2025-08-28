'use client';
import React from 'react';
import { useStore } from '../store/useStore';

export default function SearchBar() {
  const search = useStore((s) => s.search);
  const setSearch = useStore((s) => s.setSearch);

  return (
    <div className="relative w-full md:w-80">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <input
        className="w-full pl-10 pr-12 py-2.5 bg-white/80 backdrop-blur-sm border border-slate-200 hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 placeholder-slate-400 text-slate-700 font-medium focus:outline-none"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {search && (
        <button
          onClick={() => setSearch('')}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center transition-colors duration-200 group"
          aria-label="Clear search"
        >
          <svg className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-xl pointer-events-none"></div>
    </div>
  );
}