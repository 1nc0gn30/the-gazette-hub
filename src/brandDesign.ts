import { BrandFontConfig, BrandPaletteConfig, NewspaperBrand } from './types';

export interface FontOption {
  id: string;
  label: string;
  family: string;
  category: 'serif' | 'sans' | 'display' | 'mono';
  importFamily: string;
}

export interface PaletteOption {
  id: string;
  name: string;
  description: string;
  colors: BrandPaletteConfig;
}

export const FONT_OPTIONS: FontOption[] = [
  { id: 'playfair-display', label: 'Playfair Display', family: 'Playfair Display', category: 'serif', importFamily: 'Playfair+Display:wght@400;600;700;900' },
  { id: 'merriweather', label: 'Merriweather', family: 'Merriweather', category: 'serif', importFamily: 'Merriweather:wght@300;400;700;900' },
  { id: 'lora', label: 'Lora', family: 'Lora', category: 'serif', importFamily: 'Lora:wght@400;500;600;700' },
  { id: 'eb-garamond', label: 'EB Garamond', family: 'EB Garamond', category: 'serif', importFamily: 'EB+Garamond:wght@400;500;700;800' },
  { id: 'libre-baskerville', label: 'Libre Baskerville', family: 'Libre Baskerville', category: 'serif', importFamily: 'Libre+Baskerville:wght@400;700' },
  { id: 'bitter', label: 'Bitter', family: 'Bitter', category: 'serif', importFamily: 'Bitter:wght@300;400;500;700;800' },
  { id: 'crimson-text', label: 'Crimson Text', family: 'Crimson Text', category: 'serif', importFamily: 'Crimson+Text:wght@400;600;700' },
  { id: 'inter', label: 'Inter', family: 'Inter', category: 'sans', importFamily: 'Inter:wght@300;400;500;600;700;800' },
  { id: 'source-sans-3', label: 'Source Sans 3', family: 'Source Sans 3', category: 'sans', importFamily: 'Source+Sans+3:wght@300;400;500;600;700;800' },
  { id: 'nunito-sans', label: 'Nunito Sans', family: 'Nunito Sans', category: 'sans', importFamily: 'Nunito+Sans:wght@300;400;600;700;800;900' },
  { id: 'work-sans', label: 'Work Sans', family: 'Work Sans', category: 'sans', importFamily: 'Work+Sans:wght@300;400;500;600;700;800' },
  { id: 'manrope', label: 'Manrope', family: 'Manrope', category: 'sans', importFamily: 'Manrope:wght@300;400;500;600;700;800' },
  { id: 'dm-sans', label: 'DM Sans', family: 'DM Sans', category: 'sans', importFamily: 'DM+Sans:wght@300;400;500;700;800' },
  { id: 'archivo', label: 'Archivo', family: 'Archivo', category: 'sans', importFamily: 'Archivo:wght@300;400;500;600;700;800' },
  { id: 'oswald', label: 'Oswald', family: 'Oswald', category: 'display', importFamily: 'Oswald:wght@300;400;500;600;700' },
  { id: 'abril-fatface', label: 'Abril Fatface', family: 'Abril Fatface', category: 'display', importFamily: 'Abril+Fatface' },
  { id: 'bebas-neue', label: 'Bebas Neue', family: 'Bebas Neue', category: 'display', importFamily: 'Bebas+Neue' },
  { id: 'space-grotesk', label: 'Space Grotesk', family: 'Space Grotesk', category: 'display', importFamily: 'Space+Grotesk:wght@300;400;500;600;700' },
  { id: 'jetbrains-mono', label: 'JetBrains Mono', family: 'JetBrains Mono', category: 'mono', importFamily: 'JetBrains+Mono:wght@300;400;500;700;800' },
  { id: 'fira-code', label: 'Fira Code', family: 'Fira Code', category: 'mono', importFamily: 'Fira+Code:wght@300;400;500;600;700' },
  { id: 'ibm-plex-mono', label: 'IBM Plex Mono', family: 'IBM Plex Mono', category: 'mono', importFamily: 'IBM+Plex+Mono:wght@300;400;500;600;700' },
  { id: 'source-code-pro', label: 'Source Code Pro', family: 'Source Code Pro', category: 'mono', importFamily: 'Source+Code+Pro:wght@300;400;500;600;700' },
];

