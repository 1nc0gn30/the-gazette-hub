import React from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../types';
import { cn } from '../lib/utils';

interface ArticleCardProps {
  article: Article;
  variant?: 'hero' | 'standard' | 'mini' | 'sidebar';
}

export default function ArticleCard({ article, variant = 'standard' }: ArticleCardProps) {
  if (variant === 'hero') {
    return (
      <Link to={`/article/${article.id}`} className="group block border-b-2 border-black pb-8 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <div className="overflow-hidden mb-4 newspaper-border p-1 bg-white">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full aspect-[16/9] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div className="lg:col-span-4 flex flex-col justify-center">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-color mb-4">{article.category}</span>
            <h2 className="font-serif font-black text-4xl md:text-5xl leading-[0.9] mb-6 group-hover:underline decoration-4 underline-offset-4">
              {article.title}
            </h2>
            <p className="text-black/80 text-lg leading-relaxed mb-8 font-classic italic">
              {article.excerpt}
            </p>
            <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.2em] opacity-40 mt-auto">
              <span>By {article.author}</span>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'mini') {
    return (
      <Link to={`/article/${article.id}`} className="group flex gap-4 border-b border-black/10 pb-4 mb-4 last:border-0">
        <div className="w-20 h-20 flex-shrink-0 overflow-hidden newspaper-border p-0.5 bg-white">
          <img 
            src={article.image} 
            alt={article.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div>
          <span className="text-[9px] font-black uppercase tracking-widest text-accent-color">{article.category}</span>
          <h3 className="font-serif font-bold text-base leading-tight group-hover:text-accent-color transition-colors">
            {article.title}
          </h3>
        </div>
      </Link>
    );
  }

  if (variant === 'sidebar') {
    return (
      <Link to={`/article/${article.id}`} className="group block border-b border-black/10 pb-6 mb-6 last:border-0">
        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-accent-color mb-2 block">{article.category}</span>
        <h3 className="font-serif font-bold text-xl leading-[1.1] mb-3 group-hover:underline decoration-2 underline-offset-2">
          {article.title}
        </h3>
        <p className="text-xs text-black/70 line-clamp-2 italic font-classic leading-relaxed">
          {article.excerpt}
        </p>
      </Link>
    );
  }

  return (
    <Link to={`/article/${article.id}`} className="group block border-b border-black/10 pb-8 mb-8">
      <div className="overflow-hidden mb-6 newspaper-border p-1 bg-white">
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full aspect-[4/3] object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-color mb-3 block">{article.category}</span>
      <h3 className="font-serif font-black text-2xl leading-tight mb-4 group-hover:underline decoration-2 underline-offset-2">
        {article.title}
      </h3>
      <p className="text-sm text-black/80 leading-relaxed mb-6 font-classic line-clamp-3">
        {article.excerpt}
      </p>
      <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.2em] opacity-40">
        <span>{article.author}</span>
        <span>•</span>
        <span>{article.readTime}</span>
      </div>
    </Link>
  );
}

