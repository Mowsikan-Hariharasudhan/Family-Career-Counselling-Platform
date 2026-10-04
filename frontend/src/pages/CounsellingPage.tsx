// ============================================================
// Counselling Workspace Page — 3-Column Layout
// ============================================================

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { SupportedLanguage } from '../types';
import { useCounselling } from '../context/CounsellingContext';
import { FamilyContextPanel } from '../components/counselling/FamilyContextPanel';
import { CounsellingChat } from '../components/counselling/CounsellingChat';
import { OutcomeEvidencePanel } from '../components/counselling/OutcomeEvidencePanel';
import { EscalationModal } from '../components/counsellor/EscalationModal';

export const CounsellingPage: React.FC = () => {
  const { i18n } = useTranslation();
  const currentLang = (i18n.language || 'en').slice(0, 2) as SupportedLanguage;
  const [isEscalationOpen, setIsEscalationOpen] = useState(false);

  return (
    <div className="space-y-4">
      {/* 3-Column Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column (Family Profile, Active Trade, Detected Concerns) */}
        <div className="lg:col-span-3 space-y-4">
          <FamilyContextPanel
            language={currentLang}
            onOpenEscalation={() => setIsEscalationOpen(true)}
          />
        </div>

        {/* Center Column (Multi-turn Conversational AI Dialogue) */}
        <div className="lg:col-span-6">
          <CounsellingChat language={currentLang} />
        </div>

        {/* Right Column (Vocational Outcome Evidence Ground Truth) */}
        <div className="lg:col-span-3 space-y-4">
          <OutcomeEvidencePanel language={currentLang} />
        </div>
      </div>

      {/* Human Counsellor Escalation Modal */}
      <EscalationModal
        isOpen={isEscalationOpen}
        onClose={() => setIsEscalationOpen(false)}
        language={currentLang}
      />
    </div>
  );
};
