import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import { processClerkRequest, getFallbackResponse } from './lib/clerk.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '10kb' }));

// Basic rate limiting: 10 requests per IP per hour as specified in prompt
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Limit each IP to 10 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    const lang = req.body?.language === 'en' ? 'en' : 'de';
    res.status(429).json({
      decision: 'rejected',
      reply: lang === 'en'
        ? 'The Office has reached its hourly quota for emotional intake. Official filing limits (§ 8 Abs. 2) strictly prohibit more than 10 submissions per citizen per hour. Please sit quietly until your queue resets.'
        : 'Das Kontingent zur Gefühlsabgabe für diese Stunde ist erschöpft. Gemäß § 8 Abs. 2 der Amtsordnung sind maximal 10 Anträge pro Stunde und Bürger zulässig. Bitte verharren Sie in geordneter Ruhe.',
      ps: lang === 'en' ? 'Take a deep breath. Breathing requires no permit.' : 'Tief durchatmen. Das Atmen ist derzeit noch genehmigungsfrei.',
      crisis: false,
      rateLimited: true
    });
  }
});

// Apply rate limiter to /api/submit
app.use('/api/submit', limiter);

app.post('/api/submit', async (req, res) => {
  try {
    const { feeling, intensity, justification, language } = req.body || {};
    const result = await processClerkRequest({
      feeling: String(feeling || '').slice(0, 50),
      intensity: Number(intensity) || 5,
      justification: String(justification || '').slice(0, 300),
      language: language === 'en' ? 'en' : 'de'
    });
    res.json(result);
  } catch (error) {
    console.error('Server error processing Antrag:', error);
    const lang = req.body?.language === 'en' ? 'en' : 'de';
    res.status(500).json(getFallbackResponse(lang));
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Amt für Gefühle' });
});

app.listen(PORT, () => {
  console.log(`[Amt für Gefühle] Dienststelle gestartet auf Port ${PORT}`);
});

