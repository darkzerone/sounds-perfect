import React from 'react';
import SEOHelmet from '../components/SEOHelmet';

export default function Privacy() {
  return (
    <div className="page-container" style={{ padding: '140px 2rem 4rem', maxWidth: '800px', margin: '0 auto' }}>
      <SEOHelmet>
        <title>Privacybeleid | Sounds Perfect</title>
        <meta name="description" content="Privacybeleid en cookieverklaring van Sounds Perfect." />
        <link rel="canonical" href="https://www.sounds-perfect.nl/privacy" />
        <meta name="robots" content="noindex, follow" />
      </SEOHelmet>

      <div className="glass-panel" style={{ padding: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--text-primary)' }}>Privacybeleid & Cookies</h1>
        
        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>1. Wat we verzamelen</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
            Wanneer u contact met ons opneemt via het contactformulier of per e-mail, verzamelen wij de gegevens die u zelf aan ons verstrekt. Dit omvat uw naam, e-mailadres en de inhoud van uw bericht. Deze gegevens gebruiken we uitsluitend om te reageren op uw vraag of om een offerte-aanvraag te verwerken.
          </p>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>2. Cookies</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
            Wij maken op deze website uitsluitend gebruik van <strong>functionele (strikt noodzakelijke) cookies</strong>. Deze cookies zijn noodzakelijk om onze website goed te laten werken en te beveiligen (bijvoorbeeld voor het inloggen in ons beheersysteem). 
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
            Wij gebruiken <strong>geen</strong> tracking cookies, marketing cookies, of third-party analytics (zoals Google Analytics of Facebook Pixel) om uw gedrag over het internet te volgen. Omdat wij alleen functionele cookies plaatsen, bent u niet wettelijk verplicht om een complexe cookiewall te accepteren.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
            Wij plaatsen wel één local-storage item om te onthouden dat u onze cookie-notificatie heeft weggedrukt, zodat deze u niet blijft storen.
          </p>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>3. Uw Gegevens Delen</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
            Sounds Perfect verkoopt uw gegevens niet aan derden en verstrekt deze uitsluitend indien dit nodig is voor de uitvoering van onze overeenkomst met u of om te voldoen aan een wettelijke verplichting.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>4. Contact</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
            Heeft u vragen over ons privacybeleid? Neem dan contact met ons op via <a href="mailto:info@sounds-perfect.nl" style={{ color: 'var(--brand-blue)' }}>info@sounds-perfect.nl</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
