import React from 'react';
import SEOHelmet from '../components/SEOHelmet';
import { motion } from 'framer-motion';
import { MapPin, Phone } from 'lucide-react';
import LocalBusinessSchema from '../components/LocalBusinessSchema';
import './Contact.css';

export default function Contact() {
  return (
    <div className="contact-page">
      <SEOHelmet>
        <title>Contact Opnemen | Offerte Aanvragen Utrecht | Sounds Perfect</title>
        <meta name="description" content="Neem contact op met Sounds Perfect voor een offerte of meer informatie over onze licht en geluid verhuur in Utrecht en omstreken." />
        <link rel="canonical" href="https://www.sounds-perfect.nl/contact" />
        <meta property="og:title" content="Contact | Sounds Perfect" />
        <meta property="og:description" content="Neem contact op met Sounds Perfect voor een offerte of meer informatie over onze licht en geluid verhuur in Utrecht en omstreken." />
        <meta property="og:type" content="website" />
      </SEOHelmet>
      <LocalBusinessSchema />
      <div className="contact-background">
        <div className="hero-pattern"></div>
      </div>

      <div className="contact-container">
        <motion.div 
          className="contact-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Neem Contact Op</h1>
          <p>Heb je vragen, advies nodig of wil je langskomen? We helpen je met veel plezier verder en de koffie staat altijd voor je klaar.</p>
        </motion.div>

        {/* Wide Opening Times Card */}
        <motion.div 
          className="opening-times-wide glass-panel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="opening-times-content">
            <div className="opening-times-header">
              <h2>Openingstijden</h2>
              <p>In de wereld van evenementen is het regelmatig hollen of stilstaan. Om die reden kan ons hele team ‘on the road’ zijn op een moment dat u ons wil bezoeken. <strong>Voorkom een teleurstelling en bel altijd eerst even voordat u langskomt.</strong></p>
            </div>
            
            <div className="opening-times-columns">
              <div className="opening-column">
                <h3><Phone size={18} className="inline mr-2" /> Telefonisch</h3>
                <ul>
                  <li><strong>Maandag t/m Vrijdag:</strong> 09:00 - 17:00 uur</li>
                  <li>(12:00 - 13:00 niet bereikbaar)</li>
                  <li><strong>Zaterdag & Zondag:</strong> Gesloten</li>
                </ul>
              </div>

              <div className="opening-column">
                <h3><MapPin size={18} className="inline mr-2" /> Kantoor, winkel & opslag</h3>
                <ul>
                  <li><strong>Maandag:</strong> 10:00 - 17:00 uur</li>
                  <li><strong>Dinsdag t/m Vrijdag:</strong> 09:00 - 17:00 uur</li>
                  <li><strong>Zaterdag:</strong> Gesloten voor losse verhuur</li>
                </ul>
              </div>
            </div>

            <div className="opening-times-footer">
              <p>Buiten de bovengenoemde tijden kan er ook afgesproken worden. Bel <strong><a href="tel:0302931212">030 - 293 12 12</a></strong> of <a href="mailto:info@sounds-perfect.nl">mail ons</a> voor een afspraak, wij staan graag voor u klaar.</p>
            </div>
          </div>
        </motion.div>


      </div>
    </div>
  );
}
