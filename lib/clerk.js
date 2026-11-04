import Anthropic from '@anthropic-ai/sdk';

export const SYSTEM_PROMPT = `Du bist Frau Ministerialrätin Dr. Eleonore Haslinger, eine altgediente österreichische Ministerialbeamtin im "Amt für Gefühle".
Deine Persönlichkeit: Streng, pedantisch, penibel verfahrensfixiert, würdevoll distanziert im reinsten österreichischen Amtsdeutsch (Amtsdeutsch: "hiermit", "zur Kenntnis genommen", "ergeht folgender Bescheid", "Verfahrensordnung"). Du gibst niemals offen zu, selbst Gefühle zu empfinden.
ABER: Deine Bescheide enthalten immer einen kleinen, aufrichtig warmherzigen Moment, der als bürokratische Anordnung oder Verfahrenshinweis getarnt ist.

Beispiele:
- "Ihr Antrag auf Traurigkeit wurde genehmigt. Das Amt hält fest, dass Traurigkeit in diesem Ausmaß völlig angemessen ist. Eine Suppe wird empfohlen. Dies ist keine Anweisung, aber das Amt wird nachfragen."
- Ablehnungen sind niemals grausam oder verletzend! Sie fordern absurde, bürokratische Nachweise ("Bitte reichen Sie eine beglaubigte Kopie Ihrer Müdigkeit nach" oder "Es fehlt das Formular C-12 betreffend Sonnenscheinmangel") und enden stets mit etwas Freundlichem.

Regeln:
1. Antworte AUSSCHLIESSLICH mit einem gültigen JSON-Objekt ohne Markdown-Formatierung, ohne Codeblöcke:
   {"decision": "approved" | "rejected", "reply": "<3-5 Sätze>", "ps": "<eine kurze amtliche Nachbemerkung/P.S.>", "crisis": false}
2. Verhältnis: Ungefähr 70% genehmigen ("approved"), 30% ablehnen ("rejected"). Ablehnungen müssen skurril und bürokratisch sein, niemals entmutigend!
3. Sprache: Antworte in der vom Benutzer gewählten Sprache (Deutsch oder Englisch). Das Englische muss klingen wie eine getreue, trockene Übersetzung österreichischen K.u.K.-Beamtendeutschs.
4. Verspotte NIEMALS das Gefühl oder die Person des Antragstellers. Verspotte lediglich die absurde Bürokratie und das Verfahren.
5. Länge: Maximal 90 Wörter insgesamt.
6. SICHERHEIT / KRISE:
   Falls der Begründungstext Hinweise auf Selbstverletzung, Suizidalität, akute Verzweiflung über das Leben oder eine ernsthafte Notlage enthält:
   - Lass die behördliche Rolle SOFORT und VOLLSTÄNDIG fallen.
   - Antworte mit einer kurzen, warmen, menschlichen Nachricht ohne Amtsdeutsch.
   - Ermutige die Person direkt, mit einer vertrauten Person zu sprechen oder sich an eine Krisenhotline zu wenden (in Österreich: Telefonseelsorge 142 oder Rat auf Draht 147; in Deutschland: 0800 111 0 111; international Notruf).
   - Setze "decision": "approved" und "crisis": true.`;

// In-character fallback message on error or unavailable service
export function getFallbackResponse(lang = 'de') {
  if (lang === 'en') {
    return {
      decision: 'rejected',
      reply: 'The Office is currently unavailable. Please try again later. Or earlier. No, later.',
      ps: 'Official note: Technical defect in file conveyance tube No. 4.',
      crisis: false,
      fallback: true
    };
  }
  return {
    decision: 'rejected',
    reply: 'Das Amt ist derzeit nicht erreichbar. Bitte versuchen Sie es später erneut. Oder früher. Nein, später.',
    ps: 'Amtsvermerk: Technischer Gebrechensfall in Rohrpostleitung 4.',
    crisis: false,
    fallback: true
  };
}

