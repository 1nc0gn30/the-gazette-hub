import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Save, FileText, Plus, Trash2, Palette, Globe, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { useNewspaper } from '../context/NewspaperContext';
import { BrandPaletteConfig, NewspaperBrand, NewspaperTheme, Article, BrandFontConfig } from '../types';
import { Link, useNavigate } from 'react-router-dom';
import {
  DEFAULT_FONT_CONFIG,
  FONT_OPTIONS,
  PALETTE_OPTIONS,
  getEffectiveFontConfig,
  getEffectivePalette,
  getFontOption,
} from '../brandDesign';

export default function Config() {
  const { brands, updateBrand, addBrand, deleteBrand } = useNewspaper();
  const navigate = useNavigate();
  const [selectedBrandId, setSelectedBrandId] = React.useState(brands[0]?.id || '');
  const [activeTab, setActiveTab] = React.useState<'brand' | 'theme' | 'content'>('brand');
  const [selectedArticleId, setSelectedArticleId] = React.useState<string>('');
  const [markdown, setMarkdown] = React.useState('');

  const brand = brands.find(b => b.id === selectedBrandId) || brands[0];
  const effectivePalette = brand ? getEffectivePalette(brand) : PALETTE_OPTIONS[0].colors;
  const effectiveFontConfig = brand ? getEffectiveFontConfig(brand) : DEFAULT_FONT_CONFIG;

  React.useEffect(() => {
    if (brand && activeTab === 'content') {
      const allArticles = brand.issues[0]?.sections.flatMap(s => s.articles) || [];
      if (allArticles.length > 0 && !selectedArticleId) {
        setSelectedArticleId(allArticles[0].id);
        setMarkdown(allArticles[0].content || '');
      } else if (selectedArticleId) {
        const article = allArticles.find(a => a.id === selectedArticleId);
        if (article) {
          setMarkdown(article.content || '');
        }
      }
    }
  }, [brand, activeTab, selectedArticleId]);

  const handleUpdateBrand = (updates: Partial<NewspaperBrand>) => {
    if (brand) updateBrand(brand.id, updates);
  };

  const handleSelectPalette = (paletteId: string) => {
    const palette = PALETTE_OPTIONS.find((option) => option.id === paletteId);
    if (!palette) return;
    handleUpdateBrand({
      paletteId,
      primaryColor: palette.colors.accentColor,
      customPalette: undefined,
    });
  };

  const handleCustomPaletteColor = (field: keyof BrandPaletteConfig, value: string) => {
    const nextPalette: BrandPaletteConfig = {
      ...effectivePalette,
      ...(brand?.customPalette || {}),
      [field]: value,
    };

    handleUpdateBrand({
      paletteId: 'custom',
      customPalette: nextPalette,
      primaryColor: nextPalette.accentColor,
    });
  };

  const handleFontChange = (slot: keyof BrandFontConfig, fontId: string) => {
    const nextConfig: BrandFontConfig = {
      ...effectiveFontConfig,
      [slot]: fontId,
    };
    handleUpdateBrand({ fontConfig: nextConfig });
  };

  const handleSaveContent = () => {
    if (!brand || !selectedArticleId) return;

    const updatedIssues = brand.issues.map(issue => ({
      ...issue,
      sections: issue.sections.map(section => ({
        ...section,
        articles: section.articles.map(article => 
          article.id === selectedArticleId 
            ? { ...article, content: markdown }
            : article
        )
      }))
    }));

    handleUpdateBrand({ issues: updatedIssues });
    alert('Content saved successfully!');
  };

  const handleCreateBrand = () => {
    const newBrand: NewspaperBrand = {
      id: `brand-${Date.now()}`,
      name: 'New Gazette',
      tagline: 'The Voice of the People',
      primaryColor: '#1a1a1a',
      fontFamily: 'serif',
      theme: 'classic',
      paletteId: 'classic-ink',
      fontConfig: DEFAULT_FONT_CONFIG,
      establishedDate: 'Est. 2026',
      issues: [
        {
          id: 'issue-1',
          issueNumber: 1,
          date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
          sections: [
            {
              id: 'sec-1',
              name: 'Front Page',
              articles: [
                {
                  id: 'art-1',
                  title: 'Welcome to Your New Publication',
                  excerpt: 'This is the first article of your brand new newspaper.',
                  content: '# Welcome to Your New Publication\n\nStart editing this content in the Content Editor tab.',
                  author: 'Editor-in-Chief',
                  date: new Date().toLocaleDateString(),
                  category: 'Editorial',
                  image: 'https://picsum.photos/seed/newspaper/800/600',
                  readTime: '2 min read'
                }
              ]
            }
          ]
        }
      ]
    };
    addBrand(newBrand);
    setSelectedBrandId(newBrand.id);
  };

  const handleDeleteBrand = (id: string) => {
    if (brands.length <= 1) return;
    if (window.confirm('Are you sure you want to delete this brand?')) {
      deleteBrand(id);
      setSelectedBrandId(brands.find(b => b.id !== id)?.id || '');
    }
  };

  const handleCreateArticle = () => {
    if (!brand || !brand.issues[0] || !brand.issues[0].sections[0]) return;

    const newId = `art-${Date.now()}`;
    const newArticle: Article = {
      id: newId,
      title: 'New Draft Story',
      subtitle: 'Add your reporting angle here',
      excerpt: 'A newly created draft article ready for editing.',
      content: '# New Draft Story\n\nStart writing your article here.\n\n## Key Facts\n\n- Who is involved?\n- What happened?\n- Why does it matter?\n',
      author: 'Editorial Desk',
      date: new Date().toISOString().slice(0, 10),
      category: 'Editorial',
      image: 'https://picsum.photos/seed/new-draft/1200/800',
      readTime: '3 min read',
    };

    const updatedIssues = brand.issues.map((issue, issueIndex) => {
      if (issueIndex !== 0) return issue;
      return {
        ...issue,
        sections: issue.sections.map((section, sectionIndex) => {
          if (sectionIndex !== 0) return section;
          return {
            ...section,
            articles: [newArticle, ...section.articles],
          };
        }),
      };
    });

    handleUpdateBrand({ issues: updatedIssues });
    setSelectedArticleId(newId);
    setMarkdown(newArticle.content);
    setActiveTab('content');
  };

  const themes: { id: NewspaperTheme; name: string; description: string }[] = [
    { id: 'classic', name: 'The Classic Broadside', description: 'Traditional serif fonts, high density, authoritative feel.' },
    { id: 'modern', name: 'The Modern Guardian', description: 'Clean sans-serif accents, bold headlines, spacious layout.' },
    { id: 'financial', name: 'The Financial Ledger', description: 'Pinkish paper texture, condensed fonts, data-focused.' },
    { id: 'tabloid', name: 'The Daily Echo', description: 'High contrast, massive red headlines, punchy excerpts.' },
    { id: 'minimalist', name: 'The Minimalist', description: 'Ultra-clean, monochromatic, focus on typography and white space.' },
  ];

  const tabs = [
    { id: 'brand', name: 'Brand Identity', icon: Globe },
    { id: 'theme', name: 'Theme & Style', icon: Palette },
    { id: 'content', name: 'Content Editor', icon: FileText },
  ];

  if (!brand) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="max-w-7xl mx-auto"
    >
      <header className="mb-8 md:mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b-2 border-black pb-6 md:pb-8">
        <div>
          <h1 className="font-serif font-black text-4xl md:text-5xl lg:text-6xl uppercase tracking-tighter">Configuration</h1>
          <p className="text-black/60 font-medium uppercase tracking-widest text-[10px] md:text-xs mt-2">Design and publish your next masterpiece</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 md:px-6 md:py-3 font-bold uppercase text-[10px] md:text-xs tracking-widest border border-black hover:bg-black hover:text-white transition-all text-center"
          >
            Preview
          </button>
          <button
            onClick={() => alert(`Issue #${brand.issues[0]?.issueNumber || 1} queued for publication.`)}
            className="bg-black text-[#f4f1ea] px-4 py-2 md:px-6 md:py-3 font-bold uppercase text-[10px] md:text-xs tracking-widest flex items-center justify-center gap-2 hover:bg-accent-color transition-colors"
          >
            <Save size={16} />
            Publish Issue
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
        {/* Sidebar: Brand Selection & Tabs */}
        <aside className="lg:col-span-3 space-y-8">
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 opacity-40">Your Brands</h3>
            <div className="flex flex-col gap-2">
              {brands.map(b => (
                <div key={b.id} className="flex gap-1">
                  <button
                    onClick={() => setSelectedBrandId(b.id)}
                    className={cn(
                      "flex-grow text-left px-3 py-2 md:px-4 md:py-3 text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-all border-2 flex items-center justify-between group",
                      selectedBrandId === b.id 
                        ? "bg-black text-white border-black" 
                        : "bg-transparent border-transparent hover:border-black/20"
                    )}
                  >
                    <span className="truncate max-w-[150px]">{b.name}</span>
                    <ChevronRight size={12} className={cn("transition-transform flex-shrink-0", selectedBrandId === b.id ? "translate-x-0" : "-translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0")} />
                  </button>
                  {brands.length > 1 && (
                    <button 
                      onClick={() => handleDeleteBrand(b.id)}
                      className="p-2 md:p-3 border-2 border-transparent hover:border-red-500 hover:text-red-500 transition-all flex-shrink-0"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              ))}
              <button 
                onClick={handleCreateBrand}
                className="mt-2 flex items-center justify-center gap-2 p-2 md:p-3 border-2 border-dashed border-black/20 text-black/40 hover:text-black hover:border-black transition-all text-[9px] md:text-[10px] font-bold uppercase tracking-widest"
              >
                <Plus size={14} /> New Brand
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-8 border-t border-black/10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 opacity-40">Editor Tabs</h3>
            <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-2 lg:pb-0 hide-scrollbar">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    "flex items-center gap-2 md:gap-4 px-4 py-3 md:px-6 md:py-4 font-bold uppercase text-[9px] md:text-[10px] tracking-widest transition-all text-left whitespace-nowrap lg:whitespace-normal",
                    activeTab === tab.id 
                      ? "bg-black text-white" 
                      : "hover:bg-black/5 text-black/40"
                  )}
                >
                  <tab.icon size={14} className="flex-shrink-0" />
                  {tab.name}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Editor Area */}
        <div className="lg:col-span-9 bg-white/50 p-4 md:p-8 newspaper-border overflow-hidden">
          <AnimatePresence mode="wait">
            {activeTab === 'brand' && (
              <motion.div 
                key="brand"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6 md:space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">Newspaper Name</label>
                    <input 
                      type="text" 
                      value={brand.name}
                      onChange={(e) => handleUpdateBrand({ name: e.target.value })}
                      className="bg-transparent border-b-2 border-black py-2 md:py-4 font-serif font-bold text-2xl md:text-3xl focus:outline-none focus:border-accent-color transition-colors w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">Tagline</label>
                    <input 
                      type="text" 
                      value={brand.tagline}
                      onChange={(e) => handleUpdateBrand({ tagline: e.target.value })}
                      className="bg-transparent border-b-2 border-black py-2 md:py-4 font-classic italic text-lg md:text-xl focus:outline-none focus:border-accent-color transition-colors w-full"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div className="flex flex-col gap-4">
                    <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">Established Date</label>
                    <input 
                      type="text" 
                      value={brand.establishedDate}
                      onChange={(e) => handleUpdateBrand({ establishedDate: e.target.value })}
                      className="bg-transparent border-b-2 border-black py-2 font-serif font-bold text-lg md:text-xl focus:outline-none w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">Primary Color</label>
                    <div className="flex flex-wrap items-center gap-2">
                      {['#1a1a1a', '#8b0000', '#0047ab', '#006400', '#ff0000', '#7a3eb1', '#0077b6', '#c4572e'].map(color => (
                        <button 
                          key={color}
                          onClick={() => handleUpdateBrand({ primaryColor: color })}
                          className={cn(
                            "w-8 h-8 md:w-10 md:h-10 rounded-full border-2 transition-transform",
                            brand.primaryColor === color ? "border-black scale-110" : "border-white shadow-sm"
                          )}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                      <input
                        type="color"
                        value={brand.primaryColor}
                        onChange={(e) => handleUpdateBrand({ primaryColor: e.target.value })}
                        className="w-10 h-10 md:w-12 md:h-12 border border-black/20 bg-transparent cursor-pointer"
                        aria-label="Custom accent color"
                      />
                      <span className="font-mono text-xs opacity-60">{brand.primaryColor}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'theme' && (
              <motion.div 
                key="theme"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6 md:space-y-8"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {themes.map(t => (
                    <button
                      key={t.id}
                      onClick={() => handleUpdateBrand({ theme: t.id })}
                      className={cn(
                        "text-left p-4 md:p-6 border-2 transition-all group",
                        brand.theme === t.id 
                          ? "bg-black text-white border-black" 
                          : "bg-black/5 border-transparent hover:border-black/20"
                      )}
                    >
                      <h4 className="font-serif font-black text-lg md:text-xl mb-2 group-hover:text-accent-color transition-colors">
                        {t.name}
                      </h4>
                      <p className={cn(
                        "text-[9px] md:text-[10px] leading-relaxed opacity-60",
                        brand.theme === t.id ? "text-white" : "text-black"
                      )}>
                        {t.description}
                      </p>
                    </button>
                  ))}
                </div>

                <div className="pt-6 md:pt-8 border-t border-black/10 space-y-6">
                  <h4 className="text-[10px] font-black uppercase tracking-widest opacity-40">Palette Studio</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {PALETTE_OPTIONS.map((palette) => {
                      const isSelected = brand.paletteId === palette.id && !brand.customPalette;
                      return (
                        <button
                          key={palette.id}
                          onClick={() => handleSelectPalette(palette.id)}
                          className={cn(
                            "text-left p-4 border-2 transition-all",
                            isSelected ? 'border-black shadow-md' : 'border-black/10 hover:border-black/40'
                          )}
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <span className="font-serif font-bold text-lg">{palette.name}</span>
                          </div>
                          <p className="text-[10px] uppercase tracking-widest opacity-50 mb-3">{palette.description}</p>
                          <div className="grid grid-cols-6 gap-1">
                            {Object.values(palette.colors).map((colorValue) => (
                              <span
                                key={`${palette.id}-${colorValue}`}
                                className="h-4 rounded-sm border border-black/10"
                                style={{ backgroundColor: colorValue }}
                              />
                            ))}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-6 border-t border-black/10 space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-widest opacity-40">Custom Palette Controls</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { key: 'pageBg', label: 'Page Background' },
                      { key: 'paperBg', label: 'Paper Background' },
                      { key: 'paperDark', label: 'Paper Shadow' },
                      { key: 'inkColor', label: 'Ink Color' },
                      { key: 'accentColor', label: 'Accent Color' },
                      { key: 'navBg', label: 'Navigation BG' },
                      { key: 'navText', label: 'Navigation Text' },
                    ].map(({ key, label }) => (
                      <label key={key} className="flex items-center justify-between gap-3 border border-black/10 px-3 py-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
                        <input
                          type="color"
                          value={effectivePalette[key as keyof BrandPaletteConfig]}
                          onChange={(e) => handleCustomPaletteColor(key as keyof BrandPaletteConfig, e.target.value)}
                          className="w-8 h-8 bg-transparent border-0 cursor-pointer"
                        />
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-black/10 space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-widest opacity-40">Font Family Selector</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { key: 'headline', label: 'Headlines' },
                      { key: 'body', label: 'Body Text' },
                      { key: 'classic', label: 'Classic/Italic Voice' },
                      { key: 'mono', label: 'Monospace Data' },
                    ].map(({ key, label }) => (
                      <div key={key} className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest opacity-50">{label}</label>
                        <select
                          value={effectiveFontConfig[key as keyof BrandFontConfig]}
                          onChange={(e) => handleFontChange(key as keyof BrandFontConfig, e.target.value)}
                          className="border border-black/20 bg-transparent px-3 py-2 text-sm font-medium focus:outline-none focus:border-accent-color"
                        >
                          {FONT_OPTIONS.map((font) => (
                            <option key={font.id} value={font.id}>
                              {font.label} ({font.category})
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 md:pt-8 border-t border-black/10">
                  <h4 className="text-[10px] font-black uppercase tracking-widest mb-4 md:mb-6 opacity-40">Live Visual Preview</h4>
                  <div
                    className="p-4 md:p-8 border-2 border-black/10 min-h-[180px] md:min-h-[220px]"
                    style={{
                      backgroundColor: effectivePalette.paperBg,
                      color: effectivePalette.inkColor,
                    }}
                  >
                    <h2
                      className="text-2xl md:text-4xl uppercase mb-2"
                      style={{ fontFamily: `"${getFontOption(effectiveFontConfig.headline).family}", serif` }}
                    >
                      {brand.name}
                    </h2>
                    <p
                      className="text-sm md:text-base mb-4"
                      style={{ fontFamily: `"${getFontOption(effectiveFontConfig.classic).family}", serif` }}
                    >
                      {brand.tagline}
                    </p>
                    <p
                      className="text-sm leading-relaxed mb-4"
                      style={{ fontFamily: `"${getFontOption(effectiveFontConfig.body).family}", sans-serif` }}
                    >
                      This preview updates instantly. Palette and font choices are saved to this brand and applied across the full site.
                    </p>
                    <p
                      className="text-xs uppercase tracking-widest"
                      style={{
                        color: brand.primaryColor || effectivePalette.accentColor,
                        fontFamily: `"${getFontOption(effectiveFontConfig.mono).family}", monospace`,
                      }}
                    >
                      Accent Sample • {brand.primaryColor || effectivePalette.accentColor}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'content' && (
              <motion.div 
                key="content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col h-[400px] md:h-[600px]"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                  <div className="flex flex-wrap items-center gap-2 md:gap-4 w-full sm:w-auto">
                    <select 
                      className="bg-transparent border-b border-black text-[9px] md:text-[10px] font-bold uppercase tracking-widest py-1 focus:outline-none max-w-[200px] md:max-w-xs truncate"
                      value={selectedArticleId}
                      onChange={(e) => setSelectedArticleId(e.target.value)}
                    >
                      <option value="" disabled>Select Article to Edit</option>
                      {brand.issues[0]?.sections.flatMap(s => s.articles).map(a => (
                        <option key={a.id} value={a.id}>{a.title}</option>
                      ))}
                    </select>
                    <button
                      onClick={handleCreateArticle}
                      className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-accent-color flex items-center gap-1"
                    >
                      <Plus size={12} /> New Article
                    </button>
                  </div>
                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-black/40">
                      Markdown Supported
                    </div>
                    {selectedArticleId && (
                      <Link
                        to={`/editor/${brand.id}/${selectedArticleId}`}
                        className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-accent-color hover:underline"
                      >
                        Open Full Editor
                      </Link>
                    )}
                    <button 
                      onClick={handleSaveContent}
                      className="bg-black text-white px-3 py-1 md:px-4 md:py-2 text-[9px] md:text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 hover:bg-accent-color transition-colors"
                    >
                      <Save size={12} /> Save
                    </button>
                  </div>
                </div>
                <textarea 
                  value={markdown}
                  onChange={(e) => setMarkdown(e.target.value)}
                  className="flex-grow bg-[#f4f1ea] p-4 md:p-8 font-mono text-xs md:text-sm leading-relaxed focus:outline-none border border-black/5 resize-none w-full"
                  placeholder="Write your article in markdown..."
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
