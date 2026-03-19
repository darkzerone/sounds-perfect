/* eslint-env node */
import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.set('trust proxy', 1); // Trust first proxy (Railway)
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-super-secret-key-123';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'soundsperfect2024';

// Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "blob:", "https://images.unsplash.com", "https://*.unsplash.com"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      connectSrc: ["'self'"],
      frameSrc: ["'self'", "https://player.vimeo.com"],
      childSrc: ["'self'", "https://player.vimeo.com"]
    }
  }
}));
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], // Vite dev server
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Database Setup
const dbPath = process.env.DATABASE_URL || path.join(__dirname, 'streams.db');

// Ensure database directory exists if volume-mounted
import fs from 'fs';
if (process.env.DATABASE_URL) {
  const dir = path.dirname(process.env.DATABASE_URL);
  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
  }
}

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to SQLite database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
    db.run(`CREATE TABLE IF NOT EXISTS streams (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      vimeoId TEXT NOT NULL,
      date TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Safe Alter Column append trigger
    db.run(`ALTER TABLE streams ADD COLUMN type TEXT DEFAULT 'uitvaart'`, (err) => {
      if (err) { /* column exists */ }
    });

    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, () => {
      // Check if admin user exists, if not create one using the password from .env
      db.get('SELECT * FROM users WHERE username = ?', ['admin'], async (err, row) => {
        if (!err && !row) {
          try {
            const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
            db.run('INSERT INTO users (username, password) VALUES (?, ?)', ['admin', hashedPassword]);
            console.log('Created default admin user in the database.');
          } catch (error) {
            console.error('Error creating default admin user:', error);
          }
        }
      });
    });
  }
});

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Forbidden' });
    req.user = user;
    next();
  });
};

/* --- API ROUTES --- */

// Rate limiting for login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per `window` (here, per 15 minutes)
  message: { error: 'Te veel inlogpogingen. Probeer het over 15 minuten opnieuw.' },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Login
app.post('/api/auth/login', loginLimiter, (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ error: 'Gebruikersnaam en wachtwoord zijn verplicht.' });
  }

  db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
    if (err) return res.status(500).json({ error: 'Database fout.' });
    if (!user) return res.status(401).json({ error: 'Ongeldige gebruikersnaam of wachtwoord.' });

    try {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = jwt.sign({ role: 'admin', userId: user.id }, JWT_SECRET, { expiresIn: '24h' });
        res.cookie('token', token, { 
          httpOnly: true, 
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });
        res.json({ success: true });
      } else {
        res.status(401).json({ error: 'Ongeldige gebruikersnaam of wachtwoord.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Fout bij het verifiëren van inloggegevens.' });
    }
  });
});

// Logout
app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ success: true });
});

// Check Auth Status (for frontend routing)
app.get('/api/auth/status', authenticateToken, (req, res) => {
  res.json({ authenticated: true });
});

// --- Stream CRUD Operations ---

// Get all streams (Admin only)
app.get('/api/streams', authenticateToken, (req, res) => {
  db.all('SELECT * FROM streams ORDER BY createdAt DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Get single stream (Public - by ID)
app.get('/api/streams/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM streams WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Stream not found' });
    res.json(row);
  });
});

// Create new stream (Admin only)
app.post('/api/streams', authenticateToken, (req, res) => {
  const { id, title, vimeoId, date, type = 'uitvaart' } = req.body;

  if (!id || !title || !vimeoId || !date) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  db.run(
    'INSERT INTO streams (id, title, vimeoId, date, type) VALUES (?, ?, ?, ?, ?)',
    [id, title, vimeoId, date, type],
    function (err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(400).json({ error: 'Stream ID already exists' });
        }
        return res.status(500).json({ error: err.message });
      }
      res.json({ id, title, vimeoId, date, type });
    }
  );
});

// Delete stream (Admin only)
app.delete('/api/streams/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM streams WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Stream not found' });
    res.json({ success: true, deleted: id });
  });
});

// --- SEO Redirects ---
const redirectsPath = path.join(__dirname, 'redirects.json');
if (fs.existsSync(redirectsPath)) {
  const redirectsList = JSON.parse(fs.readFileSync(redirectsPath, 'utf-8'));
  const redirectMap = {};
  redirectsList.forEach(r => {
     redirectMap[r.from] = r.to;
     if (!r.from.endsWith('/')) redirectMap[r.from + '/'] = r.to;
  });

  app.use((req, res, next) => {
    let pathName = req.path;
    if (pathName.endsWith('/') && pathName.length > 1) {
       pathName = pathName.substring(0, pathName.length - 1);
    }
    const target = redirectMap[pathName] || redirectMap[req.path];
    if (target) {
       return res.redirect(301, target);
    }
    next();
  });
}

// Serve static files from the Vite build directory
app.use(express.static(path.join(__dirname, 'dist')));

// Catch-all handler for Single Page Application routing (Fallback to index.html)
app.get('*splat', (req, res, next) => {
  if (!req.url.startsWith('/api')) {
    return res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  }
  next();
});

app.listen(PORT, () => {
  console.log(`Backend Server running on http://localhost:${PORT}`);
});
