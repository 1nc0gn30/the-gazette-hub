import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { Search as SearchIcon, Filter, ArrowRight } from 'lucide-react';
import { useNewspaper } from '../context/NewspaperContext';
import { formatDate } from '../lib/utils';

interface SearchResultItem {
  brandId: string;
  brandName: string;
  sectionId: string;
  sectionName: string;
  score: number;
  article: {
    id: string;
    title: string;
    subtitle?: string;
    author: string;
    date: string;
    category: string;
    content: string;
    image?: string;
    excerpt: string;
    readTime: string;
  };
}

const RANGE_DAYS_MAP: Record<string, number> = {
  'Past 24 Hours': 1,
  'Past Week': 7,
  'Past Month': 30,
  'Past Year': 365,
};

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = React.useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = React.useState('All Categories');
  const [selectedRange, setSelectedRange] = React.useState('All Time');
  const [sortBy, setSortBy] = React.useState('relevance');
  const { brands } = useNewspaper();
  const categories = ['All Categories', 'World', 'Business', 'Culture', 'Sports', 'Opinion', 'Politics', 'Markets', 'Entertainment'];
  const dateRanges = ['Past 24 Hours', 'Past Week', 'Past Month', 'Past Year', 'All Time'];

  React.useEffect(() => {
    const next = new URLSearchParams(window.location.search);
    if (query.trim()) next.set('q', query.trim());
    else next.delete('q');
    setSearchParams(next, { replace: true });
  }, [query, setSearchParams]);

  const allArticles = React.useMemo(
    () =>
      brands.flatMap((brand) =>
        brand.issues.flatMap((issue) =>
          issue.sections.flatMap((section) =>
            section.articles.map((article) => ({
              brandId: brand.id,
              brandName: brand.name,
              sectionId: section.id,
              sectionName: section.name,
              article,
            }))
          )
        )
      ),
    [brands]
  );

  const filteredArticles = React.useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const queryTokens = normalizedQuery.split(/\s+/).filter(Boolean);

    const candidateResults: SearchResultItem[] = allArticles
      .filter((item) => {
        const matchesCategory =
          selectedCategory === 'All Categories' ||
          item.article.category.toLowerCase() === selectedCategory.toLowerCase();

        const daysBack = RANGE_DAYS_MAP[selectedRange];
        const matchesDate =
          selectedRange === 'All Time' ||
          (() => {
            const articleDate = new Date(item.article.date);
            if (Number.isNaN(articleDate.getTime()) || !daysBack) return true;
            const cutoff = new Date();
            cutoff.setDate(cutoff.getDate() - daysBack);
            return articleDate >= cutoff;
          })();

        return matchesCategory && matchesDate;
      })
      .map((item) => {
        if (!normalizedQuery) {
          return { ...item, score: 1 };
        }

        const title = item.article.title.toLowerCase();
        const subtitle = (item.article.subtitle || '').toLowerCase();
        const excerpt = item.article.excerpt.toLowerCase();
        const content = item.article.content.toLowerCase();
        const author = item.article.author.toLowerCase();
        const category = item.article.category.toLowerCase();
        const section = item.sectionName.toLowerCase();

        let score = 0;

        if (title.includes(normalizedQuery)) score += 80;
        if (subtitle.includes(normalizedQuery)) score += 45;
        if (excerpt.includes(normalizedQuery)) score += 40;
        if (author.includes(normalizedQuery)) score += 30;
        if (category.includes(normalizedQuery) || section.includes(normalizedQuery)) score += 25;
        if (content.includes(normalizedQuery)) score += 15;

        queryTokens.forEach((token) => {
          if (title.includes(token)) score += 20;
          if (subtitle.includes(token)) score += 10;
          if (excerpt.includes(token)) score += 8;
          if (author.includes(token)) score += 8;
          if (category.includes(token) || section.includes(token)) score += 6;
          if (content.includes(token)) score += 2;
        });

        return { ...item, score };
      })
      .filter((item) => item.score > 0);

    // Remove duplicates by canonical fingerprint while preserving best-ranked entry.
    const deduped = new Map<string, SearchResultItem>();
    candidateResults.forEach((item) => {
      const fingerprint = `${item.article.title.trim().toLowerCase()}|${item.article.author.trim().toLowerCase()}|${item.article.date}|${item.article.excerpt.trim().toLowerCase()}`;
      const existing = deduped.get(fingerprint);
      if (!existing || item.score > existing.score) {
        deduped.set(fingerprint, item);
      }
    });

    return Array.from(deduped.values()).sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.article.date).getTime() - new Date(a.article.date).getTime();
      }
      if (sortBy === 'oldest') {
        return new Date(a.article.date).getTime() - new Date(b.article.date).getTime();
      }
      return b.score - a.score || new Date(b.article.date).getTime() - new Date(a.article.date).getTime();
    });
  }, [allArticles, query, selectedCategory, selectedRange, sortBy]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto"
    >
      <header className="mb-8 md:mb-12 border-b-2 border-black pb-6 md:pb-8">
        <h1 className="font-serif font-black text-4xl md:text-6xl uppercase tracking-tighter mb-6 md:mb-8">Search Archive</h1>
        <div className="relative">
          <SearchIcon className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-black/20" size={20} />
          <input 
            type="text" 
            placeholder="Search for articles, authors, or topics..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-white/50 border-2 border-black p-4 md:p-6 pl-12 md:pl-16 font-serif text-xl md:text-2xl focus:outline-none focus:border-accent-color transition-colors"
          />
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
        <aside className="lg:col-span-3">
          <div className="sticky top-24 space-y-8">
            <div>
              <h3 className="font-bold uppercase text-xs tracking-widest mb-4 flex items-center gap-2">
                <Filter size={14} /> Filter By
              </h3>
              <div className="space-y-2 flex flex-wrap lg:flex-col gap-2 lg:gap-0">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`block text-sm font-medium transition-colors text-left ${
                      selectedCategory === cat ? 'text-accent-color underline underline-offset-4' : 'hover:text-accent-color'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="hidden lg:block">
              <h3 className="font-bold uppercase text-xs tracking-widest mb-4">Date Range</h3>
              <div className="space-y-2">
                {dateRanges.map(range => (
                  <button
                    key={range}
                    onClick={() => setSelectedRange(range)}
                    className={`block text-sm font-medium transition-colors text-left ${
                      selectedRange === range ? 'text-accent-color underline underline-offset-4' : 'hover:text-accent-color'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <div className="lg:col-span-9">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8 border-b border-black/10 pb-4">
            <span className="text-xs font-bold uppercase tracking-widest opacity-40">
              Showing {filteredArticles.length} Results
            </span>
            <select
              className="bg-transparent text-xs font-bold uppercase tracking-widest focus:outline-none"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="relevance">Sort by Relevance</option>
              <option value="newest">Sort by Newest</option>
              <option value="oldest">Sort by Oldest</option>
            </select>
          </div>

          <div className="space-y-8 md:space-y-12">
            {filteredArticles.length > 0 ? filteredArticles.map((result) => (
              <div key={`${result.brandId}-${result.article.id}`} className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 border-b border-black/5 pb-8 md:pb-12">
                <div className="md:col-span-4 overflow-hidden">
                  <img 
                    src={result.article.image} 
                    alt={result.article.title} 
                    className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="md:col-span-8 flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-accent-color mb-2">{result.article.category}</span>
                  <h2 className="font-serif font-bold text-2xl md:text-3xl mb-3 md:mb-4 group-hover:underline decoration-2 underline-offset-4">
                    {result.article.title}
                  </h2>
                  <p className="text-sm text-black/60 font-classic leading-relaxed mb-4 md:mb-6 line-clamp-2 md:line-clamp-3">
                    {result.article.excerpt}
                  </p>
                  <div className="mt-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="text-[10px] font-bold uppercase tracking-widest opacity-40">
                      {result.brandName} • {result.sectionName} • By {result.article.author} • {formatDate(result.article.date)}
                    </div>
                    <div className="flex items-center gap-4">
                      <Link to={`/editor/${result.brandId}/${result.article.id}`} className="text-[10px] font-bold uppercase tracking-widest hover:text-accent-color transition-colors">
                        Edit
                      </Link>
                      <Link to={`/article/${result.article.id}?brand=${result.brandId}`} className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 hover:text-accent-color transition-colors">
                        Read More <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )) : (
              <div className="text-center py-12 md:py-20 border-2 border-dashed border-black/10">
                <p className="font-serif italic text-xl md:text-2xl text-black/40">No articles found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
