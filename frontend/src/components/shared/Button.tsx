// ============================================================
// UX4G Compliant Button Component
// Supports UX4G classes: ux4g-btn ux4g-btn-primary, ux4g-btn-secondary, etc.
// Min 44x44px touch target compliance for accessibility
// ============================================================

import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'success' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-semibold transition-all duration-150 rounded cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B73B9]';

  const sizeClasses = {
    sm: 'text-xs px-3 py-2 min-h-[36px]',
    md: 'text-sm px-4 py-2.5 min-h-[44px]', // UX4G min 44px
    lg: 'text-base px-6 py-3.5 min-h-[50px]',
  }[size];

  const variantClasses = {
    primary:
      'bg-[#0B73B9] hover:bg-[#0A5F9A] active:bg-[#094E80] text-white border-2 border-[#1D2630] shadow-[2px_2px_0px_#1D2630] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]',
    secondary:
      'bg-[#123B63] hover:bg-[#0D2B4A] active:bg-[#081B2F] text-white border-2 border-[#1D2630] shadow-[2px_2px_0px_#1D2630] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]',
    outline:
      'bg-white hover:bg-[#F7F8FA] text-[#123B63] border-2 border-[#1D2630] shadow-[2px_2px_0px_#1D2630] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]',
    danger:
      'bg-[#D95D50] hover:bg-[#C0493D] text-white border-2 border-[#1D2630] shadow-[2px_2px_0px_#1D2630] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]',
    success:
      'bg-[#18864B] hover:bg-[#136E3D] text-white border-2 border-[#1D2630] shadow-[2px_2px_0px_#1D2630] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]',
    ghost:
      'bg-transparent hover:bg-[#E8F4FD] text-[#0B73B9] border-2 border-transparent min-h-[44px]',
  }[variant];

  return (
    <button
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg
            className="animate-spin h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Loading...</span>
        </span>
      ) : (
        <span className="flex items-center gap-2">
          {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
        </span>
      )}
    </button>
  );
};
