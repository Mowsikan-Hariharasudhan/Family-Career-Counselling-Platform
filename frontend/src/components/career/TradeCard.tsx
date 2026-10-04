// ============================================================
// TradeCard Component — Career Explorer Grid
// ============================================================

import React from 'react';
import type { Trade, SupportedLanguage } from '../../types';
import { DataCard } from '../shared/DataCard';
import { Button } from '../shared/Button';
import { formatCurrency, formatPercentage } from '../../utils/formatters';
import { Briefcase, TrendingUp, Clock, ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TradeCardProps {
  trade: Trade;
  language: SupportedLanguage;
  isSelected?: boolean;
  onSelect?: () => void;
}

export const TradeCard: React.FC<TradeCardProps> = ({
  trade,
  language,
  isSelected = false,
  onSelect,
}) => {
  const tradeName = trade.name[language] || trade.name.en;
  const overview = trade.overview[language] || trade.overview.en;

  return (
    <DataCard
      interactive
      className={`flex flex-col justify-between h-full ${
        isSelected ? 'ring-2 ring-[#0B73B9] border-[#0B73B9]' : ''
      }`}
      bodyClassName="p-4 flex flex-col justify-between flex-1 space-y-3"
    >
      <div>
        {/* Badges / Duration */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#123B63] bg-[#E8F4FD] border border-[#BFE0F5] px-2 py-0.5 rounded">
            {trade.trainingDuration}
          </span>
          <span className="text-[11px] font-bold text-[#0F5C30] bg-[#E8F5EE] border border-[#B8E8CC] px-2 py-0.5 rounded flex items-center gap-1">
            <Briefcase className="w-3 h-3 text-[#18864B]" />
            {formatPercentage(trade.outcomes.placement)} Placement
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-base text-[#101214] leading-snug">
          {tradeName}
        </h3>

        {/* Overview snippet */}
        <p className="text-xs text-[#667085] line-clamp-3 mt-1.5 leading-relaxed">
          {overview}
        </p>

        {/* Key outcome stats */}
        <div className="mt-3 pt-3 border-t border-[#D0D5DD] grid grid-cols-2 gap-2 text-xs">
          <div className="bg-[#F7F8FA] p-2 rounded border border-[#D0D5DD]">
            <span className="text-[11px] text-[#667085] block">Average Pay</span>
            <span className="font-bold text-[#101214]">
              {formatCurrency(trade.outcomes.averageSalary, language)}/mo
            </span>
          </div>
          <div className="bg-[#F7F8FA] p-2 rounded border border-[#D0D5DD]">
            <span className="text-[11px] text-[#667085] block">Eligibility</span>
            <span className="font-bold text-[#101214] truncate block">
              {trade.education}
            </span>
          </div>
        </div>

        {/* Roles Tags */}
        <div className="mt-3 flex flex-wrap gap-1">
          {trade.roles.slice(0, 3).map((r, i) => (
            <span
              key={i}
              className="text-[10px] bg-[#EEF0F4] text-[#123B63] px-1.5 py-0.5 rounded font-medium"
            >
              {r}
            </span>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="pt-3 border-t border-[#D0D5DD] flex items-center gap-2">
        <Link
          to={`/careers/${trade.id}`}
          className="flex-1 text-center py-2 px-3 text-xs font-bold text-[#123B63] bg-white hover:bg-[#F7F8FA] border-2 border-[#1D2630] rounded shadow-[2px_2px_0px_#1D2630] transition-all cursor-pointer"
        >
          View Pathway
        </Link>
        {onSelect && (
          <Button
            size="sm"
            variant={isSelected ? 'success' : 'primary'}
            onClick={onSelect}
            className="text-xs"
          >
            {isSelected ? (
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Selected
              </span>
            ) : (
              'Focus Trade'
            )}
          </Button>
        )}
      </div>
    </DataCard>
  );
};