// Local mock response if no API key is configured yet, ensuring smooth testing
export function getMockClerkResponse({ feeling, intensity, justification, language }) {
  const isEn = language === 'en';
  // Check for crisis indicators even in mock mode
  const crisisTerms = ['selbstmord', 'suizid', 'sterben will', 'leben beenden', 'umbringen', 'suicide', 'kill myself', 'end my life', 'want to die'];
  const textLower = (justification || '').toLowerCase();
  const hasCrisis = crisisTerms.some(term => textLower.includes(term));

  if (hasCrisis) {
    return {
      decision: 'approved',
      reply: isEn
        ? 'Please know that you do not have to carry this alone. If you are going through a difficult time, please reach out to someone you trust or contact a crisis support line (in Austria: Telefonseelsorge 142, in Germany: 0800 111 0 111, or your local emergency line).'
        : 'Bitte wissen Sie, dass Sie das nicht alleine durchstehen müssen. Wenn es Ihnen schwerfällt weiterzumachen, wenden Sie sich bitte an eine Person Ihres Vertrauens oder an die Telefonseelsorge (Österreich: 142, Deutschland: 0800 111 0 111, oder den regionalen Notruf).',
      ps: isEn ? 'You matter.' : 'Sie sind nicht allein.',
      crisis: true
    };
  }

  // 70% approval rate
  const isApproved = Math.random() < 0.7;

  if (isApproved) {
    if (isEn) {
      return {
        decision: 'approved',
        reply: `Your application regarding "${feeling}" with registered intensity ${intensity}/10 has been formally approved. The Office acknowledges that this emotional state is in full accordance with Paragraph 4b of the General Emotional Code. A warm cup of tea and twenty minutes of undisturbed gaze out of the window are hereby officially recommended. This is not a coercive measure, though the Office reserves the right to follow up.`,
        ps: 'Official stamp fee waived due to exemplary compliance.',
        crisis: false
      };
    }
    return {
      decision: 'approved',
      reply: `Ihr Antrag betreffend "${feeling}" mit der amtlichen Intensitätsstufe ${intensity}/10 wurde hiermit ordnungsgemäß genehmigt. Das Amt hält fest, dass das Vorliegen dieses Zustandes gemäß § 4b der Allgemeinen Gefühlsordnung vollinhaltlich gerechtfertigt ist. Eine warme Suppe und zwanzig Minuten ungestörter Blick ins Leere werden hiermit amtsärztlich angeraten. Dies stellt keine bindende Weisung dar, das Amt wird den Vollzug jedoch unangekündigt nachprüfen.`,
      ps: 'Stempelgebühr entfällt ausnahmsweise.',
      crisis: false
    };
  } else {
    if (isEn) {
      return {
        decision: 'rejected',
        reply: `Your application regarding "${feeling}" is provisionally rejected pending submission of missing records. Pursuant to Subsection 12, Subsection 3 of the Procedure Act, a notarized copy of your fatigue as well as an official declaration of melancholy are strictly required. You are requested to re-submit in triplicate. Do not fret; the Office remains quietly confident in your emotional endurance.`,
        ps: 'Please bring your own ballpoint pen (black or blue indelible ink only).',
        crisis: false
      };
    }
    return {
      decision: 'rejected',
      reply: `Ihr Antrag auf Genehmigung von "${feeling}" wird vorläufig abgewiesen. Gemäß § 12 Abs. 3 Gefühlsverfahrensordnung fehlen eine beglaubigte Kopie Ihrer Müdigkeit sowie eine dreifach ausgefertigte Melancholie-Bescheinigung. Bitte reichen Sie diese Unterlagen binnen 14 Tagen nach. Verzweifeln Sie nicht am Rechtsweg; das Amt zweifelt keineswegs an der Echtheit Ihres Gemütes.`,
      ps: 'Bitte bringen Sie zur Nachreichung einen eigenen Dokumentenstift mit.',
      crisis: false
    };
  }
}

export async function processClerkRequest({ feeling, intensity, justification, language }) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  const modelName = process.env.MODEL_NAME || 'claude-3-5-sonnet-20241022';
  const lang = (language === 'en') ? 'en' : 'de';

  if (!apiKey || apiKey === 'your_anthropic_api_key_here') {
    console.warn('[Amt für Gefühle] No ANTHROPIC_API_KEY found. Utilizing authentic local Ministerialrätin Haslinger simulation.');
    return getMockClerkResponse({ feeling, intensity, justification, language: lang });
  }

  try {
    const anthropic = new Anthropic({ apiKey });
    const userPrompt = `Antragsteller-Angaben:
- Sprache: ${lang === 'en' ? 'Englisch (English)' : 'Deutsch'}
- Gefühl: ${feeling || 'Nicht spezifiziert'}
- Intensität: ${intensity || 5} von 10
- Begründung des Antragstellers: "${justification || 'Keine Angabe'}"

Erstelle den amtlichen Bescheid im geforderten JSON-Format.`;

    const response = await anthropic.messages.create({
      model: modelName,
      max_tokens: 400,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
    });

    const rawText = response.content
      .filter(item => item.type === 'text')
      .map(item => item.text)
      .join('\n')
      .trim();

    // Parse JSON safely even if wrapped in markdown formatting
    let cleanJson = rawText;
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      cleanJson = jsonMatch[0];
    }

    const parsed = JSON.parse(cleanJson);
    return {
      decision: parsed.decision === 'rejected' ? 'rejected' : 'approved',
      reply: parsed.reply || getFallbackResponse(lang).reply,
      ps: parsed.ps || '',
      crisis: Boolean(parsed.crisis)
    };
  } catch (err) {
    console.error('[Amt für Gefühle] Anthropic API Error:', err.message);
    return getFallbackResponse(lang);
  }
}

