// ============================================================
// Response Fallback Engine — Deterministic Multi-lingual Responses
//
// Generates grounded explanations linked directly to trade outcome evidence.
// ============================================================

import type { ConcernIntent, SupportedLanguage, Trade } from '../types';

export function getFallbackResponse(
  intent: ConcernIntent,
  language: SupportedLanguage,
  trade: Trade
): string {
  // If trade has custom response for this concern, use it
  if (trade.familyConcernResponses && trade.familyConcernResponses[intent]) {
    const localized = trade.familyConcernResponses[intent]![language];
    if (localized) return localized;
  }

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

  switch (intent) {
    case 'JOB_SECURITY':
      if (language === 'ta') {
        return `${tradeName} துறையில் வேலை பாதுகாப்பு மிக அதிகம். MSDE அதிகாரப்பூர்வ தரவுகளின்படி ${placementRate}% மாணவர்கள் பயிற்சி முடித்ததும் வேலை பெற்றுள்ளனர். உற்பத்தி மற்றும் உள்கட்டமைப்பு துறைகளில் சான்றளிக்கப்பட்ட தொழில்நுட்ப வல்லுநர்களுக்கான தேவை தொடர்ந்து நீடிக்கிறது.`;
      }
      if (language === 'hi') {
        return `${tradeName} क्षेत्र में नौकरी की सुरक्षा काफी मजबूत है। उपलब्ध आंकड़ों के अनुसार, ${placementRate}% छात्रों को प्रशिक्षण पूरा होने के तुरंत बाद रोजगार मिला है। विनिर्माण और निर्माण क्षेत्रों में कुशल कार्यबल की निरंतर मांग बनी रहती है।`;
      }
      return `Job security in ${tradeName} is backed by steady industry demand. Based on official MSDE outcome statistics, ${placementRate}% of graduates secure employment, driven by nationwide industrial expansion and maintenance needs.`;

    case 'EARNINGS':
      if (language === 'ta') {
        return `தொடக்க நிலை சராசரி மாத வருமானம் ₹${avgSalary} ஆக உள்ளது. அனுபவம் மற்றும் திறமையின் அடிப்படையில் ₹${minSal} முதல் ₹${maxSal} வரை ஊதியம் பெறலாம். 3-5 ஆண்டுகள் அனுபவத்திற்குப் பிறகு மேற்பார்வை பொறுப்புகளில் வருமானம் மேலும் அதிகரிக்கும்.`;
      }
      if (language === 'hi') {
        return `प्रारंभिक औसत मासिक वेतन ₹${avgSalary} है। कौशल और अनुभव के आधार पर वेतन ₹${minSal} से ₹${maxSal} के बीच रहता है। 3-5 वर्षों के व्यावहारिक अनुभव के बाद सुपरवाइजर स्तर पर आय में उल्लेखनीय वृद्धि होती है।`;
      }
      return `The initial average monthly salary is ₹${avgSalary}, typically ranging from ₹${minSal} to ₹${maxSal} per month. With 3-5 years of industry experience and certifications, earnings rise progressively.`;

    case 'CAREER_GROWTH':
      if (language === 'ta') {
        return `${tradeName} படிப்பில் 5 நிலைகள் கொண்ட தெளிவான தொழில் வளர்ச்சி பாதை உள்ளது: தொடக்க பயிற்சி → தொழிற்பயிற்சி (NAPS) → ஜூனியர் டெக்னீசியன் → சீனியர் சூப்பர்வைசர் → சுயதொழில் ஒப்பந்ததாரர் வரை முன்னேறலாம்.`;
      }
      if (language === 'hi') {
        return `${tradeName} में करियर की 5 स्पष्ट सीढ़ियां हैं: आईटीआई प्रशिक्षण → अप्रेंटिसशिप (NAPS) → जूनियर तकनीशियन → वरिष्ठ पर्यवेक्षक → स्वतंत्र ठेकेदार या उद्यमी।`;
      }
      return `${tradeName} offers a structured 5-stage career pathway: ITI trainee → NAPS apprentice → junior technician → senior supervisor → independent contractor/entrepreneur.`;

    case 'SOCIAL_PERCEPTION':
      if (language === 'ta') {
        return `தற்காலத்தில் தொழில்நுட்ப வல்லுநர்களுக்கான சமூக மரியாதை அதிகரித்து வருகிறது. MSDE மற்றும் தேசிய திறன் தகுதி கட்டமைப்பு (NSQF) சான்றிதழ் அரசு மற்றும் தனியார் துறைகளில் அங்கீகரிக்கப்பட்ட தகுதியாகும். நவீன தொழில்நுட்பங்களை கையாள்வதால் குடும்பத்திற்கு பெருமை தரும் துறையாகும்.`;
      }
      if (language === 'hi') {
        return `आज के समय में कुशल तकनीकी विशेषज्ञों के प्रति सामाजिक दृष्टिकोण में बड़ा सकारात्मक बदलाव आया है। राष्ट्रीय कौशल योग्यता ढांचा (NSQF) प्रमाणन केंद्र और राज्य सरकारों द्वारा पूरी तरह मान्यता प्राप्त है।`;
      }
      return `Perceptions of skilled technical vocations are shifting positively. NSQF-certified professionals hold recognized government qualifications, and essential technical expertise is held in high esteem.`;

    case 'FURTHER_EDUCATION':
      if (language === 'ta') {
        const routes = trade.furtherEducation.slice(0, 2).join(' மற்றும் ');
        return `தொழிற்கல்வி முடிந்ததும் உயர்கல்வி படிக்க வாய்ப்புகள் உள்ளன. பாலிடெக்னிக் டிப்ளோமாவுக்கு நேரடி 2-ஆம் ஆண்டு சேர்க்கை (Lateral Entry) மற்றும் ${routes} போன்ற உயர் படிப்புகளை தொடரலாம்.`;
      }
      if (language === 'hi') {
        const routes = trade.furtherEducation.slice(0, 2).join(' और ');
        return `आईटीआई के बाद उच्च शिक्षा के रास्ते खुले हैं। छात्र सीधे पॉलिटेक्निक डिप्लोमा के दूसरे वर्ष (लेटरल एंट्री) में प्रवेश ले सकते हैं अथवा ${routes} का विकल्प चुन सकते हैं।`;
      }
      return `Vocational education offers viable academic pathways. Graduates can pursue lateral entry into 2nd year Polytechnic Diplomas and subsequent engineering degrees (${trade.furtherEducation.slice(0, 2).join(', ')}).`;

    case 'SAFETY':
      if (language === 'ta') {
        return `அனைத்து ITI பயிற்சி மையங்கள் மற்றும் தொழில் நிறுவனங்களில் சர்வதேச பாதுகாப்பு நெறிமுறைகள் (PPE, உபகரண சோதனைகள், முதலுதவி) கட்டாயமாக பயிற்றுவிக்கப்படுகின்றன. அரசு வழிகாட்டுதல்களின்படி பணியாளர் பாதுகாப்பு உறுதி செய்யப்படுகிறது.`;
      }
      if (language === 'hi') {
        return `सभी आईटीआई संस्थानों और औद्योगिक इकाइयों में सुरक्षा मानक (PPE किट, उपकरण परीक्षण और प्राथमिक चिकित्सा) सख्ती से लागू किए जाते हैं। सरकारी नियमों के अनुसार कार्यस्थल सुरक्षा सर्वोच्च प्राथमिकता है।`;
      }
      return `Comprehensive workplace safety standards (PPE kits, voltage/tool safety protocols, and emergency procedures) are mandatory curriculum components under Directorate General of Training (DGT) standards.`;

    case 'TRAINING_DURATION':
      if (language === 'ta') {
        return `இப்பயிற்சியின் காலம் ${trade.trainingDuration}. தகுதி: ${trade.education}. அரசு ITI-களில் மிகக் குறைந்த கட்டணம் அல்லது இலவச கல்வி, உதவித்தொகை மற்றும் இலவச சீருடை/கருவிகள் வழங்கப்படுகின்றன.`;
      }
      if (language === 'hi') {
        return `इस कोर्स की अवधि ${trade.trainingDuration} है। न्यूनतम योग्यता: ${trade.education} है। सरकारी आईटीआई में नाममात्र शुल्क, छात्रवृत्ति और मुफ्त टूलकिट की सुविधा मिलती है।`;
      }
      return `The training duration is ${trade.trainingDuration} with eligibility: ${trade.education}. Government ITIs offer highly subsidized fees, state scholarships, and free toolkits.`;

    case 'PLACEMENT':
      if (language === 'ta') {
        return `அதிகாரப்பூர்வ தரவின்படி ${placementRate}% மாணவர்கள் வேலை பெற்றுள்ளனர். ஒவ்வொரு மாவட்டத்திலும் நடைபெறும் பிரதம மந்திரி தேசிய தொழிற்பயிற்சி மேளா (PMNAM) மற்றும் வேலைவாய்ப்பு முகாம்கள் மூலம் புகழ்பெற்ற நிறுவனங்கள் ஆட்களை தேர்வு செய்கின்றன.`;
      }
      if (language === 'hi') {
        return `उपलब्ध आंकड़ों के अनुसार प्लेसमेंट दर ${placementRate}% है। प्रधानमंत्री राष्ट्रीय शिक्षुता मेला (PMNAM) और कैंपस प्लेसमेंट के जरिए अग्रणी कंपनियां छात्रों को सीधे रोजगार देती हैं।`;
      }
      return `With a ${placementRate}% placement rate in official MSDE records, candidates regularly participate in PMNAM Rozgar Melas and institutional placement drives with leading manufacturers.`;

    case 'APPRENTICESHIP':
      return trade.apprenticeship[language] || trade.apprenticeship.en;

    case 'LOCATION':
      if (language === 'ta') {
        return `இத்தொழில் உள்ளூர் பகுதிகளிலும் பெரிய தொழில் நகரங்களிலும் பரவலான வாய்ப்புகளைக் கொண்டுள்ளது. கோயம்புத்தூர், சென்னை, ஓசூர் போன்ற தொழில் மையங்களிலும் கிராமப்புற வளர்ச்சி திட்டங்களிலும் தேவை உள்ளது.`;
      }
      if (language === 'hi') {
        return `यह ट्रेड स्थानीय और बड़े औद्योगिक शहरों दोनों में रोजगार प्रदान करता है। प्रमुख औद्योगिक क्षेत्रों और ग्रामीण अवसंरचना परियोजनाओं में नियमित रिक्तियां आती हैं।`;
      }
      return `Employment opportunities exist both locally and in major manufacturing clusters (${trade.locationRelevance.slice(0, 3).join(', ')}).`;

    default:
      if (language === 'ta') {
        return `${tradeName} படிப்பு மாணவர்களுக்கு உறுதியான திறன்களையும் நிலையான எதிர்காலத்தையும் வழங்குகிறது. மேலும் விவரங்களுக்கு கீழே உள்ள தலைப்புகளைத் தேர்ந்தெடுக்கவும் அல்லது ஆலோசகரை தொடர்பு கொள்ளவும்.`;
      }
      if (language === 'hi') {
        return `${tradeName} कोर्स छात्रों को व्यावहारिक कौशल और एक स्थिर भविष्य प्रदान करता है। विशिष्ट जानकारी के लिए नीचे दिए गए प्रश्नों को चुनें या काउंसलर से संपर्क करें।`;
      }
      return `${tradeName} offers students practical hands-on competencies and a clear path toward financial independence. Select a specific topic below or request human counsellor support.`;
  }
}
