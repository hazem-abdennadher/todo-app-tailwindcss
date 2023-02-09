import { createContext, useState, useEffect, useContext } from 'react';
type ThemeProviderProps = {
  children: React.ReactNode;
};
type ThemeContextProps = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};
const ThemeContext = createContext<ThemeContextProps>(null!);

// provider and our theme manager
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const updateLocalStorage = (newTheme: 'light' | 'dark') => {
    localStorage.setItem('theme', newTheme);
  };
  const UpdateTheme = (newTheme: 'light' | 'dark') => {
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    UpdateTheme(newTheme);
    updateLocalStorage(newTheme);
    setTheme(newTheme);
  };

  useEffect(() => {
    const localTheme = localStorage.getItem('theme');
    if (localTheme) {
      UpdateTheme(localTheme as 'light' | 'dark');
      setTheme(localTheme as 'light' | 'dark');
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
// custom hook to use theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
