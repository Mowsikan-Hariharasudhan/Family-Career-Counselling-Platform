// ============================================================
// Admin Dashboard & Analytics Page
// ============================================================

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { DataCard } from '../components/shared/DataCard';
import {
  BarChart3,
  TrendingUp,
  Users,
  ShieldAlert,
  ShieldCheck,
  Globe,
  Download,
} from 'lucide-react';
import { Button } from '../components/shared/Button';
import { StaffAuthGuard } from '../components/layout/StaffAuthGuard';

export const AdminDashboardPage: React.FC = () => {
  const [isExporting, setIsExporting] = React.useState(false);

  // Analytical demonstration datasets
  const concernData = [
    { concern: 'Job Security', count: 482, fill: '#0B73B9' },
    { concern: 'Earnings / Pay', count: 395, fill: '#123B63' },
    { concern: 'Social Dignity', count: 288, fill: '#D95D50' },
    { concern: 'Higher Education', count: 241, fill: '#18864B' },
    { concern: 'Safety', count: 184, fill: '#D99800' },
    { concern: 'Apprenticeship', count: 156, fill: '#D9A441' },
  ];

  const languageData = [
    { name: 'Tamil (தமிழ்)', value: 682, color: '#0B73B9' },
    { name: 'Hindi (हिन्दी)', value: 504, color: '#18864B' },
    { name: 'English', value: 296, color: '#123B63' },
  ];

  const sentimentShiftData = [
    { stage: 'High Concern', before: 78, after: 14 },
    { stage: 'Moderate', before: 18, after: 38 },
    { stage: 'Reassured / Convinced', before: 4, after: 48 },
  ];

  const recentSessions = [
    {
      id: 'SES-9821',
      learner: 'Arun (Coimbatore)',
      trade: 'Electrician',
      lang: 'Tamil',
      concern: 'JOB_SECURITY',
      result: 'Reassured (High Confidence)',
      escalated: false,
    },
    {
      id: 'SES-9820',
      learner: 'Sanjay (Salem)',
      trade: 'Solar Tech',
      lang: 'Tamil',
      concern: 'EARNINGS',
      result: 'Reassured (Moderate)',
      escalated: false,
    },
    {
      id: 'SES-9819',
      learner: 'Pooja (Indore)',
      trade: 'Healthcare Asst',
      lang: 'Hindi',
      concern: 'SAFETY',
      result: 'Escalated to Human Counsellor',
      escalated: true,
    },
    {
      id: 'SES-9818',
      learner: 'Vikram (Chennai)',
      trade: 'Welder',
      lang: 'Tamil',
      concern: 'SOCIAL_PERCEPTION',
      result: 'Reassured (High Confidence)',
      escalated: false,
    },
  ];

  return (
    <StaffAuthGuard portalName="Central Admin Analytics">
      <div className="space-y-6">
        {/* Header */}
      <div className="bg-white border-2 border-[#1D2630] rounded-lg p-5 shadow-[4px_4px_0px_#1D2630] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#0B73B9] uppercase">
            <BarChart3 className="w-4 h-4" />
            <span>Ministry of Skill Development & Entrepreneurship</span>
          </div>
          <h1 className="text-2xl font-bold text-[#101214] mt-0.5">
            Vocational Counselling Analytics & Impact Dashboard
          </h1>
          <p className="text-xs text-[#667085]">
            State-level aggregated family anxiety trends, sentiment evolution, and vernacular reach.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          disabled={isExporting}
          leftIcon={<Download className="w-4 h-4" />}
          onClick={() => {
            setIsExporting(true);
            setTimeout(() => setIsExporting(false), 1500);
          }}
        >
          {isExporting ? 'Generating CSV...' : 'Export CSV Summary'}
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border-2 border-[#1D2630] p-4 rounded-lg shadow-[3px_3px_0px_#1D2630]">
          <div className="flex items-center justify-between text-[#667085] text-xs font-bold mb-1">
            <span>Total Family Sessions</span>
            <Users className="w-4 h-4 text-[#0B73B9]" />
          </div>
          <div className="text-2xl font-extrabold text-[#101214]">1,482</div>
          <span className="text-[11px] text-[#18864B] font-semibold">
            +24% this month across Tamil Nadu & MP
          </span>
        </div>

        <div className="bg-white border-2 border-[#1D2630] p-4 rounded-lg shadow-[3px_3px_0px_#1D2630]">
          <div className="flex items-center justify-between text-[#667085] text-xs font-bold mb-1">
            <span>Top Detected Hesitation</span>
            <ShieldAlert className="w-4 h-4 text-[#D95D50]" />
          </div>
          <div className="text-2xl font-extrabold text-[#D95D50]">Job Security</div>
          <span className="text-[11px] text-[#667085]">
            42% of parents ask about job permanence
          </span>
        </div>

        <div className="bg-white border-2 border-[#1D2630] p-4 rounded-lg shadow-[3px_3px_0px_#1D2630]">
          <div className="flex items-center justify-between text-[#667085] text-xs font-bold mb-1">
            <span>Reassurance Shift</span>
            <TrendingUp className="w-4 h-4 text-[#18864B]" />
          </div>
          <div className="text-2xl font-extrabold text-[#18864B]">84.2%</div>
          <span className="text-[11px] text-[#667085]">
            Families transition to moderate/high confidence
          </span>
        </div>

        <div className="bg-white border-2 border-[#1D2630] p-4 rounded-lg shadow-[3px_3px_0px_#1D2630]">
          <div className="flex items-center justify-between text-[#667085] text-xs font-bold mb-1">
            <span>Vernacular Adoption</span>
            <Globe className="w-4 h-4 text-[#123B63]" />
          </div>
          <div className="text-2xl font-extrabold text-[#123B63]">80%</div>
          <span className="text-[11px] text-[#667085]">
            Tamil & Hindi dialogue interactions
          </span>
        </div>
      </div>

      {/* Recharts Analytics Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Concern Frequency Bar Chart */}
        <div className="lg:col-span-7 bg-white border-2 border-[#1D2630] p-5 rounded-lg shadow-[4px_4px_0px_#1D2630] space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-[#D0D5DD]">
            <div>
              <h3 className="font-bold text-sm text-[#101214]">
                Distribution of Family Concerns (Intent Analysis)
              </h3>
              <p className="text-xs text-[#667085]">
                Frequency of specific hesitations raised during multi-turn sessions
              </p>
            </div>
          </div>
          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={concernData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="concern" tick={{ fontSize: 11 }} interval={0} angle={-15} textAnchor="end" />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  formatter={(val: any) => [`${val} sessions`, 'Inquiries']}
                  contentStyle={{ backgroundColor: '#123B63', color: '#fff', borderRadius: '6px' }}
                />
                <Bar dataKey="count" fill="#0B73B9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Language Breakdown Pie Chart */}
        <div className="lg:col-span-5 bg-white border-2 border-[#1D2630] p-5 rounded-lg shadow-[4px_4px_0px_#1D2630] space-y-3">
          <div className="pb-2 border-b border-[#D0D5DD]">
            <h3 className="font-bold text-sm text-[#101214]">
              Language Preference Breakdown
            </h3>
            <p className="text-xs text-[#667085]">
              Session volume by conversational language
            </p>
          </div>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={languageData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }: any) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  labelLine={false}
                >
                  {languageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#123B63', color: '#fff', borderRadius: '6px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recharts Analytics Row 2: Sentiment Transformation */}
      <div className="bg-white border-2 border-[#1D2630] p-5 rounded-lg shadow-[4px_4px_0px_#1D2630] space-y-3">
        <div className="pb-2 border-b border-[#D0D5DD]">
          <h3 className="font-bold text-sm text-[#101214]">
            Pre vs. Post Counselling Sentiment Transformation (%)
          </h3>
          <p className="text-xs text-[#667085]">
            Comparing parental doubt at session start vs. reassurance after evidence disclosure
          </p>
        </div>
        <div className="h-56 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sentimentShiftData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="stage" tick={{ fontSize: 12, fontWeight: 'bold' }} />
              <YAxis unit="%" tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#123B63', color: '#fff', borderRadius: '6px' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="before" name="Initial Family Mindset (%)" fill="#D95D50" radius={[4, 4, 0, 0]} />
              <Bar dataKey="after" name="Post-Guidance Mindset (%)" fill="#18864B" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Session Logs Table */}
      <div className="bg-white border-2 border-[#1D2630] rounded-lg shadow-[4px_4px_0px_#1D2630] overflow-hidden">
        <div className="p-4 bg-[#123B63] text-white flex justify-between items-center">
          <h3 className="font-bold text-sm text-white">Live Session Telemetry Log</h3>
          <span className="text-xs text-sky-200 font-mono">Real-time Anonymized</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs divide-y divide-[#D0D5DD]">
            <thead className="bg-[#EEF0F4] font-bold text-[#123B63]">
              <tr>
                <th className="p-3">Session ID</th>
                <th className="p-3">Learner Context</th>
                <th className="p-3">Trade</th>
                <th className="p-3">Language</th>
                <th className="p-3">Primary Concern</th>
                <th className="p-3">Session Outcome</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D0D5DD]">
              {recentSessions.map((s) => (
                <tr key={s.id} className="hover:bg-[#F7F8FA]">
                  <td className="p-3 font-mono text-[#667085]">{s.id}</td>
                  <td className="p-3 font-bold text-[#101214]">{s.learner}</td>
                  <td className="p-3 font-semibold text-[#123B63]">{s.trade}</td>
                  <td className="p-3">{s.lang}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-[#EEF0F4] text-[#123B63] font-semibold border border-[#D0D5DD]">
                      {s.concern}
                    </span>
                  </td>
                  <td className="p-3">
                    <span
                      className={`font-semibold ${
                        s.escalated ? 'text-[#D99800]' : 'text-[#18864B]'
                      }`}
                    >
                      {s.result}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </StaffAuthGuard>
  );
};
