'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '../utils/fetcher';
import { useStore } from '../store/useStore';

export default function FilterBar() {
  const category = useStore((s) => s.category);
  const setCategory = useStore((s) => s.setCategory);
  
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  if (isLoading) {
    return (
      <div className="relative">
        <div className="flex items-center gap-2 px-4 py-2.5 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl shadow-sm">
          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
          </svg>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-600 font-medium">Loading filters...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none z-10">
        <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
        </svg>
      </div>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none z-10">
        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      <select
        className="appearance-none w-full min-w-[180px] pl-10 pr-10 py-2.5 bg-white/80 backdrop-blur-sm border border-slate-200 hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 text-slate-700 font-medium cursor-pointer focus:outline-none"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="all" className="py-2">All Categories</option>
        {categories.map((c) => (
          <option key={c} value={c} className="py-2 capitalize">
            {c.charAt(0).toUpperCase() + c.slice(1)}
          </option>
        ))}
      </select>
      {category && category !== 'all' && (
        <div className="absolute -top-1 -right-1">
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-xl pointer-events-none"></div>
    </div>
  );
}