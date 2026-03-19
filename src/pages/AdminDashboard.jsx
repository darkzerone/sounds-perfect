import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEOHelmet from '../components/SEOHelmet';
import { LogOut, Plus, Trash2, Video, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import useStreams from '../hooks/useStreams';
import './AdminDashboard.css';

export default function AdminDashboard({ onLogout }) {
  const { 
    streams, loading, error, isModalOpen, setIsModalOpen, 
    newStream, setNewStream, handleLogout, handleDelete, handleCreate 
  } = useStreams(onLogout);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="admin-dashboard-page">
      <SEOHelmet>
        <title>Stream Beheer | Sounds Perfect</title>
        <meta name="robots" content="noindex, nofollow" />
      </SEOHelmet>
      <div className="admin-container">
        <div className="admin-dashboard-header">
          <div className="admin-dashboard-title">
            <h1>Stream Beheer</h1>
            <p>Beheer de besloten videostreams via de backdoor.</p>
          </div>
          <div className="admin-actions">
            <button onClick={handleOpenModal} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center' }}>
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
                    <th>Type</th>
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
                      <td className="stream-meta" style={{ textTransform: 'capitalize' }}>{stream.type || 'uitvaart'}</td>
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
            <div className="modal-backdrop" onClick={handleCloseModal}></div>
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
                  <label>Type Evenement</label>
                  <select 
                    value={newStream.type || 'uitvaart'} 
                    onChange={e => setNewStream({...newStream, type: e.target.value})}
                    className="admin-input"
                  >
                    <option value="uitvaart">Uitvaart</option>
                    <option value="bruiloft">Bruiloft</option>
                    <option value="evenement">Algemeen Evenement</option>
                  </select>
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

AdminDashboard.propTypes = {
  onLogout: PropTypes.func.isRequired
};
