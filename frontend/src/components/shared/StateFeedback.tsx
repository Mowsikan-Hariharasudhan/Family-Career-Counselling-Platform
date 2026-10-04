// ============================================================
// State Feedback Components: Loading, Empty, Error
// ============================================================

import React from 'react';
import { AlertTriangle, FolderOpen, Loader2 } from 'lucide-react';
import { Button } from './Button';

export const LoadingState: React.FC<{ message?: string; className?: string }> = ({
  message = 'Loading vocational information...',
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 text-center text-[#667085] ${className}`}
      role="status"
      aria-live="polite"
    >
      <Loader2 className="w-8 h-8 text-[#0B73B9] animate-spin mb-3" />
      <p className="text-sm font-semibold text-[#123B63]">{message}</p>
      <span className="sr-only">Loading content</span>
    </div>
  );
};

export const EmptyState: React.FC<{
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}> = ({
  title = 'No information found',
  description = 'Try selecting another trade or refining your filters.',
  actionText,
  onAction,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 text-center bg-white border-2 border-dashed border-[#D0D5DD] rounded-lg ${className}`}
    >
      <FolderOpen className="w-10 h-10 text-[#667085] mb-3" />
      <h4 className="text-base font-bold text-[#101214] mb-1">{title}</h4>
      <p className="text-xs text-[#667085] max-w-sm mb-4">{description}</p>
      {actionText && onAction && (
        <Button variant="outline" size="sm" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};

export const ErrorState: React.FC<{
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}> = ({
  title = 'Something went wrong',
  message = 'Could not load data. Please check your network or try again.',
  onRetry,
  className = '',
}) => {
  return (
    <div
      className={`p-6 bg-[#FDF2F1] border-2 border-[#D95D50] rounded-lg text-center ${className}`}
      role="alert"
    >
      <AlertTriangle className="w-8 h-8 text-[#D95D50] mx-auto mb-2" />
      <h4 className="text-sm font-bold text-[#A0312A] mb-1">{title}</h4>
      <p className="text-xs text-[#667085] mb-4">{message}</p>
      {onRetry && (
        <Button variant="danger" size="sm" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
};
