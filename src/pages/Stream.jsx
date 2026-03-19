import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';
import { Video } from 'lucide-react';
import './Stream.css';

export default function Stream() {
  const getTypeSubtitle = (type) => {
      if (type === 'bruiloft') return 'Een liefdevolle en feestelijke dag';
      if (type === 'evenement') return 'Welkom bij ons live evenement!';
      return 'Een liefdevolle en respectvolle herinnering';
    };
  const { id } = useParams();
  const [stream, setStream] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStream = async () => {
      try {
        const response = await fetch(`/api/streams/${id}`);
        if (!response.ok) throw new Error('Stream niet gevonden');
        const data = await response.json();
        setStream(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStream();
  }, [id]);

  if (loading) return <div className="stream-page flex items-center justify-center">Laden...</div>;
  
  if (error || !stream) return (
    <div className="stream-page flex items-center justify-center">
      <div className="glass-panel p-8 text-center max-w-md">
        <Video size={48} className="mx-auto mb-4 opacity-50 text-red-400" />
        <h2 className="text-xl font-bold mb-2">Stream Niet Gevonden</h2>
        <p className="text-gray-400">De opgevraagde stream bestaat niet of de link is incorrect.</p>
      </div>
    </div>
  );

  return (
    <div className="stream-page">
      <SEOHelmet>
        <title>{stream ? `${stream.title} | Livestream | Sounds Perfect` : 'Livestream | Sounds Perfect'}</title>
        <meta name="robots" content="noindex, nofollow" />
      </SEOHelmet>
      <div className="stream-background">
        <div className="hero-pattern"></div>
      </div>

      <motion.div 
        className="stream-container"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="stream-header glass-panel">
          <h1>{stream.title}</h1>
          <p>{stream.date} • {getTypeSubtitle(stream.type)}</p>
        </div>

        <div className="video-wrapper glass-panel">
          {/* Responsive Vimeo Embed */}
          <div className="video-responsive">
            <iframe 
              src={`https://player.vimeo.com/video/${stream.vimeoId}?color=007ebf&title=0&byline=0&portrait=0`}
              frameBorder="0" 
              allow="autoplay; fullscreen; picture-in-picture" 
              allowFullScreen
              title={`Private Stream ${stream.title}`}
            ></iframe>
          </div>
        </div>

        <motion.div 
          className="stream-footer glass-panel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p>Deze registratie blijft beschikbaar op deze privé link. U kunt deze pagina delen met familie en vrienden.</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
