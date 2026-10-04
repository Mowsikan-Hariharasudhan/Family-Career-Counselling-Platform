// ============================================================
// Demo User — Arun (Coimbatore)
//
// Official MSDE dataset
// ============================================================

import type { FamilyProfile, CounsellingSession, ChatMessage } from '../types';

export const DEMO_FAMILY_PROFILE: FamilyProfile = {
  id: 'demo-arun-001',
  learnerName: 'Arun',
  age: 17,
  education: '12th Standard',
  location: 'Coimbatore',
  preferredLanguage: 'ta',
  interests: ['Electrical', 'Electronics', 'Renewable Energy'],
  householdIncome: '10k_25k',
  preferredLearningMode: 'in_person',
  primaryConcerns: ['JOB_SECURITY', 'EARNINGS', 'SOCIAL_PERCEPTION'],
  selectedTradeId: 'electrician',
  isDemo: true,
};

const now = new Date();

export const DEMO_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-001',
    role: 'system',
    content: 'Session started. Family profile loaded for Arun, Coimbatore. Language: Tamil (தமிழ்). Trade: Electrician.',
    language: 'ta',
    timestamp: new Date(now.getTime() - 600000),
  },
  {
    id: 'msg-002',
    role: 'user',
    content: 'இந்த தொழிலில் வேலை பாதுகாப்பு இருக்குமா என்று என் பெற்றோர் கவலைப்படுகிறார்கள்.',
    language: 'ta',
    detectedIntent: 'JOB_SECURITY',
    timestamp: new Date(now.getTime() - 540000),
  },
  {
    id: 'msg-003',
    role: 'assistant',
    content: 'உங்கள் பெற்றோரின் கவலை முற்றிலும் புரிகிறது. கிடைக்கக்கூடிய விளைவு தரவுகளின்படி, மின்சார தொழிலில் வேலை பாதுகாப்பு குறித்து இதை சொல்லலாம்: இந்தியாவின் மின்மயமாக்கல் திட்டங்கள், கட்டுமான வளர்ச்சி மற்றும் தொழிற்சாலை விரிவாக்கம் காரணமாக பயிற்சி பெற்ற மின்சாரவியலாளர்களுக்கு நிரந்தர தேவை உள்ளது. ITI சான்றிதழ் பெற்றவர்கள் பயிற்சி பெறாதவர்களை விட வேலை வாய்ப்பில் முன்னுரிமை பெறுகிறார்கள்.',
    language: 'ta',
    detectedIntent: 'JOB_SECURITY',
    evidenceRef: 'electrician',
    source: 'ai_fallback',
    timestamp: new Date(now.getTime() - 530000),
  },
];

export const DEMO_SESSION: Omit<CounsellingSession, 'id'> = {
  familyProfile: DEMO_FAMILY_PROFILE,
  language: 'ta',
  tradeId: 'electrician',
  messages: DEMO_MESSAGES,
  detectedConcerns: ['JOB_SECURITY', 'EARNINGS'],
  sentimentBefore: 'high_concern',
  sentimentAfter: 'moderate',
  decisionConfidence: 'moderate',
  escalated: false,
  simpleMode: false,
  createdAt: new Date(now.getTime() - 600000),
  updatedAt: now,
};
