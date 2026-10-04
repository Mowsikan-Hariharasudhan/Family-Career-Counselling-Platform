// ============================================================
// Simple Mode Toggle Component (Rural / Low Literacy Support)
// ============================================================

import React from 'react';
import { Eye, HelpCircle } from 'lucide-react';

interface SimpleModeToggleProps {
  isSimpleMode: boolean;
  onToggle: () => void;
  className?: string;
}

export const SimpleModeToggle: React.FC<SimpleModeToggleProps> = ({
  isSimpleMode,
  onToggle,
  className = '',
}) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isSimpleMode}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold border-2 transition-all cursor-pointer ${
        isSimpleMode
          ? 'bg-[#18864B] text-white border-[#1D2630] shadow-[2px_2px_0px_#1D2630]'
          : 'bg-white text-[#123B63] border-[#1D2630] hover:bg-[#F7F8FA] shadow-[2px_2px_0px_rgba(0,0,0,0.1)]'
      } ${className}`}
      title="Toggle simplified mode with high contrast and larger text for family elders"
    >
      <Eye className="w-3.5 h-3.5" />
      <span>{isSimpleMode ? 'Simple Mode: ON' : 'Simple Mode'}</span>
      <span className="hidden lg:inline text-[10px] font-normal opacity-80 border-l border-current pl-1 ml-0.5">
        (Easy Read)
      </span>
    </button>
  );
};
