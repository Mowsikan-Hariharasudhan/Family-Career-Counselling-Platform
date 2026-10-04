// ============================================================
// Outcome Evidence Panel (Right Column of Counselling Workspace)
// ============================================================

import React from 'react';
import type { SupportedLanguage } from '../../types';
import { useCounselling } from '../../context/CounsellingContext';
import { DataCard } from '../shared/DataCard';
import { EvidenceTag } from '../shared/EvidenceTag';
import { formatCurrency, formatPercentage } from '../../utils/formatters';
import {
  Briefcase,
  TrendingUp,
  Award,
  GraduationCap,
  MapPin,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface OutcomeEvidencePanelProps {
  language: SupportedLanguage;
}

export const OutcomeEvidencePanel: React.FC<OutcomeEvidencePanelProps> = ({
  language,
}) => {
  const { selectedTrade } = useCounselling();
  const outcomes = selectedTrade.outcomes;
  const tradeName = selectedTrade.name[language] || selectedTrade.name.en;

  return (
    <div className="space-y-4">
      {/* 1. Header & Evidence Authenticity Card */}
      <div className="bg-[#E8F5EE] border-2 border-[#18864B] rounded-lg p-3.5 shadow-[3px_3px_0px_#18864B]">
        <div className="flex items-center justify-between mb-2">
          <EvidenceTag type="outcome_data" customLabel="Outcome Evidence" />
          <span className="text-[10px] font-mono text-[#0F5C30] font-semibold">
             Ground Truth
          </span>
        </div>
        <h3 className="font-bold text-base text-[#101214] leading-tight">
          {tradeName}
        </h3>
        <p className="text-xs text-[#0F5C30] font-medium mt-0.5">
          {selectedTrade.education} • {selectedTrade.trainingDuration}
        </p>
      </div>

      {/* 2. Key Outcome Statistics */}
      <DataCard
        title="Placement & Salary Metrics"
        className="border-2"
        bodyClassName="p-3.5 space-y-3"
      >
        {/* Placement Rate */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-semibold text-[#667085] flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5 text-[#0B73B9]" />
              Placement Rate:
            </span>
            <span className="text-sm font-extrabold text-[#18864B]">
              {formatPercentage(outcomes.placement)}
            </span>
          </div>
          <div className="w-full bg-[#EEF0F4] border border-[#1D2630] rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-[#18864B] h-full rounded-full transition-all duration-500"
              style={{ width: `${outcomes.placement}%` }}
            />
          </div>
          <p className="text-[10px] text-[#667085] mt-1">
            Based on completed batches across accredited ITIs
          </p>
        </div>

        {/* Starting Salary */}
        <div className="pt-2 border-t border-[#D0D5DD]">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-semibold text-[#667085] flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-[#18864B]" />
              Average Starting Pay:
            </span>
            <span className="text-sm font-extrabold text-[#101214]">
              {formatCurrency(outcomes.averageSalary, language)}/mo
            </span>
          </div>
          <div className="bg-[#F7F8FA] p-2 rounded border border-[#D0D5DD] text-[11px] flex justify-between items-center text-[#667085]">
            <span>Range:</span>
            <span className="font-semibold text-[#101214]">
              {formatCurrency(outcomes.salaryRange.min, language)} –{' '}
              {formatCurrency(outcomes.salaryRange.max, language)}
            </span>
          </div>
        </div>

        {/* Typical Entry Roles */}
        <div className="pt-2 border-t border-[#D0D5DD]">
          <span className="block text-xs font-semibold text-[#667085] mb-1.5">
            Initial Job Roles:
          </span>
          <div className="flex flex-wrap gap-1">
            {outcomes.roles.map((r, i) => (
              <span
                key={i}
                className="text-[11px] font-medium bg-[#EEF0F4] text-[#123B63] px-2 py-0.5 rounded border border-[#D0D5DD]"
              >
                {r}
              </span>
            ))}
          </div>
        </div>
      </DataCard>

      {/* 3. Apprenticeship & Stipend Guidance */}
      <DataCard
        title="Apprenticeship (NAPS)"
        bodyClassName="p-3 text-xs space-y-1.5"
      >
        <div className="flex items-start gap-2">
          <Award className="w-4 h-4 text-[#D9A441] flex-shrink-0 mt-0.5" />
          <p className="text-xs text-[#101214] leading-relaxed">
            {selectedTrade.apprenticeship[language] || selectedTrade.apprenticeship.en}
          </p>
        </div>
      </DataCard>

      {/* 4. Higher Education Pathways */}
      <DataCard
        title="Higher Studies Pathways"
        bodyClassName="p-3 text-xs space-y-2"
      >
        <div className="space-y-1.5">
          {selectedTrade.furtherEducation.slice(0, 3).map((route, i) => (
            <div key={i} className="flex items-start gap-1.5 text-xs text-[#101214]">
              <GraduationCap className="w-3.5 h-3.5 text-[#0B73B9] flex-shrink-0 mt-0.5" />
              <span>{route}</span>
            </div>
          ))}
        </div>
      </DataCard>

      {/* 5. Deep-dive Link: Pathway & Comparison */}
      <div className="space-y-2">
        <Link
          to={`/careers/${selectedTrade.id}`}
          className="flex items-center justify-between p-2.5 bg-white hover:bg-[#E8F4FD] border-2 border-[#1D2630] rounded-lg shadow-[2px_2px_0px_#1D2630] text-xs font-bold text-[#123B63] transition-all"
        >
          <span>View 5-Stage Career Pathway</span>
          <ChevronRight className="w-4 h-4 text-[#0B73B9]" />
        </Link>
        <Link
          to="/compare"
          className="flex items-center justify-between p-2.5 bg-white hover:bg-[#F7F8FA] border-2 border-[#1D2630] rounded-lg shadow-[2px_2px_0px_#1D2630] text-xs font-bold text-[#123B63] transition-all"
        >
          <span>Compare With Other Trades</span>
          <ChevronRight className="w-4 h-4 text-[#123B63]" />
        </Link>
      </div>


    </div>
  );
};
