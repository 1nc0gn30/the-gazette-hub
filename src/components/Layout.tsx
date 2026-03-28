import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Newspaper, Settings, Home, LayoutGrid, Search, Menu, X, Volume2, VolumeX, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { useNewspaper } from '../context/NewspaperContext';
import { buildGoogleFontsUrl, fontCssValue, getEffectiveFontConfig, getEffectivePalette } from '../brandDesign';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { brands, currentBrandIndex, setCurrentBrandIndex } = useNewspaper();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [soundEnabled, setSoundEnabled] = React.useState(true);
  const [isBrandMenuOpen, setIsBrandMenuOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const brand = brands[currentBrandIndex] || brands[0];
  const fontConfig = React.useMemo(() => getEffectiveFontConfig(brand), [brand]);
  const palette = React.useMemo(() => getEffectivePalette(brand), [brand]);

  React.useEffect(() => {
    audioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
    audioRef.current.volume = 0.2;
  }, []);

  React.useEffect(() => {
    const linkId = 'brand-fonts-link';
    const href = buildGoogleFontsUrl(fontConfig);
    let link = document.getElementById(linkId) as HTMLLinkElement | null;

    if (!link) {
      link = document.createElement('link');
      link.id = linkId;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }

    link.href = href;
  }, [fontConfig]);

  React.useEffect(() => {
    if (soundEnabled && audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  }, [location.pathname, soundEnabled]);

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Brand Hub', path: '/hub', icon: Newspaper },
    { name: 'Sections', path: '/sections', icon: LayoutGrid },
    { name: 'Search', path: '/search', icon: Search },
    { name: 'Config', path: '/config', icon: Settings },
  ];

  // Navigation Logic for Newspaper Pages
  const isNewspaperPage = location.pathname === '/' || location.pathname.startsWith('/article/');
  
  const allArticles = React.useMemo(() => {
    return brand.issues[0]?.sections.flatMap(s => s.articles) || [];
  }, [brand]);

  const currentArticleId = location.pathname.startsWith('/article/') ? location.pathname.split('/').pop() : null;
  const currentArticleIndex = currentArticleId ? allArticles.findIndex(a => a.id === currentArticleId) : -1;

  const handleNextPage = () => {
    if (location.pathname === '/') {
      if (allArticles.length > 0) navigate(`/article/${allArticles[0].id}`);
    } else if (currentArticleIndex !== -1 && currentArticleIndex < allArticles.length - 1) {
      navigate(`/article/${allArticles[currentArticleIndex + 1].id}`);
    }
  };

  const handlePrevPage = () => {
    if (location.pathname.startsWith('/article/')) {
      if (currentArticleIndex === 0) {
        navigate('/');
      } else if (currentArticleIndex > 0) {
        navigate(`/article/${allArticles[currentArticleIndex - 1].id}`);
      }
    }
  };

  const hasNext = location.pathname === '/' ? allArticles.length > 0 : (currentArticleIndex !== -1 && currentArticleIndex < allArticles.length - 1);
  const hasPrev = location.pathname.startsWith('/article/');

  const brandStyles = {
    '--page-bg': palette.pageBg,
    '--paper-bg': palette.paperBg,
    '--paper-dark': palette.paperDark,
    '--ink-color': palette.inkColor,
    '--accent-color': brand.primaryColor || palette.accentColor,
    '--nav-bg': palette.navBg,
    '--nav-text': palette.navText,
    '--font-serif': fontCssValue(fontConfig.headline, 'serif'),
    '--font-sans': fontCssValue(fontConfig.body, 'sans-serif'),
    '--font-classic': fontCssValue(fontConfig.classic, 'serif'),
    '--font-mono': fontCssValue(fontConfig.mono, 'monospace'),
  } as React.CSSProperties;

  return (
    <div className="min-h-screen flex flex-col" style={brandStyles}>
      {/* Website-style Navbar */}
      <nav
        className="sticky top-0 z-50 border-b border-white/10"
        style={{ backgroundColor: 'var(--nav-bg)', color: 'var(--nav-text)' }}
      >
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-white text-black flex items-center justify-center font-serif font-bold text-xl group-hover:bg-accent-color group-hover:text-white transition-colors">
                G
              </div>
              <span className="font-serif font-black text-lg tracking-tighter uppercase hidden sm:block">
                The Gazette Hub
              </span>
            </Link>

            {/* Brand Switcher */}
            <div className="relative">
              <button 
                onClick={() => setIsBrandMenuOpen(!isBrandMenuOpen)}
                className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors bg-white/5 px-3 py-1.5 rounded"
              >
                Brand: {brand.name}
                <ChevronDown size={10} />
              </button>
              <AnimatePresence>
                {isBrandMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-[#1a1a1a] border border-white/10 shadow-2xl z-50"
                  >
                    {brands.map((b, i) => (
                      <button
                        key={b.id}
                        onClick={() => {
                          setCurrentBrandIndex(i);
                          setIsBrandMenuOpen(false);
                        }}
                        className={cn(
                          "w-full text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-colors",
                          currentBrandIndex === i ? "text-accent-color" : "text-white/60"
                        )}
                      >
                        {b.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "text-[10px] font-bold uppercase tracking-[0.2em] hover:text-accent-color transition-colors flex items-center gap-2",
                  location.pathname === item.path ? "text-accent-color" : "text-white/60"
                )}
              >
                <item.icon size={12} />
                {item.name}
              </Link>
            ))}
            <button 
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="text-white/40 hover:text-white transition-colors"
            >
              {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
            </button>
          </div>

          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black text-white pt-20 px-4 md:hidden"
          >
            <div className="flex flex-col gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-3xl font-serif font-bold flex items-center gap-4"
                >
                  <item.icon size={28} />
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Physical Newspaper Container */}
      <div className="flex-grow flex items-center justify-center p-4 md:p-8 lg:p-12 overflow-hidden">
        <div 
          className="newspaper-sheet max-w-7xl w-full mx-auto min-h-[80vh] flex flex-col relative"
          data-theme={brand.theme}
        >
          <div className="newspaper-fold hidden lg:block"></div>
          
          {/* Navigation Controls (Only on Newspaper Pages) */}
          {isNewspaperPage && (
            <>
              {hasPrev && (
                <button 
                  onClick={handlePrevPage}
                  className="absolute left-0 top-0 bottom-0 w-16 z-30 group flex items-center justify-center"
                >
                  <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronLeft size={24} />
                  </div>
                </button>
              )}
              {hasNext && (
                <button 
                  onClick={handleNextPage}
                  className="absolute right-0 top-0 bottom-0 w-16 z-30 group flex items-center justify-center"
                >
                  <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight size={24} />
                  </div>
                </button>
              )}
            </>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={`${location.pathname}-${currentBrandIndex}`}
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="flex-grow p-6 md:p-12 lg:p-16 relative z-10"
              drag={isNewspaperPage ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x > 100) handlePrevPage();
                else if (info.offset.x < -100) handleNextPage();
              }}
            >
              {/* Pass the current brand to children via props */}
              {React.isValidElement(children) 
                ? React.cloneElement(children as React.ReactElement<any>, { brandIndex: currentBrandIndex }) 
                : children}
            </motion.div>
          </AnimatePresence>

          <div className="p-6 border-t border-black/10 flex justify-between items-center text-[9px] uppercase tracking-[0.3em] font-bold opacity-40 z-20">
            <span>{brand.name} • Issue #{brand.issues[0]?.issueNumber || '00'}</span>
            <span className="hidden sm:block">Published in London, UK</span>
            <span>Page {location.pathname === '/' ? '01' : (currentArticleIndex !== -1 ? (currentArticleIndex + 2).toString().padStart(2, '0') : '02')}</span>
          </div>
        </div>
      </div>

      <footer className="py-6 text-center text-[10px] uppercase tracking-[0.2em] font-bold text-black/40">
        thegazettehub.nealfrazier.tech
      </footer>
    </div>
  );
}