export const PALETTE_OPTIONS: PaletteOption[] = [
  {
    id: 'classic-ink',
    name: 'Classic Ink',
    description: 'Traditional black ink on warm paper.',
    colors: { pageBg: '#d1ccc0', paperBg: '#f4f1ea', paperDark: '#e8e4d9', inkColor: '#1a1a1a', accentColor: '#8b0000', navBg: '#111111', navText: '#ffffff' },
  },
  {
    id: 'city-metro',
    name: 'City Metro',
    description: 'Crisp white page with modern blue accents.',
    colors: { pageBg: '#d5dde3', paperBg: '#ffffff', paperDark: '#edf0f2', inkColor: '#121212', accentColor: '#005689', navBg: '#0d1b2a', navText: '#f5f5f5' },
  },
  {
    id: 'financial-ledger',
    name: 'Financial Ledger',
    description: 'Soft cream stock with restrained contrast.',
    colors: { pageBg: '#d9d0c2', paperBg: '#fdf5e6', paperDark: '#f5e8d2', inkColor: '#1a1a1a', accentColor: '#333333', navBg: '#2d2417', navText: '#ffffff' },
  },
  {
    id: 'tabloid-flash',
    name: 'Tabloid Flash',
    description: 'High contrast with strong red urgency.',
    colors: { pageBg: '#d9d9d9', paperBg: '#ffffff', paperDark: '#efefef', inkColor: '#000000', accentColor: '#ff0000', navBg: '#1a1a1a', navText: '#ffffff' },
  },
  {
    id: 'midnight-edition',
    name: 'Midnight Edition',
    description: 'Deep graphite tones with bright cyan highlights.',
    colors: { pageBg: '#1d2025', paperBg: '#2a2f36', paperDark: '#232830', inkColor: '#e8edf3', accentColor: '#31c5ff', navBg: '#14171b', navText: '#f8fafc' },
  },
  {
    id: 'forest-gazette',
    name: 'Forest Gazette',
    description: 'Evergreen palette for environment-focused brands.',
    colors: { pageBg: '#ccd8cc', paperBg: '#eef3ee', paperDark: '#dde8dd', inkColor: '#1d2a1d', accentColor: '#2f7d32', navBg: '#1f3420', navText: '#f7fff7' },
  },
  {
    id: 'sunset-press',
    name: 'Sunset Press',
    description: 'Warm editorial tone with copper accents.',
    colors: { pageBg: '#dfcbbd', paperBg: '#fff6ef', paperDark: '#f8e6db', inkColor: '#2b201b', accentColor: '#c4572e', navBg: '#3a241b', navText: '#fff2e8' },
  },
  {
    id: 'royal-column',
    name: 'Royal Column',
    description: 'Classic authority with indigo and gold notes.',
    colors: { pageBg: '#d6d7e3', paperBg: '#f6f7fb', paperDark: '#e8eaf4', inkColor: '#14152b', accentColor: '#5a48c8', navBg: '#1b1c3b', navText: '#f8f8ff' },
  },
  {
    id: 'minimal-graphite',
    name: 'Minimal Graphite',
    description: 'Quiet grayscale with subtle motion contrast.',
    colors: { pageBg: '#d6d6d6', paperBg: '#fafafa', paperDark: '#ededed', inkColor: '#222222', accentColor: '#000000', navBg: '#161616', navText: '#ffffff' },
  },
  {
    id: 'violet-bulletin',
    name: 'Violet Bulletin',
    description: 'Distinctive editorial identity with violet accents.',
    colors: { pageBg: '#d7cde1', paperBg: '#fbf7ff', paperDark: '#ede3f7', inkColor: '#221833', accentColor: '#7a3eb1', navBg: '#2a1b3d', navText: '#f8f2ff' },
  },
  {
    id: 'ocean-wire',
    name: 'Ocean Wire',
    description: 'Cool marine tones for tech and science desks.',
    colors: { pageBg: '#c8d8df', paperBg: '#f2fbff', paperDark: '#deeff6', inkColor: '#102029', accentColor: '#0077b6', navBg: '#0b2a3a', navText: '#ecfbff' },
  },
  {
    id: 'amber-ledger',
    name: 'Amber Ledger',
    description: 'Trading-floor amber with dark charcoal text.',
    colors: { pageBg: '#d8cfbf', paperBg: '#fff8ea', paperDark: '#f3e7ce', inkColor: '#2d2518', accentColor: '#c17f00', navBg: '#3a2b13', navText: '#fff8ea' },
  },
];

