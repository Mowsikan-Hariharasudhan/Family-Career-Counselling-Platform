// ============================================================
// Evidence Tag — Differentiating Outcome Data vs. AI Insights
// ============================================================

import React from 'react';
import { Database, Sparkles, AlertCircle } from 'lucide-react';

export interface EvidenceTagProps {
  type: 'outcome_data' | 'ai_explanation' | 'demo_notice';
  customLabel?: string;
  className?: string;
}

export const EvidenceTag: React.FC<EvidenceTagProps> = ({
  type,
  customLabel,
  className = '',
}) => {
  if (type === 'outcome_data') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded bg-[#E8F5EE] text-[#0F5C30] border border-[#18864B] shadow-[1px_1px_0px_#18864B] ${className}`}
        title="Verified statistical data from official dataset"
      >
        <Database className="w-3.5 h-3.5" />
        <span>{customLabel || 'Outcome Evidence'}</span>
      </span>
    );
  }

  if (type === 'ai_explanation') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded bg-[#E8F4FD] text-[#065390] border border-[#0B73B9] shadow-[1px_1px_0px_#0B73B9] ${className}`}
        title="AI-assisted explanation grounded on vocational evidence"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>{customLabel || 'AI Counsellor Explanation'}</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-medium text-[#667085] bg-[#EEF0F4] border border-[#D0D5DD] rounded ${className}`}
    >
      <AlertCircle className="w-3 h-3 text-[#D99800]" />
      <span>{customLabel || 'Official MSDE dataset'}</span>
    </span>
  );
};
