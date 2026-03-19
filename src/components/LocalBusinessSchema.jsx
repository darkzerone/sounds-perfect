import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function LocalBusinessSchema() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Sounds Perfect",
    "description": "Sounds Perfect: Professionele licht en geluid verhuur in de regio Utrecht. Topkwaliteit apparatuur voor feesten, festivals en bedrijfsevenementen.",
    "image": "https://sounds-perfect.nl/logo.png",
    "@id": "https://sounds-perfect.nl/#localbusiness",
    "url": "https://sounds-perfect.nl",
    "telephone": "+31 30 293 12 12",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Coloradodreef 22",
      "addressLocality": "Utrecht",
      "postalCode": "3565 BT",
      "addressCountry": "NL"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
}
