import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, X } from 'lucide-react';
import './CookieBanner.css';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already dismissed the banner
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      // Show immediately or with a slight delay
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="cookie-banner"
          role="status"
          aria-label="Cookie Consent Banner"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
          <div className="cookie-container">
            <div className="cookie-content">
              <ShieldCheck className="cookie-icon" size={24} />
              <div className="cookie-text">
                <p>
                  <strong>Privacy & Cookies</strong>
                </p>
                <p className="cookie-desc">
                  Wij gebruiken uitsluitend strict noodzakelijke functionele cookies om deze website optimaal te laten werken. Door verder te gaan gaat u hiermee akkoord.
                </p>
              </div>
            </div>
            <div className="cookie-actions">
              <button onClick={handleDismiss} className="btn btn-primary cookie-btn">
                Begrepen
              </button>
              <button onClick={handleDismiss} className="cookie-close-btn" aria-label="Sluiten">
                <X size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
