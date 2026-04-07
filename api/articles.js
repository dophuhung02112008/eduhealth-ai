/**
 * GET/POST /api/articles, /api/articles/older, /api/articles/featured, /api/articles/summarize
 * EduHealth AI – Health articles feed (proxy sang Railway backend)
 */
const BACKEND_URL = 'https://eduhealth-ai-backend-production.up.railway.app';

export default async function handler(req, res) {
  // Extract path after /api/articles
  const url = new URL(req.url, `https://${req.headers.host || 'localhost'}`);
  const path = url.pathname; // e.g. /api/articles or /api/articles/older

  // Map Vercel path → Railway path
  const railPath = path; // /api/articles, /api/articles/older, /api/articles/featured

  try {
    const opts = {
      method: req.method,
      headers: { 'Content-Type': 'application/json' },
    };
    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
      opts.body = JSON.stringify(req.body);
    }

    const r = await fetch(`${BACKEND_URL}${railPath}`, opts);
    const data = await r.json();
    return res.status(r.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
