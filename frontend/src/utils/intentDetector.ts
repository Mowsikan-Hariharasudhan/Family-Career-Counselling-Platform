// ============================================================
// Intent & Language Detection Engine
// ============================================================

import type { ConcernIntent, SupportedLanguage } from '../types';
import { INTENT_KEYWORDS } from '../data/intents';

export function detectScriptLanguage(text: string): SupportedLanguage {
  if (!text || text.trim().length === 0) return 'en';

  // Tamil Unicode block: \u0B80 - \u0BFF
  const tamilRegex = /[\u0B80-\u0BFF]/g;
  // Devanagari (Hindi) Unicode block: \u0900 - \u097F
  const hindiRegex = /[\u0900-\u097F]/g;

  const tamilMatches = (text.match(tamilRegex) || []).length;
  const hindiMatches = (text.match(hindiRegex) || []).length;

  if (tamilMatches > 2 || tamilMatches > hindiMatches) {
    return 'ta';
  }
  if (hindiMatches > 2) {
    return 'hi';
  }
  return 'en';
}

export interface IntentMatchResult {
  intent: ConcernIntent;
  confidence: number; // 0 to 1
  matchedKeywords: string[];
}

export function detectIntent(
  text: string,
  preferredLanguage?: SupportedLanguage
): IntentMatchResult {
  const cleanText = text.toLowerCase().trim();
  const lang = preferredLanguage || detectScriptLanguage(text);

  let bestIntent: ConcernIntent = 'GENERAL';
  let bestScore = 0;
  let bestMatches: string[] = [];

  const intents = Object.keys(INTENT_KEYWORDS) as ConcernIntent[];

  for (const intent of intents) {
    const keywordsForLang = INTENT_KEYWORDS[intent][lang] || [];
    const englishKeywords = INTENT_KEYWORDS[intent]['en'] || [];
    const allKeywords = Array.from(new Set([...keywordsForLang, ...englishKeywords]));

    const matches: string[] = [];

    for (const kw of allKeywords) {
      if (cleanText.includes(kw.toLowerCase())) {
        matches.push(kw);
      }
    }

    if (matches.length > 0) {
      // Score based on keyword matches
      const score = Math.min(1.0, 0.4 + matches.length * 0.25);
      if (score > bestScore) {
        bestScore = score;
        bestIntent = intent;
        bestMatches = matches;
      }
    }
  }

  return {
    intent: bestIntent,
    confidence: bestScore > 0 ? bestScore : 0.2,
    matchedKeywords: bestMatches,
  };
}
