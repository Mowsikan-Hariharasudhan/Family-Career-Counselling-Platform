// ============================================================
// Real Google Gemini AI Service — MSDE Grounded Conversational Engine
// ============================================================

import type {
  ChatMessage,
  ConcernIntent,
  FamilyProfile,
  SupportedLanguage,
  Trade,
} from '../types';
import { getFallbackResponse } from '../data/responseFallbacks';

const GEMINI_API_KEY =
  (import.meta.env.VITE_GEMINI_KEY as string) ||
  (import.meta.env.VITE_GEMINI_API_KEY as string) ||
  '';

export interface GeminiResponseResult {
  text: string;
  source: 'gemini_api' | 'ai_fallback';
}

export async function generateGeminiResponse(
  userPrompt: string,
  language: SupportedLanguage,
  trade: Trade,
  profile: FamilyProfile,
  intent: ConcernIntent,
  history: ChatMessage[] = []
): Promise<GeminiResponseResult> {
  const apiKey = GEMINI_API_KEY.trim();

  // If no API key configured, use intelligent outcome fallback
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    return {
      text: getFallbackResponse(intent, language, trade, userPrompt),
      source: 'ai_fallback',
    };
  }

  const langNames: Record<SupportedLanguage, string> = {
    en: 'English',
    ta: 'Tamil',
    hi: 'Hindi',
  };

  const tradeName = trade.name[language] || trade.name.en;
  const placementRate = trade.outcomes.placement;
  const avgSalary = trade.outcomes.averageSalary.toLocaleString('en-IN');
  const salaryMax = trade.outcomes.salaryRange.max.toLocaleString('en-IN');
  const salaryMin = trade.outcomes.salaryRange.min.toLocaleString('en-IN');

  const systemContext = `
You are an empathetic, highly knowledgeable AI Family Career Counsellor representing the Ministry of Skill Development and Entrepreneurship (MSDE), Government of India.
Your mission is to help families, parents, and youth overcome doubts regarding vocational ITI education (job stability, starting salary, societal dignity, female safety, and higher education).

CURRENT LEARNER & FAMILY PROFILE:
- Learner Name: ${profile.learnerName || 'Learner'}
- Age: ${profile.age} years old
- Location / District: ${profile.location || 'India'}
- Educational Background: ${profile.education || '10th Standard'}
- Household Income: ${profile.householdIncome}

CURRENT SELECTED VOCATIONAL TRADE:
- Trade Name: ${tradeName}
- Course Duration: ${trade.trainingDuration}
- Entry Qualification: ${trade.education}
- Official Verified Placement Rate: ${placementRate}%
- Average Starting Salary: ₹${avgSalary}/month (Range: ₹${salaryMin} - ₹${salaryMax}/month)
- Further Education Routes: ${trade.furtherEducation.join(', ')}
- NAPS Apprenticeship: ${trade.apprenticeship[language] || trade.apprenticeship.en}

STRICT RESPONSE GUIDELINES:
1. ALWAYS respond in ${langNames[language]} language (${language}).
2. Directly answer the user's specific typed or spoken query with warmth, empathy, and clarity.
3. Ground your explanation in the official MSDE statistics provided above (Placement rate, Salary, NAPS apprenticeship).
4. Keep the tone encouraging, reassuring parents and family elders while maintaining official MSDE credibility.
5. Limit length to 3-5 concise, impactful sentences (around 60-90 words). Do not use markdown headers or bullet points.
`;

  // Filter out system message from history before mapping to Gemini contents
  const conversationMessages = history.filter((m) => m.role === 'user' || m.role === 'assistant');
  const recentHistory = conversationMessages.slice(-6).map((m) => ({
    role: m.role === 'user' ? 'user' : 'model',
    parts: [{ text: m.content }],
  }));

  const contents = [
    ...recentHistory,
    {
      role: 'user',
      parts: [
        {
          text: `[System Instructions & Context: ${systemContext}]\n\nUser Family Query: "${userPrompt}"`,
        },
      ],
    },
  ];

  const isBearer = apiKey.startsWith('AQ.') || !apiKey.startsWith('AIzaSy');

  const requestTargets: Array<{ url: string; headers: Record<string, string> }> = isBearer
    ? [
        {
          url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
        },
        {
          url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
        },
        {
          url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          headers: { 'Content-Type': 'application/json' },
        },
      ]
    : [
        {
          url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          headers: { 'Content-Type': 'application/json' },
        },
        {
          url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
          headers: { 'Content-Type': 'application/json' },
        },
      ];

  for (const target of requestTargets) {
    try {
      const response = await fetch(target.url, {
        method: 'POST',
        headers: target.headers,
        body: JSON.stringify({
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 250,
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const candidateText =
          data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (candidateText && candidateText.trim().length > 0) {
          return {
            text: candidateText.trim(),
            source: 'gemini_api',
          };
        }
      } else {
        const errDetail = await response.text();
        console.warn(`Gemini API Endpoint (${target.url}) returned HTTP ${response.status}:`, errDetail);
      }
    } catch (err) {
      console.warn('Gemini API endpoint attempt failed:', err);
    }
  }

  // Fallback if API key format or quota endpoint is unavailable
  return {
    text: getFallbackResponse(intent, language, trade, userPrompt),
    source: 'ai_fallback',
  };
}
