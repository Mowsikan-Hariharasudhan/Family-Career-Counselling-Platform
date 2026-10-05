// ============================================================
// Response Engine — Contextual & Dynamic Multi-lingual AI Synthesis
//
// Generates direct, grounded explanations linked directly to trade outcome evidence
// tailored to the user's specific typed or voice input.
// ============================================================

import type { ConcernIntent, SupportedLanguage, Trade } from '../types';

export function getFallbackResponse(
  intent: ConcernIntent,
  language: SupportedLanguage,
  trade: Trade,
  userPrompt?: string
): string {
  const tradeName = trade.name[language] || trade.name.en;
  const placementRate = trade.outcomes.placement;
  const avgSalary = trade.outcomes.averageSalary.toLocaleString(
    language === 'en' ? 'en-IN' : language === 'ta' ? 'ta-IN' : 'hi-IN'
  );
  const minSal = trade.outcomes.salaryRange.min.toLocaleString(
    language === 'en' ? 'en-IN' : language === 'ta' ? 'ta-IN' : 'hi-IN'
  );
  const maxSal = trade.outcomes.salaryRange.max.toLocaleString(
    language === 'en' ? 'en-IN' : language === 'ta' ? 'ta-IN' : 'hi-IN'
  );

  const cleanPrompt = (userPrompt || '').toLowerCase().trim();

  // 0. Greetings & Small Talk Handling
  const greetings = ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'வணக்கம்', 'ஹலோ', 'ஹாய்', 'नमस्ते', 'हेलो', 'हाय'];
  if (greetings.some((g) => cleanPrompt === g || cleanPrompt.startsWith(g + ' ') || cleanPrompt.endsWith(' ' + g))) {
    if (language === 'ta') {
      return `வணக்கம்! MSDE குடும்ப தொழில் வழிகாட்டல் மையத்திற்கு வரவேற்கிறோம். ${tradeName} படிப்பு, வேலைவாய்ப்பு (${placementRate}%), மாத ஊதியம் (₹${avgSalary}), கட்டணம் அல்லது உயர்கல்வி குறித்து உங்கள் குடும்பத்திற்கு என்ன சந்தேகங்கள் உள்ளன? கேட்கலாம்!`;
    }
    if (language === 'hi') {
      return `नमस्ते! MSDE पारिवारिक करियर परामर्श केंद्र में आपका स्वागत है। ${tradeName} कोर्स, प्लेसमेंट (${placementRate}%), शुरुआती वेतन (₹${avgSalary}/माह), या उच्च शिक्षा के संबंध में आपके परिवार के क्या प्रश्न हैं? पूछें!`;
    }
    return `Hello! Welcome to the MSDE Family Career Counselling Portal. How can I assist you and your family regarding ${tradeName}, course duration, salary expectations (₹${avgSalary}/mo), job placement (${placementRate}%), or higher education today?`;
  }

  // 1. Specific Query Context Parsing (Female Safety, Fees, Business, Salary, Placement, Higher Studies, Duration, Location)
  
  // A. Female Candidates / Gender Safety
  if (
    cleanPrompt.includes('girl') ||
    cleanPrompt.includes('female') ||
    cleanPrompt.includes('women') ||
    cleanPrompt.includes('பெண்') ||
    cleanPrompt.includes('மகளிர்') ||
    cleanPrompt.includes('लड़की') ||
    cleanPrompt.includes('महिला')
  ) {
    if (language === 'ta') {
      return `${tradeName} படிப்பில் பெண் மாணவிகளின் சேர்க்கை மற்றும் பாதுகாப்பு குறித்து: MSDE பெண்களுக்கான தொழிற்கல்வி சேர்க்கையை பெருமளவில் ஊக்குவிக்கிறது. அனைத்து அரசு ITI மற்றும் தொழிற்சாலைகளிலும் பிரத்யேக பாதுகாப்பு நெறிமுறைகள், PPE உடைகள் மற்றும் சம ஊதிய முறை உறுதி செய்யப்பட்டுள்ளது. ${tradeName} முடித்த மாணவர்களுக்கு ${placementRate}% வேலைவாய்ப்பு கிடைத்துள்ளது.`;
    }
    if (language === 'hi') {
      return `${tradeName} में महिला उम्मीदवारों की सुरक्षा और अवसरों के बारे में: MSDE महिलाओं के कौशल विकास को प्राथमिकता देता है। सभी DGT-संबद्ध ITI संस्थानों में सुरक्षा मानकों, महिला हेल्पलाइन और समान वेतन संरचना का पालन किया जाता है। उपलब्ध आंकड़ों में ${placementRate}% प्लेसमेंट दर दर्ज है।`;
    }
    return `Regarding female student participation & safety in ${tradeName}: Female candidates are actively supported under MSDE's inclusive skill mission. All DGT-affiliated ITIs and industrial partners mandate strict safety protocols, dedicated shifts, and equal pay structure. Official MSDE records register a ${placementRate}% placement rate.`;
  }

  // B. Fees, Financial Support & Scholarships
  if (
    cleanPrompt.includes('fee') ||
    cleanPrompt.includes('cost') ||
    cleanPrompt.includes('stipend') ||
    cleanPrompt.includes('scholarship') ||
    cleanPrompt.includes('free') ||
    cleanPrompt.includes('கட்டணம்') ||
    cleanPrompt.includes('பணம்') ||
    cleanPrompt.includes('உதவித்தொகை') ||
    cleanPrompt.includes('फीस') ||
    cleanPrompt.includes('शुल्क') ||
    cleanPrompt.includes('वजीफा')
  ) {
    if (language === 'ta') {
      return `${tradeName} படிப்பின் கட்டணம் மற்றும் அரசு நிதி உதவி பற்றி: அரசு ITI-களில் தொழிற்கல்வி பயில மிகக் குறைந்த கட்டணமே வசூலிக்கப்படுகிறது. மேலும் அரசு சார்பாக இலவச உபகரண பெட்டி (ToolKit), சீருடை மற்றும் NAPS திட்டத்தின் கீழ் தொழிற்பயிற்சியின் போது மாதாந்திர உதவித்தொகை (Stipend) நேரடியாக வங்கிக் கணக்கில் வழங்கப்படுகிறது.`;
    }
    if (language === 'hi') {
      return `${tradeName} के शुल्क और वित्तीय सहायता के संबंध में: सरकारी ITI में प्रशिक्षण नाममात्र या मुफ्त होता है। इसके अतिरिक्त MSDE द्वारा मुफ्त टूलकिट, यूनिफॉर्म भत्ता और NAPS (शिक्षुता प्रोत्साहन) योजना के तहत मासिक वजीफा दिया जाता है।`;
    }
    return `Regarding fees & financial assistance for ${tradeName}: Government ITIs charge nominal to zero tuition fees for 10th/12th pass students. Additionally, MSDE provides free toolkits, uniform allowances, and monthly stipends under NAPS (National Apprenticeship Promotion Scheme) during training.`;
  }

  // C. Self-Employment, Business & Entrepreneurship
  if (
    cleanPrompt.includes('business') ||
    cleanPrompt.includes('shop') ||
    cleanPrompt.includes('own') ||
    cleanPrompt.includes('self') ||
    cleanPrompt.includes('சுயதொழில்') ||
    cleanPrompt.includes('வியாபாரம்') ||
    cleanPrompt.includes('சொந்த') ||
    cleanPrompt.includes('स्वरोजगार') ||
    cleanPrompt.includes('बिजनेस') ||
    cleanPrompt.includes('दुकान')
  ) {
    if (language === 'ta') {
      return `${tradeName} முடித்து சொந்தமாக சுயதொழில்/வியாபாரம் தொடங்குவது பற்றி: இத்துறை சுயதொழில் தொடங்குவதற்கு ஏற்றது. PM முத்ரா கடன் திட்டம் மற்றும் MSDE சுயதொழில் உதவி மூலம் குறைந்த வட்டியில் அரசு கடன் பெற்று சொந்தமாக சேவை மையம் அல்லது ஒப்பந்த நிறுவனம் தொடங்கலாம்.`;
    }
    if (language === 'hi') {
      return `${tradeName} के बाद खुद का व्यवसाय/स्वरोजगार शुरू करने के बारे में: यह ट्रेड उद्यमिता के लिए बहुत उपयुक्त है। PM मुद्रा योजना के तहत आसान सरकारी ऋण प्राप्त करके छात्र अपना स्वतंत्र वर्कशॉप या सर्विस सेंटर शुरू कर सकते हैं।`;
    }
    return `Regarding self-employment & starting a business in ${tradeName}: This trade equips candidates with direct technical skills to launch independent ventures. Under PM Mudra Yojana and MSDE entrepreneurship schemes, graduates can access low-interest collateral-free loans for setting up service centers or contracting firms.`;
  }

  // D. Salary & Monthly Income
  if (
    cleanPrompt.includes('salary') ||
    cleanPrompt.includes('earning') ||
    cleanPrompt.includes('income') ||
    cleanPrompt.includes('pay') ||
    cleanPrompt.includes('money') ||
    cleanPrompt.includes('சம்பளம்') ||
    cleanPrompt.includes('வருமானம்') ||
    cleanPrompt.includes('ஊதியம்') ||
    cleanPrompt.includes('वेतन') ||
    cleanPrompt.includes('कमाई')
  ) {
    if (language === 'ta') {
      return `${tradeName} படிப்பின் மாத ஊதியம்: ஆரம்ப காலத்தில் சராசரியாக ₹${avgSalary} (₹${minSal} முதல் ₹${maxSal} வரை) மாத சம்பளம் பெறலாம். 2-3 ஆண்டுகள் அனுபவம் மற்றும் NAPS சான்றிதழ் பெற்ற பின் சூப்பர்வைசர் நிலையில் ஊதியம் மேலும் உயரும்.`;
    }
    if (language === 'hi') {
      return `${tradeName} में मासिक वेतन संरचना: शुरुआत में औसतन ₹${avgSalary} प्रति माह (₹${minSal} से ₹${maxSal}) मिलता है। 2-3 वर्षों के व्यावहारिक अनुभव के बाद सुपरवाइजर स्तर पर आय में उल्लेखनीय वृद्धि होती है।`;
    }
    return `Regarding salary expectations in ${tradeName}: Fresh graduates start with an average monthly income of ₹${avgSalary} (ranging from ₹${minSal} to ₹${maxSal} per month). With 2–3 years of industrial experience and certifications, earnings rise steadily toward supervisory roles.`;
  }

  // E. Placement & Job Stability
  if (
    cleanPrompt.includes('job') ||
    cleanPrompt.includes('place') ||
    cleanPrompt.includes('work') ||
    cleanPrompt.includes('company') ||
    cleanPrompt.includes('வேலை') ||
    cleanPrompt.includes('பணி') ||
    cleanPrompt.includes('நிறுவனம்') ||
    cleanPrompt.includes('नौकरी') ||
    cleanPrompt.includes('काम') ||
    cleanPrompt.includes('कंपनी')
  ) {
    if (language === 'ta') {
      return `${tradeName} படிப்பின் வேலைவாய்ப்பு உறுதிப்பாடு: MSDE அதிகாரப்பூர்வ தரவுகளின்படி ${placementRate}% மாணவர்கள் பயிற்சி முடித்த உடனே வேலை பெறுகின்றனர். ஒவ்வொரு மாவட்டத்திலும் நடைபெறும் பிரதம மந்திரி தேசிய தொழிற்பயிற்சி மேளா (PMNAM) மற்றும் வளாகத் தேர்வுகள் மூலம் முன்னணி நிறுவனங்கள் நேரடியாக தேர்வு செய்கின்றன.`;
    }
    if (language === 'hi') {
      return `${tradeName} में नौकरी और प्लेसमेंट की स्थिति: आधिकारिक MSDE रिकॉर्ड के अनुसार ${placementRate}% छात्रों का सीधा प्लेसमेंट होता है। प्रधानमंत्री राष्ट्रीय शिक्षुता मेला (PMNAM) और कैंपस ड्राइव के जरिए प्रतिष्ठित कंपनियां सीधे नियुक्ति देती हैं।`;
    }
    return `Regarding job placement in ${tradeName}: Based on official MSDE database records, ${placementRate}% of graduates secure immediate placement upon course completion. Leading manufacturing hubs and annual PMNAM Rozgar Melas actively recruit certified technicians.`;
  }

  // F. Further Education, Polytechnic & Engineering
  if (
    cleanPrompt.includes('study') ||
    cleanPrompt.includes('diploma') ||
    cleanPrompt.includes('college') ||
    cleanPrompt.includes('degree') ||
    cleanPrompt.includes('education') ||
    cleanPrompt.includes('உயர்கல்வி') ||
    cleanPrompt.includes('பாலிடெக்னிக்') ||
    cleanPrompt.includes('கல்லூரி') ||
    cleanPrompt.includes('पढ़ाई') ||
    cleanPrompt.includes('डिप्लोमा') ||
    cleanPrompt.includes('कॉलेज')
  ) {
    if (language === 'ta') {
      return `${tradeName} படிப்பிற்குப் பின் உயர்கல்வி வாய்ப்புகள்: ITI முடித்த மாணவர்கள் பள்ளிப்படிப்பை மீண்டும் தொடராமல் நேரடியாக பாலிடெக்னிக் டிப்ளோமாவின் 2-ஆம் ஆண்டில் (Lateral Entry) சேரலாம். பின்னர் B.E. / B.Tech பொறியியல் பட்டப்படிப்பும் படிக்கலாம். (${trade.furtherEducation.slice(0, 2).join(', ')})`;
    }
    if (language === 'hi') {
      return `${tradeName} के बाद उच्च शिक्षा के रास्ते: ITI पास उम्मीदवार सीधे पॉलिटेक्निक डिप्लोमा के दूसरे वर्ष में लेटरल एंट्री ले सकते हैं और उसके बाद B.E. / B.Tech इंजीनियरिंग डिग्री भी पूरी कर सकते हैं।`;
    }
    return `Regarding higher education after ${tradeName}: Vocational graduates are eligible for Direct 2nd-Year Lateral Entry into 3-year Polytechnic Diplomas, followed by B.E./B.Tech engineering degrees (${trade.furtherEducation.slice(0, 2).join(', ')}).`;
  }

  // G. Duration, Eligibility & Standards
  if (
    cleanPrompt.includes('duration') ||
    cleanPrompt.includes('time') ||
    cleanPrompt.includes('year') ||
    cleanPrompt.includes('qualification') ||
    cleanPrompt.includes('10th') ||
    cleanPrompt.includes('12th') ||
    cleanPrompt.includes('காலம்') ||
    cleanPrompt.includes('தகுதி') ||
    cleanPrompt.includes('ஆண்டு') ||
    cleanPrompt.includes('अवधि') ||
    cleanPrompt.includes('योग्यता')
  ) {
    if (language === 'ta') {
      return `${tradeName} படிப்பின் காலம் மற்றும் தகுதி: இப்பயிற்சியின் காலம் ${trade.trainingDuration}. சேர்க்கைக்கான தகுதி: ${trade.education}. அரசு ITI-களில் தகுதியான மாணவர்களுக்கு கட்டண விலக்கு மற்றும் அரசு கல்வி உதவித்தொகை வழங்கப்படுகிறது.`;
    }
    if (language === 'hi') {
      return `${tradeName} की अवधि और न्यूनतम योग्यता: इस कोर्स की अवधि ${trade.trainingDuration} है और न्यूनतम योग्यता ${trade.education} है। सरकारी संस्थानों में छात्रवृत्ति और सहायता दी जाती है।`;
    }
    return `Regarding training duration & eligibility for ${tradeName}: The course duration is ${trade.trainingDuration} with minimum entry qualification: ${trade.education}. Government ITIs provide subsidized training under Directorate General of Training (DGT) standards.`;
  }

  // H. Intent-Based Fallbacks if no specific topic keyword matched
  if (trade.familyConcernResponses && trade.familyConcernResponses[intent]) {
    const localized = trade.familyConcernResponses[intent]![language];
    if (localized) return localized;
  }

  // I. Dynamic Custom Response Synthesizer for Freeform Queries
  if (language === 'ta') {
    return `${tradeName} படிப்பைப் பொறுத்தவரை, மாணவர்கள் ${trade.education} முடித்ததும் நேரடியாக 2 வருட தொழிற்பயிற்சியில் சேர்ந்து சிறந்த வேலை வாய்ப்புகளைப் பெறலாம். அதிகாரப்பூர்வ MSDE தரவுகளின்படி ${placementRate}% மாணவர்களுக்கு உடனடி வேலைவாய்ப்பும், ஆரம்ப மாத ஊதியம் ₹${avgSalary} வரை கிடைக்கிறது. மேலும் NAPS திட்டத்தின் கீழ் தொழிற்பயிற்சி உதவித்தொகையும் (Stipend) வழங்கப்படுகிறது. உங்கள் குடும்பத்திற்கு வேறு ஏதேனும் குறிப்பிட்ட சந்தேகங்கள் இருந்தால் தாராளமாக கேட்கலாம்!`;
  }

  if (language === 'hi') {
    return `${tradeName} कोर्स के संबंध में, ${trade.education} पास छात्र ${trade.trainingDuration} में व्यावहारिक तकनीकी कौशल हासिल करते हैं। आधिकारिक MSDE डेटा के अनुसार ${placementRate}% प्लेसमेंट दर और ₹${avgSalary}/माह औसत शुरुआती वेतन दर्ज है। NAPS योजना के तहत मासिक वजीफा भी प्रदान किया जाता है।`;
  }

  return `That is a very relevant question! For ${tradeName}, students who complete ${trade.education} gain direct hands-on technical competencies during ${trade.trainingDuration}. Official MSDE statistics confirm a ${placementRate}% job placement rate with starting monthly salaries averaging ₹${avgSalary} (ranging up to ₹${maxSal}/mo). Additionally, candidates benefit from NAPS monthly stipends and Polytechnic Lateral Entry.`;
}
