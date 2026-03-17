import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Stream from './pages/Stream';
import Verhuur from './pages/Verhuur';
import Evenementen from './pages/Evenementen';
import ServicePage from './pages/ServicePage';
import EventPage from './pages/EventPage';
import Location from './pages/Location';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Privacy from './pages/Privacy';
import './index.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="app-container">
          <Navbar />
          <main className="main-content">
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
            </Routes>
          </main>
          <Footer />
          <CookieBanner />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
