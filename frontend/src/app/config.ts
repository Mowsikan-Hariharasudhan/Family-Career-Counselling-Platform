// ============================================================
// Application Configuration
// 
// IMPORTANT: Do not hard-code APP_DISPLAY_NAME throughout the application.
// Always reference these constants. The final product name will be set here.
// ============================================================

export const APP_CONFIG = {
  APP_DISPLAY_NAME: "Family Career Counselling",
  APP_SUBTITLE: "AI-assisted family decision support for vocational education",
  APP_MINISTRY: "Ministry of Skill Development and Entrepreneurship",
  APP_MINISTRY_SHORT: "MSDE",
  APP_THEME: "Smart Education",
  APP_CATEGORY: "Software",
  APP_EVENT: "Government of India",
  DATA_DISCLAIMER: "Official MSDE dataset purposes only",
  AI_DISCLAIMER: "AI-generated explanation based on available outcome data",
  SUPPORTED_LANGUAGES: ["en", "ta", "hi"] as const,
  DEFAULT_LANGUAGE: "en" as const,
  API_BASE_URL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  GEMINI_AVAILABLE: import.meta.env.VITE_GEMINI_KEY ? true : false,
} as const;

export type SupportedLanguage = typeof APP_CONFIG.SUPPORTED_LANGUAGES[number];
