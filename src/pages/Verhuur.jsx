import React from 'react';
import { motion } from 'framer-motion';
import { Speaker, Settings, Video, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './Verhuur.css';

export default function Verhuur() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
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

  return (
    <div className="verhuur-page">
      <Helmet>
        <title>Audio &amp; Licht Verhuur Utrecht | Sounds Perfect</title>
        <meta name="description" content="Bekijk ons uitgebreide assortiment aan professionele audio, licht en podium verhuur in Midden-Nederland en de hele regio Utrecht." />
        <link rel="canonical" href="https://sounds-perfect.nl/verhuur" />
        <meta property="og:title" content="Audio & Licht Verhuur Utrecht | Sounds Perfect" />
        <meta property="og:description" content="Bekijk ons uitgebreide assortiment aan professionele audio, licht en podium verhuur in Midden-Nederland en de hele regio Utrecht." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <div className="hero-section hero-small">
        <div className="hero-background">
          <div className="hero-pattern"></div>
        </div>
        <div className="hero-content text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="hero-title"
          >
            Verhuur
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="hero-subtitle mb-0"
          >
            Hoogwaardige apparatuur voor elk evenement
          </motion.p>
        </div>
      </div>

      <div className="container verhuur-container mx-auto">
        <div className="verhuur-grid">
          
          {/* Main Content Area */}
          <motion.div 
            className="verhuur-main"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="content-block glass-panel mb-4">
              <div className="content-image overflow-hidden rounded-t-lg">
               <img src="/rental.png" alt="Audio Equipment Rental" className="w-full h-auto object-cover max-h-[400px]" fetchpriority="high" />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)'}}>Licht en Geluid Verhuur</h2>
                <p className="mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)'}}>
                  Sounds-Perfect.nl is dé specialist voor <strong>audio en licht verhuur in Utrecht</strong> en omstreken. Wij hebben een zeer breed verhuurpakket en kunnen tot 2500 man publiek geheel vanuit eigen verhuur voorraad ondersteunen. Van de kleinschaligheid van een verjaardagsfeest of bruiloft tot een groot festival: wij hebben altijd een passend aanbod voor uw licht en geluid verhuur wensen.
                </p>
                <p className="mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)'}}>
                  Naast volledige ondersteuning kunt u bij ons ook terecht voor losse licht, geluid en podium verhuur. Ook beamers, truss systemen en exclusieve DJ gear hebben wij uitgebreid in onze voorraad.
                </p>
                <div className="flex gap-4">
                  <Link to="/contact" state={{ subject: 'Offerteaanvraag Verhuur' }} className="btn btn-primary">
                    Vraag offerte aan <ArrowRight size={18} className="ml-2" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Sidebar Area */}
          <motion.div 
            className="verhuur-sidebar"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="sidebar-widget glass-panel p-6 mb-4 mt-8 md:mt-0">
              <h3 className="text-xl font-semibold mb-4 border-b pb-2" style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)'}}>Onze categorieën</h3>
              <ul className="category-list">
                <li className="flex items-center gap-3 py-3 border-b" style={{ borderColor: 'var(--border-color)' }}>
                  <Speaker className="text-brand-blue" size={20} />
                  <Link to="/verhuur/dienst/geluid-huren" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }} className="hover:text-brand-blue transition-colors">Geluid</Link>
                </li>
                <li className="flex items-center gap-3 py-3 border-b" style={{ borderColor: 'var(--border-color)' }}>
                  <Settings className="text-brand-blue" size={20} />
                  <Link to="/verhuur/dienst/licht-huren" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }} className="hover:text-brand-blue transition-colors">Licht</Link>
                </li>
                <li className="flex items-center gap-3 py-3 border-b" style={{ borderColor: 'var(--border-color)' }}>
                  <Video className="text-brand-blue" size={20} />
                  <Link to="/verhuur/dienst/beamer-huren" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }} className="hover:text-brand-blue transition-colors">Beamer</Link>
                </li>
                <li className="flex items-center gap-3 py-3 border-b" style={{ borderColor: 'var(--border-color)' }}>
                  <div className="w-5 h-5 flex items-center justify-center text-brand-blue font-bold">P</div>
                  <Link to="/verhuur/dienst/podium-huren" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }} className="hover:text-brand-blue transition-colors">Podium</Link>
                </li>
                <li className="flex items-center gap-3 py-3 border-b" style={{ borderColor: 'var(--border-color)' }}>
                  <div className="w-5 h-5 flex items-center justify-center text-brand-blue font-bold">A</div>
                  <Link to="/verhuur/dienst/audiovisuele-verhuur" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }} className="hover:text-brand-blue transition-colors">Audiovisueel</Link>
                </li>
                <li className="flex items-center gap-3 py-3">
                  <div className="w-5 h-5 flex items-center justify-center text-brand-blue font-bold">T</div>
                  <Link to="/verhuur/dienst/transport" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }} className="hover:text-brand-blue transition-colors">Transport</Link>
                </li>
              </ul>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
