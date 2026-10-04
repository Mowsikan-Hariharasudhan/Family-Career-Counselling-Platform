// ============================================================
// Trade Comparison Page
// ============================================================

import React from 'react';
import { useTranslation } from 'react-i18next';
import type { SupportedLanguage } from '../types';
import { useCounselling } from '../context/CounsellingContext';
import { TradeComparisonTable } from '../components/career/TradeComparisonTable';
import { Scale } from 'lucide-react';

export const TradeComparisonPage: React.FC = () => {
  const { trades } = useCounselling();
  const { i18n } = useTranslation();
  const currentLang = (i18n.language || 'en').slice(0, 2) as SupportedLanguage;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border-2 border-[#1D2630] rounded-lg p-5 shadow-[4px_4px_0px_#1D2630]">
        <div className="flex items-center gap-2 text-xs font-bold text-[#0B73B9] uppercase">
          <Scale className="w-4 h-4" />
          <span>Decision Support Matrix</span>
        </div>
        <h1 className="text-2xl font-bold text-[#101214] mt-0.5">
          Side-by-Side Trade Comparison
        </h1>
        <p className="text-xs text-[#667085]">
          Compare up to 4 vocational trades concurrently across placement probability, salary ranges, course length, and educational routes.
        </p>
      </div>

      {/* Comparison Table */}
      <TradeComparisonTable allTrades={trades} language={currentLang} />
    </div>
  );
};
