// ============================================================
// Decision Confidence Bar & Sentiment Indicator
// ============================================================

import React from 'react';
import type { ConfidenceLevel, SentimentLevel } from '../../types';
import { ShieldAlert, ShieldCheck, Smile, Meh, Frown } from 'lucide-react';

export const DecisionConfidenceBar: React.FC<{
  confidence: ConfidenceLevel;
  className?: string;
}> = ({ confidence, className = '' }) => {
  const percentage =
    confidence === 'high' ? 88 : confidence === 'moderate' ? 58 : 28;

  const colorClass =
    confidence === 'high'
      ? 'bg-[#18864B]'
      : confidence === 'moderate'
      ? 'bg-[#D99800]'
      : 'bg-[#D95D50]';

  const label =
    confidence === 'high'
      ? 'High Decision Confidence'
      : confidence === 'moderate'
      ? 'Moderate Confidence'
      : 'Exploring & Unsure';

  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex items-center justify-between text-xs">
        <span className="font-bold text-[#101214] flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#0B73B9]" />
          <span>Family Decision Readiness</span>
        </span>
        <span className="font-semibold text-xs text-[#123B63]">{label}</span>
      </div>
      <div className="w-full bg-[#EEF0F4] border border-[#1D2630] rounded-full h-3 p-0.5 shadow-[1px_1px_0px_rgba(0,0,0,0.1)]">
        <div
          className={`h-full rounded-full transition-all duration-500 ${colorClass}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex justify-between text-[10px] text-[#667085] px-1 font-mono">
        <span>Hesitant</span>
        <span>Guided</span>
        <span>Convinced</span>
      </div>
    </div>
  );
};

export const SentimentIndicator: React.FC<{
  sentimentBefore: SentimentLevel;
  sentimentAfter: SentimentLevel;
  className?: string;
}> = ({ sentimentBefore, sentimentAfter, className = '' }) => {
  const renderIcon = (level: SentimentLevel) => {
    switch (level) {
      case 'high_concern':
        return <Frown className="w-3.5 h-3.5 text-[#D95D50] flex-shrink-0" />;
      case 'moderate':
        return <Meh className="w-3.5 h-3.5 text-[#D99800] flex-shrink-0" />;
      case 'low_concern':
        return <Smile className="w-3.5 h-3.5 text-[#18864B] flex-shrink-0" />;
    }
  };

  const getLabel = (level: SentimentLevel) => {
    switch (level) {
      case 'high_concern':
        return 'High Concern';
      case 'moderate':
        return 'Moderate Concern';
      case 'low_concern':
        return 'Reassured';
    }
  };

  return (
    <div
      className={`bg-[#F7F8FA] border border-[#D0D5DD] rounded-lg p-2 text-xs shadow-[1px_1px_0px_rgba(0,0,0,0.04)] ${className}`}
    >
      <div className="grid grid-cols-2 gap-2 text-[11px]">
        <div className="bg-white p-2 rounded border border-[#D0D5DD] space-y-1">
          <span className="text-[#667085] text-[10px] block font-medium uppercase tracking-wider">
            Initial Mindset
          </span>
          <span className="flex items-center gap-1 font-bold text-[#101214] truncate">
            {renderIcon(sentimentBefore)}
            <span className="truncate">{getLabel(sentimentBefore)}</span>
          </span>
        </div>

        <div className="bg-white p-2 rounded border border-[#0B73B9]/30 bg-sky-50/50 space-y-1">
          <span className="text-[#0B73B9] text-[10px] block font-medium uppercase tracking-wider">
            Current Status
          </span>
          <span className="flex items-center gap-1 font-bold text-[#101214] truncate">
            {renderIcon(sentimentAfter)}
            <span className="truncate">{getLabel(sentimentAfter)}</span>
          </span>
        </div>
      </div>
    </div>
  );
};
