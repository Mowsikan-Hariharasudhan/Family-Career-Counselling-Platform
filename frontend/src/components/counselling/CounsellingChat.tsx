// ============================================================
// Counselling Chat Component (Center Column)
// ============================================================

import React, { useState, useRef, useEffect } from 'react';
import type { SupportedLanguage } from '../../types';
import { useCounselling } from '../../context/CounsellingContext';
import { EvidenceTag } from '../shared/EvidenceTag';
import { VoiceControl } from '../shared/VoiceControl';
import { QuickConcernActions } from './QuickConcernActions';
import { ConcernDetectionBadge } from './ConcernDetectionBadge';
import { formatTime } from '../../utils/formatters';
import { Send, Bot, User, Sparkles, AlertCircle } from 'lucide-react';

interface CounsellingChatProps {
  language: SupportedLanguage;
}

export const CounsellingChat: React.FC<CounsellingChatProps> = ({ language }) => {
  const { messages, sendMessage, isTyping, selectedTrade } = useCounselling();
  const [inputText, setInputText] = useState('');
  const chatViewportRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (chatViewportRef.current) {
      if (isInitialMount.current) {
        chatViewportRef.current.scrollTop = 0;
        isInitialMount.current = false;
      } else {
        chatViewportRef.current.scrollTo({
          top: chatViewportRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }
    }
  }, [messages, isTyping]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isTyping) return;
    sendMessage(inputText.trim());
    setInputText('');
  };

  const handleSelectQuickPrompt = (promptText: string) => {
    sendMessage(promptText);
  };

  const handleVoiceTranscript = (transcriptText: string) => {
    if (transcriptText.trim()) {
      sendMessage(transcriptText.trim());
    }
  };

  return (
    <div className="flex flex-col h-[750px] bg-white border-2 border-[#1D2630] rounded-lg shadow-[3px_3px_0px_#1D2630] overflow-hidden">
      {/* 1. Chat Header */}
      <div className="bg-[#123B63] text-white p-3.5 flex items-center justify-between border-b-2 border-[#1D2630]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#0B73B9] flex items-center justify-center border border-white/30">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white leading-tight">
              AI Family Career Counsellor
            </h3>
            <p className="text-[11px] text-sky-200">
              Grounded on {selectedTrade.name[language] || selectedTrade.name.en} outcome data
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] bg-[#18864B] text-white font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Active Session
          </span>
        </div>
      </div>

      {/* 2. Messages Viewport */}
      <div
        ref={chatViewportRef}
        className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#F7F8FA]"
        role="log"
        aria-live="polite"
      >
        {messages.map((msg) => {
          if (msg.role === 'system') {
            return (
              <div
                key={msg.id}
                className="text-center my-2 p-2 bg-[#EEF0F4] border border-[#D0D5DD] rounded text-xs text-[#667085] flex items-center justify-center gap-1.5"
              >
                <AlertCircle className="w-3.5 h-3.5 text-[#0B73B9]" />
                <span>{msg.content}</span>
              </div>
            );
          }

          const isUser = msg.role === 'user';

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1`}
            >
              {/* Sender Name & Meta */}
              <div className="flex items-center gap-2 text-[11px] text-[#667085] px-1">
                {isUser ? (
                  <>
                    {msg.detectedIntent && (
                      <ConcernDetectionBadge
                        intent={msg.detectedIntent}
                        language={language}
                        size="sm"
                      />
                    )}
                    <span className="font-bold text-[#123B63]">Family / Learner</span>
                    <span>{formatTime(msg.timestamp, language)}</span>
                  </>
                ) : (
                  <>
                    <EvidenceTag
                      type={msg.source === 'structured_data' ? 'outcome_data' : 'ai_explanation'}
                    />
                    <span>{formatTime(msg.timestamp, language)}</span>
                  </>
                )}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[88%] p-3.5 rounded-lg border-2 text-sm leading-relaxed ${
                  isUser
                    ? 'bg-[#123B63] text-white border-[#1D2630] shadow-[2px_2px_0px_#1D2630] rounded-tr-none'
                    : 'bg-white text-[#101214] border-[#1D2630] shadow-[2px_2px_0px_rgba(0,0,0,0.1)] rounded-tl-none'
                }`}
              >
                <p className="whitespace-pre-line">{msg.content}</p>

                {/* Audio Listen Button for AI Responses */}
                {!isUser && (
                  <div className="mt-2.5 pt-2 border-t border-[#D0D5DD] flex items-center justify-between text-xs">
                    <span className="text-[11px] text-[#667085] italic">
                      Audio accessibility:
                    </span>
                    <VoiceControl
                      textToSpeak={msg.content}
                      language={msg.language || language}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* AI Typing Indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-[#667085] bg-white p-3 rounded-lg border border-[#D0D5DD] w-fit shadow-sm">
            <Bot className="w-4 h-4 text-[#0B73B9] animate-bounce" />
            <span>Consulting outcome dataset and formulating guidance...</span>
          </div>
        )}
      </div>

      {/* 3. Quick Action Buttons Container */}
      <div className="p-3 bg-[#EEF0F4] border-t-2 border-[#1D2630]">
        <QuickConcernActions
          language={language}
          onSelectPrompt={handleSelectQuickPrompt}
          disabled={isTyping}
        />
      </div>

      {/* 4. Chat Input Bar */}
      <form
        onSubmit={handleSubmit}
        className="p-3 bg-white border-t border-[#D0D5DD] flex items-center gap-2"
      >
        {/* Voice Input Button */}
        <VoiceControl
          onTranscript={handleVoiceTranscript}
          language={language}
        />

        {/* Text Input */}
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={
            language === 'ta'
              ? 'உங்கள் கேள்வியை அல்லது சந்தேகத்தை இங்கே தட்டச்சு செய்யவும்...'
              : language === 'hi'
              ? 'अपना प्रश्न या चिंता यहाँ लिखें...'
              : 'Type parent concern, salary question, or higher studies inquiry...'
          }
          disabled={isTyping}
          className="flex-1 px-3.5 py-2.5 text-sm bg-[#F7F8FA] border-2 border-[#1D2630] rounded focus:outline-none focus:ring-2 focus:ring-[#0B73B9] focus:bg-white placeholder:text-[#667085]"
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!inputText.trim() || isTyping}
          className="h-11 px-4 bg-[#0B73B9] hover:bg-[#0A5F9A] disabled:opacity-50 text-white font-bold rounded border-2 border-[#1D2630] shadow-[2px_2px_0px_#1D2630] active:translate-x-0.5 active:translate-y-0.5 flex items-center justify-center cursor-pointer transition-all"
          aria-label="Send message"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
