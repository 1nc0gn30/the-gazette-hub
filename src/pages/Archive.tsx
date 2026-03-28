import React from 'react';
import { motion } from 'motion/react';
import { Calendar, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Archive() {
  const years = [2026, 2025, 2024, 2023, 2022];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const [selectedYear, setSelectedYear] = React.useState(years[0]);
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto"
    >
      <header className="text-center mb-20 border-b-4 border-black pb-12">
        <h1 className="font-serif font-black text-7xl md:text-9xl uppercase tracking-tighter leading-none">Archive</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <aside className="lg:col-span-3">
          <div className="sticky top-24">
            <h3 className="font-bold uppercase text-xs tracking-widest mb-6 border-b border-black pb-2">Browse by Year</h3>
            <div className="space-y-4">
              {years.map(year => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`flex items-center justify-between w-full text-left font-serif font-bold text-2xl transition-colors ${
                    selectedYear === year ? 'text-accent-color' : 'hover:text-accent-color'
                  }`}
                >
                  {year}
                  <ArrowRight size={16} className="opacity-20" />
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className="lg:col-span-9">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {months.map((month, i) => (
              <button
                key={month}
                onClick={() => navigate(`/search?q=${encodeURIComponent(`${month} ${selectedYear}`)}`)}
                className="text-left newspaper-border p-8 bg-white/50 hover:newspaper-shadow transition-all group"
              >
                <div className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-2">{selectedYear}</div>
                <h3 className="font-serif font-bold text-3xl uppercase mb-6 group-hover:text-accent-color transition-colors">{month}</h3>
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest opacity-60 pt-4 border-t border-black/5">
                  <span>31 Issues</span>
                  <Calendar size={12} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
