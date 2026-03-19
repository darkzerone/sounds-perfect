/* eslint-env node */
import express from 'express';
const app = express();

try {
  app.get('(.*)', (req, res) => {
    res.send('ok');
  });
  console.log('SUCCESS: (.*) works in Express 5!');
} catch (e) {
  console.error('FAILED: (.*) threw:', e.message);
}

try {
  app.get('*splat', (req, res) => {
    res.send('ok');
  });
  console.log('SUCCESS: *splat works in Express 5!');
} catch (e) {
  console.error('FAILED: *splat threw:', e.message);
}

process.exit(0);
