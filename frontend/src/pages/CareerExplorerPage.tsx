// ============================================================
// Career Explorer Page
// ============================================================

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { SupportedLanguage } from '../types';
import { useCounselling } from '../context/CounsellingContext';
import { TradeCard } from '../components/career/TradeCard';
import { Search, Filter, Layers, Compass } from 'lucide-react';

export const CareerExplorerPage: React.FC = () => {
  const { trades, selectedTrade, setSelectedTradeId } = useCounselling();
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const currentLang = (i18n.language || 'en').slice(0, 2) as SupportedLanguage;

  const [searchQuery, setSearchQuery] = useState('');
  const [durationFilter, setDurationFilter] = useState('ALL');
  const [educationFilter, setEducationFilter] = useState('ALL');

  const filteredTrades = trades.filter((trade) => {
    const name = (trade.name[currentLang] || trade.name.en).toLowerCase();
    const overview = (trade.overview[currentLang] || trade.overview.en).toLowerCase();
    const query = searchQuery.toLowerCase().trim();

    const matchesSearch = !query || name.includes(query) || overview.includes(query);

    const matchesDuration =
      durationFilter === 'ALL' || trade.trainingDuration.includes(durationFilter);

    const matchesEducation =
      educationFilter === 'ALL' || trade.education.includes(educationFilter);

    return matchesSearch && matchesDuration && matchesEducation;
  });

  const handleSelectTrade = (tradeId: string) => {
    setSelectedTradeId(tradeId);
    navigate('/counselling');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white border-2 border-[#1D2630] rounded-lg p-5 shadow-[4px_4px_0px_#1D2630] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#0B73B9] uppercase">
            <Compass className="w-4 h-4" />
            <span>National Skills Qualifications (NSQF)</span>
          </div>
          <h1 className="text-2xl font-bold text-[#101214] mt-0.5">
            Vocational Career Explorer
          </h1>
          <p className="text-xs text-[#667085]">
            Browse 8 high-growth industrial trades, verified placement rates, and wage statistics.
          </p>
        </div>

        <div className="text-xs font-mono bg-[#EEF0F4] border border-[#1D2630] px-3 py-1.5 rounded self-start md:self-auto font-bold text-[#123B63]">
          Showing {filteredTrades.length} of {trades.length} Trades
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white border-2 border-[#1D2630] rounded-lg p-4 shadow-[3px_3px_0px_#1D2630] grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#667085] absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by trade name, skill..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-[#F7F8FA] border-2 border-[#1D2630] rounded focus:bg-white focus:ring-2 focus:ring-[#0B73B9]"
          />
        </div>

        {/* Duration Filter */}
        <select
          value={durationFilter}
          onChange={(e) => setDurationFilter(e.target.value)}
          className="text-xs px-3 py-2 bg-[#F7F8FA] border-2 border-[#1D2630] rounded focus:bg-white focus:ring-2 focus:ring-[#0B73B9] cursor-pointer"
        >
          <option value="ALL">All Course Durations</option>
          <option value="1 year">1 Year (Accelerated)</option>
          <option value="2 years">2 Years (Standard ITI)</option>
        </select>

        {/* Qualification Filter */}
        <select
          value={educationFilter}
          onChange={(e) => setEducationFilter(e.target.value)}
          className="text-xs px-3 py-2 bg-[#F7F8FA] border-2 border-[#1D2630] rounded focus:bg-white focus:ring-2 focus:ring-[#0B73B9] cursor-pointer"
        >
          <option value="ALL">All Educational Qualifications</option>
          <option value="8th">8th Standard Pass</option>
          <option value="10th">10th Standard (Matric)</option>
          <option value="12th">12th Standard</option>
        </select>
      </div>

      {/* Grid of Trades */}
      {filteredTrades.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-[#D0D5DD] p-12 text-center rounded-lg">
          <p className="text-sm font-bold text-[#101214]">No trades match your search</p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setDurationFilter('ALL');
              setEducationFilter('ALL');
            }}
            className="mt-3 text-xs text-[#0B73B9] font-bold underline cursor-pointer"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredTrades.map((trade) => (
            <TradeCard
              key={trade.id}
              trade={trade}
              language={currentLang}
              isSelected={selectedTrade.id === trade.id}
              onSelect={() => handleSelectTrade(trade.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
