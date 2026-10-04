// ============================================================
// Multilingual Language Switcher
// English · தமிழ் · हिन्दी
// ============================================================

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import type { SupportedLanguage } from '../../types';

interface LanguageSwitcherProps {
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = '' }) => {
  const { i18n } = useTranslation();
  const currentLang = (i18n.language || 'en').slice(0, 2) as SupportedLanguage;

  const languages: Array<{ code: SupportedLanguage; label: string; scriptName: string }> = [
    { code: 'en', label: 'English', scriptName: 'EN' },
    { code: 'ta', label: 'தமிழ்', scriptName: 'TA' },
    { code: 'hi', label: 'हिन्दी', scriptName: 'HI' },
  ];

  const handleLanguageChange = (code: SupportedLanguage) => {
    i18n.changeLanguage(code);
    document.documentElement.lang = code;
    localStorage.setItem('fcc-language', code);
  };

  return (
    <div
      className={`inline-flex items-center bg-white border border-[#1D2630] rounded p-0.5 shadow-[2px_2px_0px_rgba(0,0,0,0.15)] ${className}`}
      role="group"
      aria-label="Language selection"
    >
      <div className="flex items-center px-2 py-1 text-[#123B63] text-xs font-bold border-r border-[#D0D5DD]">
        <Globe className="w-3.5 h-3.5 mr-1" />
        <span className="hidden sm:inline">LANG</span>
      </div>
      <div className="flex gap-0.5">
        {languages.map((lang) => {
          const isActive = currentLang === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleLanguageChange(lang.code)}
              aria-pressed={isActive}
              className={`px-2.5 py-1 text-xs font-semibold rounded cursor-pointer transition-all ${
                isActive
                  ? 'bg-[#0B73B9] text-white shadow-[1px_1px_0px_#123B63]'
                  : 'text-[#1D2630] hover:bg-[#F7F8FA] active:bg-[#EEF0F4]'
              }`}
            >
              <span className="font-bold">{lang.scriptName}</span>{' '}
              <span className="hidden md:inline font-normal text-[11px] opacity-90">
                ({lang.label})
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
