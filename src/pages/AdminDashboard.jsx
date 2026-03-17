import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { LogOut, Plus, Trash2, Video, ExternalLink } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import './AdminDashboard.css';

export default function AdminDashboard({ onLogout }) {
  const [streams, setStreams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Form State
  const [newStream, setNewStream] = useState({
    id: '', title: '', vimeoId: '', date: ''
  });

  const fetchStreams = async () => {
    try {
      const res = await fetch('/api/streams', {
         credentials: 'include'
      });
    } catch(err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    // This will fetch streams when the component mounts
    const loadStreams = async () => {
      try {
        const response = await fetch('/api/streams', {
          credentials: 'include'
        }); 
        if (response.ok) {
           const data = await response.json();
           setStreams(data);
        } else if (response.status === 401) {
           handleLogout();
        }
      } catch (err) {
        setError('Kon streams niet laden.');
      } finally {
        setLoading(false);
      }
    };
    loadStreams();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { 
        method: 'POST',
        credentials: 'include'
      });
    } catch (err) {
      console.error(err);
    }
    onLogout();
    navigate('/admin');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Weet u zeker dat u deze stream wilt verwijderen?')) return;
    
    try {
      const res = await fetch(`/api/streams/${id}`, { 
        method: 'DELETE',
        credentials: 'include'
      });
      if (res.ok) {
        setStreams(streams.filter(s => s.id !== id));
      } else {
        alert('Er is een fout opgetreden bij het verwijderen.');
      }
    } catch(err) {
      alert('Er is een netwerkfout opgetreden.');
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/streams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(newStream)
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setStreams([data, ...streams]);
        setIsModalOpen(false);
        setNewStream({ id: '', title: '', vimeoId: '', date: '' });
      } else {
        alert(data.error || 'Er is een fout opgetreden.');
      }
    } catch (err) {
      alert('Kan geen verbinding maken met de server.');
    }
  };

  return (
    <div className="admin-dashboard-page">
      <Helmet>
        <title>Stream Beheer | Sounds Perfect</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="admin-container">
        <div className="admin-dashboard-header">
          <div className="admin-dashboard-title">
            <h1>Stream Beheer</h1>
            <p>Beheer de besloten videostreams via de backdoor.</p>
          </div>
          <div className="admin-actions">
            <button onClick={() => setIsModalOpen(true)} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center' }}>
              <Plus size={18} style={{ marginRight: '8px' }} /> Nieuwe Stream
            </button>
            <button onClick={handleLogout} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center' }}>
              <LogOut size={18} style={{ marginRight: '8px' }} /> Log Uit
            </button>
          </div>
        </div>

        {error && (
          <div className="admin-error" style={{ marginBottom: '1.5rem' }}>
            {error}
          </div>
        )}

        <div className="glass-panel admin-content-panel">
          {loading ? (
            <div className="admin-empty-state">Streams laden...</div>
          ) : streams.length === 0 ? (
            <div className="admin-empty-state">
              <Video size={48} className="admin-empty-icon" />
              Er zijn momenteel geen actieve streams.
            </div>
          ) : (
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Stream ID / Link</th>
                    <th>Titel</th>
                    <th>Vimeo ID</th>
                    <th>Datum</th>
                    <th className="text-right">Acties</th>
                  </tr>
                </thead>
                <tbody>
                  {streams.map((stream) => (
                    <tr key={stream.id}>
                      <td>
                        <Link 
                          to={`/stream/${stream.id}`} 
                          className="stream-id-badge" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          title="Open Stream"
                        >
                          /stream/{stream.id}
                          <ExternalLink size={12} style={{ marginLeft: '4px' }} />
                        </Link>
                      </td>
                      <td className="stream-title">{stream.title}</td>
                      <td className="stream-meta">{stream.vimeoId}</td>
                      <td className="stream-meta">{stream.date}</td>
                      <td className="text-right">
                        <button 
                          onClick={() => handleDelete(stream.id)}
                          className="btn-delete"
                          title="Verwijderen"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal for creating a new stream */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}></div>
            <motion.div 
              className="glass-panel modal-content"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <h2 className="modal-title">Nieuwe Stream Toevoegen</h2>
              <form onSubmit={handleCreate} className="admin-form">
                <div className="form-group">
                  <label>Unieke Stream ID (bijv. jansen-123)</label>
                  <input 
                    type="text" required value={newStream.id} 
                    onChange={e => setNewStream({...newStream, id: e.target.value})}
                    className="admin-input"
                  />
                </div>
                <div className="form-group">
                  <label>Titel van Uitvaart/Evenement</label>
                  <input 
                    type="text" required value={newStream.title} 
                    onChange={e => setNewStream({...newStream, title: e.target.value})}
                    className="admin-input"
                  />
                </div>
                <div className="form-group">
                  <label>Vimeo Video ID (getal)</label>
                  <input 
                    type="text" required value={newStream.vimeoId} 
                    onChange={e => setNewStream({...newStream, vimeoId: e.target.value})}
                    className="admin-input"
                  />
                </div>
                <div className="form-group">
                  <label>Datum</label>
                  <input 
                    type="text" required value={newStream.date} 
                    onChange={e => setNewStream({...newStream, date: e.target.value})}
                    className="admin-input"
                  />
                </div>
                <div className="modal-actions">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>Annuleren</button>
                  <button type="submit" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>Aanmaken</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
