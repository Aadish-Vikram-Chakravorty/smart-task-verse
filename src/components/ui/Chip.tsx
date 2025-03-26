
import React from 'react';
import { cn } from '@/lib/utils';

interface ChipProps {
  label: string;
  color?: string;
  className?: string;
}

const Chip = ({ label, color, className }: ChipProps) => {
  return (
    <span 
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-all",
        color ? `bg-opacity-15 text-${color}-700 bg-${color}-100` : "bg-secondary text-secondary-foreground",
        className
      )}
      style={color && !color.startsWith('bg-') ? { 
        backgroundColor: `${color}20`,
        color: color,
        borderColor: `${color}30`,
      } : {}}
    >
      {label}
    </span>
  );
};

export default Chip;
