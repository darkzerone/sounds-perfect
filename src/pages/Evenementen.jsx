import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Music, Users, Briefcase, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './Verhuur.css';

export default function Evenementen() {
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
    <div className="verhuur-page"> {/* Reusing base structural classes */}
      <Helmet>
        <title>Evenementen Productie Utrecht | Sounds Perfect</title>
        <meta name="description" content="Complete technische ontzorging voor uw evenement in de regio Utrecht. Professionele licht, beeld en geluidsproductie voor bedrijfsfeesten en festivals." />
        <link rel="canonical" href="https://sounds-perfect.nl/evenementen" />
        <meta property="og:title" content="Evenementen Productie Utrecht | Sounds Perfect" />
        <meta property="og:description" content="Complete technische ontzorging voor uw evenement in de regio Utrecht. Professionele licht, beeld en geluidsproductie voor bedrijfsfeesten en festivals." />
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
            Evenementen
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="hero-subtitle mb-0"
          >
            Professionele technische productie voor elke gelegenheid
          </motion.p>
        </div>
      </div>

      <div className="container py-8">
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
                 <img src="/event.png" alt="Event Lighting Stage" className="w-full h-auto object-cover max-h-[400px]" fetchpriority="high" />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)'}}>Licht & Beeld Productie</h2>
                <p className="mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)'}}>
                  Of het nu gaat om een zakelijk evenement in Utrecht centrum, een publiek festival of een intiem privéfeest in de regio, de juiste technische omlijsting is cruciaal voor het slagen van uw evenement. Sounds-Perfect.nl biedt complete ontzorging op het gebied van licht, geluid en beeld.
                </p>
                <p className="mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)'}}>
                  Onze ervaren technici begeleiden uw project van concept tot uitvoering. Met state-of-the-art apparatuur en creatieve lichtontwerpen transformeren wij elke locatie in een beleving die uw gasten niet snel zullen vergeten.
                </p>
                <div className="flex gap-4">
                  <Link to="/contact" state={{ subject: 'Vraag over Evenementen' }} className="btn btn-primary">
                    Neem Contact Op <ArrowRight size={18} className="ml-2" />
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
            <motion.div variants={itemVariants} className="sidebar-widget glass-panel p-6 mb-4">
              <h3 className="text-xl font-semibold mb-4 border-b pb-2" style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)'}}>Soorten Evenementen</h3>
              <ul className="category-list">
                <li className="flex items-center gap-3 py-3 border-b" style={{ borderColor: 'var(--border-color)' }}>
                  <Users className="text-brand-blue" size={20} />
                  <Link to="/evenementen/type/feesten-partijen" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }} className="hover:text-brand-blue transition-colors">Bruiloften & Feesten</Link>
                </li>
                <li className="flex items-center gap-3 py-3 border-b" style={{ borderColor: 'var(--border-color)' }}>
                  <Music className="text-brand-blue" size={20} />
                  <Link to="/evenementen/type/festival-podium-dance" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }} className="hover:text-brand-blue transition-colors">Festivals & Dance</Link>
                </li>
                <li className="flex items-center gap-3 py-3">
                  <Briefcase className="text-brand-blue" size={20} />
                  <Link to="/evenementen/type/zakelijke-evenementen" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }} className="hover:text-brand-blue transition-colors">Zakelijk</Link>
                </li>
              </ul>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
