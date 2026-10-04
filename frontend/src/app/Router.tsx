// ============================================================
// Application Router
// ============================================================

import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { PageWrapper } from '../components/layout/PageWrapper';
import { LandingPage } from '../pages/LandingPage';
import { OnboardingPage } from '../pages/OnboardingPage';
import { CounsellingPage } from '../pages/CounsellingPage';
import { CareerExplorerPage } from '../pages/CareerExplorerPage';
import { TradeDetailPage } from '../pages/TradeDetailPage';
import { TradeComparisonPage } from '../pages/TradeComparisonPage';
import { SimpleModePage } from '../pages/SimpleModePage';
import { CounsellorDashboardPage } from '../pages/CounsellorDashboardPage';
import { AdminDashboardPage } from '../pages/AdminDashboardPage';

import { useCounselling } from '../context/CounsellingContext';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export const AppRouter: React.FC = () => {
  const { isSimpleMode, toggleSimpleMode } = useCounselling();

  return (
    <PageWrapper
      isSimpleMode={isSimpleMode}
      onToggleSimpleMode={toggleSimpleMode}
    >
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/counselling" element={<CounsellingPage />} />
        <Route path="/careers" element={<CareerExplorerPage />} />
        <Route path="/careers/:tradeId" element={<TradeDetailPage />} />
        <Route path="/compare" element={<TradeComparisonPage />} />
        <Route path="/simple" element={<SimpleModePage />} />
        <Route path="/counsellor" element={<CounsellorDashboardPage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </PageWrapper>
  );
};
