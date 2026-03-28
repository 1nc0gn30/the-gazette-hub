import React, { createContext, useContext, useState, useEffect } from 'react';
import { NewspaperBrand } from '../types';
import { MOCK_BRANDS } from '../constants';
import { normalizeBrandDesign } from '../brandDesign';

interface NewspaperContextType {
  brands: NewspaperBrand[];
  currentBrandIndex: number;
  setCurrentBrandIndex: (index: number) => void;
  updateBrand: (id: string, updates: Partial<NewspaperBrand>) => void;
  addBrand: (brand: NewspaperBrand) => void;
  deleteBrand: (id: string) => void;
}

const NewspaperContext = createContext<NewspaperContextType | undefined>(undefined);

export const NewspaperProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const normalizeBrands = (items: NewspaperBrand[]) => items.map(normalizeBrandDesign);

  const [brands, setBrands] = useState<NewspaperBrand[]>(() => {
    const saved = localStorage.getItem('newspaper_brands');
    if (saved) {
      return normalizeBrands(JSON.parse(saved));
    }
    return normalizeBrands(MOCK_BRANDS);
  });

  const [currentBrandIndex, setCurrentBrandIndex] = useState(() => {
    const saved = localStorage.getItem('current_brand_index');
    return saved ? parseInt(saved, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem('newspaper_brands', JSON.stringify(brands));
  }, [brands]);

  useEffect(() => {
    localStorage.setItem('current_brand_index', currentBrandIndex.toString());
  }, [currentBrandIndex]);

  const updateBrand = (id: string, updates: Partial<NewspaperBrand>) => {
    setBrands(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b));
  };

  const addBrand = (brand: NewspaperBrand) => {
    setBrands(prev => [...prev, brand]);
  };

  const deleteBrand = (id: string) => {
    setBrands(prev => prev.filter(b => b.id !== id));
    if (currentBrandIndex >= brands.length - 1) {
      setCurrentBrandIndex(Math.max(0, brands.length - 2));
    }
  };

  return (
    <NewspaperContext.Provider value={{ 
      brands, 
      currentBrandIndex, 
      setCurrentBrandIndex, 
      updateBrand, 
      addBrand, 
      deleteBrand 
    }}>
      {children}
    </NewspaperContext.Provider>
  );
};

export const useNewspaper = () => {
  const context = useContext(NewspaperContext);
  if (context === undefined) {
    throw new Error('useNewspaper must be used within a NewspaperProvider');
  }
  return context;
};
