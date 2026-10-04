// ============================================================
// Quick Concern Action Prompts for Families
// ============================================================

import React from 'react';
import type { SupportedLanguage } from '../../types';
import {
  ShieldCheck,
  IndianRupee,
  TrendingUp,
  GraduationCap,
  HardHat,
  Users,
  Award,
} from 'lucide-react';

interface QuickConcernActionsProps {
  onSelectPrompt: (promptText: string) => void;
  language: SupportedLanguage;
  disabled?: boolean;
}

interface PromptConfig {
  icon: React.ReactNode;
  text: Record<SupportedLanguage, string>;
  category: string;
}

export const QuickConcernActions: React.FC<QuickConcernActionsProps> = ({
  onSelectPrompt,
  language,
  disabled = false,
}) => {
  const prompts: PromptConfig[] = [
    {
      icon: <ShieldCheck className="w-3.5 h-3.5 text-[#0B73B9]" />,
      text: {
        en: 'Will my child definitely get a job after this course?',
        ta: 'பயிற்சி முடிந்ததும் என் பிள்ளைக்கு நிச்சயம் வேலை கிடைக்குமா?',
        hi: 'क्या कोर्स के बाद मेरे बच्चे को पक्की नौकरी मिलेगी?',
      },
      category: 'Job Security',
    },
    {
      icon: <IndianRupee className="w-3.5 h-3.5 text-[#18864B]" />,
      text: {
        en: 'What starting salary and monthly income can we expect?',
        ta: 'தொடக்கத்தில் எவ்வளவு மாத சம்பளம் எதிர்பார்க்கலாம்?',
        hi: 'शुरुआती मासिक वेतन कितना मिलने की उम्मीद है?',
      },
      category: 'Earnings',
    },
    {
      icon: <GraduationCap className="w-3.5 h-3.5 text-[#0B73B9]" />,
      text: {
        en: 'Can my child continue to Diploma or Engineering later?',
        ta: 'இதன் பிறகு டிப்ளோமா அல்லது என்ஜினியரிங் படிக்க முடியுமா?',
        hi: 'क्या इसके बाद डिप्लोमा या इंजीनियरिंग की पढ़ाई की जा सकती है?',
      },
      category: 'Education',
    },
    {
      icon: <HardHat className="w-3.5 h-3.5 text-[#D99800]" />,
      text: {
        en: 'Is the workplace and factory environment safe?',
        ta: 'தொழிற்சாலை வேலை சூழல் மற்றும் உடல் பாதுகாப்பு எவ்வாறு உள்ளது?',
        hi: 'क्या कार्यस्थल और कारखाने का माहौल सुरक्षित है?',
      },
      category: 'Safety',
    },
    {
      icon: <Users className="w-3.5 h-3.5 text-[#A0312A]" />,
      text: {
        en: 'What is the social respect for skilled vocational work?',
        ta: 'சமூகத்திலும் உறவினர்கள் மத்தியிலும் இந்த வேலைக்கு மதிப்பு உள்ளதா?',
        hi: 'समाज और रिश्तेदारों में इस काम का क्या सम्मान है?',
      },
      category: 'Social Dignity',
    },
    {
      icon: <Award className="w-3.5 h-3.5 text-[#D9A441]" />,
      text: {
        en: 'How does the Apprenticeship (NAPS) stipend work?',
        ta: 'தொழிற்பயிற்சி (அப்ரண்டிஸ்) காலத்தில் அரசு உதவித்தொகை எப்படி கிடைக்கும்?',
        hi: 'शिक्षुता (NAPS) के दौरान वजीफा और ट्रेनिंग कैसे मिलती है?',
      },
      category: 'Apprenticeship',
    },
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs font-bold text-[#123B63]">
        <span>Common Family Questions (Click to Ask):</span>
        <span className="text-[11px] font-normal text-[#667085]">
          One-click query
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {prompts.map((p, idx) => {
          const promptText = p.text[language] || p.text.en;
          return (
            <button
              key={idx}
              type="button"
              disabled={disabled}
              onClick={() => onSelectPrompt(promptText)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-white hover:bg-[#E8F4FD] active:bg-[#D0E8FB] border border-[#1D2630] text-xs font-medium text-[#101214] shadow-[2px_2px_0px_rgba(0,0,0,0.08)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer text-left disabled:opacity-50"
            >
              <span className="flex-shrink-0">{p.icon}</span>
              <span className="line-clamp-1">{promptText}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
