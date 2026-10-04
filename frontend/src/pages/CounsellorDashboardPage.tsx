// ============================================================
// Counsellor Dashboard Page (Human Counsellor Escalation Queue)
// ============================================================

import React, { useState } from 'react';
import type { CounsellorRequest, CaseStatus } from '../types';
import { DataCard } from '../components/shared/DataCard';
import { Button } from '../components/shared/Button';
import { Badge } from '../components/shared/Badge';
import { ConcernDetectionBadge } from '../components/counselling/ConcernDetectionBadge';
import {
  UserCheck,
  Phone,
  Video,
  MapPin,
  Clock,
  Filter,
  CheckCircle,
  AlertCircle,
  FileText,
  Search,
} from 'lucide-react';
import { StaffAuthGuard } from '../components/layout/StaffAuthGuard';

export const CounsellorDashboardPage: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Demonstration seed cases in queue
  const [cases, setCases] = useState<CounsellorRequest[]>([
    {
      id: 'CC-2026-8491',
      familyName: "Arun's Family (Ramesh)",
      learnerName: 'Arun',
      language: 'ta',
      location: 'Coimbatore, Tamil Nadu',
      concern: 'JOB_SECURITY',
      selectedTrade: 'Electrician',
      preferredContactMode: 'phone',
      preferredTime: 'Evening (5 PM - 8 PM)',
      status: 'pending',
      createdAt: new Date(Date.now() - 3600000 * 2),
    },
    {
      id: 'CC-2026-7240',
      familyName: "Priya's Family (Lakshmi)",
      learnerName: 'Priya',
      language: 'ta',
      location: 'Chennai, Tamil Nadu',
      concern: 'SAFETY',
      selectedTrade: 'Solar Technician',
      preferredContactMode: 'video',
      preferredTime: 'Morning (9 AM - 12 PM)',
      status: 'in_progress',
      createdAt: new Date(Date.now() - 3600000 * 8),
    },
    {
      id: 'CC-2026-6188',
      familyName: "Rahul's Family (Sanjay)",
      learnerName: 'Rahul',
      language: 'hi',
      location: 'Indore, Madhya Pradesh',
      concern: 'SOCIAL_PERCEPTION',
      selectedTrade: 'Welder',
      preferredContactMode: 'in_person',
      preferredTime: 'Afternoon (1 PM - 4 PM)',
      status: 'assigned',
      createdAt: new Date(Date.now() - 3600000 * 24),
    },
    {
      id: 'CC-2026-5512',
      familyName: "Karthik's Family (Murugan)",
      learnerName: 'Karthik',
      language: 'ta',
      location: 'Salem, Tamil Nadu',
      concern: 'FURTHER_EDUCATION',
      selectedTrade: 'Fitter',
      preferredContactMode: 'phone',
      preferredTime: 'Evening (5 PM - 8 PM)',
      status: 'resolved',
      createdAt: new Date(Date.now() - 3600000 * 48),
    },
  ]);

  const [selectedCase, setSelectedCase] = useState<CounsellorRequest | null>(cases[0]);
  const [counsellorNote, setCounsellorNote] = useState('');
  const [isSavingNote, setIsSavingNote] = useState(false);

  const handleUpdateStatus = (id: string, newStatus: CaseStatus) => {
    setCases((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
    if (selectedCase && selectedCase.id === id) {
      setSelectedCase({ ...selectedCase, status: newStatus });
    }
  };

  const filteredCases = cases.filter((c) => {
    const matchesFilter = filterStatus === 'ALL' || c.status === filterStatus;
    const matchesSearch =
      !searchQuery ||
      c.learnerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.familyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <StaffAuthGuard portalName="District Counsellor">
      <div className="space-y-6">
        {/* Header */}
      <div className="bg-white border-2 border-[#1D2630] rounded-lg p-5 shadow-[4px_4px_0px_#1D2630] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#0B73B9] uppercase">
            <UserCheck className="w-4 h-4" />
            <span>District Skill Development Officer (DSDO) Portal</span>
          </div>
          <h1 className="text-2xl font-bold text-[#101214] mt-0.5">
            Counsellor Referral & Escalation Queue
          </h1>
          <p className="text-xs text-[#667085]">
            Review family concerns escalated from the AI system for direct human tele-counselling or ITI visits.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-[#E8F5EE] border border-[#18864B] px-3 py-1.5 rounded text-xs font-bold text-[#0F5C30]">
            {cases.filter((c) => c.status === 'pending').length} Open Escalations
          </div>
        </div>
      </div>

      {/* Main Grid: Cases List (Left) + Case Deep Dive (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Cases List */}
        <div className="lg:col-span-5 space-y-3">
          {/* Filter Bar */}
          <div className="bg-white p-3 border-2 border-[#1D2630] rounded-lg shadow-[2px_2px_0px_#1D2630] flex gap-2">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-[#667085] absolute left-2.5 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search family, learner, district..."
                className="w-full pl-8 pr-2 py-1.5 text-xs bg-[#F7F8FA] border border-[#1D2630] rounded"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="text-xs px-2 py-1.5 bg-[#F7F8FA] border border-[#1D2630] rounded font-semibold cursor-pointer"
            >
              <option value="ALL">All Status</option>
              <option value="pending">Pending</option>
              <option value="assigned">Assigned</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          {/* Cards */}
          <div className="space-y-2">
            {filteredCases.map((c) => {
              const isSelected = selectedCase?.id === c.id;

              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedCase(c)}
                  className={`p-3.5 bg-white border-2 rounded-lg cursor-pointer transition-all ${
                    isSelected
                      ? 'border-[#0B73B9] shadow-[3px_3px_0px_#0B73B9] bg-[#F0F7FF]'
                      : 'border-[#1D2630] shadow-[2px_2px_0px_rgba(0,0,0,0.08)] hover:bg-[#F7F8FA]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono text-[#667085] font-bold block">
                        {c.id}
                      </span>
                      <h4 className="text-sm font-bold text-[#101214]">
                        {c.familyName}
                      </h4>
                      <div className="text-xs text-[#667085] mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{c.location}</span>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
                        c.status === 'pending'
                          ? 'bg-[#FDF2F1] text-[#A0312A] border-[#F5C6C3]'
                          : c.status === 'assigned'
                          ? 'bg-[#FEF9EC] text-[#A07000] border-[#FDDCA0]'
                          : c.status === 'in_progress'
                          ? 'bg-[#E8F4FD] text-[#065390] border-[#BFE0F5]'
                          : 'bg-[#E8F5EE] text-[#0F5C30] border-[#B8E8CC]'
                      }`}
                    >
                      {c.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="mt-2 pt-2 border-t border-[#D0D5DD] flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#123B63]">
                      Trade: {c.selectedTrade}
                    </span>
                    <ConcernDetectionBadge intent={c.concern} size="sm" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Case Deep Dive */}
        <div className="lg:col-span-7">
          {selectedCase ? (
            <DataCard
              title={`Case File: ${selectedCase.id}`}
              badge={
                <span className="text-xs font-bold font-mono px-2 py-0.5 bg-[#EEF0F4] text-[#123B63] rounded border border-[#1D2630]">
                  {selectedCase.status.toUpperCase()}
                </span>
              }
              className="border-2"
              bodyClassName="p-5 space-y-4"
            >
              {/* Family Demographics */}
              <div className="bg-[#F7F8FA] p-4 rounded-lg border border-[#D0D5DD] grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[#667085] block text-[11px]">Family Contact:</span>
                  <span className="font-bold text-sm text-[#101214]">
                    {selectedCase.familyName}
                  </span>
                </div>
                <div>
                  <span className="text-[#667085] block text-[11px]">Learner Candidate:</span>
                  <span className="font-bold text-sm text-[#101214]">
                    {selectedCase.learnerName}
                  </span>
                </div>
                <div>
                  <span className="text-[#667085] block text-[11px]">Location District:</span>
                  <span className="font-semibold text-[#101214]">
                    {selectedCase.location}
                  </span>
                </div>
                <div>
                  <span className="text-[#667085] block text-[11px]">Preferred Language:</span>
                  <span className="font-semibold text-[#101214]">
                    {selectedCase.language === 'ta'
                      ? 'Tamil (தமிழ்)'
                      : selectedCase.language === 'hi'
                      ? 'Hindi (हिन्दी)'
                      : 'English'}
                  </span>
                </div>
              </div>

              {/* Discussion Focus */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#123B63] uppercase tracking-wide block">
                  Family Escalation Parameters:
                </span>
                <div className="p-3 bg-white border-2 border-[#1D2630] rounded-lg text-xs space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[#667085]">Trade Under Consideration:</span>
                    <span className="font-bold text-[#101214]">
                      {selectedCase.selectedTrade}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#667085]">Primary Area of Anxiety:</span>
                    <ConcernDetectionBadge intent={selectedCase.concern} />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#667085]">Preferred Contact Channel:</span>
                    <span className="font-bold text-[#101214] capitalize flex items-center gap-1">
                      {selectedCase.preferredContactMode === 'phone' ? (
                        <Phone className="w-3.5 h-3.5 text-[#0B73B9]" />
                      ) : (
                        <Video className="w-3.5 h-3.5 text-[#18864B]" />
                      )}
                      <span>{selectedCase.preferredContactMode}</span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#667085]">Requested Timing:</span>
                    <span className="font-bold text-[#101214]">
                      {selectedCase.preferredTime}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Update Actions */}
              <div className="space-y-2 pt-2 border-t border-[#D0D5DD]">
                <span className="text-xs font-bold text-[#123B63] uppercase tracking-wide block">
                  Update Case State:
                </span>
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant={selectedCase.status === 'in_progress' ? 'primary' : 'outline'}
                    onClick={() => handleUpdateStatus(selectedCase.id, 'in_progress')}
                  >
                    Mark In Progress
                  </Button>
                  <Button
                    size="sm"
                    variant={selectedCase.status === 'resolved' ? 'success' : 'outline'}
                    onClick={() => handleUpdateStatus(selectedCase.id, 'resolved')}
                  >
                    Mark Resolved (Counselled)
                  </Button>
                </div>
              </div>

              {/* Counsellor Notes */}
              <div className="space-y-2 pt-2 border-t border-[#D0D5DD]">
                <label className="text-xs font-bold text-[#123B63] uppercase tracking-wide block">
                  District Officer Notes & ITI Referral:
                </label>
                <textarea
                  rows={3}
                  value={counsellorNote}
                  onChange={(e) => setCounsellorNote(e.target.value)}
                  placeholder="Record summary of call, scholarship assistance provided, or referral to Govt ITI Coimbatore..."
                  className="w-full text-xs p-3 border-2 border-[#1D2630] rounded focus:ring-2 focus:ring-[#0B73B9]"
                />
                <Button
                  size="sm"
                  variant="secondary"
                  disabled={isSavingNote}
                  onClick={() => {
                    setIsSavingNote(true);
                    setTimeout(() => {
                      setIsSavingNote(false);
                      setCounsellorNote('');
                    }, 800);
                  }}
                >
                  {isSavingNote ? 'Saving...' : 'Save Case Notes'}
                </Button>
              </div>
            </DataCard>
          ) : (
            <div className="p-12 text-center bg-white border-2 border-dashed border-[#D0D5DD] rounded-lg">
              <p className="text-xs text-[#667085]">Select a case to inspect details</p>
            </div>
          )}
        </div>
      </div>
      </div>
    </StaffAuthGuard>
  );
};
