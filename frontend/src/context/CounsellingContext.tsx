// ============================================================
// Counselling State Context
// ============================================================

import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  FamilyProfile,
  CounsellingSession,
  ChatMessage,
  ConcernIntent,
  SupportedLanguage,
  Trade,
  ConfidenceLevel,
  SentimentLevel,
} from '../types';
import { DEMO_FAMILY_PROFILE, DEMO_SESSION } from '../data/demoUser';
import { TRADES } from '../data/trades';
import { detectIntent, detectScriptLanguage } from '../utils/intentDetector';
import { getFallbackResponse } from '../data/responseFallbacks';
import { useTranslation } from 'react-i18next';

interface CounsellingContextType {
  profile: FamilyProfile;
  setProfile: (profile: FamilyProfile) => void;
  updateProfile: (partial: Partial<FamilyProfile>) => void;
  session: CounsellingSession;
  trades: Trade[];
  selectedTrade: Trade;
  setSelectedTradeId: (tradeId: string) => void;
  messages: ChatMessage[];
  sendMessage: (text: string) => Promise<void>;
  detectedConcerns: ConcernIntent[];
  addConcern: (concern: ConcernIntent) => void;
  decisionConfidence: ConfidenceLevel;
  setDecisionConfidence: (conf: ConfidenceLevel) => void;
  sentimentBefore: SentimentLevel;
  sentimentAfter: SentimentLevel;
  setSentimentAfter: (sent: SentimentLevel) => void;
  isEscalated: boolean;
  setIsEscalated: (escalated: boolean) => void;
  isSimpleMode: boolean;
  setIsSimpleMode: (simple: boolean) => void;
  toggleSimpleMode: () => void;
  loadDemoProfile: () => void;
  resetSession: () => void;
  isTyping: boolean;
}

const defaultProfile: FamilyProfile = {
  learnerName: '',
  age: 18,
  education: '10th Standard',
  location: 'Coimbatore',
  preferredLanguage: 'en',
  interests: ['Electrical'],
  householdIncome: '10k_25k',
  preferredLearningMode: 'in_person',
  primaryConcerns: ['JOB_SECURITY', 'EARNINGS'],
  selectedTradeId: 'electrician',
};

const CounsellingContext = createContext<CounsellingContextType | undefined>(undefined);

