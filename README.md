# Amt für Gefühle (Office of Feelings)

A deadpan Austrian-bureaucracy web application where citizens file official petitions to register their emotional states. Presided over by the veteran ministerial civil servant **Ministerialrätin Dr. Eleonore Haslinger**, each application is thoroughly inspected, officially stamped as **GENEHMIGT** (Approved) or **ABGELEHNT** (Provisionally Rejected for absurdly specific paperwork), and answered with dry procedural severity that secretly conceals a kind, heartfelt core.

---

## Features

- **Strict Single-Screen Experience**: Pure bureaucratic workflow without distractions, logins, or extraneous pages.
- **Local Amtsarchiv (Docket History)**: Client-side `localStorage` filing system ("Bürger-Aktenablage gem. § 7 Archivgesetz") preserving past stamped decrees, case numbers (*Aktenzeichen*), and clerk replies directly on the screen with full inspection and "Reißwolf" (shredder) options.
- **Vintage Austrian Revenue Stamp (*Stempelmarke*) & Absurd Fee Assessment**: Authentic terracotta fiscal stamp (`2 S 40 g`) cancelled with fountain pen ink strokes, accompanied by a deadpan official fee calculation table pursuant to the Austrian Stamp Duty Act 1946 (with full statutory exemption granted due to "unverschuldete Gemütserschütterung").
- **Authentic Austrian Imperial-Bureaucratic Aesthetic**: Aged parchment paper textures, form metadata codes (`Formular B-7`), official filing grids, heraldic administrative Dienstsiegel seal, and fountain pen signatures.
- **Dynamic Case Numbers**: Every petition generates an authentic Austrian file number (*Aktenzeichen*, e.g., `AFG-2026/IV-4402/W`).
- **Tactile Rubber Stamp Animation**: Dynamic stamp slamming on the decree (scale from 1.6 to 1 with bounce, rotation between -6° and +6°, and subtle screen thud vibration). Respects `prefers-reduced-motion`.
- **Bilingual (DE / EN)**: One-click toggle between authentic Austrian *Amtsdeutsch* ("hiermit", "zur Kenntnis genommen", "ergeht folgender Bescheid") and dry English bureaucratic translation.
- **AI Clerk with Claude**: Powered by Anthropic's Messages API (`claude-sonnet-5-5` / `claude-3-5-sonnet-20241022`) via a secure backend proxy with rate limiting and in-character fallback on network disruptions.
- **Crisis Safety Protocol**: In accordance with ministerial care guidelines, if self-harm or acute distress is detected, the bureaucratic persona drops immediately in favor of a warm, compassionate human response with direct links to Austrian and international support hotlines (Telefonseelsorge 142).

---

## Tech Stack

- **Frontend**: Vite + React 18, Plain CSS (clean, responsive, zero heavy UI frameworks).
- **Backend Proxy**: Node.js / Express proxy (`server.js`) with `express-rate-limit` (10 submissions per IP per hour) and Anthropic Messages API SDK.
- **Serverless**: `/api/submit.js` ready for zero-config Vercel or Netlify deployments.

---

## Setup & Running Locally

### 1. Prerequisites
- Node.js (v18+)
- npm

### 2. Installation
```bash
npm install
```

### 3. Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Edit `.env` and set your Anthropic API key:
```env
ANTHROPIC_API_KEY=sk-ant-api03-...
MODEL_NAME=claude-3-5-sonnet-20241022
PORT=3001
```

> **Note**: If `ANTHROPIC_API_KEY` is left blank, the application will automatically activate the built-in local simulation of Ministerialrätin Dr. Eleonore Haslinger so the entire UI and rubber-stamp workflow can be tested immediately.

### 4. Run Development Server
```bash
npm run dev
```

This concurrently starts:
- The backend proxy on `http://localhost:3001`
- The Vite frontend on `http://localhost:5173`

Open `http://localhost:5173` in your browser.

---

## Deployment (Vercel / Netlify)

### Vercel
1. Push your repository to GitHub / GitLab.
2. Import the project into Vercel.
3. In the Vercel dashboard, under **Environment Variables**, add:
   - `ANTHROPIC_API_KEY`: Your Anthropic API Key
   - `MODEL_NAME`: `claude-3-5-sonnet-20241022`
4. Deploy! The `/api/submit.js` serverless function handles backend proxy requests automatically.

