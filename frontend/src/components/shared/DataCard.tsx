// ============================================================
// DataCard Component — Corporate Neo-brutalist Style
// ============================================================

import React from 'react';

export interface DataCardProps {
  children: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  badge?: React.ReactNode;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  onClick?: () => void;
  interactive?: boolean;
}

export const DataCard: React.FC<DataCardProps> = ({
  children,
  title,
  subtitle,
  action,
  badge,
  className = '',
  headerClassName = '',
  bodyClassName = '',
  onClick,
  interactive = false,
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white border-2 border-[#1D2630] rounded-lg shadow-[3px_3px_0px_rgba(0,0,0,0.12)] transition-all ${
        interactive
          ? 'cursor-pointer hover:shadow-[5px_5px_0px_rgba(0,0,0,0.18)] hover:-translate-y-0.5 active:shadow-[1px_1px_0px_rgba(0,0,0,0.1)] active:translate-y-0.5'
          : ''
      } ${className}`}
    >
      {(title || subtitle || action || badge) && (
        <div
          className={`flex items-start justify-between p-4 border-b border-[#D0D5DD] gap-3 ${headerClassName}`}
        >
          <div>
            <div className="flex items-center gap-2">
              {title && (
                <h3 className="font-bold text-[#101214] text-base leading-tight">
                  {title}
                </h3>
              )}
              {badge}
            </div>
            {subtitle && (
              <p className="text-xs text-[#667085] mt-1 font-medium">{subtitle}</p>
            )}
          </div>
          {action && <div className="flex-shrink-0">{action}</div>}
        </div>
      )}
      <div className={`p-4 ${bodyClassName}`}>{children}</div>
    </div>
  );
};
