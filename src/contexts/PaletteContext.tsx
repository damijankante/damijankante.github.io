import React, { createContext, useContext, useState, useEffect } from 'react';

type Palette = 'default' | 'theme-sunset' | 'theme-forest' | 'theme-royal' | 'theme-rose';

interface PaletteContextType {
  palette: Palette;
  setPalette: (palette: Palette) => void;
}

const PaletteContext = createContext<PaletteContextType | undefined>(undefined);

export const usePalette = () => {
  const context = useContext(PaletteContext);
  if (context === undefined) {
    throw new Error('usePalette must be used within a PaletteProvider');
  }
  return context;
};

export const PaletteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [palette, setPalette] = useState<Palette>('default');

  useEffect(() => {
    const palettes: Palette[] = ['theme-sunset', 'theme-forest', 'theme-royal', 'theme-rose'];
    palettes.forEach(p => document.documentElement.classList.remove(p));
    
    // Apply the selected palette class if it's not the default.
    if (palette !== 'default') {
      document.documentElement.classList.add(palette);
    }
  }, [palette]);

  return (
    <PaletteContext.Provider value={{ palette, setPalette }}>
      {children}
    </PaletteContext.Provider>
  );
};