import { motion } from 'framer-motion';
import React from 'react';
import { useParams, Navigate, Link, useSearchParams } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { getEventById } from '../data/events';
import { getRegionById } from '../data/regions';
import './Subpage.css';

export default function EventPage() {
  const { eventId } = useParams();
  const [searchParams] = useSearchParams();
  const event = getEventById(eventId);

  const regioParam = searchParams.get('regio');
  const activeRegion = regioParam ? getRegionById(regioParam) : null;
  const locationKeyword = activeRegion ? activeRegion.name : 'Utrecht';

  // Redirect to evenementen index if invalid event id
  if (!event) {
    return <Navigate to="/evenementen" replace />;
  }

  const Icon = event.icon;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  return (
    <div className="subpage-container">
      <SEOHelmet 
        title={`${event.title} ${locationKeyword} | Technische Productie | Sounds Perfect`}
        description={`${event.description} in ${locationKeyword} en omstreken.`}
        image={event.image}
      >
        <link rel="canonical" href={`https://sounds-perfect.nl/evenementen/type/${eventId}${regioParam ? `?regio=${regioParam}` : ''}`} />
        <meta property="og:title" content={`${event.title} | Sounds Perfect`} />
        <meta property="og:description" content={event.description} />
        <meta property="og:image" content={event.image} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />

        {/* Service Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": event.title,
            "description": event.description,
            "provider": {
              "@type": "LocalBusiness",
              "name": "Sounds Perfect",
              "image": "https://sounds-perfect.nl/logo.png"
            },
            "areaServed": {
              "@type": "City",
              "name": locationKeyword
            }
          })}
        </script>
      </SEOHelmet>

      {/* Hero Header */}
      <div className="subpage-hero">
        <div className="subpage-hero-bg">
          <img 
            src={event.image.startsWith('http') ? `${event.image}&w=1200` : event.image} 
            srcSet={event.image.startsWith('http') ? `${event.image}&w=640 640w, ${event.image}&w=1024 1024w, ${event.image}&w=1600 1600w` : undefined}
            sizes="100vw"
            alt={event.title} 
            className="subpage-hero-img"
            fetchPriority="high" 
          />
          <div className="subpage-hero-overlay" />
        </div>
        
        <div className="subpage-hero-content">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="subpage-hero-content"
          >
            <div className="subpage-icon-wrapper">
              <Icon size={48} />
            </div>
            <h1 className="subpage-title">{event.title} in {locationKeyword}</h1>
            <p className="subpage-desc">
              {event.description}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="subpage-content">
        <Link to="/evenementen" className="subpage-back-link">
          <ArrowLeft size={18} /> Terug naar Evenementen
        </Link>
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >

          {/* Rich Text Content */}
          {event.sections && event.sections.length > 0 && (
            <motion.div variants={itemVariants} className="subpage-text-content">
              {event.sections.map((section, idx) => (
                <div key={idx} className="subpage-text-section">
                  <h2>{section.title}</h2>
                  {section.paragraphs.map((p, pIdx) => (
                    <div 
                      key={pIdx} 
                      className="subpage-text-p"
                      dangerouslySetInnerHTML={{ __html: p }} 
                    />
                  ))}
                </div>
              ))}
            </motion.div>
          )}

          {/* Features Grid */}
          <motion.div variants={itemVariants} className="subpage-features-grid">
            {event.features.map((feature, idx) => (
              <div key={idx} className="glass-panel subpage-feature-card">
                <CheckCircle2 className="shrink-0 mt-1" style={{ color: 'var(--brand-blue)' }} size={24} />
                <p>{feature}</p>
              </div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div variants={itemVariants} className="subpage-cta">
            <h2>Hulp nodig bij {event.title.toLowerCase()}?</h2>
            <p>Neem contact met ons op om te bespreken hoe wij uw evenement tot een succes kunnen maken.</p>
            <Link 
              to={`/contact?subject=Vraag%20over%20${encodeURIComponent(event.title)}%20in%20${encodeURIComponent(locationKeyword)}`} 
              className="btn btn-primary"
            >
              Neem direct contact op
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
