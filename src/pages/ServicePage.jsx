import { motion } from 'framer-motion';
import React from 'react';
import { useParams, Navigate, Link, useSearchParams } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { getServiceById } from '../data/services';
import { getRegionById } from '../data/regions';
import './Subpage.css';

export default function ServicePage() {
  const { serviceId } = useParams();
  const [searchParams] = useSearchParams();
  const service = getServiceById(serviceId);

  const regioParam = searchParams.get('regio');
  const activeRegion = regioParam ? getRegionById(regioParam) : null;
  const locationKeyword = activeRegion ? activeRegion.name : 'Utrecht';

  // Redirect to verhuur index if invalid service id
  if (!service) {
    return <Navigate to="/verhuur" replace />;
  }

  const Icon = service.icon;

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
        title={`${service.title} ${locationKeyword} | Professionele Verhuur | Sounds Perfect`}
        description={`${service.description} in ${locationKeyword} en omstreken.`}
        image={service.image}
      >
        <link rel="canonical" href={`https://sounds-perfect.nl/verhuur/dienst/${serviceId}${regioParam ? `?regio=${regioParam}` : ''}`} />
        <meta property="og:title" content={`${service.title} | Sounds Perfect`} />
        <meta property="og:description" content={service.description} />
        <meta property="og:image" content={service.image} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />

        {/* Service Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": service.title,
            "description": service.description,
            "provider": {
              "@type": "ProfessionalService",
              "@id": "https://sounds-perfect.nl/#localbusiness"
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
            src={service.image.startsWith('http') ? `${service.image}&w=1200` : service.image} 
            srcSet={service.image.startsWith('http') ? `${service.image}&w=640 640w, ${service.image}&w=1024 1024w, ${service.image}&w=1600 1600w` : undefined}
            sizes="100vw"
            alt={service.title} 
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
            <h1 className="subpage-title">{service.title} in {locationKeyword}</h1>
            <p className="subpage-desc">
              {service.description}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="subpage-content">
        <Link to="/verhuur" className="subpage-back-link">
          <ArrowLeft size={18} /> Terug naar Verhuur
        </Link>
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >

          {/* Rich Text Content */}
          {service.sections && service.sections.length > 0 && (
            <motion.div variants={itemVariants} className="subpage-text-content">
              {service.sections.map((section, idx) => (
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
            {service.features.map((feature, idx) => (
              <div key={idx} className="glass-panel subpage-feature-card">
                <CheckCircle2 className="shrink-0 mt-1" style={{ color: 'var(--brand-blue)' }} size={24} />
                <p>{feature}</p>
              </div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div variants={itemVariants} className="subpage-cta">
            <h2>{service.ctaTitle || `Interesse in ${service.title.toLowerCase()}?`}</h2>
            <p>Neem vrijblijvend contact met ons op voor een offerte op maat of meer informatie.</p>
            <Link 
              to={`/contact?subject=Offerteaanvraag%20${encodeURIComponent(service.title)}%20in%20${encodeURIComponent(locationKeyword)}`} 
              className="btn btn-primary"
            >
              Vraag een offerte aan
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
