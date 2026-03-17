import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { regions } from '../data/regions';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-inner-container">
        <div className="footer-grid">
          
          {/* Brand Col */}
          <div className="footer-col">
            <h3 className="footer-heading">Sounds Perfect</h3>
            <p className="footer-text mb-4">
              Uw betrouwbare partner op het gebied van professionele licht en geluid verhuur. Wij leveren maatwerk voor elk evenement.
            </p>
          </div>

          {/* Links Col */}
          <div className="footer-col">
            <h3 className="footer-heading">Snel Naar</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/verhuur">Verhuur</Link></li>
              <li><Link to="/evenementen">Evenementen</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Legal Col */}
          <div className="footer-col">
            <h3 className="footer-heading">Voorwaarden</h3>
            <ul className="footer-links">
              <li><Link to="/privacy">Privacybeleid</Link></li>
              <li><a href="/Algemene_voorwaarden_SoundsPerfect.pdf" target="_blank" rel="noopener noreferrer">Algemene Voorwaarden</a></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="footer-col">
            <h3 className="footer-heading">Contactgegevens</h3>
            <ul className="footer-contact" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.95rem' }}>
              <li>
                <strong>Adres:</strong><br/>
                <a href="https://maps.google.com/?q=Coloradodreef+22,+3565+BT+Utrecht" target="_blank" rel="noopener noreferrer">
                  Coloradodreef 22<br/>
                  3565 BT Utrecht
                </a>
              </li>
              <li>
                <strong>Email:</strong><br/>
                <a href="mailto:info@sounds-perfect.nl">info@sounds-perfect.nl</a>
              </li>
              <li>
                <strong>Telefoon:</strong><br/>
                <a href="tel:0302931212">030 - 293 12 12</a>
              </li>
              <li>
                <strong>Service nummer:</strong><br/>
                <a href="tel:0627014318">06 - 270 143 18</a>
              </li>
              <li style={{ marginTop: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                KVK Utrecht: 53994515<br/>
                BTW: NL 851107497B01
              </li>
            </ul>
          </div>

          {/* Regional SEO Links (Crucial for Phase 6) */}
          <div className="footer-col-spanned">
            <h3 className="footer-heading flex items-center gap-2">
              <MapPin className="w-5 h-5" style={{ color: 'var(--brand-blue)' }}/>
              Ons Werkgebied
            </h3>
            <div className="region-links-grid">
              {regions.map(region => (
                <Link 
                  key={region.id} 
                  to={`/verhuur/${region.id}`}
                  className="region-link"
                >
                  {region.name}
                </Link>
              ))}
            </div>
          </div>

        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Sounds Perfect Alle rechten voorbehouden.</p>
        </div>
      </div>
    </footer>
  );
}
