// ============================================================
// Landing Page — Institutional MSDE & Neo-brutalist Style
// ============================================================

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { APP_CONFIG } from '../app/config';
import { useCounselling } from '../context/CounsellingContext';
import { Button } from '../components/shared/Button';
import { DataCard } from '../components/shared/DataCard';
import { EvidenceTag } from '../components/shared/EvidenceTag';
import { formatCurrency, formatPercentage } from '../utils/formatters';
import {
  MessageSquare,
  Compass,
  Scale,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Award,
  Users,
  CheckCircle,
  ArrowRight,
  Database,
  Building,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { trades, loadDemoProfile } = useCounselling();
  const currentLang = (i18n.language || 'en').slice(0, 2) as 'en' | 'ta' | 'hi';

  const handleLaunchDemo = () => {
    loadDemoProfile();
    navigate('/counselling');
  };

  return (
    <div className="space-y-12">
      {/* 1. Hero Institutional Section */}
      <section className="bg-white border-2 border-[#1D2630] rounded-xl p-6 md:p-10 shadow-[6px_6px_0px_#1D2630] relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          {/* Institutional Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E8F4FD] text-[#065390] border-2 border-[#0B73B9] rounded-md text-xs font-bold shadow-[2px_2px_0px_#0B73B9]">
            <Building className="w-3.5 h-3.5" />
            <span>Ministry of Skill Development and Entrepreneurship · </span>
          </div>

          {/* Main Title (Functional title per instructions) */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#101214] tracking-tight leading-tight">
            Family Career Counselling
          </h1>

          <p className="text-base sm:text-lg text-[#123B63] font-medium leading-relaxed">
            AI-assisted family decision support for vocational education. We bridge the confidence gap between learners and parents with authentic outcome data, multi-lingual dialogue, and structured 5-stage career roadmaps.
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link to="/onboarding">
              <Button
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                Start Family Counselling
              </Button>
            </Link>

            <Link to="/careers">
              <Button variant="outline" size="lg">
                Explore 8 Trades
              </Button>
            </Link>
          </div>

          {/* Key Facts Pill Bar */}
          <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-bold text-[#667085]">
            <div className="flex items-center gap-1.5 text-[#18864B]">
              <CheckCircle className="w-4 h-4" />
              <span>Verified Outcome Ground Truth</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#0B73B9]">
              <CheckCircle className="w-4 h-4" />
              <span>Tamil · Hindi · English Voice</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#123B63]">
              <CheckCircle className="w-4 h-4" />
              <span>Human Counsellor Escalation</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. The Problem We Solve ( Alignment) */}
      <section className="space-y-4">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0B73B9]">
            Vocational Assessment Solution Framework
          </span>
          <h2 className="text-2xl font-bold text-[#101214]">
            Why Traditional Vocational Counselling Falls Short
          </h2>
          <p className="text-xs text-[#667085]">
            Students often desire hands-on technical trades, but family doubts around job security, salary, and social prestige lead to hesitation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <DataCard
            title="Family Context"
            subtitle="Pillar 1"
            className="border-2"
            bodyClassName="p-4 text-xs space-y-2"
          >
            <Users className="w-6 h-6 text-[#0B73B9] mb-1" />
            <p className="text-[#667085] leading-relaxed">
              Considers parental income, rural location, academic background, and joint decision-making rather than isolated student tests.
            </p>
          </DataCard>

          <DataCard
            title="Outcome Ground Truth"
            subtitle="Pillar 2"
            className="border-2"
            bodyClassName="p-4 text-xs space-y-2"
          >
            <Database className="w-6 h-6 text-[#18864B] mb-1" />
            <p className="text-[#667085] leading-relaxed">
              Delineates hard statistical evidence (placement rates, starting salaries, top hiring firms) from generated conversational advice.
            </p>
          </DataCard>

          <DataCard
            title="Structured Pathways"
            subtitle="Pillar 3"
            className="border-2"
            bodyClassName="p-4 text-xs space-y-2"
          >
            <TrendingUp className="w-6 h-6 text-[#D9A441] mb-1" />
            <p className="text-[#667085] leading-relaxed">
              Visualizes 5-stage career roadmaps from ITI trainee to supervisor and entrepreneur, dispelling "dead-end" myths.
            </p>
          </DataCard>

          <DataCard
            title="Certified Human Touch"
            subtitle="Pillar 4"
            className="border-2"
            bodyClassName="p-4 text-xs space-y-2"
          >
            <ShieldCheck className="w-6 h-6 text-[#123B63] mb-1" />
            <p className="text-[#667085] leading-relaxed">
              Enables 1-click escalation to certified district counsellors for personalized guidance, scholarships, and fee waivers.
            </p>
          </DataCard>
        </div>
      </section>

      {/* 3. Featured Vocational Trades Showcase */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold text-[#101214]">
              Featured High-Demand Vocational Trades
            </h2>
            <p className="text-xs text-[#667085]">
              Real data from accredited ITI programs under DGT / MSDE guidelines.
            </p>
          </div>
          <Link
            to="/careers"
            className="text-xs font-bold text-[#0B73B9] hover:underline flex items-center gap-1"
          >
            <span>View All 8 Trades</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trades.slice(0, 4).map((trade) => {
            const name = trade.name[currentLang] || trade.name.en;
            return (
              <div
                key={trade.id}
                className="bg-white border-2 border-[#1D2630] rounded-lg p-4 shadow-[3px_3px_0px_#1D2630] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 text-[11px] mb-2 font-bold">
                    <span className="text-[#0B73B9] bg-[#E8F4FD] px-2 py-0.5 rounded border border-[#BFE0F5]">
                      {trade.trainingDuration}
                    </span>
                    <span className="text-[#18864B]">
                      {formatPercentage(trade.outcomes.placement)} Placement
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-[#101214]">{name}</h3>
                  <p className="text-xs text-[#667085] line-clamp-2 mt-1">
                    {trade.overview[currentLang] || trade.overview.en}
                  </p>
                  <div className="mt-3 bg-[#F7F8FA] p-2 rounded border border-[#D0D5DD] text-xs">
                    <span className="text-[11px] text-[#667085] block">Starting Salary</span>
                    <span className="font-bold text-[#101214]">
                      {formatCurrency(trade.outcomes.averageSalary, currentLang)}/month
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#D0D5DD] flex items-center gap-2">
                  <Link
                    to={`/careers/${trade.id}`}
                    className="flex-1 text-center py-2 text-xs font-bold text-[#123B63] bg-[#EEF0F4] hover:bg-white border border-[#1D2630] rounded"
                  >
                    View Details
                  </Link>
                  <Link
                    to="/counselling"
                    className="py-2 px-3 text-xs font-bold text-white bg-[#0B73B9] hover:bg-[#0A5F9A] border border-[#1D2630] rounded"
                  >
                    Discuss
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Multi-language & Rural Accessibility Spotlight */}
      <section className="bg-[#123B63] text-white border-2 border-[#1D2630] rounded-xl p-6 md:p-8 shadow-[5px_5px_0px_#1D2630]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-mono font-bold uppercase text-amber-300">
              Inclusivity & Vernacular Access
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
              Designed for Tamil, Hindi & Rural Families
            </h2>
            <p className="text-sm text-slate-200 leading-relaxed">
              Language should never be a barrier to family empowerment. Our natural language intent engine detects queries in native Tamil, Hindi, and English scripts, with built-in voice read-aloud capabilities for elders who prefer listening over reading.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <Link to="/simple">
                <Button variant="outline" size="md" className="bg-white text-[#123B63]">
                  Try Simple Mode
                </Button>
              </Link>
            </div>
          </div>

          <div className="bg-[#0D2B4A] border-2 border-white/20 rounded-lg p-5 space-y-3 font-mono text-xs">
            <div className="text-sky-300 font-bold border-b border-white/10 pb-2">
              Sample Vernacular Detection:
            </div>
            <div className="bg-black/30 p-2.5 rounded border border-white/10">
              <span className="text-amber-300">Input:</span> "இந்த தொழிலில் வேலை பாதுகாப்பு இருக்குமா?"
              <br />
              <span className="text-emerald-400">Intent:</span> JOB_SECURITY (Tamil Script)
            </div>
            <div className="bg-black/30 p-2.5 rounded border border-white/10">
              <span className="text-amber-300">Input:</span> "शुरुआती वेतन कितना मिलेगा?"
              <br />
              <span className="text-emerald-400">Intent:</span> EARNINGS (Devanagari Script)
            </div>
            <div className="text-[11px] text-slate-400 pt-1">
              ✓ Grounded on structured outcome database without hallucination
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
