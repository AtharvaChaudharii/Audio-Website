export interface Team {
  id: string;
  name: string;
  emoji: string;
  primary: string;
  secondary: string;
  tagline: string;
  brainRegions: Record<number, string>;
  personalityType: string;
  personalityPowers: string[];
  prescriptionLine: string;
  tableRow: {
    w: number;
    l: number;
    meme: string;
    suffering: string;
    twitter: string;
    hope: string;
  };
}

export const TEAMS: Team[] = [
  {
    id: 'CSK',
    name: 'CSK',
    emoji: '🦁',
    primary: '#ffc107',
    secondary: '#1a237e',
    tagline: 'Thala for a reason. Reason: suffering.',
    brainRegions: {
      0: 'Toss anxiety: CRITICAL. Ruturaj please.',
      1: '"Last over faith: CLINICALLY ABSENT"',
      2: 'Dhoni 2011 WC six: stored forever',
      3: 'Crowd noise tolerance: STADIUM ONLY',
      4: 'Cricbuzz refreshes today: 847',
      5: 'IPL season: sleep optional, matches mandatory',
    },
    personalityType: 'THE ETERNAL OPTIMIST WHO\nHASN\'T SLEPT SINCE TUESDAY',
    personalityPowers: ['Unwavering faith in yellow', 'Blaming the pitch since 2010', 'Sanju Samson apologist'],
    prescriptionLine: 'Accept that Sanju Samson needs time (we believe)',
    tableRow: { w: 0, l: 2, meme: '📈 VIRAL', suffering: '89%', twitter: '8.9K', hope: '\'It\'s Thala\'' },
  },
  {
    id: 'MI',
    name: 'MI',
    emoji: '🔵',
    primary: '#004c93',
    secondary: '#d4af37',
    tagline: '5 trophies. 0 wins this week.',
    brainRegions: {
      0: 'Bumrah dependency: SEVERE',
      1: 'Trophy counting reflex: OVERDEVELOPED',
      2: 'Kieron Pollard moments: MUSEUM QUALITY',
      3: 'Commentary mute reflex: HAIR TRIGGER',
      4: 'Score checking: 903 times today',
      5: 'Life without Hardik: complicated',
    },
    personalityType: 'THE AGGRESSIVE MANIFEST-OR',
    personalityPowers: ['\'5 trophies\' as universal rebuke', 'Suryakumar appreciation society', 'Bumrah protection squad'],
    prescriptionLine: 'Accept that Hardik will return (probably, fingers crossed)',
    tableRow: { w: 0, l: 1, meme: '📉 MANAGED', suffering: '65%', twitter: '5.7K', hope: '68%' },
  },
  {
    id: 'RCB',
    name: 'RCB',
    emoji: '🔴',
    primary: '#c8102e',
    secondary: '#000000',
    tagline: 'Loading since 2008...',
    brainRegions: {
      0: 'Still processing 2016 final',
      1: 'Last over survival: OVERDEVELOPED',
      2: 'AB de Villiers retirement: unprocessed grief',
      3: 'Commentary mute reflex: HAIR TRIGGER',
      4: 'Score checking: ∞ times today',
      5: 'Ee sala cup namde: looping since 2008',
    },
    personalityType: 'THE PROFESSIONAL\nHEARTBROKEN POET',
    personalityPowers: ['Eloquent suffering (7+ years)', 'Kohli fan art collector', '\'Next year\' as religion'],
    prescriptionLine: 'It\'s okay to feel things. All of them. At once.',
    tableRow: { w: 0, l: 0, meme: '📈 ETERNAL', suffering: '100%', twitter: '∞', hope: '\'Yes\'' },
  },
  {
    id: 'PBKS',
    name: 'PBKS',
    emoji: '👑',
    primary: '#ED1B24',
    secondary: '#dcb240',
    tagline: 'TABLE TOPPERS?? IS THIS REAL??',
    brainRegions: {
      0: 'Cooper Connolly??? ORANGE CAP??? PBKS???',
      1: 'Points table refresh addiction: PEAK',
      2: 'Priyansh Arya 39 off 11: pure dopamine',
      3: '"Is this actually happening?": LOOPING',
      4: 'Table check frequency: 2,341 times',
      5: 'First time at top: too much to process',
    },
    personalityType: 'THE BEWILDERED\nTABLE-TOPPER',
    personalityPowers: ['Cooper Connolly trivia expert', 'Table refresh addiction (hourly)', '\'Is this actually happening?\' energy'],
    prescriptionLine: 'You are actually winning. Take a breath. Enjoy this.',
    tableRow: { w: 2, l: 0, meme: '📈 PEAK', suffering: '12%', twitter: '847', hope: '99%' },
  },
  {
    id: 'KKR',
    name: 'KKR',
    emoji: '⚡',
    primary: '#3a225d',
    secondary: '#b8860b',
    tagline: 'Shreyas Iyer said say less.',
    brainRegions: {
      0: 'Eden Gardens superiority complex: STRONG',
      1: 'Rinku Singh six potential: ALWAYS READY',
      2: 'KKR mystery aura: MUSEUM QUALITY',
      3: 'Commentary mute: SELECTIVE',
      4: 'Score check: 623 times today',
      5: 'Purple and gold lifestyle: committed',
    },
    personalityType: 'THE NONCHALANT ROYALIST',
    personalityPowers: ['Eden Gardens said so', 'KKR mystery aura', 'Venkatesh Iyer over-reliance'],
    prescriptionLine: 'Trust the process. The Knights know what they\'re doing.',
    tableRow: { w: 1, l: 1, meme: '📊 MEDIUM', suffering: '50%', twitter: '2.1K', hope: '70%' },
  },
  {
    id: 'SRH',
    name: 'SRH',
    emoji: '☀️',
    primary: '#f7a721',
    secondary: '#1e1e1e',
    tagline: '226 runs and still anxious.',
    brainRegions: {
      0: 'Travis Head worship: SHRINE BUILT',
      1: '220+ and still nervous: CLINICALLY NOTED',
      2: 'Bowling anxiety after 200+: HISTORICAL',
      3: 'Commentary mute when batting ends: AUTO',
      4: 'Score check: 1,205 times today',
      5: 'Orange Army pride: maximum',
    },
    personalityType: 'THE HIGH-SCORING\nANXIOUS ONE',
    personalityPowers: ['220+ and still panicking', 'Travis Head worship society', 'Orange Army energy unmatched'],
    prescriptionLine: 'You can score 250 and still be nervous. That\'s okay.',
    tableRow: { w: 1, l: 1, meme: '📈 HIGH', suffering: '45%', twitter: '3.4K', hope: '76%' },
  },
  {
    id: 'DC',
    name: 'DC',
    emoji: '🔷',
    primary: '#0078bc',
    secondary: '#ef1c25',
    tagline: 'Quietly destroying everyone rn.',
    brainRegions: {
      0: 'Sameer Rizvi protection mode: ACTIVE',
      1: 'Actually winning: SURREAL FEELING',
      2: 'Rishabh Pant trust: FULL',
      3: '"No one talks about us": POWER',
      4: 'Score check: 445 times today',
      5: '"Underdog" tag: weaponized',
    },
    personalityType: 'THE QUIETLY CONFIDENT\nUNDERDOG',
    personalityPowers: ['Sameer Rizvi protection', 'Actually winning right now', '\'No one talks about us\' advantage'],
    prescriptionLine: 'Keep being quietly excellent. Let the wins speak.',
    tableRow: { w: 1, l: 0, meme: '📊 RISING', suffering: '25%', twitter: '1.2K', hope: '87%' },
  },
  {
    id: 'GT',
    name: 'GT',
    emoji: '💙',
    primary: '#1c1c6b',
    secondary: '#d4af37',
    tagline: 'We won fast. Now we\'re just here.',
    brainRegions: {
      0: 'Back-to-back wins trauma: PROCESSED',
      1: 'Hardik missing: felt',
      2: 'Shubman Gill quiet confidence: noted',
      3: 'Commentary appreciation: moderate',
      4: 'Score check: 521 times today',
      5: 'Building quietly: this is the way',
    },
    personalityType: 'THE QUIETLY REBUILDING\nCHAMPION',
    personalityPowers: ['Past glory sufficient motivation', 'Shubman Gill trust level: HIGH', 'Blue and gold calm energy'],
    prescriptionLine: 'Champions rebuild quietly. Trust the process.',
    tableRow: { w: 0, l: 1, meme: '📊 QUIET', suffering: '40%', twitter: '980', hope: '65%' },
  },
  {
    id: 'RR',
    name: 'RR',
    emoji: '💗',
    primary: '#254aa5',
    secondary: '#ff69b4',
    tagline: 'One trophy, maximum drama.',
    brainRegions: {
      0: 'Sanju Samson gone: complicated feelings',
      1: 'Jos Buttler hope: flickering',
      2: '2008 trophy: ancient but real',
      3: 'Jaipur noise: beautiful chaos',
      4: 'Score check: 788 times today',
      5: 'Pink + blue: most aesthetic franchise',
    },
    personalityType: 'THE DRAMATIC ROYALIST',
    personalityPowers: ['Maximum drama per match', 'Jos Buttler eternal faith', 'Jaipur stadium vibes unmatched'],
    prescriptionLine: 'Embrace the chaos. Royals don\'t do anything quietly.',
    tableRow: { w: 0, l: 1, meme: '📊 DIGNIFIED', suffering: '55%', twitter: '1.8K', hope: '60%' },
  },
  {
    id: 'LSG',
    name: 'LSG',
    emoji: '🦟',
    primary: '#a0d8f1',
    secondary: '#00274d',
    tagline: 'Goenka sahab\'s expression = our mood.',
    brainRegions: {
      0: 'KL Rahul golden duck: cannot unsee',
      1: 'Goenka sahab watching: always',
      2: 'LSG 141 all out: April 1st trauma',
      3: '"Aa gayi poori family": LOOPING',
      4: 'Score check: 1,100 times today',
      5: 'Turquoise and navy: underrated',
    },
    personalityType: 'THE GOENKA-FACED\nFAN',
    personalityPowers: ['KL Rahul faith against all odds', 'Stoic acceptance of chaos', 'Turquoise loyalty unwavering'],
    prescriptionLine: 'KL Rahul will score big soon. Keep the faith (and Gaviscon).',
    tableRow: { w: 0, l: 1, meme: '📉 GOENKA', suffering: '78%', twitter: '4.2K', hope: '34%' },
  },
];

export const TEAM_MAP = Object.fromEntries(TEAMS.map(t => [t.id, t]));
