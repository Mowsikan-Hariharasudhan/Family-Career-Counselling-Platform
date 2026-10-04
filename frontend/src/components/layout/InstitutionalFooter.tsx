// ============================================================
// Institutional Footer Component — MSDE & Government Standards
// ============================================================

import React from 'react';
import { APP_CONFIG } from '../../app/config';
import { AlertCircle, ExternalLink, ShieldCheck } from 'lucide-react';

export const InstitutionalFooter: React.FC = () => {
  return (
    <footer className="w-full bg-[#123B63] text-white border-t-2 border-[#1D2630] mt-auto">


      {/* 2. Main Footer Links & Directory */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Institutional Authority */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 bg-white rounded p-1 flex items-center justify-center border border-white/30">
                <img
                  src="/assets/logos/MSDE.png"
                  alt="MSDE Logo"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight text-white">
                  {APP_CONFIG.APP_MINISTRY_SHORT}
                </h4>
                <p className="text-[11px] text-sky-200 leading-tight">
                  Government of India
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Developing a skilled and empowered youth workforce through accessible vocational pathways, career guidance, and industry-aligned certifications.
            </p>
          </div>

          {/* Col 2: Official Portals */}
          <div>
            <h5 className="font-bold text-xs uppercase tracking-wider text-sky-300 mb-3 border-b border-white/10 pb-1">
              Government Portals
            </h5>
            <ul className="space-y-2 text-xs text-slate-200">
              <li>
                <a
                  href="https://www.msde.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1 hover:underline"
                >
                  <span>MSDE Official Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.skillindiadigital.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1 hover:underline"
                >
                  <span>Skill India Digital Hub</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.apprenticeshipindia.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1 hover:underline"
                >
                  <span>National Apprenticeship (NAPS)</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://dgt.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1 hover:underline"
                >
                  <span>Directorate General of Training</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Solution Capabilities */}
          <div>
            <h5 className="font-bold text-xs uppercase tracking-wider text-sky-300 mb-3 border-b border-white/10 pb-1">
              Platform Modules
            </h5>
            <ul className="space-y-2 text-xs text-slate-200">
              <li>Multi-turn Family Dialogue (Tamil / Hindi / English)</li>
              <li>Vocational Outcome Evidence Delineation</li>
              <li>Interactive 5-Stage Career Progression Visualizer</li>
              <li>Human Counsellor Escalation & Referral Queue</li>
              <li>Rural Simple Mode for Low-Literacy Elders</li>
            </ul>
          </div>

          {/* Col 4: Staff Portals */}
          <div>
            <h5 className="font-bold text-xs uppercase tracking-wider text-amber-300 mb-3 border-b border-white/10 pb-1">
              Internal Staff Access
            </h5>
            <ul className="space-y-2 text-xs text-slate-200">
              <li>
                <a
                  href="/counsellor"
                  className="hover:text-white flex items-center gap-2 hover:underline"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>District Counsellor Login</span>
                </a>
              </li>
              <li>
                <a
                  href="/admin"
                  className="hover:text-white flex items-center gap-2 hover:underline"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                  <span>Central Admin Analytics</span>
                </a>
              </li>
            </ul>
            <div className="mt-4 p-2 bg-[#0D2B4A] rounded border border-white/10 text-[10px] text-slate-400">
              Authorized MSDE personnel only. All access is logged and monitored.
            </div>
          </div>


        </div>

        {/* 3. Bottom Copyright & Accessibility Bar */}
        <div className="border-t border-white/10 mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <p>
            © 2026 Ministry of Skill Development and Entrepreneurship. Government of India.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Accessibility Compliant (WCAG 2.1 AA)</span>
            <span>•</span>
            <span>Multilingual Engine</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
