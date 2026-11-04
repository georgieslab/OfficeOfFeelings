import { processClerkRequest, getFallbackResponse } from '../lib/clerk.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { feeling, intensity, justification, language } = req.body || {};
    const result = await processClerkRequest({
      feeling: String(feeling || '').slice(0, 50),
      intensity: Number(intensity) || 5,
      justification: String(justification || '').slice(0, 300),
      language: language === 'en' ? 'en' : 'de'
    });
    return res.status(200).json(result);
  } catch (error) {
    console.error('Serverless proxy error:', error);
    const lang = req.body?.language === 'en' ? 'en' : 'de';
    return res.status(500).json(getFallbackResponse(lang));
  }
}

