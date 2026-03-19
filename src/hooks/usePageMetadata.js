import { useLocation } from 'react-router-dom';
import { seoMetadata } from '../data/seo_metadata';

export default function usePageMetadata(fallbackData = {}) {
  const location = useLocation();
  const path = location.pathname;

  const defaultMeta = seoMetadata[path] || {
    title: fallbackData.title || 'Sounds Perfect | Licht en geluid verhuur in alle soorten en maten',
    description: fallbackData.description || 'Sounds Perfect: Professionele licht en geluid verhuur. Topkwaliteit apparatuur voor feesten, festivals en bedrijfsevenementen.'
  };

  return {
    title: defaultMeta.title,
    description: defaultMeta.description,
    canonicalUrl: `https://sounds-perfect.nl${path}`,
    path
  };
}
