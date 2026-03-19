import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import LocalBusinessSchema from '../components/LocalBusinessSchema';
import useContactForm from '../hooks/useContactForm';
import './Contact.css';

export default function Contact() {
  const location = useLocation();
  const initialSubject = location.state?.subject || '';

  const { formState, isSubmitting, isSuccess, setIsSuccess, handleChange, handleSubmit } = useContactForm(initialSubject);

  return (
    <div className="contact-page">
      <SEOHelmet>
        <title>Contact Opnemen | Offerte Aanvragen Utrecht | Sounds Perfect</title>
        <meta name="description" content="Neem contact op met Sounds Perfect voor een offerte of meer informatie over onze licht en geluid verhuur in Utrecht en omstreken." />
        <link rel="canonical" href="https://sounds-perfect.nl/contact" />
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
                  <li><strong>Maandag t/m Zaterdag:</strong></li>
                  <li>08:00 - 18:00 uur</li>
                  <li style={{ color: 'transparent', userSelect: 'none' }}>Spacer</li>
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

        <div className="contact-grid">
          {/* Left Column wrapper */}
          <div className="contact-left-col">
            {/* Contact Info */}
            <motion.div 
              className="contact-info glass-panel"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3>Contactgegevens</h3>
            
            <div className="info-item">
              <div className="info-icon"><Phone size={24} /></div>
              <div>
                <h4>Telefoon</h4>
                <a href="tel:0302931212" style={{ display: 'block', marginBottom: '0.25rem' }}>030 - 293 12 12</a>
                <p style={{ marginTop: '0.25rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  Service nummer: <br/>
                  <a href="tel:0627014318">06 - 270 143 18</a>
                </p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon"><Mail size={24} /></div>
              <div>
                <h4>E-mail</h4>
                <a href="mailto:info@sounds-perfect.nl">info@sounds-perfect.nl</a>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon"><MapPin size={24} /></div>
              <div>
                <h4>Adres</h4>
                <a href="https://maps.google.com/?q=Coloradodreef+22,+3565+BT+Utrecht" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', lineHeight: '1.5' }}>
                  Coloradodreef 22<br/>3565 BT Utrecht
                </a>
              </div>
            </div>

            <div className="info-item" style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
              <div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  KVK Utrecht: 53994515<br/>
                  BTW: NL 851107497B01<br/>
                  ING: 1016186<br/>
                  Iban: NL65 INGB 0001 0161 86<br/>
                  BIC: INGBNL2A
                </p>
              </div>
            </div>
          </motion.div>

          </div>

          {/* Contact Form */}
          <motion.div 
            className="contact-form-container glass-panel"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div 
                  className="success-state"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <CheckCircle2 size={64} className="success-icon" />
                  <h3>Bericht Verzonden!</h3>
                  <p>Bedankt voor uw bericht. Wij nemen zo spoedig mogelijk contact met u op.</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: '320px' }}>
                    <Link to="/" className="btn btn-primary mt-4" style={{ width: '100%' }}>
                      Terug naar Startpagina
                    </Link>
                    <button className="btn btn-outline" style={{ width: '100%' }} onClick={() => setIsSuccess(false)}>
                      Nieuw bericht sturen
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.form 
                  className="contact-form" 
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="form-group">
                    <label htmlFor="name">Naam</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required 
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="Uw volledige naam" 
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">E-mailadres</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      required 
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="Uw e-mailadres" 
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Bericht</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows="5" 
                      required
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="Hoe kunnen wij u helpen?"
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? 'Verzenden...' : (
                      <>Verstuur Bericht <Send size={18} className="ml-2" /></>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
