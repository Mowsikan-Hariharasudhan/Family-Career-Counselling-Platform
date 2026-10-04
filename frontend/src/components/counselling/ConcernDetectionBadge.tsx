// ============================================================
// Concern Detection Badge Component
// ============================================================

import React from 'react';
import type { ConcernIntent, SupportedLanguage } from '../../types';
import { INTENT_DEFINITIONS } from '../../data/intents';
import { Badge } from '../shared/Badge';

interface ConcernDetectionBadgeProps {
  intent: ConcernIntent;
  language?: SupportedLanguage;
  size?: 'sm' | 'md';
}

export const ConcernDetectionBadge: React.FC<ConcernDetectionBadgeProps> = ({
  intent,
  language = 'en',
  size = 'sm',
}) => {
  const meta = INTENT_DEFINITIONS[intent] || INTENT_DEFINITIONS.GENERAL;
  const label = meta.label[language] || meta.label.en;

  const variant =
    meta.category === 'financial'
      ? 'warning'
      : meta.category === 'career'
      ? 'info'
      : meta.category === 'social'
      ? 'concern'
      : meta.category === 'education'
      ? 'success'
      : 'neutral';

  return (
    <Badge variant={variant} size={size}>
      {label}
    </Badge>
  );
};
