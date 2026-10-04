// ============================================================
// Onboarding Page
// ============================================================

import React from 'react';
import { OnboardingWizard } from '../components/onboarding/OnboardingWizard';

export const OnboardingPage: React.FC = () => {
  return (
    <div className="py-4">
      <OnboardingWizard />
    </div>
  );
};
