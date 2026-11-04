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

export { getFallbackResponse, getMockClerkResponse } from '../src/clerk-mock.js';

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

