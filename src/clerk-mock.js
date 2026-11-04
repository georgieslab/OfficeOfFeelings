// Authentic local simulation of Ministerialrätin Dr. Eleonore Haslinger
// Pure client/server shared logic with zero external SDK dependencies

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

export function getMockClerkResponse({ feeling, intensity, justification, language }) {
  const isEn = language === 'en';
  // Crisis safety check
  const crisisTerms = [
    'selbstmord', 'suizid', 'sterben will', 'leben beenden', 'umbringen',
    'suicide', 'kill myself', 'end my life', 'want to die', 'keinen sinn mehr'
  ];
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

