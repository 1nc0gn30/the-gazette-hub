import React from 'react';
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useNewspaper } from '../context/NewspaperContext';
import ReactMarkdown from 'react-markdown';
import { motion } from 'motion/react';
import { ArrowLeft, Share2, Bookmark, Printer } from 'lucide-react';
import { formatDate } from '../lib/utils';

interface ArticleProps {
  brandIndex?: number;
}

export default function Article({ brandIndex = 0 }: ArticleProps) {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { brands } = useNewspaper();
  const requestedBrandId = searchParams.get('brand');
  const preferredBrand = requestedBrandId
    ? brands.find((candidate) => candidate.id === requestedBrandId)
    : brands[brandIndex] || brands[0];

  const located = React.useMemo(() => {
    if (!id) return null;

    if (preferredBrand) {
      const preferredIssue = preferredBrand.issues[0];
      const preferredArticle = preferredIssue?.sections.flatMap((section) => section.articles).find((candidate) => candidate.id === id);
      if (preferredArticle) return { brand: preferredBrand, article: preferredArticle };
    }

    for (const candidateBrand of brands) {
      const issue = candidateBrand.issues[0];
      const article = issue?.sections.flatMap((section) => section.articles).find((candidate) => candidate.id === id);
      if (article) return { brand: candidateBrand, article };
    }
    return null;
  }, [id, preferredBrand, brands]);

  const brand = located?.brand;
  const article = located?.article;
  const [feedback, setFeedback] = React.useState('');

  const handleShare = async () => {
    const shareData = {
      title: article?.title || 'Article',
      text: article?.excerpt || '',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setFeedback('Article shared.');
        return;
      } catch {
        // If the user cancels native share, silently continue.
      }
    }

    try {
      await navigator.clipboard.writeText(shareData.url);
      setFeedback('Link copied to clipboard.');
    } catch {
      setFeedback('Unable to copy link.');
    }
  };

  const handleBookmark = () => {
    if (!article) return;
    const key = 'bookmarked_articles';
    const saved = localStorage.getItem(key);
    const ids: string[] = saved ? JSON.parse(saved) : [];
    const exists = ids.includes(article.id);
    const next = exists ? ids.filter((savedId) => savedId !== article.id) : [...ids, article.id];
    localStorage.setItem(key, JSON.stringify(next));
    setFeedback(exists ? 'Bookmark removed.' : 'Article bookmarked.');
  };


  if (!article) {
    return (
      <div className="text-center py-20">
        <h2 className="font-serif font-bold text-4xl mb-4">Article Not Found</h2>
        <Link to="/" className="text-accent-color hover:underline">Return to Home</Link>
      </div>
    );
  }

  return (
    <motion.article 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <Link to="/" className="inline-flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-black/40 hover:text-black mb-8 md:mb-12 transition-colors">
        <ArrowLeft size={14} />
        Back to Issue
      </Link>
      <div className="mb-8 -mt-4">
        <Link
          to={`/editor/${brand.id}/${article.id}`}
          className="inline-flex items-center text-[10px] md:text-xs font-bold uppercase tracking-widest text-accent-color hover:underline"
        >
          Edit This Article
        </Link>
      </div>

      <header className="mb-8 md:mb-12">
        <div className="flex flex-wrap items-center gap-2 md:gap-4 text-[10px] md:text-xs font-bold uppercase tracking-widest text-accent-color mb-4 md:mb-6">
          <span>{article.category}</span>
          <span className="hidden sm:inline">•</span>
          <span>{formatDate(article.date)}</span>
        </div>
        
        <h1 className="font-serif font-black text-4xl sm:text-5xl md:text-7xl leading-tight mb-4 md:mb-6 text-balance break-words">
          {article.title}
        </h1>
        
        {article.subtitle && (
          <p className="font-classic text-xl md:text-2xl text-black/60 italic leading-relaxed mb-6 md:mb-8">
            {article.subtitle}
          </p>
        )}

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-y border-black/10 py-4 md:py-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-black rounded-full flex items-center justify-center text-white font-serif font-bold text-lg md:text-xl flex-shrink-0">
              {article.author[0]}
            </div>
            <div>
              <div className="font-bold text-xs md:text-sm uppercase tracking-widest">By {article.author}</div>
              <div className="text-[10px] md:text-xs text-black/40 font-medium uppercase tracking-widest">{article.readTime}</div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-black/40 w-full sm:w-auto justify-end">
            <button
              onClick={handleShare}
              aria-label="Share article"
              className="hover:text-black transition-colors"
            >
              <Share2 size={18} className="md:w-5 md:h-5" />
            </button>
            <button
              onClick={handleBookmark}
              aria-label="Bookmark article"
              className="hover:text-black transition-colors"
            >
              <Bookmark size={18} className="md:w-5 md:h-5" />
            </button>
            <button
              onClick={() => window.print()}
              aria-label="Print article"
              className="hover:text-black transition-colors"
            >
              <Printer size={18} className="md:w-5 md:h-5" />
            </button>
          </div>
        </div>
        {feedback && (
          <p className="mt-3 text-[10px] md:text-xs font-bold uppercase tracking-widest text-black/50">
            {feedback}
          </p>
        )}
      </header>

      {article.image && (
        <figure className="mb-8 md:mb-12">
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-full aspect-video md:aspect-[16/9] object-cover"
            referrerPolicy="no-referrer"
          />
          <figcaption className="text-[10px] md:text-xs italic text-black/40 mt-2 md:mt-4 text-center font-classic">
            Photo by Unsplash / Editorial Archive
          </figcaption>
        </figure>
      )}

      <div className="column-text-1 md:column-text-2 gap-8 md:gap-12 prose prose-base md:prose-lg max-w-none prose-headings:font-serif prose-headings:font-black prose-p:font-classic prose-p:leading-relaxed prose-p:mb-6 prose-blockquote:font-serif prose-blockquote:italic prose-blockquote:text-xl md:prose-blockquote:text-2xl prose-blockquote:text-black/60 prose-blockquote:border-l-4 prose-blockquote:border-black prose-img:newspaper-border prose-img:p-1 prose-img:bg-white">
        <ReactMarkdown>{article.content}</ReactMarkdown>
      </div>

      <footer className="mt-12 md:mt-20 pt-8 md:pt-12 border-t border-black/10">
        <div className="bg-black/5 p-6 md:p-12 text-center">
          <h3 className="font-serif font-bold text-2xl md:text-3xl mb-3 md:mb-4">Support Independent Journalism</h3>
          <p className="text-black/60 mb-6 md:mb-8 max-w-md mx-auto leading-relaxed text-sm md:text-base">
            Our mission is to provide high-quality, independent reporting that matters. Your support helps us keep the press free.
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="bg-black text-[#f4f1ea] px-6 py-3 md:px-8 md:py-4 font-bold uppercase text-[10px] md:text-xs tracking-widest hover:bg-accent-color transition-colors w-full sm:w-auto"
          >
            Become a Member
          </button>
        </div>
      </footer>
    </motion.article>
  );
}
