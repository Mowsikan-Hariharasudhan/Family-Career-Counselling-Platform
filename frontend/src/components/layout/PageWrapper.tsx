// ============================================================
// PageWrapper Component — Layout Shell
// ============================================================

import React from 'react';
import { InstitutionalHeader } from './InstitutionalHeader';
import { Navigation } from './Navigation';
import { InstitutionalFooter } from './InstitutionalFooter';

interface PageWrapperProps {
  children: React.ReactNode;
  isSimpleMode?: boolean;
  onToggleSimpleMode?: () => void;
  breadcrumbs?: Array<{ label: string; href?: string }>;
}

export const PageWrapper: React.FC<PageWrapperProps> = ({
  children,
  isSimpleMode = false,
  onToggleSimpleMode,
  breadcrumbs,
}) => {
  return (
    <div
      className={`w-full min-h-screen flex flex-col bg-[#F7F8FA] text-[#101214] ${
        isSimpleMode ? 'simple-mode' : ''
      }`}
    >
      {/* Institutional Top Header */}
      <InstitutionalHeader
        isSimpleMode={isSimpleMode}
        onToggleSimpleMode={onToggleSimpleMode}
      />

      {/* Main Navigation */}
      <Navigation />

      {/* Optional Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <div className="bg-white border-b border-[#D0D5DD] px-4 py-2">
          <div className="max-w-7xl mx-auto flex items-center gap-1.5 text-xs text-[#667085]">
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span>/</span>}
                {crumb.href ? (
                  <a
                    href={crumb.href}
                    className="hover:text-[#0B73B9] hover:underline font-medium"
                  >
                    {crumb.label}
                  </a>
                ) : (
                  <span className="text-[#101214] font-semibold">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Main Dynamic Viewport */}
      <main id="main-content" className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6">
        {children}
      </main>

      {/* Institutional Footer */}
      <InstitutionalFooter />
    </div>
  );
};
