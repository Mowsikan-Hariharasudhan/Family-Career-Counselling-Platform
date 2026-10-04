// ============================================================
// Onboarding Wizard Component (4-Step UX4G Stepper)
// ============================================================

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { SupportedLanguage, HouseholdIncome, ConcernIntent } from '../../types';
import { useCounselling } from '../../context/CounsellingContext';
import { Button } from '../shared/Button';
import { INTENT_DEFINITIONS } from '../../data/intents';
import { useTranslation } from 'react-i18next';
import {
  User,
  MapPin,
  GraduationCap,
  Sparkles,
  Check,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';

export const OnboardingWizard: React.FC = () => {
  const { profile, updateProfile, setSelectedTradeId, loadDemoProfile, isSimpleMode, setIsSimpleMode } =
    useCounselling();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const currentLang = (i18n.language || 'en').slice(0, 2) as SupportedLanguage;

  const [step, setStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);

  // Local form state initialized from context
  const [learnerName, setLearnerName] = useState(profile.learnerName || '');
  const [age, setAge] = useState(profile.age || 17);
  const [location, setLocation] = useState(profile.location || 'Coimbatore');
  const [education, setEducation] = useState(profile.education || '12th Standard');
  const [householdIncome, setHouseholdIncome] = useState<HouseholdIncome>(
    profile.householdIncome || '10k_25k'
  );
  const [selectedConcerns, setSelectedConcerns] = useState<ConcernIntent[]>(
    profile.primaryConcerns || ['JOB_SECURITY', 'EARNINGS']
  );
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>(
    profile.preferredLanguage || currentLang
  );
  const [enableSimpleMode, setEnableSimpleMode] = useState(isSimpleMode || false);

  const toggleConcern = (concern: ConcernIntent) => {
    if (selectedConcerns.includes(concern)) {
      setSelectedConcerns(selectedConcerns.filter((c) => c !== concern));
    } else {
      setSelectedConcerns([...selectedConcerns, concern]);
    }
  };

  const handleComplete = () => {
    setIsSaving(true);
    
    // Simulate API save delay
    setTimeout(() => {
      updateProfile({
        learnerName: learnerName.trim() || 'Learner',
        age: Number(age),
        location: location.trim(),
        education,
        householdIncome,
        primaryConcerns: selectedConcerns,
        preferredLanguage: selectedLanguage,
      });

      i18n.changeLanguage(selectedLanguage);
      document.documentElement.lang = selectedLanguage;
      localStorage.setItem('fcc-language', selectedLanguage);

      if (enableSimpleMode) {
        setIsSimpleMode(true);
        navigate('/simple');
      } else {
        setIsSimpleMode(false);
        navigate('/counselling');
      }
    }, 1200);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white border-2 border-[#1D2630] rounded-lg shadow-[5px_5px_0px_#1D2630] overflow-hidden">
      {/* 1. Institutional Wizard Header */}
      <div className="bg-[#123B63] text-white p-5 border-b-2 border-[#1D2630]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-mono font-bold uppercase text-sky-300">
              Personalized Guidance System · 
            </span>
            <h2 className="text-xl font-bold text-white">
              Family & Learner Profile Setup
            </h2>
            <p className="text-xs text-slate-200 mt-0.5">
              Tell us about your household aspirations so the AI can provide grounded vocational advice.
            </p>
          </div>
        </div>

        {/* 2. UX4G Stepper Indicator */}
        <div className="mt-6 pt-4 border-t border-white/15 grid grid-cols-4 gap-2 text-center text-xs">
          {[
            { num: 1, label: 'Family Context' },
            { num: 2, label: 'Education' },
            { num: 3, label: 'Family Concerns' },
            { num: 4, label: 'Language & Mode' },
          ].map((s) => (
            <div key={s.num} className="flex flex-col items-center">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs mb-1 border ${
                  step === s.num
                    ? 'bg-[#0B73B9] text-white border-white'
                    : step > s.num
                    ? 'bg-[#18864B] text-white border-white'
                    : 'bg-white/10 text-white/60 border-white/20'
                }`}
              >
                {step > s.num ? <Check className="w-4 h-4" /> : s.num}
              </div>
              <span
                className={`text-[11px] hidden sm:block ${
                  step === s.num ? 'text-white font-bold' : 'text-slate-300'
                }`}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Dynamic Step Contents */}
      <div className="p-6 md:p-8">
        {/* STEP 1: Family Context */}
        {step === 1 && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-base font-bold text-[#101214] pb-2 border-b border-[#D0D5DD]">
              Step 1: Family Background & Location
            </h3>

            <div>
              <label className="block text-xs font-bold text-[#123B63] mb-1">
                Learner's Full Name:
              </label>
              <input
                type="text"
                value={learnerName}
                onChange={(e) => setLearnerName(e.target.value)}
                placeholder="e.g. Arun Kumar"
                className="w-full text-sm px-3.5 py-2.5 bg-[#F7F8FA] border-2 border-[#1D2630] rounded focus:bg-white focus:ring-2 focus:ring-[#0B73B9]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#123B63] mb-1">
                  Age (Years):
                </label>
                <input
                  type="number"
                  min={14}
                  max={35}
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full text-sm px-3.5 py-2.5 bg-[#F7F8FA] border-2 border-[#1D2630] rounded focus:bg-white focus:ring-2 focus:ring-[#0B73B9]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#123B63] mb-1">
                  District / Location:
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Coimbatore, Tamil Nadu"
                  className="w-full text-sm px-3.5 py-2.5 bg-[#F7F8FA] border-2 border-[#1D2630] rounded focus:bg-white focus:ring-2 focus:ring-[#0B73B9]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#123B63] mb-1">
                Approximate Monthly Household Income:
              </label>
              <select
                value={householdIncome}
                onChange={(e) => setHouseholdIncome(e.target.value as HouseholdIncome)}
                className="w-full text-sm px-3.5 py-2.5 bg-[#F7F8FA] border-2 border-[#1D2630] rounded focus:bg-white focus:ring-2 focus:ring-[#0B73B9] cursor-pointer"
              >
                <option value="below_10k">Below ₹10,000 / month (BPL / High Subsidy Eligible)</option>
                <option value="10k_25k">₹10,000 – ₹25,000 / month (Low to Middle)</option>
                <option value="25k_50k">₹25,000 – ₹50,000 / month</option>
                <option value="50k_1l">₹50,000 – ₹1 Lakh / month</option>
                <option value="above_1l">Above ₹1 Lakh / month</option>
              </select>
              <span className="text-[11px] text-[#667085] mt-1 block">
                * Used solely to match relevant MSDE fee subsidies, stipends, and hostel schemes.
              </span>
            </div>
          </div>
        )}

        {/* STEP 2: Educational Background */}
        {step === 2 && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-base font-bold text-[#101214] pb-2 border-b border-[#D0D5DD]">
              Step 2: Educational Background & Vocational Interest
            </h3>

            <div>
              <label className="block text-xs font-bold text-[#123B63] mb-1">
                Highest Educational Standard Completed:
              </label>
              <select
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                className="w-full text-sm px-3.5 py-2.5 bg-[#F7F8FA] border-2 border-[#1D2630] rounded focus:bg-white focus:ring-2 focus:ring-[#0B73B9] cursor-pointer"
              >
                <option value="8th Standard">8th Standard Completed</option>
                <option value="10th Standard">10th Standard (SSLC / Matric)</option>
                <option value="12th Standard">12th Standard (HSC / Intermediate)</option>
                <option value="ITI Trainee">Currently in ITI</option>
                <option value="Graduate / Other">Graduate or Diploma Holder</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#123B63] mb-1">
                Initial Technical Interest:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  'Electrical & Wiring',
                  'Solar & Renewable Energy',
                  'Mechanical & Fitting',
                  'Automotive & EV',
                  'Healthcare & Nursing',
                  'Computer Hardware & IT',
                ].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      if (item.includes('Electrical')) setSelectedTradeId('electrician');
                      else if (item.includes('Solar')) setSelectedTradeId('solar-technician');
                      else if (item.includes('Automotive')) setSelectedTradeId('automotive-technician');
                      else if (item.includes('Healthcare')) setSelectedTradeId('healthcare-assistant');
                      else if (item.includes('Mechanical')) setSelectedTradeId('fitter');
                      else setSelectedTradeId('computer-hardware-tech');
                    }}
                    className="p-3 text-left text-xs font-semibold rounded border-2 border-[#1D2630] bg-[#F7F8FA] hover:bg-[#E8F4FD] transition-all cursor-pointer"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Primary Family Concerns */}
        {step === 3 && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-base font-bold text-[#101214] pb-1 border-b border-[#D0D5DD]">
              Step 3: What Are Your Family's Top Hesitations?
            </h3>
            <p className="text-xs text-[#667085]">
              Select the primary topics you want the AI counsellor to focus on and provide evidence for:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {Object.entries(INTENT_DEFINITIONS).map(([key, def]) => {
                const isSelected = selectedConcerns.includes(key as ConcernIntent);
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => toggleConcern(key as ConcernIntent)}
                    className={`p-3 rounded-lg border-2 text-left transition-all cursor-pointer flex items-start gap-2.5 ${
                      isSelected
                        ? 'bg-[#E8F4FD] border-[#0B73B9] shadow-[2px_2px_0px_#0B73B9]'
                        : 'bg-white border-[#1D2630] hover:bg-[#F7F8FA]'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded border mt-0.5 flex items-center justify-center flex-shrink-0 ${
                        isSelected
                          ? 'bg-[#0B73B9] text-white border-[#0B73B9]'
                          : 'border-[#1D2630] bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-[#101214]">
                        {def.label[currentLang] || def.label.en}
                      </h4>
                      <p className="text-[11px] text-[#667085] mt-0.5 leading-snug">
                        {def.description[currentLang] || def.description.en}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4: Language & Accessibility Preference */}
        {step === 4 && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-base font-bold text-[#101214] pb-2 border-b border-[#D0D5DD]">
              Step 4: Language & Reading Preference
            </h3>

            <div>
              <label className="block text-xs font-bold text-[#123B63] mb-2">
                Select Preferred Language for AI Dialogue & Explanations:
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { code: 'en' as SupportedLanguage, label: 'English', desc: 'Standard terms' },
                  { code: 'ta' as SupportedLanguage, label: 'தமிழ்', desc: 'Tamil dialogue' },
                  { code: 'hi' as SupportedLanguage, label: 'हिन्दी', desc: 'Hindi dialogue' },
                ].map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => setSelectedLanguage(l.code)}
                    className={`p-3.5 rounded-lg border-2 text-center transition-all cursor-pointer ${
                      selectedLanguage === l.code
                        ? 'bg-[#123B63] text-white border-[#1D2630] shadow-[3px_3px_0px_#1D2630]'
                        : 'bg-[#F7F8FA] text-[#101214] border-[#1D2630] hover:bg-white'
                    }`}
                  >
                    <span className="block font-bold text-sm">{l.label}</span>
                    <span className="block text-[11px] opacity-80 mt-0.5">{l.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Simple Mode Toggle Option */}
            <div className="p-4 bg-[#FFF9EE] border-2 border-[#1D2630] rounded-lg shadow-[2px_2px_0px_#1D2630] mt-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={enableSimpleMode}
                  onChange={(e) => setEnableSimpleMode(e.target.checked)}
                  className="w-5 h-5 mt-0.5 accent-[#18864B] rounded cursor-pointer"
                />
                <div>
                  <span className="font-bold text-sm text-[#101214] block">
                    Enable Simple Mode (Rural / Elder Friendly)
                  </span>
                  <span className="text-xs text-[#667085] leading-relaxed block mt-0.5">
                    Provides 20% larger text, high-contrast buttons, voice read-aloud prompts, and plain-language summaries suited for family elders.
                  </span>
                </div>
              </label>
            </div>
          </div>
        )}

        {/* 4. Navigation Buttons */}
        <div className="mt-8 pt-4 border-t border-[#D0D5DD] flex items-center justify-between">
          {step > 1 ? (
            <Button
              variant="outline"
              size="md"
              onClick={() => setStep(step - 1)}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Previous Step
            </Button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <Button
              variant="primary"
              size="md"
              onClick={() => setStep(step + 1)}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Next Step
            </Button>
          ) : (
            <Button
              variant="success"
              size="lg"
              onClick={handleComplete}
              disabled={isSaving}
              rightIcon={isSaving ? undefined : <CheckCircle className="w-5 h-5" />}
            >
              {isSaving ? 'Creating Secure Profile...' : 'Save Profile & Start Counselling'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
