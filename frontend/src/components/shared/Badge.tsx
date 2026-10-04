// ============================================================
// UX4G Compliant Badge Component
// ============================================================

import React from 'react';

export interface BadgeProps {
  variant?: 'concern' | 'success' | 'warning' | 'info' | 'neutral' | 'accent';
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  children,
  icon,
  className = '',
  size = 'md',
}) => {
  const sizeClasses = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-xs px-2.5 py-1';

  const variantClasses = {
    concern: 'bg-[#FDF2F1] text-[#A0312A] border border-[#F5C6C3]',
    success: 'bg-[#E8F5EE] text-[#0F5C30] border border-[#B8E8CC]',
    warning: 'bg-[#FEF9EC] text-[#A07000] border border-[#FDDCA0]',
    info: 'bg-[#E8F4FD] text-[#065390] border border-[#BFE0F5]',
    accent: 'bg-[#FFF7E6] text-[#B37400] border border-[#FFE2A4]',
    neutral: 'bg-[#EEF0F4] text-[#475467] border border-[#D0D5DD]',
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1 font-semibold rounded-full select-none ${sizeClasses} ${variantClasses} ${className}`}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
