import React, { useState, useEffect } from 'react';

const FEELINGS_DE = [
  { value: 'Traurigkeit', label: 'Traurigkeit (Melancholie, Weltschmerz)' },
  { value: 'Freude', label: 'Freude (Heiterkeit, unbegründetes Hochgefühl)' },
  { value: 'Wut', label: 'Wut (Zorn, Ärger über Formalitäten)' },
  { value: 'Angst', label: 'Angst (Beklemmung, Fristversäumnis-Furcht)' },
  { value: 'Sehnsucht', label: 'Sehnsucht (Fernweh, Verlangen)' },
  { value: 'Langeweile', label: 'Langeweile (Öde, Wartezimmer-Syndrom)' },
  { value: 'Überforderung', label: 'Überforderung (Zuständigkeitswirrwarr)' },
  { value: 'Sonstiges', label: 'Sonstiges (Sonderfall nach § 17)' },
];

const FEELINGS_EN = [
  { value: 'Sadness', label: 'Sadness (Melancholy, world-weariness)' },
  { value: 'Joy', label: 'Joy (Cheerfulness, unfounded buoyancy)' },
  { value: 'Anger', label: 'Anger (Rage, procedural frustration)' },
  { value: 'Fear', label: 'Fear (Apprehension, deadline terror)' },
  { value: 'Yearning', label: 'Yearning (Longing, vague nostalgia)' },
  { value: 'Boredom', label: 'Boredom (Tedium, waiting-room syndrome)' },
  { value: 'Overwhelm', label: 'Overwhelm (Jurisdictional overload)' },
  { value: 'Other', label: 'Other (Special case pursuant to Sec. 17)' },
];

function generateAktenzeichen() {
  const year = new Date().getFullYear();
  const roman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'][Math.floor(Math.random() * 10)];
  const num = Math.floor(1000 + Math.random() * 9000);
  const letter = ['W', 'K', 'N', 'St', 'B', 'OÖ', 'S'][Math.floor(Math.random() * 7)];
  return `AFG-${year}/${roman}-${num}/${letter}`;
}

// Authentic Austrian Administrative Round Seal (Dienstsiegel) - Clean, heraldic, zero animal shapes
function OfficialDienstsiegel({ topText, bottomText }) {
  const cx = 90;
  const cy = 90;
  const textRadius = 70;

  // Top arc: sweeps left to right over the top (-155° to -25°)
  const topChars = topText.split('');
  const topStep = (-25 - (-155)) / (topChars.length - 1 || 1);

  // Bottom arc: sweeps left to right along the bottom (155° down to 25°)
  const botChars = bottomText.split('');
  const botStep = (25 - 155) / (botChars.length - 1 || 1);

  return (
    <svg
      className="administrative-crest"
      viewBox="0 0 180 180"
      fill="none"
      stroke="currentColor"
      aria-label={`${topText} - ${bottomText}`}
    >
      {/* Outer official concentric seal rings */}
      <circle cx={cx} cy={cy} r="86" strokeWidth="2.2" />
      <circle cx={cx} cy={cy} r="81" strokeWidth="1" strokeDasharray="3 2" />
      <circle cx={cx} cy={cy} r="58" strokeWidth="1.2" />

      {/* Top Arched Typography */}
      {topChars.map((char, i) => {
        const angle = -155 + i * topStep;
        const rad = (angle * Math.PI) / 180;
        const x = cx + textRadius * Math.cos(rad);
        const y = cy + textRadius * Math.sin(rad);
        const rot = angle + 90;
        return (
          <text
            key={`top-${i}`}
            x={x}
            y={y}
            transform={`rotate(${rot}, ${x}, ${y})`}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="8.8"
            fontWeight="700"
            fill="currentColor"
            fontFamily="'Courier Prime', 'Special Elite', monospace"
          >
            {char}
          </text>
        );
      })}

      {/* Side separator stars */}
      <text
        x="18"
        y="91"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="10"
        fill="currentColor"
      >
        ★
      </text>
      <text
        x="162"
        y="91"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="10"
        fill="currentColor"
      >
        ★
      </text>

      {/* Bottom Arched Typography */}
      {botChars.map((char, i) => {
        const angle = 155 + i * botStep;
        const rad = (angle * Math.PI) / 180;
        const x = cx + textRadius * Math.cos(rad);
        const y = cy + textRadius * Math.sin(rad);
        const rot = angle - 90;
        return (
          <text
            key={`bot-${i}`}
            x={x}
            y={y}
            transform={`rotate(${rot}, ${x}, ${y})`}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="8.8"
            fontWeight="700"
            fill="currentColor"
            fontFamily="'Courier Prime', 'Special Elite', monospace"
          >
            {char}
          </text>
        );
      })}

      {/* Crossed Bureaucratic Quill Pens behind the central shield */}
      <line x1="63" y1="63" x2="117" y2="117" strokeWidth="1.4" strokeLinecap="round" />
      <polygon points="63,63 68,60 70,66" fill="currentColor" />
      <line x1="117" y1="63" x2="63" y2="117" strokeWidth="1.4" strokeLinecap="round" />
      <polygon points="117,63 112,60 110,66" fill="currentColor" />

      {/* Mural Crown (Mauerkrone) */}
      <path
        d="M74 53 L74 45 L79 48 L84 44 L90 44 L96 48 L101 45 L101 53 Z"
        fill="currentColor"
        fillOpacity="0.12"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <line x1="74" y1="49" x2="101" y2="49" strokeWidth="1.1" />

      {/* Austrian Escutcheon / Shield */}
      <path
        d="M71 54 H109 V79 C109 96 90 107 90 107 C90 107 71 96 71 79 Z"
        fill="#fbf8f1"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Horizontal Fess (Bindenschild) */}
      <rect
        x="72"
        y="66"
        width="36"
        height="14"
        fill="currentColor"
        fillOpacity="0.22"
        strokeWidth="1.2"
      />

      {/* Established Year & Office Location */}
      <text
        x="90"
        y="124"
        fontSize="7.5"
        fontWeight="700"
        letterSpacing="1.2"
        textAnchor="middle"
        dominantBaseline="central"
        fill="currentColor"
        fontFamily="'Courier Prime', 'Special Elite', monospace"
      >
        WIEN • 1874
      </text>
    </svg>
  );
}

