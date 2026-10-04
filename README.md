# 🎯 Family Career Counselling (FCC) — MSDE
**AI-Assisted Family Decision Support for Vocational Education**

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&logoColor=white)
![UX4G](https://img.shields.io/badge/Design_System-UX4G_v3.3.0-emerald)

> **Official Platform for the Ministry of Skill Development and Entrepreneurship (MSDE).**  
> *Developed to combat familial hesitation regarding vocational trades through multi-lingual AI dialogue anchored by hard statistical outcome evidence.*

---

## 📖 Executive Summary
Millions of rural youth in India want to pursue vocational training (ITI/Polytechnic), but face fierce resistance from their families. Parents harbor deep-seated doubts about **job security, starting salaries, and societal dignity**. 

The **Family Career Counselling (FCC)** platform is a comprehensive, AI-driven intervention tool designed to bridge this confidence gap. By moving away from "student-only" aptitude tests, FCC brings the entire family into the fold, answering their most pressing anxieties in their native language (Tamil, Hindi, English), and backing up every claim with official **Ground Truth Outcome Evidence** from the MSDE.

---

## 🏗️ System Architecture & Data Flow

Our platform operates on a **Tri-Pillar Architecture** to ensure trust and scalability:

1. **Contextual Ingestion Engine (Onboarding):**
   Captures multi-dimensional familial context (Income bracket, Region, Initial Trade Interest, and specific parental anxieties like "Safety" or "Social Perception").
2. **Deterministic AI Conversational Agent:**
   Utilizes a local intent-detection engine to parse vernacular queries. Instead of hallucinating answers, the AI fetches verified statistics (Placement Rates, NAPS Apprenticeship availability) and weaves them into culturally empathetic responses.
3. **Escalation & Telemetry Layer (Internal Portals):**
   When the AI detects high persistent anxiety, it automatically triggers a referral queue in the **District Counsellor Portal**. Meanwhile, all anonymous session data is aggregated into the **Central Admin Analytics Dashboard** for policy planning.

---

## ✨ Core Modules & Features

### 1. The "Ground Truth" Workspace
The core UI features a 3-column synchronous layout:
*   **Left (Family Context):** Tracks real-time decision readiness and tracks shifted sentiment.
*   **Center (Multilingual AI):** Handles the dialogue in the user's preferred vernacular.
*   **Right (Outcome Evidence):** A strict, read-only pane that displays live MSDE statistics (Salary ranges, Placement %) so the family knows the AI is not fabricating data.

### 2. 5-Stage Career Pathway Visualizer
Combats the myth that "ITI jobs are dead-ends." Visually maps out the trajectory from Trainee ➔ Technician ➔ Supervisor ➔ Entrepreneur for 8 major trades.

### 3. "Simple Mode" for Extreme Accessibility
Designed for rural elders and low-literacy users.
*   High-contrast, 20% larger typography.
*   Distraction-free Q&A cards.
*   **Text-to-Speech (TTS) Voice Read-Aloud** functionality so illiterate parents can listen to the AI's guidance.

### 4. Secure Staff Access (Auth-Gated)
*   **Central Admin Analytics:** Visualizes state-wide parental hesitation trends using `Recharts`.
*   **District Counsellor Queue:** A case-management portal where human counsellors can pick up escalated cases and record follow-up notes.

---

## 🛠️ Technology Stack

*   **Frontend Framework:** React 18 + Vite (Strict Mode enabled)
*   **Styling & Design System:** Tailwind CSS v4 using the **UX4G Government Design Standard** tokens.
*   **State Management:** React Context API + Secure `LocalStorage` Persistence Engine
*   **Data Visualization:** Recharts
*   **Icons:** Lucide React
*   **Internationalization:** `react-i18next` (Supports English, Tamil, Hindi)

---

## 🚀 Local Development Setup

To run the application locally in a development environment:

```bash
# 1. Clone the repository
git clone https://github.com/your-org/family-career-counselling.git

# 2. Navigate into the directory
cd family-career-counselling/frontend

# 3. Install dependencies
npm install

# 4. Start the Vite development server
npm run dev
```

*The application will be available at `http://localhost:5173`. Any changes made to the source files will hot-reload immediately.*

---

## 🔒 Security & Privacy (Compliance)

*   **Zero PII Retention:** The AI dialogue engine processes concerns anonymously. Names and explicit locations are masked before analytics aggregation.
*   **Client-Side Persistence:** Session data is persisted locally via `localStorage` to ensure a seamless experience over unreliable rural internet connections, minimizing redundant server round-trips.
*   **Role-Based Access Control (RBAC):** Internal MSDE staff dashboards are protected by simulated authorization guards.

---

## 👨‍💻 Team & Acknowledgments
Built with ❤️ for the **Ministry of Skill Development and Entrepreneurship (MSDE)** initiative. Special thanks to MSDE experts and counselors for providing the domain context and outcome parameters needed to build a truly empathetic system.
