
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div 
      className={cn(
        "relative w-16 h-8 rounded-full p-1 cursor-pointer transition-colors duration-300",
        isDark ? "bg-slate-800" : "bg-blue-100"
      )}
      onClick={toggleTheme}
    >
      <div 
        className={cn(
          "absolute top-1 w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-500 ease-apple-ease",
          isDark 
            ? "translate-x-8 bg-slate-700" 
            : "translate-x-0 bg-white"
        )}
      >
        {isDark ? (
          <Moon 
            size={16} 
            className="text-green-400 filter drop-shadow-[0_0_3px_rgba(74,222,128,0.8)] transition-colors duration-300" 
          />
        ) : (
          <Sun 
            size={16} 
            className="text-amber-500 filter drop-shadow-[0_0_3px_rgba(251,191,36,0.8)] transition-colors duration-300" 
          />
        )}
      </div>
    </div>
  );
};

export default ThemeToggle;
