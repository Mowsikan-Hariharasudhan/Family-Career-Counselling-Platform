// ============================================================
// Trade Comparison Table Component
// ============================================================

import React, { useState } from 'react';
import type { Trade, SupportedLanguage } from '../../types';
import { formatCurrency, formatPercentage } from '../../utils/formatters';
import { Button } from '../shared/Button';
import { Briefcase, TrendingUp, Clock, GraduationCap, X, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TradeComparisonTableProps {
  allTrades: Trade[];
  language: SupportedLanguage;
}

export const TradeComparisonTable: React.FC<TradeComparisonTableProps> = ({
  allTrades,
  language,
}) => {
  // Default selected: Electrician, Solar Technician, Welder
  const [selectedTradeIds, setSelectedTradeIds] = useState<string[]>([
    'electrician',
    'solar-technician',
    'welder',
  ]);

  const selectedTrades = selectedTradeIds
    .map((id) => allTrades.find((t) => t.id === id))
    .filter(Boolean) as Trade[];

  const handleRemove = (id: string) => {
    if (selectedTradeIds.length > 1) {
      setSelectedTradeIds(selectedTradeIds.filter((tId) => tId !== id));
    }
  };

  const handleAdd = (id: string) => {
    if (!selectedTradeIds.includes(id) && selectedTradeIds.length < 4) {
      setSelectedTradeIds([...selectedTradeIds, id]);
    }
  };

  const availableToAdd = allTrades.filter(
    (t) => !selectedTradeIds.includes(t.id)
  );

  return (
    <div className="space-y-4">
      {/* Selector Pills */}
      <div className="bg-white p-4 border-2 border-[#1D2630] rounded-lg shadow-[3px_3px_0px_#1D2630] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#123B63] uppercase tracking-wide">
            Add Trade to Compare:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {availableToAdd.map((trade) => (
              <button
                key={trade.id}
                type="button"
                onClick={() => handleAdd(trade.id)}
                disabled={selectedTradeIds.length >= 4}
                className="inline-flex items-center gap-1 text-xs px-2.5 py-1 bg-[#EEF0F4] hover:bg-[#E8F4FD] text-[#123B63] border border-[#1D2630] rounded font-semibold transition-all cursor-pointer disabled:opacity-40"
              >
                <Plus className="w-3 h-3" />
                <span>{trade.name[language] || trade.name.en}</span>
              </button>
            ))}
          </div>
        </div>

        <span className="text-xs text-[#667085] font-mono">
          Comparing {selectedTrades.length} of 4 max
        </span>
      </div>

      {/* Comparison Grid / Table */}
      <div className="overflow-x-auto bg-white border-2 border-[#1D2630] rounded-lg shadow-[4px_4px_0px_#1D2630]">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-[#123B63] text-white text-xs">
              <th className="p-4 w-1/4 border-r border-white/20 font-bold uppercase tracking-wider">
                Evaluation Metric
              </th>
              {selectedTrades.map((t) => (
                <th
                  key={t.id}
                  className="p-4 w-1/4 border-r border-white/20 last:border-r-0 relative"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-sm text-white">
                        {t.name[language] || t.name.en}
                      </h4>
                      <span className="text-[11px] text-sky-200">
                        {t.trainingDuration}
                      </span>
                    </div>
                    {selectedTrades.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemove(t.id)}
                        className="text-white/60 hover:text-white p-0.5"
                        title="Remove from comparison"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-xs divide-y divide-[#D0D5DD]">
            {/* Placement Rate */}
            <tr className="hover:bg-[#F7F8FA]">
              <td className="p-4 font-bold text-[#101214] bg-[#F7F8FA] border-r border-[#D0D5DD]">
                <div className="flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-[#18864B]" />
                  <span>Demonstrated Placement Rate</span>
                </div>
              </td>
              {selectedTrades.map((t) => (
                <td key={t.id} className="p-4 border-r border-[#D0D5DD] last:border-r-0">
                  <div className="font-extrabold text-base text-[#18864B]">
                    {formatPercentage(t.outcomes.placement)}
                  </div>
                  <div className="w-full bg-[#EEF0F4] h-2 rounded-full overflow-hidden mt-1 border border-[#D0D5DD]">
                    <div
                      className="bg-[#18864B] h-full rounded-full"
                      style={{ width: `${t.outcomes.placement}%` }}
                    />
                  </div>
                </td>
              ))}
            </tr>

            {/* Average Monthly Salary */}
            <tr className="hover:bg-[#F7F8FA]">
              <td className="p-4 font-bold text-[#101214] bg-[#F7F8FA] border-r border-[#D0D5DD]">
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-[#0B73B9]" />
                  <span>Average Starting Salary</span>
                </div>
              </td>
              {selectedTrades.map((t) => (
                <td key={t.id} className="p-4 border-r border-[#D0D5DD] last:border-r-0">
                  <div className="font-bold text-sm text-[#101214]">
                    {formatCurrency(t.outcomes.averageSalary, language)} / month
                  </div>
                  <div className="text-[11px] text-[#667085] mt-0.5">
                    Range: {formatCurrency(t.outcomes.salaryRange.min, language)} –{' '}
                    {formatCurrency(t.outcomes.salaryRange.max, language)}
                  </div>
                </td>
              ))}
            </tr>

            {/* Training Duration & Mode */}
            <tr className="hover:bg-[#F7F8FA]">
              <td className="p-4 font-bold text-[#101214] bg-[#F7F8FA] border-r border-[#D0D5DD]">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#D99800]" />
                  <span>Course Duration & Eligibility</span>
                </div>
              </td>
              {selectedTrades.map((t) => (
                <td key={t.id} className="p-4 border-r border-[#D0D5DD] last:border-r-0">
                  <span className="font-semibold text-[#101214] block">
                    {t.trainingDuration}
                  </span>
                  <span className="text-[11px] text-[#667085]">
                    Requires: {t.education}
                  </span>
                </td>
              ))}
            </tr>

            {/* Higher Education Route */}
            <tr className="hover:bg-[#F7F8FA]">
              <td className="p-4 font-bold text-[#101214] bg-[#F7F8FA] border-r border-[#D0D5DD]">
                <div className="flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-[#123B63]" />
                  <span>Higher Education Pathways</span>
                </div>
              </td>
              {selectedTrades.map((t) => (
                <td key={t.id} className="p-4 border-r border-[#D0D5DD] last:border-r-0">
                  <ul className="list-disc list-inside space-y-1 text-[11px] text-[#101214]">
                    {t.furtherEducation.slice(0, 2).map((fe, i) => (
                      <li key={i}>{fe}</li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>

            {/* Apprenticeship Model */}
            <tr className="hover:bg-[#F7F8FA]">
              <td className="p-4 font-bold text-[#101214] bg-[#F7F8FA] border-r border-[#D0D5DD]">
                <span>NAPS Apprenticeship Model</span>
              </td>
              {selectedTrades.map((t) => (
                <td key={t.id} className="p-4 border-r border-[#D0D5DD] last:border-r-0 text-[11px] text-[#475467] leading-relaxed">
                  {t.apprenticeship[language] || t.apprenticeship.en}
                </td>
              ))}
            </tr>

            {/* Action Row */}
            <tr className="bg-[#F7F8FA]">
              <td className="p-4 font-bold text-[#101214] border-r border-[#D0D5DD]">
                Detailed Investigation
              </td>
              {selectedTrades.map((t) => (
                <td key={t.id} className="p-4 border-r border-[#D0D5DD] last:border-r-0">
                  <Link
                    to={`/careers/${t.id}`}
                    className="inline-block text-center w-full py-2 px-3 text-xs font-bold text-white bg-[#0B73B9] hover:bg-[#0A5F9A] border-2 border-[#1D2630] rounded shadow-[2px_2px_0px_#1D2630] transition-all cursor-pointer"
                  >
                    View Career Path
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
