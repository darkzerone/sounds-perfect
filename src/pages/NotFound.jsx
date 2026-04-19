import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="not-found-page">
      <Helmet>
        <title>Pagina niet gevonden | Sounds Perfect</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="not-found-bg">
        <div className="hero-pattern"></div>
      </div>

      <motion.div 
        className="not-found-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="not-found-code">404</h1>
        <h2 className="not-found-title">Pagina niet gevonden</h2>
        <p className="not-found-desc">
          De pagina die u zoekt bestaat niet of is verplaatst. Geen zorgen, we helpen u graag op weg.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="btn btn-primary">
            <Home size={18} /> Naar de startpagina
          </Link>
          <Link to="/contact" className="btn btn-outline">
            <ArrowLeft size={18} /> Contact opnemen
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
