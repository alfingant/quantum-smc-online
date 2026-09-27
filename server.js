const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 10000;
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'state.json');

app.use(express.json({ limit: '2mb' }));
app.use(express.static(__dirname, { extensions: ['html'] }));

function ensureStore() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ quantum_trade_notes: [], quantum_saved_analysis: [] }, null, 2));
  }
}
function readState() {
  ensureStore();
  try { return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')) || {}; }
  catch { return { quantum_trade_notes: [], quantum_saved_analysis: [] }; }
}
function writeState(state) {
  ensureStore();
  const tmp = DATA_FILE + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(state, null, 2));
  fs.renameSync(tmp, DATA_FILE);
}

app.get('/api/health', (req, res) => res.json({ ok: true, service: 'Quantum SMC Online', time: new Date().toISOString() }));

app.get('/api/state', (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.json(readState());
});

app.post('/api/state', (req, res) => {
  const incoming = req.body || {};
  const current = readState();
  const next = {
    ...current,
    quantum_trade_notes: Array.isArray(incoming.quantum_trade_notes) ? incoming.quantum_trade_notes.slice(0, 30) : (current.quantum_trade_notes || []),
    quantum_saved_analysis: Array.isArray(incoming.quantum_saved_analysis) ? incoming.quantum_saved_analysis.slice(0, 50) : (current.quantum_saved_analysis || [])
  };
  writeState(next);
  res.json({ ok: true, state: next });
});

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.listen(PORT, '0.0.0.0', () => console.log(`Quantum SMC online on port ${PORT}`));
