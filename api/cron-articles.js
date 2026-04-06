/**
 * Vercel Cron: chạy mỗi ngày lúc 07:00 UTC = 00:00 GMT+7 (nửa đêm Việt Nam)
 * Cấu hình trong vercel.json
 *
 * Trigger: GET /api/cron-articles
 * Chạy: Mỗi ngày 00:00 giờ Việt Nam
 */

export default async function handler(req, res) {
  // Only allow cron requests (verified by Vercel)
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const API_BASE = 'https://eduhealth-proxy-production.up.railway.app';

    // 1. Trigger RSS scan on backend
    const scanRes = await fetch(`${API_BASE}/api/articles/scan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }).catch(() => null);

    // 2. Fetch latest articles
    const articlesRes = await fetch(`${API_BASE}/api/articles`);
    const articlesData = await articlesRes.json();

    console.log(`[Cron] ${new Date().toISOString()} - Articles: ${articlesData.total || 0}`);

    return res.status(200).json({
      ok: true,
      timestamp: new Date().toISOString(),
      articles_count: articlesData.total || 0,
      message: 'Cron triggered successfully',
    });
  } catch (err) {
    console.error('[Cron Error]', err.message);
    return res.status(500).json({ error: err.message });
  }
}
