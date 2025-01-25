import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
type UseThemeReturn = [Theme, (theme: Theme) => void];

const useTheme = (): UseThemeReturn => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = (theme: Theme = 'light') => {
    setTheme(theme);
  };

  return [theme as Theme, toggleTheme];
};

export default useTheme;
