import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useNewspaper } from '../context/NewspaperContext';
import ArticleCard from '../components/ArticleCard';

interface SectionProps {
  brandIndex?: number;
}

export default function Section({ brandIndex = 0 }: SectionProps) {
  const { name } = useParams();
  const { brands } = useNewspaper();
  const brand = brands[brandIndex] || brands[0];
  const issue = brand.issues[0];
  const section = issue?.sections.find(s => s.id === name) || issue?.sections[0];

  if (!brand || !issue || !section) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto"
    >
      <header className="text-center mb-12 md:mb-20 border-b-4 border-black pb-8 md:pb-12">
        <div className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4 opacity-40">{brand.name} • Section</div>
        <h1 className="font-serif font-black text-5xl md:text-7xl lg:text-9xl uppercase tracking-tighter leading-none break-words">
          {section.name}
        </h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {section.articles.map((article, i) => (
          <div key={article.id} className={i === 0 ? "md:col-span-2 lg:col-span-2" : ""}>
            <ArticleCard article={article} variant={i === 0 ? "hero" : "standard"} />
          </div>
        ))}
      </div>

      <div className="mt-12 md:mt-20 pt-8 md:pt-12 border-t border-black/10">
        <h3 className="font-serif font-bold text-2xl uppercase mb-6 md:mb-8">Other Sections</h3>
        <div className="flex flex-wrap gap-4">
          {issue.sections.map(s => (
            <Link 
              key={s.id} 
              to={`/sections/${s.id}`}
              className="px-4 py-2 md:px-6 md:py-3 border border-black font-bold uppercase text-[9px] md:text-[10px] tracking-widest hover:bg-black hover:text-white transition-all"
            >
              {s.name}
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
