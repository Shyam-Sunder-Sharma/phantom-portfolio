import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { CmsProvider } from './context/CmsContext';
import HomePage from './pages/HomePage';
import CmsPage from './pages/CmsPage';

export const App = () => {
  return (
    <ThemeProvider>
      <CmsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/phantom-cms" element={<CmsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </CmsProvider>
    </ThemeProvider>
  );
};

export default App;
