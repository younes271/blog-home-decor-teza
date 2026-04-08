// useDarkMode — manages dark mode state with localStorage persistence
// Requirements: 16.5

'use client';

import { useState, useEffect, useCallback } from 'react';

export function useDarkMode(): { isDark: boolean; toggle: () => void; setDark: (v: boolean) => void } {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('theme');
      if (stored === 'dark') {
        setIsDark(true);
        document.documentElement.classList.add('dark');
      } else if (stored === 'light') {
        setIsDark(false);
        document.documentElement.classList.remove('dark');
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setIsDark(true);
        document.documentElement.classList.add('dark');
      }
    } catch {
      // localStorage unavailable
    }
  }, []);

  const setDark = useCallback((value: boolean) => {
    setIsDark(value);
    document.documentElement.classList.toggle('dark', value);
    try { localStorage.setItem('theme', value ? 'dark' : 'light'); } catch {}
  }, []);

  const toggle = useCallback(() => {
    setDark(!isDark);
  }, [isDark, setDark]);

  return { isDark, toggle, setDark };
}