export const CounsellingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { i18n } = useTranslation();
  const [profile, setProfile] = useState<FamilyProfile>(() => {
    const saved = localStorage.getItem('fcc-profile');
    return saved ? JSON.parse(saved) : DEMO_FAMILY_PROFILE;
  });

  const [trades] = useState<Trade[]>(TRADES);
  const [selectedTradeId, setSelectedTradeId] = useState<string>(() => {
    return localStorage.getItem('fcc-trade') || profile.selectedTradeId || 'electrician';
  });

  const selectedTrade =
    trades.find((t) => t.id === selectedTradeId) || trades[0];

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('fcc-messages');
    if (saved) {
      return JSON.parse(saved).map((m: any) => ({
        ...m,
        timestamp: new Date(m.timestamp)
      }));
    }
    return DEMO_SESSION.messages;
  });

  const [detectedConcerns, setDetectedConcerns] = useState<ConcernIntent[]>(() => {
    const saved = localStorage.getItem('fcc-concerns');
    return saved ? JSON.parse(saved) : DEMO_SESSION.detectedConcerns;
  });

  const [decisionConfidence, setDecisionConfidence] = useState<ConfidenceLevel>(() => {
    return (localStorage.getItem('fcc-confidence') as ConfidenceLevel) || 'moderate';
  });
  const [sentimentBefore, setSentimentBefore] = useState<SentimentLevel>(() => {
    return (localStorage.getItem('fcc-sentimentB') as SentimentLevel) || 'high_concern';
  });
  const [sentimentAfter, setSentimentAfter] = useState<SentimentLevel>(() => {
    return (localStorage.getItem('fcc-sentimentA') as SentimentLevel) || 'moderate';
  });
  const [isEscalated, setIsEscalated] = useState(() => {
    return localStorage.getItem('fcc-escalated') === 'true';
  });
  const [isSimpleMode, setIsSimpleMode] = useState(() => {
    return localStorage.getItem('fcc-simple') === 'true';
  });
  const [isTyping, setIsTyping] = useState(false);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('fcc-profile', JSON.stringify(profile));
    localStorage.setItem('fcc-trade', selectedTradeId);
    localStorage.setItem('fcc-messages', JSON.stringify(messages));
    localStorage.setItem('fcc-concerns', JSON.stringify(detectedConcerns));
    localStorage.setItem('fcc-confidence', decisionConfidence);
    localStorage.setItem('fcc-sentimentB', sentimentBefore);
    localStorage.setItem('fcc-sentimentA', sentimentAfter);
    localStorage.setItem('fcc-escalated', String(isEscalated));
    localStorage.setItem('fcc-simple', String(isSimpleMode));
  }, [profile, selectedTradeId, messages, detectedConcerns, decisionConfidence, sentimentBefore, sentimentAfter, isEscalated, isSimpleMode]);

  const updateProfile = (partial: Partial<FamilyProfile>) => {
    setProfile((prev) => ({ ...prev, ...partial }));
  };

  const addConcern = (concern: ConcernIntent) => {
    if (!detectedConcerns.includes(concern)) {
      setDetectedConcerns((prev) => [...prev, concern]);
    }
  };

  const toggleSimpleMode = () => {
    setIsSimpleMode((prev) => !prev);
  };

  const loadDemoProfile = () => {
    setProfile(DEMO_FAMILY_PROFILE);
    setSelectedTradeId('electrician');
    setMessages(DEMO_SESSION.messages);
    setDetectedConcerns(DEMO_SESSION.detectedConcerns);
    setDecisionConfidence('moderate');
    setSentimentBefore('high_concern');
    setSentimentAfter('moderate');
    setIsEscalated(false);
    i18n.changeLanguage('ta');
    localStorage.setItem('fcc-language', 'ta');
    document.documentElement.lang = 'ta';
  };

  const resetSession = () => {
    setProfile(defaultProfile);
    setSelectedTradeId('electrician');
    setMessages([
      {
        id: `sys-${Date.now()}`,
        role: 'system',
        content: 'New session started. Ask any question regarding vocational education, job stability, or salary.',
        language: 'en',
        timestamp: new Date(),
      },
    ]);
    setDetectedConcerns(['JOB_SECURITY']);
    setDecisionConfidence('low');
    setSentimentBefore('high_concern');
    setSentimentAfter('high_concern');
    setIsEscalated(false);
    
    // Clear other local storage items
    localStorage.removeItem('fcc-messages');
    localStorage.removeItem('fcc-concerns');
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Detect language from text or fall back to current UI language
    const currentLang = (i18n.language || 'en').slice(0, 2) as SupportedLanguage;
    const detectedLang = detectScriptLanguage(text);
    const activeLang = detectedLang !== 'en' ? detectedLang : currentLang;

    // Detect intent
    const { intent } = detectIntent(text, activeLang);

    // 1. Add user message
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: text,
      language: activeLang,
      detectedIntent: intent,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    addConcern(intent);
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const responseText = getFallbackResponse(intent, activeLang, selectedTrade);

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: responseText,
        language: activeLang,
        detectedIntent: intent,
        evidenceRef: selectedTrade.id,
        source: 'ai_fallback',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);

      // Positive reassurance gradually improves confidence
      setDecisionConfidence((prev) => {
        if (prev === 'low') return 'moderate';
        return 'high';
      });
      setSentimentAfter('low_concern');
    }, 700);
  };

  const session: CounsellingSession = {
    id: 'session-live-01',
    familyProfile: profile,
    language: (i18n.language || 'en').slice(0, 2) as SupportedLanguage,
    tradeId: selectedTradeId,
    messages,
    detectedConcerns,
    sentimentBefore,
    sentimentAfter,
    decisionConfidence,
    escalated: isEscalated,
    simpleMode: isSimpleMode,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return (
    <CounsellingContext.Provider
      value={{
        profile,
        setProfile,
        updateProfile,
        session,
        trades,
        selectedTrade,
        setSelectedTradeId,
        messages,
        sendMessage,
        detectedConcerns,
        addConcern,
        decisionConfidence,
        setDecisionConfidence,
        sentimentBefore,
        sentimentAfter,
        setSentimentAfter,
        isEscalated,
        setIsEscalated,
        isSimpleMode,
        setIsSimpleMode,
        toggleSimpleMode,
        loadDemoProfile,
        resetSession,
        isTyping,
      }}
    >
      {children}
    </CounsellingContext.Provider>
  );
};

export const useCounselling = () => {
  const context = useContext(CounsellingContext);
  if (!context) {
    throw new Error('useCounselling must be used within a CounsellingProvider');
  }
  return context;
};
