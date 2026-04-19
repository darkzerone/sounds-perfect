import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { seoMetadata } from '../data/seo_metadata';

export default function SEOHelmet({ title, description, image, type = 'website', children }) {
  const location = useLocation();
  const path = location.pathname;
  
  // Lookup with config fallback
  const defaultMeta = seoMetadata[path] || {
    title: 'Sounds Perfect | Licht en geluid verhuur in alle soorten en maten',
    description: 'Sounds Perfect: Professionele licht en geluid verhuur in de regio Utrecht. Topkwaliteit apparatuur voor feesten, festivals en bedrijfsevenementen.'
  };

  const metaTitle = title || defaultMeta.title;
  const metaDesc = description || defaultMeta.description;
  const canonicalUrl = `https://www.sounds-perfect.nl${path}`;

  return (
    <Helmet>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDesc} />
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hreflang="nl" href={canonicalUrl} />
      <link rel="alternate" hreflang="x-default" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:url" content={canonicalUrl} />
      {image && <meta property="og:image" content={image} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDesc} />
      {image && <meta name="twitter:image" content={image} />}

      {/* Children for Structured Data scripts etc */}
      {children}
    </Helmet>
  );
}
