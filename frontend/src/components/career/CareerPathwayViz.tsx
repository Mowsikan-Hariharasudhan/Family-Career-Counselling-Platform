// ============================================================
// Career Pathway Visualizer — 5-Stage Progression
// (Custom Accessible Implementation — UX4G Visual Gap)
// ============================================================

import React, { useState } from 'react';
import type { CareerStage, SupportedLanguage } from '../../types';
import {
  GraduationCap,
  Award,
  Briefcase,
  TrendingUp,
  Building,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface CareerPathwayVizProps {
  stages: CareerStage[];
  language: SupportedLanguage;
  tradeName: string;
}

export const CareerPathwayViz: React.FC<CareerPathwayVizProps> = ({
  stages,
  language,
  tradeName,
}) => {
  const [selectedStageIdx, setSelectedStageIdx] = useState(0);
  const activeStage = stages[selectedStageIdx] || stages[0];

  const stageIcons = [
    <GraduationCap className="w-5 h-5" />,
    <Award className="w-5 h-5" />,
    <Briefcase className="w-5 h-5" />,
    <TrendingUp className="w-5 h-5" />,
    <Building className="w-5 h-5" />,
  ];

  return (
    <div className="bg-white border-2 border-[#1D2630] rounded-lg shadow-[4px_4px_0px_#1D2630] p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 border-b border-[#D0D5DD]">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#0B73B9]">
            Structured Career Trajectory
          </span>
          <h3 className="text-lg md:text-xl font-bold text-[#101214] leading-tight">
            5-Stage Growth Pathway for {tradeName}
          </h3>
          <p className="text-xs text-[#667085] mt-0.5">
            Clear milestones proving vocational education is not a dead-end, but a launching pad.
          </p>
        </div>
        <span className="inline-flex items-center gap-1 text-xs font-mono bg-[#E8F4FD] text-[#065390] border border-[#0B73B9] px-2.5 py-1 rounded">
          <Sparkles className="w-3.5 h-3.5" />
          <span>NSQF Level 3 → 7</span>
        </span>
      </div>

      {/* Interactive Horizontal / Vertical Stepper */}
      <div className="relative">
        {/* Connecting line behind nodes */}
        <div className="hidden md:block absolute top-6 left-8 right-8 h-1 bg-[#D0D5DD] -z-0" />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
          {stages.map((stg, idx) => {
            const isSelected = selectedStageIdx === idx;
            const isPassed = selectedStageIdx > idx;
            const stageTitle = stg.title[language] || stg.title.en;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedStageIdx(idx)}
                className={`flex flex-col items-center text-center p-3 rounded-lg border-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#E8F4FD] border-[#0B73B9] shadow-[3px_3px_0px_#0B73B9]'
                    : isPassed
                    ? 'bg-[#E8F5EE] border-[#18864B]'
                    : 'bg-white border-[#1D2630] hover:bg-[#F7F8FA]'
                }`}
              >
                {/* Node Circle */}
                <div
                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center mb-2 shadow-[2px_2px_0px_rgba(0,0,0,0.15)] transition-all ${
                    isSelected
                      ? 'bg-[#0B73B9] text-white border-[#1D2630]'
                      : isPassed
                      ? 'bg-[#18864B] text-white border-[#1D2630]'
                      : 'bg-white text-[#123B63] border-[#1D2630]'
                  }`}
                >
                  {stageIcons[idx] || <CheckCircle className="w-5 h-5" />}
                </div>

                {/* Stage Info */}
                <span className="text-[11px] font-mono font-bold text-[#667085] uppercase">
                  Stage {stg.stage}
                </span>
                <span className="text-xs font-bold text-[#101214] mt-0.5 line-clamp-1">
                  {stageTitle}
                </span>
                <span className="text-[11px] text-[#0B73B9] font-semibold mt-1">
                  {stg.timeframe}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Stage Detail Drawer */}
      <div className="bg-[#F7F8FA] border-2 border-[#1D2630] rounded-lg p-5 shadow-[3px_3px_0px_rgba(0,0,0,0.08)]">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pb-3 border-b border-[#D0D5DD]">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-xs font-bold bg-[#123B63] text-white rounded">
                Stage {activeStage.stage}
              </span>
              <h4 className="text-base font-bold text-[#101214]">
                {activeStage.title[language] || activeStage.title.en}
              </h4>
            </div>
            <p className="text-xs text-[#667085] mt-1">
              Designation: <strong className="text-[#101214]">{activeStage.role}</strong> • Expected Duration: <strong className="text-[#101214]">{activeStage.timeframe}</strong>
            </p>
          </div>

          {activeStage.nextStep && (
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#18864B] bg-[#E8F5EE] border border-[#B8E8CC] px-3 py-1.5 rounded">
              <span>Next Advancement:</span>
              <span className="text-[#101214]">{activeStage.nextStep}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          )}
        </div>

        {/* Competencies Acquired */}
        <div className="mt-4">
          <span className="block text-xs font-bold text-[#123B63] uppercase tracking-wider mb-2">
            Key Competencies & Practical Skills Acquired:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {activeStage.skills.map((skill, sIdx) => (
              <div
                key={sIdx}
                className="bg-white border border-[#D0D5DD] p-2.5 rounded text-xs font-semibold text-[#101214] flex items-center gap-2 shadow-xs"
              >
                <CheckCircle className="w-4 h-4 text-[#18864B] flex-shrink-0" />
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
