import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';
import ScrollToTop from './components/ScrollToTop';
import BreadcrumbSchema from './components/BreadcrumbSchema';











import useAnalytics from './hooks/useAnalytics';

import './index.css';
const Home = lazy(() => import('./pages/Home'));
const Contact = lazy(() => import('./pages/Contact'));
const Stream = lazy(() => import('./pages/Stream'));
const Verhuur = lazy(() => import('./pages/Verhuur'));
const Evenementen = lazy(() => import('./pages/Evenementen'));
const ServicePage = lazy(() => import('./pages/ServicePage'));
const EventPage = lazy(() => import('./pages/EventPage'));
const Location = lazy(() => import('./pages/Location'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const Privacy = lazy(() => import('./pages/Privacy'));
const NotFound = lazy(() => import('./pages/NotFound'));

function AppContent({ isAuthenticated, setIsAuthenticated }) {
  useAnalytics();
  return (
    <div className="app-container">
      <Navbar />
      <BreadcrumbSchema />
      <main className="main-content">
        <Suspense fallback={<div style={{ padding: "4rem", textAlign: "center", color: "var(--brand-blue)", minHeight: "80vh" }}>Laden...</div>}>
        <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/verhuur" element={<Verhuur />} />
              <Route path="/verhuur/:regio" element={<Location />} />
              <Route path="/verhuur/dienst/:serviceId" element={<ServicePage />} />
              <Route path="/evenementen" element={<Evenementen />} />
              <Route path="/evenementen/type/:eventId" element={<EventPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/stream/:id" element={<Stream />} />
              <Route 
                path="/admin" 
                element={isAuthenticated ? <Navigate to="/admin/dashboard" /> : <AdminLogin onLogin={setIsAuthenticated} />} 
              />
              <Route 
                path="/admin/dashboard" 
                element={isAuthenticated ? <AdminDashboard onLogout={() => setIsAuthenticated(false)} /> : <Navigate to="/admin" />} 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <CookieBanner />
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AppContent isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
