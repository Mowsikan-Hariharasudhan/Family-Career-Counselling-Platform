// ============================================================
// Type Definitions — Family Career Counselling
// ============================================================

import type { SupportedLanguage } from '../app/config';

// ─── Language Types ──────────────────────────────────────────
export type { SupportedLanguage };

export interface LocalizedString {
  en: string;
  ta: string;
  hi: string;
}

// ─── Intent / Concern Types ───────────────────────────────────
export type ConcernIntent =
  | 'JOB_SECURITY'
  | 'EARNINGS'
  | 'CAREER_GROWTH'
  | 'SOCIAL_PERCEPTION'
  | 'FURTHER_EDUCATION'
  | 'SAFETY'
  | 'TRAINING_DURATION'
  | 'PLACEMENT'
  | 'APPRENTICESHIP'
  | 'LOCATION'
  | 'CAREER_SWITCH'
  | 'SKILL_DEMAND'
  | 'GENERAL';

// ─── Trade / Career Types ─────────────────────────────────────
export interface CareerStage {
  stage: number;
  title: LocalizedString;
  role: string;
  skills: string[];
  timeframe: string;
  nextStep?: string;
}

export interface OutcomeEvidence {
  placement: number; // percentage
  averageSalary: number; // ₹/month
  salaryRange: { min: number; max: number };
  roles: string[];
  source: 'demonstration_dataset';
  dataLabel: string;
}

export interface Trade {
  id: string;
  slug: string;
  name: LocalizedString;
  overview: LocalizedString;
  education: string;
  trainingDuration: string;
  roles: string[];
  outcomes: OutcomeEvidence;
  careerPath: CareerStage[];
  apprenticeship: LocalizedString;
  furtherEducation: string[];
  locationRelevance: string[];
  familyConcernResponses: Partial<Record<ConcernIntent, LocalizedString>>;
  tags: string[];
}

// ─── User / Family Profile Types ─────────────────────────────
export type HouseholdIncome =
  | 'below_10k'
  | '10k_25k'
  | '25k_50k'
  | '50k_1l'
  | 'above_1l';

export type LearnerConcern = ConcernIntent;

export interface FamilyProfile {
  id?: string;
  learnerName: string;
  age: number;
  education: string;
  location: string;
  preferredLanguage: SupportedLanguage;
  interests: string[];
  householdIncome: HouseholdIncome;
  preferredLearningMode: 'in_person' | 'online' | 'hybrid';
  primaryConcerns: LearnerConcern[];
  selectedTradeId?: string;
  isDemo?: boolean;
}

// ─── Counselling Session Types ────────────────────────────────
export type MessageRole = 'user' | 'assistant' | 'system';
export type MessageSource = 'ai_gemini' | 'ai_fallback' | 'structured_data';
export type SentimentLevel = 'high_concern' | 'moderate' | 'low_concern';
export type ConfidenceLevel = 'low' | 'moderate' | 'high';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  language: SupportedLanguage;
  detectedIntent?: ConcernIntent;
  evidenceRef?: string; // trade id
  source?: MessageSource;
  timestamp: Date;
}

export interface CounsellingSession {
  id: string;
  familyProfile: FamilyProfile;
  language: SupportedLanguage;
  tradeId: string;
  messages: ChatMessage[];
  detectedConcerns: ConcernIntent[];
  sentimentBefore: SentimentLevel;
  sentimentAfter: SentimentLevel;
  decisionConfidence: ConfidenceLevel;
  escalated: boolean;
  simpleMode: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Counsellor Types ─────────────────────────────────────────
export type CaseStatus = 'pending' | 'assigned' | 'in_progress' | 'resolved';
export type ContactMode = 'phone' | 'video' | 'in_person';

export interface CounsellorRequest {
  id: string;
  familyName: string;
  learnerName: string;
  language: SupportedLanguage;
  location: string;
  concern: ConcernIntent;
  selectedTrade?: string;
  preferredContactMode: ContactMode;
  preferredTime: string;
  sessionId?: string;
  status: CaseStatus;
  createdAt: Date;
}

// ─── Admin / Analytics Types ──────────────────────────────────
export interface AnalyticsData {
  totalSessions: number;
  topConcerns: Array<{ intent: ConcernIntent; count: number }>;
  languageDistribution: Record<SupportedLanguage, number>;
  popularTrades: Array<{ tradeId: string; tradeName: string; count: number }>;
  escalationCount: number;
  sentimentImprovement: {
    improvedCount: number;
    noChangeCount: number;
    worsenedCount: number;
  };
  confidenceDistribution: Record<ConfidenceLevel, number>;
  locationDistribution: Array<{ location: string; count: number }>;
}

// ─── UI State Types ───────────────────────────────────────────
export interface UIState {
  simpleMode: boolean;
  voiceEnabled: boolean;
  theme: 'light' | 'dark';
  currentRole: 'learner' | 'parent' | 'counsellor' | 'admin';
}
