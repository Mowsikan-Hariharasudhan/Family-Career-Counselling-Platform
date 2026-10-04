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
        return <Frown className="w-4 h-4 text-[#D95D50]" />;
      case 'moderate':
        return <Meh className="w-4 h-4 text-[#D99800]" />;
      case 'low_concern':
        return <Smile className="w-4 h-4 text-[#18864B]" />;
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
      className={`bg-white border border-[#D0D5DD] rounded p-2.5 text-xs flex items-center justify-between shadow-[2px_2px_0px_rgba(0,0,0,0.06)] ${className}`}
    >
      <div className="flex items-center gap-2">
        <span className="text-[#667085] font-medium">Initial Mindset:</span>
        <span className="flex items-center gap-1 font-semibold text-[#101214]">
          {renderIcon(sentimentBefore)}
          <span>{getLabel(sentimentBefore)}</span>
        </span>
      </div>
      <span className="text-[#667085] font-bold">→</span>
      <div className="flex items-center gap-2">
        <span className="text-[#667085] font-medium">Current Status:</span>
        <span className="flex items-center gap-1 font-semibold text-[#101214]">
          {renderIcon(sentimentAfter)}
          <span>{getLabel(sentimentAfter)}</span>
        </span>
      </div>
    </div>
  );
};
