import React from 'react';
import { useNewspaper } from '../context/NewspaperContext';
import { motion } from 'motion/react';
import { Newspaper, Plus, Folder, MoreVertical, ExternalLink } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function BrandHub() {
  const { brands } = useNewspaper();
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto"
    >
      <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b-2 border-black pb-8">
        <div>
          <h1 className="font-serif font-black text-5xl md:text-6xl uppercase tracking-tighter">Brand Hub</h1>
          <p className="text-black/60 font-medium uppercase tracking-widest text-[10px] md:text-xs mt-2">Manage your newspaper collections</p>
        </div>
        <button 
          onClick={() => navigate('/config')}
          className="bg-black text-[#f4f1ea] px-6 py-3 font-bold uppercase text-xs tracking-widest flex items-center gap-2 hover:bg-accent-color transition-colors w-full md:w-auto justify-center"
        >
          <Plus size={16} />
          New Brand
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {brands.map((brand) => (
          <div key={brand.id} className="newspaper-border bg-white/50 p-8 flex flex-col group hover:newspaper-shadow transition-all duration-500">
            <div className="flex justify-between items-start mb-8">
              <div className="w-16 h-16 bg-black text-[#f4f1ea] flex items-center justify-center font-serif font-bold text-3xl">
                {brand.name[0]}
              </div>
              <button
                onClick={() => navigate('/config')}
                aria-label={`Manage ${brand.name}`}
                className="text-black/20 hover:text-black transition-colors"
              >
                <MoreVertical size={20} />
              </button>
            </div>
            
            <h2 className="font-serif font-black text-3xl uppercase mb-2 group-hover:text-accent-color transition-colors line-clamp-2">
              {brand.name}
            </h2>
            <p className="text-xs font-bold uppercase tracking-widest text-black/40 mb-6 line-clamp-2">
              {brand.tagline}
            </p>
            
            <div className="mt-auto pt-8 border-t border-black/5 flex items-center justify-between">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-black/60">
                <Folder size={12} />
                {brand.issues.length} Issues
              </div>
              <div className="flex gap-4">
                <Link to={`/config`} className="text-[10px] font-bold uppercase tracking-widest hover:text-accent-color transition-colors">
                  Config
                </Link>
                <Link to="/" className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 hover:text-accent-color transition-colors">
                  View <ExternalLink size={10} />
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Empty State / Add New */}
        <button 
          onClick={() => navigate('/config')}
          className="newspaper-border border-dashed border-black/20 p-8 flex flex-col items-center justify-center gap-4 group hover:border-black/40 transition-all min-h-[300px]"
        >
          <div className="w-16 h-16 rounded-full border-2 border-dashed border-black/20 flex items-center justify-center text-black/20 group-hover:text-black group-hover:border-black transition-all">
            <Plus size={32} />
          </div>
          <span className="font-bold uppercase text-xs tracking-widest text-black/40 group-hover:text-black transition-colors">
            Create New Collection
          </span>
        </button>
      </div>

      <section className="mt-20">
        <h3 className="font-serif font-black text-3xl uppercase mb-8 border-b border-black/10 pb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <button
              key={i}
              onClick={() => navigate('/archive')}
              className="w-full text-left flex items-center justify-between py-4 border-b border-black/5 group"
            >
              <div className="flex items-center gap-6">
                <div className="text-xs font-mono text-black/40">0{i}</div>
                <div>
                  <div className="font-bold uppercase text-xs tracking-widest">Issue #101 Published</div>
                  <div className="text-[10px] text-black/40 font-medium uppercase tracking-widest">The Daily Chronicle • 2 hours ago</div>
                </div>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink size={16} className="text-black/40" />
              </div>
            </button>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
