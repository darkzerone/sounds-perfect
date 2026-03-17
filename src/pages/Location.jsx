import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Speaker, Settings, Video, ArrowRight, MapPin } from 'lucide-react';
import { getRegionById } from '../data/regions';
import './Verhuur.css'; // Reusing Verhuur styles since it's fundamentally the same service page

export default function Location() {
  const { regio } = useParams();
  const regionData = getRegionById(regio);

  // If the URL region is invalid, redirect to the general verhuur page
  if (!regionData) {
    return <Navigate to="/verhuur" replace />;
  }

  const cityName = regionData.name;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
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
    <div className="verhuur-page">
      <Helmet>
        <title>{`Audio & Licht Verhuur in ${cityName} | Sounds Perfect`}</title>
        <meta name="description" content={`Dé specialist voor professionele audio, licht en podium verhuur in ${cityName}. Topkwaliteit apparatuur voor uw evenement, feest of bruiloft in de regio.`} />
        <link rel="canonical" href={`https://sounds-perfect.nl/verhuur/${regio}`} />
      </Helmet>

      <div className="hero-section hero-small">
        <div className="hero-background">
          <div className="hero-pattern"></div>
        </div>
        
        <div className="container relative z-10 px-6 mx-auto">
          <motion.div 
            className="hero-content mx-auto"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1 variants={itemVariants} className="hero-title mb-4">
              Verhuur in <span style={{ color: 'var(--brand-blue)' }}>{cityName}</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="hero-description text-lg max-w-2xl mx-auto">
              Professionele licht, geluid en podium oplossingen voor elk evenement in {cityName} en omstreken.
            </motion.p>
          </motion.div>
        </div>
      </div>

      <div className="container verhuur-container mx-auto">
        <motion.div 
          className="verhuur-grid max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Main Content Info */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="verhuur-card h-full" style={{ background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
              <div className="h-64 overflow-hidden">
                <img 
                  src="/rental.png" 
                  alt={`Licht en Geluid Verhuur ${cityName}`} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  fetchpriority="high"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)'}}>
                  <MapPin className="w-6 h-6" style={{ color: 'var(--brand-blue)' }}/>
                  Lokaal in {cityName}
                </h2>
                <p className="mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)'}}>
                  Bent u op zoek naar betrouwbare apparatuur voor uw evenement in <strong>{cityName}</strong>? Sounds-Perfect levert direct uit eigen voorraad professionele geluidsinstallaties, lichtshows en podia.
                </p>
                <p className="mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)'}}>
                  Of u nu een intiem trouwfeest in de regio organiseert of een zakelijk congres faciliteert, wij zorgen dat de techniek vlekkeloos wordt opgebouwd, afgesteld en afgebouwd in {cityName}.
                </p>
                <Link to="/contact" className="btn btn-primary">
                  Vraag een offerte aan voor {cityName}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Features Sidebar */}
          <motion.div variants={itemVariants} className="features-sidebar mt-8 md:mt-0">
            <h2 className="features-title">Onze verhuur diensten</h2>
            
            <div className="features-list">
              {[
                { id: "geluid-huren", icon: Speaker, title: "Audio Apparatuur", desc: "Line-arrays, PA-systemen, mengpanelen en draadloze microfoons." },
                { id: "licht-huren", icon: Settings, title: "Licht & FX", desc: "Movingheads, LED-bars, lasers en rookmachines." },
                { id: "beamer-huren", icon: Video, title: "Beeld & Presentatie", desc: "Beamers, projectieschermen en LED-walls." }
              ].map((feature, idx) => (
                <Link 
                  key={idx} 
                  to={`/verhuur/dienst/${feature.id}?regio=${regio}`}
                  className="feature-card"
                  style={{ textDecoration: 'none', color: 'inherit', display: 'flex' }}
                >
                  <div className="feature-icon-wrapper">
                    <feature.icon className="feature-icon" />
                  </div>
                  <div className="feature-text">
                    <h3 className="feature-title-item">{feature.title}</h3>
                    <p className="feature-desc">{feature.desc}</p>
                  </div>
                  <ArrowRight style={{ marginLeft: 'auto', alignSelf: 'center', opacity: 0.5, color: 'var(--brand-blue)' }} size={18} />
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
