
import React from 'react';
import { Moon, Sun, Atom } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div 
      className={cn(
        "relative w-16 h-8 rounded-full p-1 cursor-pointer transition-colors duration-300",
        isDark ? "bg-slate-800 border border-slate-700" : "bg-blue-100 border border-blue-200"
      )}
      onClick={toggleTheme}
      aria-label="Toggle theme"
      role="button"
      tabIndex={0}
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
            className="text-cyan-400 filter drop-shadow-[0_0_3px_rgba(34,211,238,0.8)] transition-colors duration-300" 
          />
        ) : (
          <Sun 
            size={16} 
            className="text-amber-500 filter drop-shadow-[0_0_3px_rgba(251,191,36,0.8)] transition-colors duration-300" 
          />
        )}
      </div>
      
      {/* Small decorative atom, positioned differently based on theme */}
      <Atom 
        size={12} 
        className={cn(
          "absolute opacity-40 transition-all duration-300",
          isDark 
            ? "right-1 top-[-8px] text-cyan-300" 
            : "left-1 bottom-[-8px] text-amber-400"
        )}
      />
    </div>
  );
};

export default ThemeToggle;
