import React from 'react';
import { NewspaperBrand, NewspaperIssue } from '../types';
import { formatDate } from '../lib/utils';

interface NewspaperHeaderProps {
  brand: NewspaperBrand;
  issue: NewspaperIssue;
}

export default function NewspaperHeader({ brand, issue }: NewspaperHeaderProps) {
  return (
    <header className="text-center mb-16 relative">
      <div className="flex justify-between items-center text-[9px] uppercase tracking-[0.4em] font-black mb-6 border-b-2 border-black pb-2">
        <div className="flex gap-4">
          <span>Vol. {issue.issueNumber}</span>
          <span className="hidden md:inline">•</span>
          <span className="hidden md:inline">No. 4,291</span>
        </div>
        <span className="absolute left-1/2 -translate-x-1/2 hidden lg:block italic font-serif lowercase tracking-normal text-black/40">
          {brand.establishedDate || 'established 1892'}
        </span>
        <div className="flex gap-4">
          <span>{formatDate(issue.date)}</span>
          <span className="hidden md:inline">•</span>
          <span>Price: $2.50</span>
        </div>
      </div>
      
      <div className="py-8 border-b-8 border-double border-black mb-6">
        <h1 className="font-serif font-black text-6xl md:text-8xl lg:text-[10rem] uppercase tracking-tighter leading-[0.8] mb-2">
          {brand.name}
        </h1>
        <p className="font-serif italic text-xl md:text-2xl text-black/60 tracking-tight">
          {brand.tagline}
        </p>
      </div>
      
      <div className="flex justify-between items-center py-2 border-b border-black text-[10px] font-bold uppercase tracking-widest">
        <div className="flex gap-8">
          <span className="hover:text-accent-color cursor-pointer">Late Edition</span>
          <span className="hidden sm:block hover:text-accent-color cursor-pointer">Weather: Fair</span>
        </div>
        <div className="flex gap-8">
          <span className="hidden sm:block hover:text-accent-color cursor-pointer">Stocks: +1.2%</span>
          <span className="hover:text-accent-color cursor-pointer">London, UK</span>
        </div>
      </div>
    </header>
  );
}

