import { motion } from 'framer-motion';
import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';
import { Lock, LogIn } from 'lucide-react';
import './AdminLogin.css';

export default function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        onLogin(true);
        navigate('/admin/dashboard');
      } else {
        setError(data.error || 'Ongeldig wachtwoord');
      }
    } catch (err) { console.error(err);
      setError('Kan geen verbinding maken met de server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <SEOHelmet>
        <title>Beheer | Sounds Perfect</title>
        <meta name="robots" content="noindex, nofollow" />
      </SEOHelmet>
      <div className="admin-background"></div>
      <div className="admin-sphere"></div>
      
      <motion.div 
        className="glass-panel admin-login-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="admin-header">
          <div className="admin-icon-container">
            <Lock size={32} />
          </div>
          <h2>Beheerders Login</h2>
          <p>Log in om de videostreams te beheren.</p>
        </div>

        {error && (
          <div className="admin-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <label>Gebruikersnaam</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="admin-input"
              placeholder="Voer gebruikersnaam in"
              required
            />
          </div>
          <div className="form-group">
            <label>Wachtwoord</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="admin-input"
              placeholder="Voer wachtwoord in"
              required
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-primary admin-submit-btn"
            disabled={loading}
          >
            {loading ? 'Bezig met inloggen...' : (
              <>Inloggen <LogIn size={18} style={{ marginLeft: '8px' }} /></>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
