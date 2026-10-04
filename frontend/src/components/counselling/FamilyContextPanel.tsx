// ============================================================
// Family Context Panel (Left Column of Counselling Workspace)
// ============================================================

import React from 'react';
import type { SupportedLanguage } from '../../types';
import { useCounselling } from '../../context/CounsellingContext';
import { DataCard } from '../shared/DataCard';
import { Button } from '../shared/Button';
import { ConcernDetectionBadge } from './ConcernDetectionBadge';
import { DecisionConfidenceBar, SentimentIndicator } from './DecisionMetrics';
import {
  User,
  MapPin,
  GraduationCap,
  Sparkles,
  PhoneForwarded,
  Layers,
  RotateCcw,
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface FamilyContextPanelProps {
  language: SupportedLanguage;
  onOpenEscalation: () => void;
}

export const FamilyContextPanel: React.FC<FamilyContextPanelProps> = ({
  language,
  onOpenEscalation,
}) => {
  const {
    profile,
    trades,
    selectedTrade,
    setSelectedTradeId,
    detectedConcerns,
    decisionConfidence,
    sentimentBefore,
    sentimentAfter,
    loadDemoProfile,
    resetSession,
    isEscalated,
  } = useCounselling();

  const incomeMap: Record<string, string> = {
    below_10k: '< ₹10,000 / mo',
    '10k_25k': '₹10,000 – ₹25,000 / mo',
    '25k_50k': '₹25,000 – ₹50,000 / mo',
    '50k_1l': '₹50,000 – ₹1 Lakh / mo',
    'above_1l': '> ₹1 Lakh / mo',
  };

  return (
    <div className="space-y-4">
      {/* 1. Learner Profile Card */}
      <DataCard
        title="Learner & Family"
        className="border-2"
        bodyClassName="p-3.5 space-y-3"
      >
        <div className="flex items-center gap-3 pb-3 border-b border-[#D0D5DD]">
          <div className="w-11 h-11 rounded-full bg-[#123B63] text-white flex items-center justify-center font-bold text-base border-2 border-[#1D2630] shadow-[2px_2px_0px_#1D2630]">
            {profile.learnerName ? profile.learnerName[0].toUpperCase() : 'L'}
          </div>
          <div>
            <div className="font-bold text-sm text-[#101214] leading-tight">
              {profile.learnerName || 'Learner (Anonymous)'}
            </div>
            <div className="text-xs text-[#667085] flex items-center gap-1 mt-0.5">
              <span>{profile.age} years old</span>
              <span>•</span>
              <span className="flex items-center">
                <MapPin className="w-3 h-3 inline mr-0.5" />
                {profile.location || 'Tamil Nadu'}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-[#F7F8FA] p-2 rounded border border-[#D0D5DD]">
            <span className="text-[#667085] block text-[11px]">Education</span>
            <span className="font-semibold text-[#101214]">
              {profile.education || '10th Std'}
            </span>
          </div>
          <div className="bg-[#F7F8FA] p-2 rounded border border-[#D0D5DD]">
            <span className="text-[#667085] block text-[11px]">Household Income</span>
            <span className="font-semibold text-[#101214]">
              {incomeMap[profile.householdIncome] || '₹10K–₹25K'}
            </span>
          </div>
        </div>

        {/* Change Trade Select */}
        <div>
          <label className="block text-xs font-bold text-[#123B63] mb-1">
            Focus Vocational Trade:
          </label>
          <div className="relative">
            <select
              value={selectedTrade.id}
              onChange={(e) => setSelectedTradeId(e.target.value)}
              className="w-full text-xs font-semibold px-2.5 py-2 rounded bg-white border-2 border-[#1D2630] shadow-[2px_2px_0px_#1D2630] focus:outline-none focus:ring-2 focus:ring-[#0B73B9] cursor-pointer"
            >
              {trades.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name[language] || t.name.en} ({t.trainingDuration})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 border-t border-[#D0D5DD] flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={resetSession}
            className="p-1.5 text-[#667085] hover:text-[#101214] border border-[#D0D5DD] rounded hover:bg-white cursor-pointer"
            title="Reset session"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </DataCard>

      {/* 2. Detected Parent Concerns */}
      <DataCard
        title="Detected Family Concerns"
        subtitle="Identified from conversational dialogue"
        bodyClassName="p-3 space-y-2"
      >
        <div className="flex flex-wrap gap-1.5">
          {detectedConcerns.length === 0 ? (
            <span className="text-xs text-[#667085] italic">
              No concerns registered yet
            </span>
          ) : (
            detectedConcerns.map((c) => (
              <ConcernDetectionBadge
                key={c}
                intent={c}
                language={language}
                size="sm"
              />
            ))
          )}
        </div>
      </DataCard>

      {/* 3. Decision Readiness & Sentiment Tracking */}
      <DataCard
        title="Family Decision Readiness"
        bodyClassName="p-3 space-y-3"
      >
        <DecisionConfidenceBar confidence={decisionConfidence} />
        <SentimentIndicator
          sentimentBefore={sentimentBefore}
          sentimentAfter={sentimentAfter}
        />
      </DataCard>

      {/* 4. Human Counsellor Escalation Card */}
      <div className="bg-[#FFF9EE] border-2 border-[#1D2630] rounded-lg p-3.5 shadow-[3px_3px_0px_#1D2630] space-y-2.5">
        <div className="flex items-center gap-2">
          <PhoneForwarded className="w-4 h-4 text-[#D99800]" />
          <h4 className="font-bold text-xs text-[#101214] leading-tight">
            Need Expert Human Counsel?
          </h4>
        </div>
        <p className="text-[11px] text-[#667085] leading-relaxed">
          Families facing complex dilemmas can schedule a 1-on-1 call with a certified district vocational counsellor.
        </p>
        <Button
          variant="secondary"
          size="sm"
          className="w-full text-xs"
          onClick={onOpenEscalation}
          disabled={isEscalated}
        >
          {isEscalated ? '✓ Counsellor Requested' : 'Connect with Counsellor'}
        </Button>
      </div>
    </div>
  );
};
