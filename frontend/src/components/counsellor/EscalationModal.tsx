// ============================================================
// Counsellor Escalation Modal Component
// ============================================================

import React, { useState } from 'react';
import type { ContactMode, ConcernIntent, SupportedLanguage } from '../../types';
import { useCounselling } from '../../context/CounsellingContext';
import { Button } from '../shared/Button';
import { INTENT_DEFINITIONS } from '../../data/intents';
import { X, CheckCircle, PhoneCall, Calendar, MapPin } from 'lucide-react';

interface EscalationModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: SupportedLanguage;
}

export const EscalationModal: React.FC<EscalationModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const { profile, selectedTrade, setIsEscalated } = useCounselling();

  const [familyName, setFamilyName] = useState(
    profile.learnerName ? `${profile.learnerName}'s Family` : ''
  );
  const [phoneNumber, setPhoneNumber] = useState('98430 12345');
  const [concern, setConcern] = useState<ConcernIntent>(
    profile.primaryConcerns[0] || 'JOB_SECURITY'
  );
  const [contactMode, setContactMode] = useState<ContactMode>('phone');
  const [preferredTime, setPreferredTime] = useState('Evening (5 PM - 8 PM)');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEscalated(true);
    setSubmitted(true);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white border-2 border-[#1D2630] rounded-lg shadow-[6px_6px_0px_#1D2630] max-w-lg w-full overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="bg-[#123B63] text-white p-4 flex items-center justify-between border-b-2 border-[#1D2630]">
          <div>
            <h3 className="font-bold text-base text-white">
              Connect with Certified Human Counsellor
            </h3>
            <p className="text-xs text-sky-200">
              District Vocational Guidance Service · MSDE
            </p>
          </div>
          <button
            type="button"
            onClick={resetAndClose}
            className="text-white hover:text-sky-300 p-1 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          {submitted ? (
            <div className="text-center py-6 space-y-3">
              <CheckCircle className="w-12 h-12 text-[#18864B] mx-auto" />
              <h4 className="text-lg font-bold text-[#101214]">
                Escalation Request Registered!
              </h4>
              <p className="text-xs text-[#667085] max-w-sm mx-auto leading-relaxed">
                Your request has been routed to the District Skill Development Office in{' '}
                <strong className="text-[#101214]">{profile.location || 'Coimbatore'}</strong>. A certified counsellor will contact you via {contactMode} at {preferredTime}.
              </p>
              <div className="bg-[#F7F8FA] p-3 rounded border border-[#D0D5DD] text-xs font-mono max-w-xs mx-auto">
                Case Ticket: #CC-2026-{Math.floor(1000 + Math.random() * 9000)}
              </div>
              <div className="pt-2">
                <Button variant="primary" onClick={resetAndClose}>
                  Return to Counselling
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-[#667085] leading-relaxed">
                When digital guidance requires personalized human discussion, district counsellors assist families with admissions, fee waivers, and local employer networks.
              </p>

              <div>
                <label className="block text-xs font-bold text-[#101214] mb-1">
                  Family / Parent Name:
                </label>
                <input
                  type="text"
                  required
                  value={familyName}
                  onChange={(e) => setFamilyName(e.target.value)}
                  placeholder="e.g. Ramesh (Father of Arun)"
                  className="w-full text-xs px-3 py-2 border-2 border-[#1D2630] rounded focus:ring-2 focus:ring-[#0B73B9]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#101214] mb-1">
                    Contact Mobile Number:
                  </label>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="10-digit mobile"
                    className="w-full text-xs px-3 py-2 border-2 border-[#1D2630] rounded focus:ring-2 focus:ring-[#0B73B9]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#101214] mb-1">
                    Trade in Discussion:
                  </label>
                  <input
                    type="text"
                    disabled
                    value={selectedTrade.name[language] || selectedTrade.name.en}
                    className="w-full text-xs px-3 py-2 bg-[#F7F8FA] border-2 border-[#D0D5DD] rounded text-[#667085] font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#101214] mb-1">
                  Core Area of Family Concern:
                </label>
                <select
                  value={concern}
                  onChange={(e) => setConcern(e.target.value as ConcernIntent)}
                  className="w-full text-xs px-3 py-2 border-2 border-[#1D2630] rounded focus:ring-2 focus:ring-[#0B73B9] bg-white cursor-pointer"
                >
                  {Object.entries(INTENT_DEFINITIONS).map(([key, def]) => (
                    <option key={key} value={key}>
                      {def.label[language] || def.label.en}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#101214] mb-1">
                    Preferred Mode:
                  </label>
                  <select
                    value={contactMode}
                    onChange={(e) => setContactMode(e.target.value as ContactMode)}
                    className="w-full text-xs px-3 py-2 border-2 border-[#1D2630] rounded focus:ring-2 focus:ring-[#0B73B9] bg-white cursor-pointer"
                  >
                    <option value="phone">Phone Call</option>
                    <option value="video">Video Call (WhatsApp/Meet)</option>
                    <option value="in_person">In-Person at District ITI</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#101214] mb-1">
                    Preferred Time Slot:
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full text-xs px-3 py-2 border-2 border-[#1D2630] rounded focus:ring-2 focus:ring-[#0B73B9] bg-white cursor-pointer"
                  >
                    <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                    <option value="Afternoon (1 PM - 4 PM)">Afternoon (1 PM - 4 PM)</option>
                    <option value="Evening (5 PM - 8 PM)">Evening (5 PM - 8 PM)</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-[#D0D5DD] flex items-center justify-end gap-2">
                <Button variant="outline" size="sm" type="button" onClick={resetAndClose}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  Submit Escalation Request
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
