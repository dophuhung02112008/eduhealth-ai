/**
 * GET /health — Health check
 */
export default async function handler(req, res) {
  res.status(200).json({
    status: 'ok',
    service: 'eduhealth-ai-vercel',
    timestamp: new Date().toISOString(),
  });
}
