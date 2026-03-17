import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Speaker, Video, Settings, Mic } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import './Home.css';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  const carouselImages = [
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1400&auto=format&fit=crop', // Concert/Stage
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1400&auto=format&fit=crop', // Wedding
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1400&auto=format&fit=crop'  // Corporate
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-page">
      <Helmet>
        <title>Licht en Geluid Verhuur Utrecht | Sounds Perfect</title>
        <meta name="description" content="Professionele licht en geluid verhuur in de regio Utrecht. Van bruiloften tot grote festivals, Sounds Perfect biedt topkwaliteit apparatuur en service." />
        <link rel="canonical" href="https://sounds-perfect.nl/" />
        <meta property="og:title" content="Licht en Geluid Verhuur Utrecht | Sounds Perfect" />
        <meta property="og:description" content="Professionele licht en geluid verhuur in de regio Utrecht. Van bruiloften tot grote festivals, Sounds Perfect biedt topkwaliteit apparatuur en service." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        
        {/* LocalBusiness Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Sounds Perfect",
            "image": "https://sounds-perfect.nl/logo.png",
            "description": "Professionele licht en geluid verhuur in de regio Utrecht.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Coloradodreef 22",
              "addressLocality": "Utrecht",
              "postalCode": "3565 BT",
              "addressCountry": "NL"
            },
            "telephone": "+31302931212",
            "url": "https://sounds-perfect.nl/",
            "priceRange": "$$"
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <AnimatePresence>
            <motion.img
              key={currentImageIndex}
              src={carouselImages[currentImageIndex]}
              alt="Event achtergrond - professionele licht en geluid verhuur"
              className="carousel-image"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              fetchpriority={currentImageIndex === 0 ? 'high' : 'auto'}
            />
          </AnimatePresence>
          <div className="hero-overlay"></div>
          <div className="hero-pattern"></div>
        </div>
        
        <motion.div 
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={itemVariants} className="hero-title text-white">
            Sounds Perfect
          </motion.h1>
          <motion.h2 variants={itemVariants} className="hero-subtitle text-white">
            Licht en geluid verhuur in de regio Utrecht
          </motion.h2>
          <motion.p variants={itemVariants} className="hero-description">
            Van de kleinschaligheid van een bruiloft tot een groot festival: wij hebben altijd een passend aanbod voor uw licht- en geluidswensen.
          </motion.p>
          <motion.div variants={itemVariants} className="hero-actions">
            <Link to="/contact" className="btn btn-primary">
              Neem Contact Op <ArrowRight size={18} className="ml-2" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Services Overview */}
      <section className="services-section">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="services-header"
          >
            <h2 className="text-3xl font-bold mb-4 text-center">Onze diensten</h2>
            <p className="text-center text-lg text-gray-600 max-w-2xl mx-auto">Premium kwaliteit apparatuur en professionele ondersteuning</p>
          </motion.div>

          <div className="services-grid">
            <Link to="/verhuur">
              <ServiceCard 
                icon={<Speaker size={32} />}
                title="Geluid"
                description="Topkwaliteit audiosystemen voor kristalhelder geluid op elk evenement."
              />
            </Link>
            <Link to="/evenementen">
              <ServiceCard 
                icon={<Settings size={32} />}
                title="Licht & Podium"
                description="Sfeervolle verlichting, indrukwekkende lichtshows en podiumdelen voor een complete ervaring."
              />
            </Link>
            <Link to="/contact">
              <ServiceCard 
                icon={<Mic size={32} />}
                title="Livestreams"
                description="Professionele en respectvolle registratie en uitzending van uitvaarten en evenementen."
              />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function ServiceCard({ icon, title, description }) {
  return (
    <motion.div 
      className="service-card glass-panel"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="service-icon">{icon}</div>
      <h3 className="service-title">{title}</h3>
      <p className="service-description">{description}</p>
    </motion.div>
  );
}
