import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useStreams(onLogout) {
  const [streams, setStreams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const [newStream, setNewStream] = useState({
    id: '', title: '', vimeoId: '', date: '', type: 'uitvaart'
  });

  const loadStreams = async () => {
    try {
      const response = await fetch('/api/streams', { credentials: 'include' }); 
      if (response.ok) {
         const data = await response.json();
         setStreams(data);
      } else if (response.status === 401) {
         handleLogout();
      }
    } catch (err) { console.error(err);
      setError('Kon streams niet laden.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStreams();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    } catch (err) {
      console.error(err);
    }
    onLogout();
    navigate('/admin');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Weet u zeker dat u deze stream wilt verwijderen?')) return;
    try {
      const res = await fetch(`/api/streams/${id}`, { method: 'DELETE', credentials: 'include' });
      if (res.ok) {
        setStreams(streams.filter(s => s.id !== id));
      }
    } catch (err) {
      console.error(err);
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
        setNewStream({ id: '', title: '', vimeoId: '', date: '', type: 'uitvaart' });
      }
    } catch (err) {
      console.error(err);
      alert('Kan geen verbinding maken met de server.');
    }
  };

  return { 
    streams, loading, error, isModalOpen, setIsModalOpen, 
    newStream, setNewStream, handleLogout, handleDelete, handleCreate 
  };
}
