import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useParams } from 'react-router-dom';
import { getServiceById } from '../data/services';
import { getEventById } from '../data/events';
import { getRegionById } from '../data/regions';

const BASE_URL = 'https://www.sounds-perfect.nl';

/**
 * Generates BreadcrumbList structured data based on the current route.
 * Hierarchy:
 *   Home
 *   Home > Verhuur
 *   Home > Verhuur > [Service]
 *   Home > Verhuur > [Region]
 *   Home > Evenementen
 *   Home > Evenementen > [Event Type]
 *   Home > Contact
 *   Home > Privacy
 */
function useBreadcrumbs() {
  const location = useLocation();
  const path = location.pathname;

  // Always start with Home
  const crumbs = [{ name: 'Home', url: `${BASE_URL}/` }];

  // /verhuur routes
  if (path.startsWith('/verhuur')) {
    crumbs.push({ name: 'Verhuur', url: `${BASE_URL}/verhuur` });

    // /verhuur/dienst/:serviceId
    const serviceMatch = path.match(/^\/verhuur\/dienst\/(.+)/);
    if (serviceMatch) {
      const service = getServiceById(serviceMatch[1]);
      if (service) {
        crumbs.push({ name: service.title, url: `${BASE_URL}/verhuur/dienst/${service.id}` });
      }
    }

    // /verhuur/:regio (region pages)
    const regionMatch = path.match(/^\/verhuur\/([^/]+)$/);
    if (regionMatch && regionMatch[1] !== 'dienst') {
      const region = getRegionById(regionMatch[1]);
      if (region) {
        crumbs.push({ name: region.name, url: `${BASE_URL}/verhuur/${region.id}` });
      }
    }
  }

  // /evenementen routes
  else if (path.startsWith('/evenementen')) {
    crumbs.push({ name: 'Evenementen', url: `${BASE_URL}/evenementen` });

    const eventMatch = path.match(/^\/evenementen\/type\/(.+)/);
    if (eventMatch) {
      const event = getEventById(eventMatch[1]);
      if (event) {
        crumbs.push({ name: event.title, url: `${BASE_URL}/evenementen/type/${event.id}` });
      }
    }
  }

  // /contact
  else if (path === '/contact') {
    crumbs.push({ name: 'Contact', url: `${BASE_URL}/contact` });
  }

  // /privacy
  else if (path === '/privacy') {
    crumbs.push({ name: 'Privacybeleid', url: `${BASE_URL}/privacy` });
  }

  return crumbs;
}

export default function BreadcrumbSchema() {
  const crumbs = useBreadcrumbs();

  // Don't output schema if we only have "Home" (homepage itself)
  if (crumbs.length <= 1) return null;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
}
