/**
 * GET/POST /api/activity
 * EduHealth AI – Activity posts proxy sang Railway backend
 */
const BACKEND_URL = 'https://eduhealth-ai-backend-production.up.railway.app';

export default async function handler(req, res) {
  try {
    const path = req.url.replace('/api/activity', '') || '';
    const targetUrl = `${BACKEND_URL}/api/activity${path}`;

    const opts = {
      method: req.method,
      headers: { 'Content-Type': 'application/json' },
    };
    if (req.method === 'POST') {
      opts.body = JSON.stringify(req.body);
    }

    const r = await fetch(targetUrl, opts);
    const data = await r.json();
    return res.status(r.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
