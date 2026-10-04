// ============================================================
// Trade Detail Page — Deep Dive & 5-Stage Career Pathway
// ============================================================

import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { SupportedLanguage } from '../types';
import { useCounselling } from '../context/CounsellingContext';
import { CareerPathwayViz } from '../components/career/CareerPathwayViz';
import { EvidenceTag } from '../components/shared/EvidenceTag';
import { Button } from '../components/shared/Button';
import { formatCurrency, formatPercentage } from '../utils/formatters';
import {
  Briefcase,
  TrendingUp,
  Clock,
  GraduationCap,
  Award,
  MapPin,
  ArrowLeft,
  MessageSquare,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';

export const TradeDetailPage: React.FC = () => {
  const { tradeId } = useParams<{ tradeId: string }>();
  const { trades, setSelectedTradeId } = useCounselling();
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const currentLang = (i18n.language || 'en').slice(0, 2) as SupportedLanguage;

  const trade = trades.find((t) => t.id === tradeId) || trades[0];
  const tradeName = trade.name[currentLang] || trade.name.en;
  const overview = trade.overview[currentLang] || trade.overview.en;

  const handleStartCounselling = () => {
    setSelectedTradeId(trade.id);
    navigate('/counselling');
  };

  return (
    <div className="space-y-6">
      {/* Back button & Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          to="/careers"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#123B63] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Trades</span>
        </Link>

        <div className="flex items-center gap-2">
          <EvidenceTag type="outcome_data" />
        </div>
      </div>

      {/* Main Trade Banner */}
      <div className="bg-white border-2 border-[#1D2630] rounded-xl p-6 md:p-8 shadow-[5px_5px_0px_#1D2630] flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-[#E8F4FD] text-[#065390] border border-[#0B73B9]">
              {trade.trainingDuration}
            </span>
            <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-[#E8F5EE] text-[#0F5C30] border border-[#18864B]">
              Min: {trade.education}
            </span>
          </div>

          <h1 className="text-3xl font-extrabold text-[#101214]">{tradeName}</h1>
          <p className="text-sm text-[#475467] leading-relaxed">{overview}</p>
        </div>

        <div className="flex flex-col gap-2 w-full md:w-auto flex-shrink-0">
          <Button
            variant="primary"
            size="lg"
            onClick={handleStartCounselling}
            leftIcon={<MessageSquare className="w-4 h-4" />}
          >
            Discuss with AI Counsellor
          </Button>
          <Link to="/compare" className="w-full">
            <Button variant="outline" size="md" className="w-full">
              Compare with Other Trades
            </Button>
          </Link>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border-2 border-[#1D2630] p-4 rounded-lg shadow-[3px_3px_0px_#1D2630]">
          <div className="flex items-center gap-2 text-xs font-bold text-[#667085] mb-1">
            <Briefcase className="w-4 h-4 text-[#18864B]" />
            <span>Placement Probability</span>
          </div>
          <div className="text-2xl font-extrabold text-[#18864B]">
            {formatPercentage(trade.outcomes.placement)}
          </div>
          <p className="text-[11px] text-[#667085] mt-1">
            Across state and central ITI placement drives
          </p>
        </div>

        <div className="bg-white border-2 border-[#1D2630] p-4 rounded-lg shadow-[3px_3px_0px_#1D2630]">
          <div className="flex items-center gap-2 text-xs font-bold text-[#667085] mb-1">
            <TrendingUp className="w-4 h-4 text-[#0B73B9]" />
            <span>Average Entry Wages</span>
          </div>
          <div className="text-2xl font-extrabold text-[#101214]">
            {formatCurrency(trade.outcomes.averageSalary, currentLang)}/mo
          </div>
          <p className="text-[11px] text-[#667085] mt-1">
            Range: {formatCurrency(trade.outcomes.salaryRange.min, currentLang)} –{' '}
            {formatCurrency(trade.outcomes.salaryRange.max, currentLang)}
          </p>
        </div>

        <div className="bg-white border-2 border-[#1D2630] p-4 rounded-lg shadow-[3px_3px_0px_#1D2630]">
          <div className="flex items-center gap-2 text-xs font-bold text-[#667085] mb-1">
            <ShieldCheck className="w-4 h-4 text-[#D9A441]" />
            <span>NSQF Certification</span>
          </div>
          <div className="text-2xl font-extrabold text-[#101214]">Level 4 / 5</div>
          <p className="text-[11px] text-[#667085] mt-1">
            Nationally and internationally recognized
          </p>
        </div>
      </div>

      {/* 5-Stage Career Pathway Visualizer */}
      <CareerPathwayViz
        stages={trade.careerPath}
        language={currentLang}
        tradeName={tradeName}
      />

      {/* Apprenticeship & Higher Education 2-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Apprenticeship (NAPS) Card */}
        <div className="bg-white border-2 border-[#1D2630] rounded-lg p-5 shadow-[3px_3px_0px_#1D2630] space-y-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#D9A441]" />
            <h3 className="font-bold text-base text-[#101214]">
              Apprenticeship & Government Stipend (NAPS)
            </h3>
          </div>
          <p className="text-xs text-[#475467] leading-relaxed">
            {trade.apprenticeship[currentLang] || trade.apprenticeship.en}
          </p>
          <div className="bg-[#FFF7E6] p-3 rounded border border-[#D9A441] text-xs space-y-1">
            <span className="font-bold text-[#A06000] block">Stipend Guarantee:</span>
            <span className="text-[#101214]">
              Apprentices receive regular monthly stipends funded partly by the Government of India through the National Apprenticeship Promotion Scheme.
            </span>
          </div>
        </div>

        {/* Higher Education Pathways Card */}
        <div className="bg-white border-2 border-[#1D2630] rounded-lg p-5 shadow-[3px_3px_0px_#1D2630] space-y-3">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-[#0B73B9]" />
            <h3 className="font-bold text-base text-[#101214]">
              Academic & Higher Studies Mobility
            </h3>
          </div>
          <p className="text-xs text-[#475467] leading-relaxed">
            Vocational training enables lateral progression into professional degrees without repeating secondary school:
          </p>
          <ul className="space-y-2">
            {trade.furtherEducation.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-xs font-semibold text-[#101214] bg-[#F7F8FA] p-2 rounded border border-[#D0D5DD]"
              >
                <CheckCircle className="w-4 h-4 text-[#18864B] flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Regional Industry Demand Card */}
      <div className="bg-white border-2 border-[#1D2630] rounded-lg p-5 shadow-[3px_3px_0px_#1D2630] space-y-3">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-[#18864B]" />
          <h3 className="font-bold text-base text-[#101214]">
            Regional Demand Clusters & Employer Hubs
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 pt-1">
          {trade.locationRelevance.map((loc, i) => (
            <div
              key={i}
              className="bg-[#F7F8FA] p-2.5 rounded border border-[#D0D5DD] text-xs font-semibold text-[#123B63]"
            >
              {loc}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
