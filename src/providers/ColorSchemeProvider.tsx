import React, { createContext, useContext, useState } from 'react';

interface ColorScheme {
  name: string;
  colors: string[];
}

interface ColorSchemeContextType {
  selectedScheme: string;
  setSelectedScheme: (scheme: string) => void;
  colorSchemes: ColorScheme[];
}

const defaultColorSchemes: ColorScheme[] = [
    {
      name: 'Ocean',
      colors: [
        '#0ea5e9', // sky blue
        '#0369a1', // deep blue
        '#14b8a6', // teal
        '#0d9488', // dark teal
        '#6366f1', // indigo
        '#818cf8', // light indigo
        '#2dd4bf', // turquoise
        '#67e8f9'  // cyan
      ]
    },
    {
      name: 'Forest',
      colors: [
        '#15803d', // forest green
        '#047857', // deep emerald
        '#84cc16', // lime
        '#166534', // dark green
        '#4ade80', // light green
        '#22c55e', // medium green
        '#bef264', // light lime
        '#365314'  // deep olive
      ]
    },
    {
      name: 'Sunset',
      colors: [
        '#f97316', // orange
        '#dc2626', // red
        '#c026d3', // fuchsia
        '#f43f5e', // rose
        '#fbbf24', // amber
        '#9333ea', // purple
        '#ef4444', // bright red
        '#fb923c'  // light orange
      ]
    }
  ];

const ColorSchemeContext = createContext<ColorSchemeContextType | undefined>(undefined);

export const ColorSchemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedScheme, setSelectedScheme] = useState('Ocean');

  return (
    <ColorSchemeContext.Provider value={{
      selectedScheme,
      setSelectedScheme,
      colorSchemes: defaultColorSchemes
    }}>
      {children}
    </ColorSchemeContext.Provider>
  );
};

export const useColorScheme = () => {
  const context = useContext(ColorSchemeContext);
  if (context === undefined) {
    throw new Error('useColorScheme must be used within a ColorSchemeProvider');
  }
  return context;
};