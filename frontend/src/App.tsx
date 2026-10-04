// ============================================================
// Main Application Component
// ============================================================

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CounsellingProvider } from './context/CounsellingContext';
import { AppRouter } from './app/Router';
import './i18n';

function App() {
  return (
    <BrowserRouter>
      <CounsellingProvider>
        <AppRouter />
      </CounsellingProvider>
    </BrowserRouter>
  );
}

export default App;
