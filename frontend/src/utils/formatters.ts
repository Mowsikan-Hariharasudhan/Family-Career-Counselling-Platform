// ============================================================
// Formatting Helpers
// ============================================================

import type { SupportedLanguage } from '../types';

export function formatCurrency(
  amount: number,
  language: SupportedLanguage = 'en'
): string {
  const locale = language === 'ta' ? 'ta-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';
  return `₹${amount.toLocaleString(locale)}`;
}

export function formatPercentage(value: number): string {
  return `${value}%`;
}

export function formatDate(
  date: Date | string,
  language: SupportedLanguage = 'en'
): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const locale = language === 'ta' ? 'ta-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';
  return d.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatTime(
  date: Date | string,
  language: SupportedLanguage = 'en'
): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const locale = language === 'ta' ? 'ta-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';
  return d.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
  });
}
