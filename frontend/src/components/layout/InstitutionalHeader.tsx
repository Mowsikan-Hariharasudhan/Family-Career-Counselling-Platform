// ============================================================
// Institutional Header Component — UX4G & MSDE Government Standard
// ============================================================

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { APP_CONFIG } from '../../app/config';
import { LanguageSwitcher } from '../shared/LanguageSwitcher';
import { SimpleModeToggle } from '../shared/SimpleModeToggle';

interface InstitutionalHeaderProps {
  isSimpleMode?: boolean;
  onToggleSimpleMode?: () => void;
}

export const InstitutionalHeader: React.FC<InstitutionalHeaderProps> = ({
  isSimpleMode = false,
  onToggleSimpleMode,
}) => {
  const [fontSizeOffset, setFontSizeOffset] = useState(0);

  const handleFontChange = (delta: number) => {
    const newOffset = Math.max(-2, Math.min(4, fontSizeOffset + delta));
    setFontSizeOffset(newOffset);
    document.documentElement.style.fontSize = `${16 + newOffset}px`;
  };

  const handleResetFont = () => {
    setFontSizeOffset(0);
    document.documentElement.style.fontSize = '16px';
  };

  return (
    <header className="w-full bg-[#123B63] text-white border-b-2 border-[#1D2630]">
      {/* 1. Tricolor Top Accent Strip */}
      <div className="h-1.5 w-full flex">
        <div className="flex-1 bg-[#FF9933]" title="Saffron" />
        <div className="flex-1 bg-white" title="White" />
        <div className="flex-1 bg-[#138808]" title="Green" />
      </div>

      {/* 2. Government of India Top Utility Bar */}
      <div className="bg-[#0D2B4A] border-b border-white/10 px-4 py-1.5 text-xs text-slate-200">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Official Apex Title */}
          <div className="flex items-center gap-2">
            <span className="font-semibold tracking-wide">
              भारत सरकार / Government of India
            </span>
            <span className="hidden sm:inline text-slate-400">|</span>
            <span className="hidden sm:inline text-slate-300 font-medium">
              कौशल विकास और उद्यमशीलता मंत्रालय
            </span>
          </div>

          {/* Accessibility & Quick Tool Controls */}
          <div className="flex items-center gap-3">
            {/* Screen Reader & Main content anchor */}
            <a
              href="#main-content"
              className="text-xs text-sky-200 hover:text-white underline focus:outline-none"
            >
              Skip to content
            </a>

            {/* Font Size Adjusters */}
            <div
              className="flex items-center bg-[#123B63] border border-white/20 rounded px-1.5 py-0.5 gap-1"
              role="group"
              aria-label="Text size control"
            >
              <button
                type="button"
                onClick={() => handleFontChange(-1)}
                className="px-1 hover:text-sky-300 font-bold text-[11px] cursor-pointer"
                title="Decrease font size"
                aria-label="Decrease text size"
              >
                A-
              </button>
              <button
                type="button"
                onClick={handleResetFont}
                className="px-1 hover:text-sky-300 font-bold text-xs cursor-pointer border-x border-white/20"
                title="Default font size"
                aria-label="Normal text size"
              >
                A
              </button>
              <button
                type="button"
                onClick={() => handleFontChange(1)}
                className="px-1 hover:text-sky-300 font-bold text-xs cursor-pointer"
                title="Increase font size"
                aria-label="Increase text size"
              >
                A+
              </button>
            </div>

            {/*  Badge */}

          </div>
        </div>
      </div>

      {/* 3. Main Institutional Branding Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Emblem & Functional Title */}
        <Link
          to="/"
          className="flex items-center gap-3.5 group focus:outline-none focus:ring-2 focus:ring-sky-400 rounded p-1"
        >
          {/* MSDE Seal */}
          <div className="w-14 h-14 bg-white rounded-md p-1 border-2 border-white/40 flex items-center justify-center flex-shrink-0 shadow-[2px_2px_0px_rgba(0,0,0,0.3)]">
            <img
              src="/assets/logos/MSDE.png"
              alt="Ministry of Skill Development and Entrepreneurship Logo"
              className="w-full h-full object-contain"
              onError={(e) => {
                // Fallback graphic if image path doesn't resolve
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>

          <div>
            <div className="text-[11px] sm:text-xs uppercase tracking-wider text-sky-200 font-semibold">
              {APP_CONFIG.APP_MINISTRY}
            </div>
            {/* Functional Title (Preserved as requested: Do NOT invent a product name) */}
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight group-hover:text-sky-100">
              {APP_CONFIG.APP_DISPLAY_NAME}
            </h1>
            <p className="text-xs text-slate-300 line-clamp-1 max-w-xl font-normal">
              {APP_CONFIG.APP_SUBTITLE}
            </p>
          </div>
        </Link>

        {/* Global Controls: Simple Mode + Language */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-end">
          {onToggleSimpleMode && (
            <SimpleModeToggle
              isSimpleMode={isSimpleMode}
              onToggle={onToggleSimpleMode}
            />
          )}
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
};
