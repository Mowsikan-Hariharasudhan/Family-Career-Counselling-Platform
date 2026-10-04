// ============================================================
// Intent Taxonomy & Keyword Maps (Multilingual)
// ============================================================

import type { ConcernIntent, SupportedLanguage } from '../types';

export interface IntentMetadata {
  intent: ConcernIntent;
  label: Record<SupportedLanguage, string>;
  description: Record<SupportedLanguage, string>;
  category: 'financial' | 'career' | 'social' | 'education' | 'logistics';
  icon: string;
}

export const INTENT_DEFINITIONS: Record<ConcernIntent, IntentMetadata> = {
  JOB_SECURITY: {
    intent: 'JOB_SECURITY',
    label: {
      en: 'Job Security',
      ta: 'வேலை பாதுகாப்பு',
      hi: 'नौकरी की सुरक्षा',
    },
    description: {
      en: 'Long-term stability and permanent job opportunities after training',
      ta: 'பயிற்சிக்கு பின் நீண்டகால நிலைத்தன்மை மற்றும் நிரந்தர வேலை வாய்ப்புகள்',
      hi: 'प्रशिक्षण के बाद दीर्घकालिक स्थिरता और स्थायी नौकरी के अवसर',
    },
    category: 'career',
    icon: 'ShieldCheck',
  },
  EARNINGS: {
    intent: 'EARNINGS',
    label: {
      en: 'Earnings & Salary',
      ta: 'வருமானம் மற்றும் சம்பளம்',
      hi: 'कमाई और वेतन',
    },
    description: {
      en: 'Expected starting wages, salary ranges, and earning progression',
      ta: 'தொடக்க சம்பளம், ஊதிய வரம்பு மற்றும் எதிர்கால வருமான வளர்ச்சி',
      hi: 'प्रारंभिक वेतन, वेतन सीमा और आय में वृद्धि की संभावनाएं',
    },
    category: 'financial',
    icon: 'IndianRupee',
  },
  CAREER_GROWTH: {
    intent: 'CAREER_GROWTH',
    label: {
      en: 'Career Growth',
      ta: 'தொழில் வளர்ச்சி',
      hi: 'करियर विकास',
    },
    description: {
      en: 'Progression from entry technician to supervisor and entrepreneurship',
      ta: 'தொடக்க பணியாளரிலிருந்து மேற்பார்வையாளர் மற்றும் தொழில்முனைவோர் வரை வளர்ச்சி',
      hi: 'शुरुआती तकनीशियन से पर्यवेक्षक और उद्यमिता तक पदोन्नति',
    },
    category: 'career',
    icon: 'TrendingUp',
  },
  SOCIAL_PERCEPTION: {
    intent: 'SOCIAL_PERCEPTION',
    label: {
      en: 'Social Perception & Dignity',
      ta: 'சமூக மதிப்பு மற்றும் கவுரவம்',
      hi: 'सामाजिक प्रतिष्ठा और सम्मान',
    },
    description: {
      en: 'Respect in society, community acceptance, and dignity of skilled labor',
      ta: 'சமூகத்தில் மதிப்பு, உறவினர்கள் ஏற்பு மற்றும் திறன் உழைப்பின் கண்ணியம்',
      hi: 'समाज में सम्मान, पारिवारिक स्वीकृति और कुशल श्रम की गरिमा',
    },
    category: 'social',
    icon: 'Users',
  },
  FURTHER_EDUCATION: {
    intent: 'FURTHER_EDUCATION',
    label: {
      en: 'Higher Education Pathways',
      ta: 'உயர்கல்வி வழிகள்',
      hi: 'उच्च शिक्षा के रास्ते',
    },
    description: {
      en: 'Lateral entry into Polytechnic Diploma and B.Tech / B.E. degrees',
      ta: 'பாலிடெக்னிக் டிப்ளோமா மற்றும் பொறியியல் பட்டப்படிப்புக்கான நேரடி வாய்ப்பு',
      hi: 'पॉलिटेक्निक डिप्लोमा और इंजीनियरिंग डिग्री (लेटरल एंट्री) में प्रवेश',
    },
    category: 'education',
    icon: 'GraduationCap',
  },
  SAFETY: {
    intent: 'SAFETY',
    label: {
      en: 'Workplace Safety',
      ta: 'பணி பாதுகாப்பு மற்றும் நலம்',
      hi: 'कार्यस्थल सुरक्षा',
    },
    description: {
      en: 'Physical work conditions, safety equipment, and industrial hazard standards',
      ta: 'உடல் பாதுகாப்பு, பாதுகாப்பு உபகரணங்கள் மற்றும் தொழில்சார் பாதுகாப்பு விதிமுறைகள்',
      hi: 'भौतिक कार्य स्थितियां, सुरक्षा उपकरण और औद्योगिक सुरक्षा मानक',
    },
    category: 'career',
    icon: 'HardHat',
  },
  TRAINING_DURATION: {
    intent: 'TRAINING_DURATION',
    label: {
      en: 'Training Duration & Cost',
      ta: 'பயிற்சி காலம் மற்றும் கட்டணம்',
      hi: 'प्रशिक्षण अवधि और खर्च',
    },
    description: {
      en: 'Course length, government fee concessions, and free toolkits',
      ta: 'படிப்பின் காலம், அரசு கட்டண சலுகைகள் மற்றும் இலவச உபகரணங்கள்',
      hi: 'पाठ्यक्रम की अवधि, सरकारी शुल्क छूट और छात्रवृत्तियां',
    },
    category: 'logistics',
    icon: 'Clock',
  },
  PLACEMENT: {
    intent: 'PLACEMENT',
    label: {
      en: 'Placement & Job Fairs',
      ta: 'வேலைவாய்ப்பு முகாம்கள்',
      hi: 'प्लेसमेंट और रोजगार मेले',
    },
    description: {
      en: 'Campus recruitment, campus placement rates, and Rozgar Melas',
      ta: 'வளாக வேலைவாய்ப்பு சதவீதம் மற்றும் அரசு ரோஸ்கர் மேளா முகாம்கள்',
      hi: 'परिसर साक्षात्कार, प्लेसमेंट प्रतिशत और सरकारी रोजगार मेले',
    },
    category: 'career',
    icon: 'Briefcase',
  },
  APPRENTICESHIP: {
    intent: 'APPRENTICESHIP',
    label: {
      en: 'Apprenticeship & Stipend',
      ta: 'தொழிற்பயிற்சி மற்றும் உதவித்தொகை',
      hi: 'शिक्षुता (अपेंटिसशिप) और वजीफा',
    },
    description: {
      en: 'NAPS scheme, on-the-job training, and monthly government stipends',
      ta: 'தேசிய தொழிற்பயிற்சி திட்டம் (NAPS) மற்றும் மாத உதவித்தொகை',
      hi: 'NAPS योजना, कार्यस्थल प्रशिक्षण और मासिक सरकारी वजीफा',
    },
    category: 'financial',
    icon: 'Award',
  },
  LOCATION: {
    intent: 'LOCATION',
    label: {
      en: 'Location & Relocation',
      ta: 'பணி இடம் மற்றும் இடமாற்றம்',
      hi: 'स्थान और स्थानांतरण',
    },
    description: {
      en: 'Local job availability vs. relocation to major industrial clusters',
      ta: 'சொந்த ஊரில் வேலைவாய்ப்புகள் அல்லது தொழில் நகரங்களுக்கு இடம் பெயர்வது',
      hi: 'स्थानीय रोजगार के अवसर बनाम बड़े औद्योगिक शहरों में स्थानांतरण',
    },
    category: 'logistics',
    icon: 'MapPin',
  },
  CAREER_SWITCH: {
    intent: 'CAREER_SWITCH',
    label: {
      en: 'Flexibility & Changing Field',
      ta: 'துறை மாற்றம் மற்றும் நெகிழ்வுத்தன்மை',
      hi: 'क्षेत्र बदलना और लचीलापन',
    },
    description: {
      en: 'Switching roles or moving from vocational work to service/tech',
      ta: 'தொழில்நுட்ப துறையிலிருந்து பிற பணிகளுக்கு அல்லது மேற்பார்வைக்கு மாறும் வாய்ப்பு',
      hi: 'अन्य संबंधित क्षेत्रों में जाने या स्वरोजगार शुरू करने की सुविधा',
    },
    category: 'career',
    icon: 'Shuffle',
  },
  SKILL_DEMAND: {
    intent: 'SKILL_DEMAND',
    label: {
      en: 'Future Skill Demand',
      ta: 'எதிர்கால தேவை',
      hi: 'भविष्य में मांग',
    },
    description: {
      en: 'Industry trends, automation resilience, and 5-10 year sector growth',
      ta: 'தொழில்துறை வளர்ச்சி, ஆட்டோமேஷன் தாக்கம் மற்றும் எதிர்கால மதிப்பு',
      hi: 'उद्योग की आवश्यकताएं, ऑटोमेशन का प्रभाव और आने वाले दशक में मांग',
    },
    category: 'career',
    icon: 'Zap',
  },
  GENERAL: {
    intent: 'GENERAL',
    label: {
      en: 'General Vocational Guidance',
      ta: 'பொது தொழில் வழிகாட்டல்',
      hi: 'सामान्य व्यावसायिक मार्गदर्शन',
    },
    description: {
      en: 'Overview and advice on skills development under MSDE guidelines',
      ta: 'MSDE வழிகாட்டுதல்களின் கீழ் திறன் மேம்பாடு குறித்த பொதுவான தகவல்',
      hi: 'कौशल विकास पर सामान्य जानकारी और परामर्श',
    },
    category: 'career',
    icon: 'HelpCircle',
  },
};