export const DEFAULT_FONT_CONFIG: BrandFontConfig = {
  headline: 'playfair-display',
  body: 'inter',
  classic: 'libre-baskerville',
  mono: 'jetbrains-mono',
};

export const DEFAULT_PALETTE_ID = 'classic-ink';

const themeToPalette: Record<string, string> = {
  classic: 'classic-ink',
  modern: 'city-metro',
  financial: 'financial-ledger',
  tabloid: 'tabloid-flash',
  minimalist: 'minimal-graphite',
};

export function getFontOption(id?: string): FontOption {
  return FONT_OPTIONS.find((font) => font.id === id) || FONT_OPTIONS[0];
}

export function getPaletteOption(id?: string): PaletteOption {
  return PALETTE_OPTIONS.find((palette) => palette.id === id) || PALETTE_OPTIONS[0];
}

export function getEffectiveFontConfig(brand: NewspaperBrand): BrandFontConfig {
  return {
    headline: brand.fontConfig?.headline || DEFAULT_FONT_CONFIG.headline,
    body: brand.fontConfig?.body || DEFAULT_FONT_CONFIG.body,
    classic: brand.fontConfig?.classic || DEFAULT_FONT_CONFIG.classic,
    mono: brand.fontConfig?.mono || DEFAULT_FONT_CONFIG.mono,
  };
}

export function getEffectivePalette(brand: NewspaperBrand): BrandPaletteConfig {
  if (brand.paletteId === 'custom' && brand.customPalette) {
    return brand.customPalette;
  }

  const mappedId = brand.paletteId || themeToPalette[brand.theme] || DEFAULT_PALETTE_ID;
  return getPaletteOption(mappedId).colors;
}

export function normalizeBrandDesign(brand: NewspaperBrand): NewspaperBrand {
  const fontConfig = getEffectiveFontConfig(brand);
  const mappedPaletteId = brand.paletteId || themeToPalette[brand.theme] || DEFAULT_PALETTE_ID;

  return {
    ...brand,
    primaryColor: brand.primaryColor || getPaletteOption(mappedPaletteId).colors.accentColor,
    paletteId: brand.paletteId || mappedPaletteId,
    customPalette: brand.customPalette,
    fontConfig,
  };
}

export function buildGoogleFontsUrl(fontConfig: BrandFontConfig): string {
  const families = Array.from(
    new Set([
      getFontOption(fontConfig.headline).importFamily,
      getFontOption(fontConfig.body).importFamily,
      getFontOption(fontConfig.classic).importFamily,
      getFontOption(fontConfig.mono).importFamily,
    ])
  );

  return `https://fonts.googleapis.com/css2?family=${families.join('&family=')}&display=swap`;
}

export function fontCssValue(id?: string, fallback = 'serif'): string {
  const font = getFontOption(id);
  return `"${font.family}", ${fallback}`;
}
