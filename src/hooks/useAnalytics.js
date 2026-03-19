import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function useAnalytics() {
  const location = useLocation();

  useEffect(() => {
    // Analytics page view tracking placeholder
    // Example: if (window.gtag) window.gtag('config', 'GA_ID', { page_path: location.pathname });
    console.log(`[Analytics] Page View: ${location.pathname}`);
  }, [location]);
}
