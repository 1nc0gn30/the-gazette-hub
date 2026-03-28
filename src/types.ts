export interface Article {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  date: string;
  category: string;
  content: string; // Markdown
  image?: string;
  excerpt: string;
  isBreaking?: boolean;
  readTime: string;
}

export interface BrandFontConfig {
  headline: string;
  body: string;
  classic: string;
  mono: string;
}

export interface BrandPaletteConfig {
  pageBg: string;
  paperBg: string;
  paperDark: string;
  inkColor: string;
  accentColor: string;
  navBg: string;
  navText: string;
}

export interface Section {
  id: string;
  name: string;
  articles: Article[];
}

export type NewspaperTheme = 'classic' | 'modern' | 'tabloid' | 'financial' | 'minimalist';

export interface NewspaperBrand {
  id: string;
  name: string;
  tagline: string;
  logo?: string;
  establishedDate?: string;
  primaryColor: string;
  fontFamily: 'serif' | 'sans' | 'mono';
  theme: NewspaperTheme;
  paletteId?: string;
  customPalette?: BrandPaletteConfig;
  fontConfig?: BrandFontConfig;
  issues: NewspaperIssue[];
}


export interface NewspaperIssue {
  id: string;
  issueNumber: number;
  date: string;
  sections: Section[];
}

export interface AppState {
  brands: NewspaperBrand[];
  currentBrandId: string;
  currentIssueId: string;
}
