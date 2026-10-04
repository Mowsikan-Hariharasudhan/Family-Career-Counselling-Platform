// ============================================================
// Simple Mode Page (Rural & Low-Literacy Family Support)
// ============================================================

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { SupportedLanguage } from '../types';
import { useCounselling } from '../context/CounsellingContext';
import { VoiceControl } from '../components/shared/VoiceControl';
import { formatCurrency, formatPercentage } from '../utils/formatters';
import {
  Volume2,
  CheckCircle,
  HelpCircle,
  PhoneCall,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Award,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const SimpleModePage: React.FC = () => {
  const { selectedTrade, profile, trades, setSelectedTradeId, loadDemoProfile } =
    useCounselling();
  const { i18n } = useTranslation();
  const currentLang = (i18n.language || 'en').slice(0, 2) as SupportedLanguage;

  const tradeName = selectedTrade.name[currentLang] || selectedTrade.name.en;

  // Simplified Q&A cards with direct voice prompts
  const questions = [
    {
      q: {
        en: 'Will my child get a job after training?',
        ta: 'பயிற்சிக்கு பின் என் பிள்ளைக்கு வேலை கிடைக்குமா?',
        hi: 'क्या ट्रेनिंग के बाद नौकरी पक्की है?',
      },
      a: {
        en: `Yes! Around ${selectedTrade.outcomes.placement}% of students from ${tradeName} get employed in companies immediately after course completion.`,
        ta: `ஆம்! ${tradeName} படித்த ${selectedTrade.outcomes.placement}% மாணவர்களுக்கு பயிற்சி முடிந்த உடனே தொழிற்சாலைகளில் வேலை கிடைத்துள்ளது.`,
        hi: `हाँ! ${tradeName} करने वाले लगभग ${selectedTrade.outcomes.placement}% छात्रों को कोर्स पूरा होते ही कंपनियों में काम मिला है।`,
      },
      icon: <CheckCircle className="w-8 h-8 text-[#18864B]" />,
      color: 'bg-[#E8F5EE] border-[#18864B]',
    },
    {
      q: {
        en: 'How much money will they earn every month?',
        ta: 'மாதம் எவ்வளவு சம்பளம் கிடைக்கும்?',
        hi: 'हर महीने कितनी कमाई होगी?',
      },
      a: {
        en: `Starting salary is around ₹${selectedTrade.outcomes.averageSalary.toLocaleString()} per month. With 2 years experience, it increases to ₹${selectedTrade.outcomes.salaryRange.max.toLocaleString()}.`,
        ta: `தொடக்கத்தில் மாதத்திற்கு சுமார் ₹${selectedTrade.outcomes.averageSalary.toLocaleString()} கிடைக்கும். 2 ஆண்டு அனுபவத்திற்கு பின் ₹${selectedTrade.outcomes.salaryRange.max.toLocaleString()} வரை உயரும்.`,
        hi: `शुरुआती वेतन लगभग ₹${selectedTrade.outcomes.averageSalary.toLocaleString()} प्रति माह है। दो साल के अनुभव के बाद यह ₹${selectedTrade.outcomes.salaryRange.max.toLocaleString()} तक बढ़ जाता है।`,
      },
      icon: <TrendingUp className="w-8 h-8 text-[#0B73B9]" />,
      color: 'bg-[#E8F4FD] border-[#0B73B9]',
    },
    {
      q: {
        en: 'Can my child continue higher studies later?',
        ta: 'இதன் பிறகு உயர்கல்வி படிக்க முடியுமா?',
        hi: 'क्या आगे की पढ़ाई जारी रख सकते हैं?',
      },
      a: {
        en: `Yes! Students can join Polytechnic Diploma directly into the 2nd year without repeating school, and then even study Engineering degree.`,
        ta: `ஆம்! பள்ளிக்கு மீண்டும் போகாமல் நேரடியாக பாலிடெக்னிக் டிப்ளோமாவின் 2-ஆம் ஆண்டில் சேர்ந்து படிக்கலாம். பின்னர் பொறியியல் பட்டமும் பெறலாம்.`,
        hi: `हाँ! छात्र सीधे पॉलिटेक्निक डिप्लोमा के दूसरे वर्ष में दाखिला ले सकते हैं और आगे चलकर इंजीनियरिंग डिग्री भी हासिल कर सकते हैं।`,
      },
      icon: <Award className="w-8 h-8 text-[#D99800]" />,
      color: 'bg-[#FEF9EC] border-[#D99800]',
    },
    {
      q: {
        en: 'Is this work respected in society?',
        ta: 'சமூகத்தில் இந்த வேலைக்கு மரியாதை கிடைக்குமா?',
        hi: 'क्या समाज में इस काम की इज्जत है?',
      },
      a: {
        en: `Skilled technical professionals hold certified government qualifications. Essential skills in factories, solar, and power are held with great dignity.`,
        ta: `அரசு சான்றிதழ் பெற்ற தொழில்நுட்ப வல்லுநர்களுக்கு நல்ல மரியாதையும் தேவையும் உண்டு. மின்சாரம், இயந்திரம் போன்ற துறைகள் எப்போதுமே முக்கியமானவை.`,
        hi: `सरकारी प्रमाणपत्र प्राप्त तकनीकी विशेषज्ञों का हर जगह सम्मान है। बिजली, मशीनरी और सोलर जैसे क्षेत्रों के बिना देश नहीं चल सकता।`,
      },
      icon: <ShieldCheck className="w-8 h-8 text-[#123B63]" />,
      color: 'bg-[#F7F8FA] border-[#1D2630]',
    },
  ];

  const pageText = {
    badge: {
      en: 'Simple Mode · Elder & Rural Friendly Guide',
      ta: 'Simple Mode · குடும்ப பெரியவர்களுக்கான எளிய வழிகாட்டி',
      hi: 'Simple Mode · ग्रामीण एवं बुजुर्ग अनुकूल मार्गदर्शिका',
    },
    title: {
      en: `${tradeName} — Plain Family Guidance`,
      ta: `${tradeName} — எளிய குடும்ப விளக்கம்`,
      hi: `${tradeName} — सरल पारिवारिक विवरण`,
    },
    subtitle: {
      en: 'High contrast text, simplified answers, and voice read-aloud support.',
      ta: 'பெரிய எழுத்துகள், எளிய பதில்கள் மற்றும் குரல் வாசிப்பு வசதியுடன்.',
      hi: 'बढ़े हुए अक्षर, सरल उत्तर और आवाज से सुनने की सुविधा।',
    },
    switchStandard: {
      en: 'Switch to Standard Workspace',
      ta: 'வழக்கமான தளத்திற்கு மாறவும்',
      hi: 'मानक कार्यक्षेत्र पर स्विच करें',
    },
    chooseTrade: {
      en: 'Select / Change Trade:',
      ta: 'படிப்பை மாற்றவும்:',
      hi: 'ट्रेड चुनें / बदलें:',
    },
    callTitle: {
      en: 'Want to speak to an MSDE Government Counsellor directly?',
      ta: 'நேரில் அல்லது போனில் அரசு ஆலோசகரிடம் பேச வேண்டுமா?',
      hi: 'क्या आप सरकारी करियर परामर्शदाता से सीधे बात करना चाहते हैं?',
    },
    callDesc: {
      en: 'Certified counsellors from your District Skill Development Center are available to answer your family queries for free.',
      ta: 'மாவட்ட திறன் மேம்பாட்டு அலுவலகத்தின் சான்றளிக்கப்பட்ட ஆலோசகர்கள் உங்கள் குடும்பத்தின் கேள்விகளுக்கு இலவசமாக பதிலளிப்பார்கள்.',
      hi: 'जिला कौशल विकास केंद्र के प्रमाणित परामर्शदाता आपके परिवार के प्रश्नों का निःशुल्क उत्तर देंगे।',
    },
    callBtn: {
      en: 'Register for Counsellor Call / Visit',
      ta: 'ஆலோசகரை தொடர்பு கொள்ள பதிவு செய்யவும்',
      hi: 'परामर्शदाता सहायता के लिए पंजीकरण करें',
    },
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Big Notice Header */}
      <div className="bg-[#18864B] text-white border-3 border-[#1D2630] rounded-xl p-6 shadow-[5px_5px_0px_#1D2630] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-mono font-bold bg-white text-[#18864B] px-2 py-0.5 rounded">
            {pageText.badge[currentLang] || pageText.badge.en}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            {pageText.title[currentLang] || pageText.title.en}
          </h1>
          <p className="text-sm text-emerald-100 mt-1">
            {pageText.subtitle[currentLang] || pageText.subtitle.en}
          </p>
        </div>

        <Link
          to="/counselling"
          className="px-4 py-2 bg-white text-[#1D2630] font-bold text-xs rounded border-2 border-[#1D2630] shadow-[2px_2px_0px_#1D2630] hover:bg-[#F7F8FA] flex-shrink-0 cursor-pointer"
        >
          {pageText.switchStandard[currentLang] || pageText.switchStandard.en}
        </Link>
      </div>

      {/* Trade Selector Big */}
      <div className="bg-white border-2 border-[#1D2630] p-4 rounded-xl shadow-[3px_3px_0px_#1D2630] flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-sm font-bold text-[#123B63]">
          {pageText.chooseTrade[currentLang] || pageText.chooseTrade.en}
        </span>
        <select
          value={selectedTrade.id}
          onChange={(e) => setSelectedTradeId(e.target.value)}
          className="text-sm font-bold px-4 py-2.5 rounded border-2 border-[#1D2630] bg-[#F7F8FA] cursor-pointer"
        >
          {trades.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name[currentLang] || t.name.en} ({t.trainingDuration})
            </option>
          ))}
        </select>
      </div>

      {/* Simplified Q&A Cards */}
      <div className="space-y-4">
        {questions.map((item, idx) => {
          const qText = item.q[currentLang] || item.q.en;
          const aText = item.a[currentLang] || item.a.en;

          return (
            <div
              key={idx}
              className={`p-6 rounded-xl border-3 border-[#1D2630] shadow-[4px_4px_0px_#1D2630] ${item.color} space-y-3`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  {item.icon}
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#101214]">
                    {qText}
                  </h3>
                </div>

                {/* Big Voice Audio Button */}
                <VoiceControl textToSpeak={aText} language={currentLang} />
              </div>

              <div className="bg-white/90 p-4 rounded-lg border-2 border-[#1D2630]/20 text-base font-semibold text-[#101214] leading-relaxed">
                {aText}
              </div>
            </div>
          );
        })}
      </div>

      {/* Call District Counsellor Card */}
      <div className="bg-[#FFF9EE] border-3 border-[#1D2630] rounded-xl p-6 shadow-[5px_5px_0px_#1D2630] text-center space-y-3">
        <PhoneCall className="w-10 h-10 text-[#D99800] mx-auto" />
        <h3 className="text-xl font-extrabold text-[#101214]">
          {pageText.callTitle[currentLang] || pageText.callTitle.en}
        </h3>
        <p className="text-sm text-[#475467] max-w-lg mx-auto">
          {pageText.callDesc[currentLang] || pageText.callDesc.en}
        </p>
        <div>
          <Link to="/counselling">
            <button
              type="button"
              className="px-6 py-3 bg-[#123B63] hover:bg-[#0D2B4A] text-white font-bold text-sm rounded border-2 border-[#1D2630] shadow-[3px_3px_0px_#1D2630] cursor-pointer"
            >
              {pageText.callBtn[currentLang] || pageText.callBtn.en}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