export const INTENT_KEYWORDS: Record<ConcernIntent, Record<SupportedLanguage, string[]>> = {
  JOB_SECURITY: {
    en: ['job', 'stable', 'security', 'employment', 'permanent', 'secure', 'firing', 'layoff', 'unemployment'],
    ta: ['வேலை', 'பாதுகாப்பு', 'நிரந்தர', 'வேலைவாய்ப்பு', 'நிலைப்பு', 'வேலையில்லா'],
    hi: ['नौकरी', 'सुरक्षा', 'स्थाई', 'रोजगार', 'पक्का', 'बेरोजगारी'],
  },
  EARNINGS: {
    en: ['salary', 'income', 'pay', 'earn', 'money', 'wage', 'package', 'cost of living', 'per month', 'earning'],
    ta: ['சம்பளம்', 'வருமானம்', 'ஊதியம்', 'பணம்', 'தொகை', 'மாத வருமானம்'],
    hi: ['वेतन', 'आय', 'तनख्वाह', 'कमाई', 'पैसा', 'रुपये', 'प्रति माह'],
  },
  CAREER_GROWTH: {
    en: ['growth', 'future', 'promotion', 'supervisor', 'manager', 'lead', 'career', 'grow', 'ladder', 'advancement'],
    ta: ['வளர்ச்சி', 'எதிர்காலம்', 'பதவி உயர்வு', 'மேற்பார்வையாளர்', 'முன்னேற்றம்'],
    hi: ['वृद्धि', 'भविष्य', 'पदोन्नति', 'प्रमोशन', 'तरक्की', 'सुपरवाइजर'],
  },
  SOCIAL_PERCEPTION: {
    en: ['respect', 'society', 'dignity', 'status', 'relatives', 'reputation', 'shame', 'prestige', 'family thinks', 'neighbors'],
    ta: ['மதிப்பு', 'சமூகம்', 'கவுரவம்', 'அந்தஸ்து', 'உறவினர்கள்', 'மரியாதை', 'வெட்கம்'],
    hi: ['सम्मान', 'समाज', 'प्रतिष्ठा', 'हैसियत', 'रिश्तेदार', 'इज्जत', 'शर्म'],
  },
  FURTHER_EDUCATION: {
    en: ['degree', 'diploma', 'engineering', 'study', 'college', 'higher education', 'b.tech', 'polytechnic', 'btech'],
    ta: ['பட்டப்படிப்பு', 'டிப்ளோமா', 'பொறியியல்', 'படிப்பை', 'கல்லூரி', 'உயர்கல்வி'],
    hi: ['डिग्री', 'डिप्लोमा', 'इंजीनियरिंग', 'पढ़ाई', 'कॉलेज', 'उच्च शिक्षा'],
  },
  SAFETY: {
    en: ['safe', 'danger', 'hazard', 'health', 'risk', 'injury', 'accident', 'ppe', 'gloves', 'shock'],
    ta: ['பாதுகாப்பு', 'ஆபத்து', 'உடல்நலம்', 'விபத்து', 'காயம்', 'அதிர்ச்சி'],
    hi: ['सुरक्षा', 'खतरा', 'जोखिम', 'स्वास्थ्य', 'दुर्घटना', 'चोट'],
  },
  TRAINING_DURATION: {
    en: ['duration', 'months', 'years', 'time', 'fees', 'cost', 'expensive', 'long', 'hours', 'admission'],
    ta: ['காலம்', 'வருடம்', 'மாதம்', 'கட்டணம்', 'செலவு', 'நேரம்'],
    hi: ['अवधि', 'साल', 'महीने', 'समय', 'फीस', 'खर्च', 'लागत'],
  },
  PLACEMENT: {
    en: ['placement', 'campus', 'interview', 'company', 'hire', 'recruitment', 'mela', 'job fair'],
    ta: ['வேலை வாய்ப்பு', 'முகாம்', 'நிறுவனம்', 'நேர்காணல்', 'தேர்வு'],
    hi: ['प्लेसमेंट', 'कैंपस', 'साक्षात्कार', 'कंपनी', 'भर्ती', 'रोजगार मेला'],
  },
  APPRENTICESHIP: {
    en: ['apprentice', 'naps', 'stipend', 'trainee', 'practical', 'hands-on', 'industry training'],
    ta: ['தொழிற்பயிற்சி', 'உதவித்தொகை', 'அப்ரண்டிஸ்', 'நடைமுறை பயிற்சி'],
    hi: ['शिक्षुता', 'अपेंटिस', 'वजीफा', 'स्टाइपेंड', 'प्रायोगिक'],
  },
  LOCATION: {
    en: ['city', 'location', 'local', 'home', 'travel', 'village', 'relocate', 'outside', 'coimbatore', 'chennai'],
    ta: ['ஊர்', 'இடம்', 'சொந்த ஊர்', 'பயணம்', 'நகரம்', 'கிராமம்', 'கோயம்புத்தூர்'],
    hi: ['शहर', 'स्थान', 'घर', 'गाँव', 'दूर', 'यात्रा', 'स्थानांतरण'],
  },
  CAREER_SWITCH: {
    en: ['switch', 'change', 'shift', 'leave', 'flexibility', 'other job', 'business', 'own shop'],
    ta: ['மாற', 'துறை மாற்றம்', 'சொந்த தொழில்', 'வியாபாரம்', 'கடை'],
    hi: ['बदलना', 'अन्य नौकरी', 'व्यवसाय', 'दुकान', 'स्वरोजगार'],
  },
  SKILL_DEMAND: {
    en: ['demand', 'future', 'trend', 'ai', 'automation', 'machines', 'scope', 'industry 4.0'],
    ta: ['தேவை', 'எதிர்காலம்', 'வாய்ப்பு', 'இயந்திரம்'],
    hi: ['मांग', 'स्कोप', 'भविष्य', 'ऑटोमेशन', 'उद्योग'],
  },
  GENERAL: {
    en: ['help', 'counselling', 'guide', 'vocational', 'iti', 'course', 'advice'],
    ta: ['உதவி', 'வழிகாட்டல்', 'தொழிற்கல்வி', 'ஆலோசனை'],
    hi: ['मदद', 'सलाह', 'मार्गदर्शन', 'व्यावसायिक', 'कोर्स'],
  },
};