// Authentic Austrian Revenue Stamp (Stempelmarke gem. Gebührengesetz)
function VintageStempelmarke({ isCancelled = true, mainVal = '2 S', subVal = '40 g', cancelText = 'ENTWERTET' }) {
  return (
    <div className={`stempelmarke-badge ${isCancelled ? 'cancelled' : ''}`} aria-hidden="true">
      <div className="stempelmarke-perforated">
        <div className="stempelmarke-inner">
          <span className="sm-republic">ÖSTERR.</span>
          <span className="sm-mid">STEMPEL</span>
          <div className="sm-val-box">
            <span className="sm-val-main">{mainVal}</span>
            <span className="sm-val-sub">{subVal}</span>
          </div>
          <span className="sm-footer">MARKE</span>
        </div>
      </div>
      {isCancelled && (
        <div className="sm-cancellation-overlay">
          <div className="sm-ink-stroke sm-stroke-1" />
          <div className="sm-ink-stroke sm-stroke-2" />
          <span className="sm-cancel-stamp">{cancelText}</span>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState('de'); // 'de' or 'en'
  const [feeling, setFeeling] = useState('Traurigkeit');
  const [customFeeling, setCustomFeeling] = useState('');
  const [intensity, setIntensity] = useState(5);
  const [justification, setJustification] = useState('');
  const [aktenzeichen, setAktenzeichen] = useState('');
  const [submissionDate, setSubmissionDate] = useState('');

  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'result'
  const [result, setResult] = useState(null);
  const [stampAngle, setStampAngle] = useState(0);
  const [isShaking, setIsShaking] = useState(false);

  // Local Storage: Amtsarchiv (Docket History)
  const [archive, setArchive] = useState(() => {
    try {
      const saved = localStorage.getItem('amt_fuer_gefuehle_archive_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [showArchive, setShowArchive] = useState(false);

  useEffect(() => {
    setAktenzeichen(generateAktenzeichen());
    const now = new Date();
    setSubmissionDate(now.toLocaleDateString(lang === 'de' ? 'de-AT' : 'en-GB'));
  }, [lang]);

  // When changing language, update default feeling selection if appropriate
  const handleLangToggle = (newLang) => {
    if (newLang === lang) return;
    setLang(newLang);
    if (feeling === 'Traurigkeit' && newLang === 'en') setFeeling('Sadness');
    if (feeling === 'Sadness' && newLang === 'de') setFeeling('Traurigkeit');
  };

  const currentFeelings = lang === 'de' ? FEELINGS_DE : FEELINGS_EN;
  const isOther = feeling === 'Sonstiges' || feeling === 'Other';

  const getIntensityLabel = (val) => {
    if (lang === 'de') {
      if (val <= 2) return 'Amtlich unbedenklich';
      if (val <= 5) return 'Mäßig behördenrelevant';
      if (val <= 8) return 'Erhebliches Gemütsaufkommen';
      return 'Meldepflichtig (§ 9)';
    } else {
      if (val <= 2) return 'Officially harmless';
      if (val <= 5) return 'Moderately relevant';
      if (val <= 8) return 'Substantial inner commotion';
      return 'Mandatory reporting (Sec. 9)';
    }
  };

  // Subtle acoustic thud of wooden stamp on paper
  const playThud = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(95, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(25, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.35, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.13);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.14);
    } catch {
      // AudioContext unavailable or blocked by browser policy
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'loading') return;

    setStatus('loading');
    setResult(null);

    const chosenFeeling = isOther ? (customFeeling.trim() || (lang === 'de' ? 'Unbenanntes Gefühl' : 'Unnamed feeling')) : feeling;

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          feeling: chosenFeeling,
          intensity,
          justification,
          language: lang,
        }),
      });

      const data = await response.json();
      setResult(data);

      // Random stamp rotation between -6 and +6 degrees as specified
      const randomAngle = (Math.random() * 12 - 6).toFixed(1);
      setStampAngle(randomAngle);

      // Save petition & official decree to local Amtsarchiv
      const archiveItem = {
        id: Date.now().toString(),
        aktenzeichen,
        date: submissionDate,
        timestamp: Date.now(),
        feeling: chosenFeeling,
        intensity,
        justification,
        language: lang,
        decision: data.decision,
        reply: data.reply,
        ps: data.ps,
        crisis: Boolean(data.crisis),
        stampAngle: randomAngle,
      };

      setArchive((prev) => {
        const next = [archiveItem, ...prev].slice(0, 50);
        try {
          localStorage.setItem('amt_fuer_gefuehle_archive_v1', JSON.stringify(next));
        } catch (err) {
          console.warn('LocalStorage save failed:', err);
        }
        return next;
      });

      setStatus('result');

      // Trigger screen thud vibration & acoustic impact if not crisis mode
      if (!data.crisis) {
        setTimeout(() => {
          playThud();
          setIsShaking(true);
          setTimeout(() => setIsShaking(false), 300);
        }, 220);
      }
    } catch (err) {
      console.error('Submission failed:', err);
      setResult({
        decision: 'rejected',
        reply: lang === 'de'
          ? 'Das Amt ist derzeit nicht erreichbar. Bitte versuchen Sie es später erneut. Oder früher. Nein, später.'
          : 'The Office is currently unavailable. Please try again later. Or earlier. No, later.',
        ps: lang === 'de' ? 'Amtsvermerk: Aktenmappe unauffindbar.' : 'Official note: Dossier temporarily mislaid.',
        crisis: false
      });
      setStampAngle(-3.5);
      setStatus('result');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setResult(null);
    setJustification('');
    setCustomFeeling('');
    setIntensity(5);
    setFeeling(lang === 'de' ? 'Traurigkeit' : 'Sadness');
    setAktenzeichen(generateAktenzeichen());
  };

  const handleOpenArchiveItem = (item) => {
    setAktenzeichen(item.aktenzeichen);
    setSubmissionDate(item.date);
    setResult({
      decision: item.decision,
      reply: item.reply,
      ps: item.ps,
      crisis: Boolean(item.crisis)
    });
    setStampAngle(item.stampAngle || -2);
    setStatus('result');
    setShowArchive(false);
  };

  const handleClearArchive = () => {
    const confirmMsg = lang === 'de'
      ? 'Möchten Sie alle behördlich erfassten Gefühlsakten unwiderruflich dem Reißwolf übergeben?'
      : 'Do you wish to permanently destroy all stored emotional dossiers in the office shredder?';
    if (window.confirm(confirmMsg)) {
      setArchive([]);
      try {
        localStorage.removeItem('amt_fuer_gefuehle_archive_v1');
      } catch (err) {
        console.warn('Failed clearing storage:', err);
      }
    }
  };

  const t = {
    de: {
      crestLabel: 'REPUBLIK ÖSTERREICH • MAGISTRAT DER GEFÜHLE',
      topSealText: 'REPUBLIK ÖSTERREICH',
      bottomSealText: 'AMT FÜR GEFÜHLE',
      officeTitle: 'Amt für Gefühle',
      officeSub: 'Bundesevidenzstelle für seelische Vorgänge und Affektbescheide',
      formNumber: 'FORMULAR B-7',
      revTag: 'Gem. § 4 Abs. 1 Gefühlsregistrierungsgesetz (GRegG 1927)',
      aktenzeichenLabel: 'Aktenzahl (GZ):',
      dateLabel: 'Einreichdatum:',
      deptLabel: 'Zuständige Abteilung:',
      deptVal: 'MA 42 / Ref. Gemütszustände',
      clerkLabel: 'Amtsführender Referent:',
      clerkVal: 'Fr. Ministerialrätin Dr. Eleonore Haslinger',
      formHeading: 'Antrag auf Registrierung eines Gefühls',
      formLead: 'Hinweis: Unvollständige oder gefühlsarme Angaben verzögern das Amtsverfahren erheblich.',
      feelingLabel: '1. Art des vorliegenden Gefühls',
      customFeelingPlaceholder: 'Präzisieren Sie das unbenannte Gefühl...',
      intensityLabel: '2. Amtliche Intensitätsstufe (1 bis 10)',
      intensityMin: '1 (Harmlos)',
      intensityMax: '10 (Meldepflichtig)',
      justificationLabel: '3. Begründung des Antragstellers',
      justificationSub: 'Warum empfinden Sie dieses Gefühl? (Höchstgrenze: 280 Zeichen)',
      charCount: (len) => `${len} / 280 Zeichen`,
      justificationPlaceholder: 'Geben Sie den Sachverhalt möglichst nüchtern zu Protokoll...',
      legalNotice: 'Ich erkläre hiermit an Eides statt, dass obige Empfindung den tatsächlichen Gegebenheiten meines Inneren entspricht.',
      submitBtn: 'Amtlich Einreichen',
      loadingLead: 'Ihr Antrag wird bearbeitet...',
      loadingSub: 'Bitte warten Sie. Bitte warten Sie weiter.',
      loadingClerkNote: 'Ministerialrätin Dr. Haslinger prüft die Sachlage anhand der Akten...',
      decreeTitle: 'BESCHEID',
      decreeSub: 'Im Namen der Republik',
      decreeNotice: 'Über den Antrag auf Zuerkennung und Registrierung ergeht folgende behördliche Erledigung:',
      approvedStamp: 'GENEHMIGT',
      approvedStampSub: 'AMT FÜR GEFÜHLE • BESCHEID ERTEILT',
      rejectedStamp: 'ABGELEHNT',
      rejectedStampSub: 'UNTERLAGEN NACHREICHEN • B-7/M',
      signOffTitle: 'Für das Bundesamt:',
      signature: 'Dr. Eleonore Haslinger',
      signatureRank: 'Ministerialrätin d. R., Leitende Amtsdirektorin',
      newBtn: 'Neuen Antrag stellen',
      printBtn: 'Bescheid drucken',
      archiveBtn: (count) => `Amtsarchiv (${count})`,
      archiveTooltip: 'Persönliche Gefühlsakten einsehen',
      archiveHeading: 'Bürger-Aktenablage gem. § 7 Archivgesetz',
      archiveSub: 'Lokal auf diesem Endgerät gespeicherte Bescheide',
      archiveEmpty: 'Das Amtsarchiv ist leer. Bislang wurden noch keine Gefühlsanträge erfasst.',
      archiveOpenBtn: 'Bescheid aufrufen',
      archiveDeleteBtn: 'Aktenvernichtung (Reißwolf)',
      archiveCloseBtn: 'Archiv schließen',
      archiveFeelingLabel: 'Gefühl',
      archiveIntensityLabel: 'Stufe',
      feeBoxHeading: 'Gebührenbemessung gem. Gebührengesetz 1946 (BGBl. Nr. 184)',
      feeItem1: 'TP 14 Abs. 1 (Registrierung eines inneren Affekts)',
      feeItem1Val: '2,40 ATS',
      feeItem2: 'Kanzleitaxe & Formular B-7 Ausfertigung',
      feeItem2Val: '1,10 ATS',
      feeTotalLabel: 'Amtsgebühr gesamt:',
      feeTotalVal: '3,50 ATS',
      feeWaiverNote: 'Befreiungsvermerk: Gemäß § 3 Abs. 4 Gebührengesetz wird infolge unverschuldeter seelischer Erschütterung vollständige Gebührenbefreiung erteilt. Vorgeschriebener Barbetrag: 0,00 Schilling.',
      stempelmarkeMain: '2 S',
      stempelmarkeSub: '40 g',
      stempelmarkeCancelled: 'ENTWERTET',
      crisisBadge: 'WICHTIGER AMTLICHER HINWEIS',
      crisisPhoneNote: 'Soforthilfe & Krisenberatung (kostenlos & vertraulich):',
      atCrisis: 'Österreich: Telefonseelsorge 142 • Rat auf Draht 147',
      deCrisis: 'Deutschland: Telefonseelsorge 0800 111 0 111 / 0800 111 0 222',
      intlCrisis: 'Im Notfall: Euro-Notruf 112'
    },
    en: {
      crestLabel: 'REPUBLIC OF AUSTRIA • MAGISTRACY OF FEELINGS',
      topSealText: 'REPUBLIC OF AUSTRIA',
      bottomSealText: 'OFFICE OF FEELINGS',
      officeTitle: 'Office of Feelings',
      officeSub: 'Federal Directorate for Emotional Intake and Formal Decrees',
      formNumber: 'FORM B-7',
      revTag: 'Pursuant to Sec. 4 Para. 1 Emotional Registry Act (ERA 1927)',
      aktenzeichenLabel: 'File Number (GZ):',
      dateLabel: 'Filing Date:',
      deptLabel: 'Competent Division:',
      deptVal: 'Dept. 42 / Div. of Affective Affairs',
      clerkLabel: 'Presiding Senior Officer:',
      clerkVal: 'Ministerial Counselor Dr. Eleonore Haslinger',
      formHeading: 'Application for Registration of a Feeling',
      formLead: 'Notice: Incomplete or emotionally evasive declarations shall prolong proceedings indefinitely.',
      feelingLabel: '1. Classification of feeling to be registered',
      customFeelingPlaceholder: 'Specify the non-standard emotion...',
      intensityLabel: '2. Official intensity rating (1 to 10)',
      intensityMin: '1 (Harmless)',
      intensityMax: '10 (Mandatory Reporting)',
      justificationLabel: '3. Applicant statement of justification',
      justificationSub: 'Why do you feel this? (Maximum: 280 characters)',
      charCount: (len) => `${len} / 280 characters`,
      justificationPlaceholder: 'State the relevant facts with appropriate administrative composure...',
      legalNotice: 'I hereby solemnly affirm that the emotional state recorded above reflects genuine internal occurrences.',
      submitBtn: 'Submit to Directorate',
      loadingLead: 'Your application is being processed...',
      loadingSub: 'Please wait. Please continue waiting.',
      loadingClerkNote: 'Ministerial Counselor Dr. Haslinger is inspecting the docket...',
      decreeTitle: 'OFFICIAL DECREE',
      decreeSub: 'In the Name of the Republic',
      decreeNotice: 'Upon consideration of the registered application, the Directorate decrees as follows:',
      approvedStamp: 'APPROVED',
      approvedStampSub: 'OFFICE OF FEELINGS • DECREE GRANTED',
      rejectedStamp: 'REJECTED',
      rejectedStampSub: 'SUPPLEMENTARY RECORDS REQUIRED',
      signOffTitle: 'For the Federal Directorate:',
      signature: 'Dr. Eleonore Haslinger',
      signatureRank: 'Ministerial Counselor, Chief Executive Director',
      newBtn: 'Submit new application',
      printBtn: 'Print decree',
      archiveBtn: (count) => `Docket Archive (${count})`,
      archiveTooltip: 'Review stored emotional dossiers',
      archiveHeading: 'Citizen Docket Depository (Sec. 7 Archives Act)',
      archiveSub: 'Locally preserved official decrees on this device',
      archiveEmpty: 'The docket archive is vacant. No emotion petitions have been recorded yet.',
      archiveOpenBtn: 'Inspect decree',
      archiveDeleteBtn: 'Shred all records',
      archiveCloseBtn: 'Close archive',
      archiveFeelingLabel: 'Emotion',
      archiveIntensityLabel: 'Level',
      feeBoxHeading: 'Duty Assessment pursuant to Stamp Duty Act 1946 (Fed. Gaz. No. 184)',
      feeItem1: 'Tariff Item 14 Para. 1 (Registration of internal affect)',
      feeItem1Val: '2.40 ATS',
      feeItem2: 'Chancery duty & Form B-7 dossier execution',
      feeItem2Val: '1.10 ATS',
      feeTotalLabel: 'Total official duty:',
      feeTotalVal: '3.50 ATS',
      feeWaiverNote: 'Exemption clause: Pursuant to Sec. 3 Para. 4 Stamp Duty Act, full statutory exemption is hereby granted due to blameless emotional commotion. Prescribed payment: 0.00 Schillings.',
      stempelmarkeMain: '2 S',
      stempelmarkeSub: '40 g',
      stempelmarkeCancelled: 'CANCELLED',
      crisisBadge: 'CRITICAL OFFICIAL ASSISTANCE NOTICE',
      crisisPhoneNote: 'Immediate & confidential emotional support lines:',
      atCrisis: 'Austria: Telephone Emergency Support 142 • Youth Line 147',
      deCrisis: 'Germany: Support Line 0800 111 0 111',
      intlCrisis: 'Emergency services: 112 or local crisis lines'
    }
  }[lang];

  return (
    <div className={`page-wrapper ${isShaking ? 'screen-shake' : ''}`}>
      {/* Background paper texture wrapper */}
      <main className="document-container">
        
        {/* Top Control Bar: Form ID, Archive Drawer Button, and Language Toggle */}
        <div className="top-bar no-print">
          <div className="top-bar-left">
            <span className="form-meta-tag">{t.formNumber}</span>
            <VintageStempelmarke
              isCancelled={false}
              mainVal={t.stempelmarkeMain}
              subVal={t.stempelmarkeSub}
              cancelText={t.stempelmarkeCancelled}
            />
            <button
              type="button"
              className={`archive-toggle-btn ${showArchive ? 'active' : ''}`}
              onClick={() => setShowArchive(!showArchive)}
              title={t.archiveTooltip}
            >
              <span className="archive-icon">🗂</span>
              <span>{t.archiveBtn(archive.length)}</span>
            </button>
          </div>

          <div className="lang-switcher" role="group" aria-label="Language selector">
            <button
              type="button"
              className={`lang-btn ${lang === 'de' ? 'active' : ''}`}
              onClick={() => handleLangToggle('de')}
              title="Auf Deutsch umschalten"
            >
              DE
            </button>
            <span className="lang-sep">|</span>
            <button
              type="button"
              className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
              onClick={() => handleLangToggle('en')}
              title="Switch to English"
            >
              EN
            </button>
          </div>
        </div>

        {/* Amtsarchiv Drawer (Local Docket History) */}
        {showArchive && (
          <section className="archive-drawer no-print" aria-label="Amtsarchiv">
            <div className="archive-drawer-head">
              <div className="archive-title-block">
                <h2 className="archive-title">🗂 {t.archiveHeading}</h2>
                <p className="archive-sub">{t.archiveSub}</p>
              </div>
              <button
                type="button"
                className="archive-close-btn"
                onClick={() => setShowArchive(false)}
                title={t.archiveCloseBtn}
              >
                ✕
              </button>
            </div>

            {archive.length === 0 ? (
              <div className="archive-empty-box">
                <p>{t.archiveEmpty}</p>
              </div>
            ) : (
              <div className="archive-list">
                {archive.map((item) => (
                  <article key={item.id} className="archive-card">
                    <div className="archive-card-header">
                      <span className={`archive-badge ${item.decision === 'approved' ? 'badge-approved' : 'badge-rejected'}`}>
                        {item.decision === 'approved' ? t.approvedStamp : t.rejectedStamp}
                      </span>
                      <span className="archive-code">{item.aktenzeichen}</span>
                      <span className="archive-date">{item.date}</span>
                    </div>

                    <div className="archive-card-body">
                      <div className="archive-meta">
                        <strong>{t.archiveFeelingLabel}:</strong> {item.feeling} &bull; <strong>{t.archiveIntensityLabel}:</strong> {item.intensity}/10
                      </div>
                      {item.justification && (
                        <p className="archive-snippet">„{item.justification}“</p>
                      )}
                    </div>

                    <div className="archive-card-actions">
                      <button
                        type="button"
                        className="archive-open-btn"
                        onClick={() => handleOpenArchiveItem(item)}
                      >
                        📄 {t.archiveOpenBtn}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}

            <div className="archive-drawer-footer">
              {archive.length > 0 && (
                <button
                  type="button"
                  className="archive-shred-btn"
                  onClick={handleClearArchive}
                >
                  ✂ {t.archiveDeleteBtn}
                </button>
              )}
              <button
                type="button"
                className="archive-dismiss-btn"
                onClick={() => setShowArchive(false)}
              >
                {t.archiveCloseBtn}
              </button>
            </div>
          </section>
        )}

        {/* Official Header with Authentic Austrian Administrative Round Seal */}
        <header className="official-header">
          <div className="crest-wrapper" aria-hidden="true">
            <OfficialDienstsiegel topText={t.topSealText} bottomText={t.bottomSealText} />
          </div>

          <div className="header-titles">
            <span className="crest-text">{t.crestLabel}</span>
            <h1 className="main-title">{t.officeTitle}</h1>
            <p className="subtitle">{t.officeSub}</p>
          </div>
        </header>

        {/* Administrative Filing Box */}
        <section className="stamp-box-grid" aria-label="Official Filing Data">
          <div className="stamp-cell">
            <span className="cell-label">{t.aktenzeichenLabel}</span>
            <span className="cell-value akten-code">{aktenzeichen}</span>
          </div>
          <div className="stamp-cell">
            <span className="cell-label">{t.dateLabel}</span>
            <span className="cell-value">{submissionDate}</span>
          </div>
          <div className="stamp-cell">
            <span className="cell-label">{t.deptLabel}</span>
            <span className="cell-value">{t.deptVal}</span>
          </div>
          <div className="stamp-cell">
            <span className="cell-label">{t.clerkLabel}</span>
            <span className="cell-value">{t.clerkVal}</span>
          </div>
        </section>

        <div className="decorative-divider">
          <span>§ § §</span>
        </div>

        {/* STATE 1: IDLE / FORM VIEW */}
        {status === 'idle' && (
          <form className="filing-form" onSubmit={handleSubmit}>
            <div className="form-intro">
              <h2 className="form-heading">{t.formHeading}</h2>
              <p className="form-lead">{t.formLead}</p>
            </div>

            {/* Field 1: Feeling Dropdown */}
            <div className="form-group">
              <label htmlFor="feeling-select" className="field-label">
                {t.feelingLabel}
              </label>
              <div className="select-wrapper">
                <select
                  id="feeling-select"
                  className="paper-select"
                  value={feeling}
                  onChange={(e) => setFeeling(e.target.value)}
                  required
                >
                  {currentFeelings.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              {isOther && (
                <div className="custom-input-wrapper">
                  <input
                    type="text"
                    className="paper-input"
                    placeholder={t.customFeelingPlaceholder}
                    value={customFeeling}
                    onChange={(e) => setCustomFeeling(e.target.value)}
                    maxLength={50}
                    required
                  />
                </div>
              )}
            </div>

            {/* Field 2: Intensity Slider */}
            <div className="form-group">
              <div className="slider-header">
                <label htmlFor="intensity-range" className="field-label">
                  {t.intensityLabel}
                </label>
                <div className="intensity-badge">
                  <span className="intensity-val">{intensity}</span>
                  <span className="intensity-desc">({getIntensityLabel(intensity)})</span>
                </div>
              </div>

              <div className="slider-container">
                <input
                  type="range"
                  id="intensity-range"
                  min="1"
                  max="10"
                  step="1"
                  value={intensity}
                  onChange={(e) => setIntensity(Number(e.target.value))}
                  className="paper-slider"
                />
                <div className="slider-ticks" aria-hidden="true">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <span
                      key={num}
                      className={`tick-mark ${num === intensity ? 'active' : ''}`}
                    >
                      {num}
                    </span>
                  ))}
                </div>
                <div className="slider-endpoints">
                  <span>{t.intensityMin}</span>
                  <span>{t.intensityMax}</span>
                </div>
              </div>
            </div>

            {/* Field 3: Justification Textarea */}
            <div className="form-group">
              <div className="textarea-header">
                <label htmlFor="justification-text" className="field-label">
                  {t.justificationLabel}
                </label>
                <span className="char-counter">
                  {t.charCount(justification.length)}
                </span>
              </div>
              <p className="field-hint">{t.justificationSub}</p>
              <textarea
                id="justification-text"
                className="paper-textarea"
                rows="4"
                maxLength={280}
                placeholder={t.justificationPlaceholder}
                value={justification}
                onChange={(e) => setJustification(e.target.value)}
                required
              />
            </div>

            {/* Affirmation checkbox / legal note */}
            <div className="legal-statement">
              <div className="stamp-square-icon" aria-hidden="true">¶</div>
              <p>{t.legalNotice}</p>
            </div>

            {/* Submit Button */}
            <div className="form-actions">
              <button type="submit" className="official-submit-btn">
                <span className="btn-text">{t.submitBtn}</span>
              </button>
            </div>
          </form>
        )}

        {/* STATE 2: LOADING / PROCESSING VIEW */}
        {status === 'loading' && (
          <section className="loading-card" aria-live="polite">
            <div className="typewriter-loader">
              <div className="pending-stamp-box">
                <span className="pending-code">IN BEARBEITUNG</span>
              </div>
              <div className="spinner-dots">
                <span className="dot">.</span>
                <span className="dot">.</span>
                <span className="dot">.</span>
              </div>
            </div>
            <h2 className="loading-lead">{t.loadingLead}</h2>
            <p className="loading-sub">{t.loadingSub}</p>
            <p className="loading-clerk-note">{t.loadingClerkNote}</p>
          </section>
        )}

        {/* STATE 3: OFFICIAL DECREE / BESCHEID VIEW */}
        {status === 'result' && result && (
          <section className="bescheid-container" aria-live="assertive">
            <article className={`bescheid-sheet ${result.crisis ? 'crisis-mode' : ''}`}>
              
              {/* Bescheid Header */}
              <div className="bescheid-head">
                <button
                  type="button"
                  className="quick-print-icon-btn no-print"
                  onClick={() => window.print()}
                  title={t.printBtn}
                  aria-label={t.printBtn}
                >
                  <svg className="print-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="6 9 6 2 18 2 18 9" />
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                    <rect x="6" y="14" width="12" height="8" />
                  </svg>
                </button>
                <div className="bescheid-seal-stamp" aria-hidden="true">
                  ★ MAGISTRAT ★
                </div>
                <h2 className="bescheid-title">{t.decreeTitle}</h2>
                <span className="bescheid-sub">{t.decreeSub}</span>
                <div className="bescheid-meta-line">
                  <span>{t.aktenzeichenLabel} <strong>{aktenzeichen}</strong></span>
                  <span>{t.dateLabel} <strong>{submissionDate}</strong></span>
                </div>
              </div>

              {/* CRISIS MODE (NO STAMP ANIMATION - DIGNIFIED CARE CARD) */}
              {result.crisis ? (
                <div className="crisis-advisory-box">
                  <div className="crisis-header-badge">
                    <span className="alert-symbol">♥</span> {t.crisisBadge}
                  </div>
                  <p className="crisis-message">{result.reply}</p>
                  {result.ps && <p className="crisis-ps"><em>{result.ps}</em></p>}
                  
                  <div className="crisis-hotlines">
                    <p className="hotlines-lead"><strong>{t.crisisPhoneNote}</strong></p>
                    <ul className="hotlines-list">
                      <li>{t.atCrisis}</li>
                      <li>{t.deCrisis}</li>
                      <li>{t.intlCrisis}</li>
                    </ul>
                  </div>
                </div>
              ) : (
                /* NORMAL BUREAUCRATIC DECISION WITH RUBBER STAMP */
                <div className="decision-content">
                  {/* Rubber Stamp Slammed on the Page */}
                  <div
                    className={`rubber-stamp ${result.decision === 'approved' ? 'stamp-approved' : 'stamp-rejected'}`}
                    style={{
                      '--stamp-angle': `${stampAngle}deg`,
                      transform: `rotate(${stampAngle}deg)`
                    }}
                    aria-label={`Official Decision: ${result.decision === 'approved' ? t.approvedStamp : t.rejectedStamp}`}
                  >
                    <div className="stamp-inner-border">
                      <div className="stamp-text-main">
                        {result.decision === 'approved' ? t.approvedStamp : t.rejectedStamp}
                      </div>
                      <div className="stamp-text-sub">
                        {result.decision === 'approved' ? t.approvedStampSub : t.rejectedStampSub}
                      </div>
                    </div>
                  </div>

                  <p className="bescheid-intro">{t.decreeNotice}</p>
                  
                  {/* 3-5 Sentences Clerk Reply */}
                  <div className="clerk-reply-text">
                    <p>{result.reply}</p>
                  </div>

                  {/* Postscript / Amtsvermerk */}
                  {result.ps && (
                    <div className="clerk-ps-box">
                      <span className="ps-label">Amtsvermerk (P.S.):</span>
                      <p className="ps-text">{result.ps}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Official Fee Assessment Box (Gebührenbemessung) */}
              <div className="fee-assessment-box">
                <div className="fee-box-header">
                  <span className="fee-box-title">{t.feeBoxHeading}</span>
                  <VintageStempelmarke
                    isCancelled={true}
                    mainVal={t.stempelmarkeMain}
                    subVal={t.stempelmarkeSub}
                    cancelText={t.stempelmarkeCancelled}
                  />
                </div>
                <div className="fee-table">
                  <div className="fee-row">
                    <span className="fee-name">{t.feeItem1}</span>
                    <span className="fee-amount">{t.feeItem1Val}</span>
                  </div>
                  <div className="fee-row">
                    <span className="fee-name">{t.feeItem2}</span>
                    <span className="fee-amount">{t.feeItem2Val}</span>
                  </div>
                  <div className="fee-row fee-total-row">
                    <strong className="fee-name">{t.feeTotalLabel}</strong>
                    <strong className="fee-amount">{t.feeTotalVal}</strong>
                  </div>
                </div>
                <p className="fee-waiver-notice">
                  <em>{t.feeWaiverNote}</em>
                </p>
              </div>

              {/* Official Sign-Off & Seal */}
              <div className="bescheid-footer">
                <div className="official-signature-block">
                  <span className="sign-intro">{t.signOffTitle}</span>
                  <div className="signature-fountain-pen" aria-label="Official signature of Dr. Eleonore Haslinger">
                    {t.signature}
                  </div>
                  <span className="signature-rank">{t.signatureRank}</span>
                </div>
                <div className="wax-seal-imprint" aria-hidden="true">
                  <div className="seal-ring">
                    <span>AMT FÜR GEFÜHLE</span>
                    <small>WIEN • 1874</small>
                  </div>
                </div>
              </div>

            </article>

            {/* Actions: Print and Reset Form */}
            <div className="bescheid-actions no-print">
              <button
                type="button"
                className="print-bescheid-btn"
                onClick={() => window.print()}
                title={t.printBtn}
              >
                <svg className="print-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="6 9 6 2 18 2 18 9" />
                  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                  <rect x="6" y="14" width="12" height="8" />
                </svg>
                <span>{t.printBtn}</span>
              </button>

              <button
                type="button"
                className="reset-form-btn"
                onClick={handleReset}
              >
                ⟲ {t.newBtn}
              </button>
            </div>
          </section>
        )}

        {/* Footer legal watermark */}
        <footer className="official-footer">
          <p className="footer-code">{t.revTag} • Formular B-7 • Archiviert unter Zl. 994-G</p>
        </footer>
      </main>
    </div>
  );
}
