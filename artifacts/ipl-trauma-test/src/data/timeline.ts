export interface TimelineCard {
  id: number;
  date: string;
  title: string;
  lines: string[];
  emoji: string;
  headerColor: string;
  isWin: boolean;
  backCaption: string;
}

export const TIMELINE_CARDS: TimelineCard[] = [
  {
    id: 0,
    date: 'March 22, 2026',
    title: 'IPL 2026 SHURU 🏏',
    lines: [
      'Hope levels: MAXIMUM',
      'Every fan: "This is OUR year"',
      'Stat: All 10 teams had "strong squads"',
      'Reality: ek mahine mein sab pata chalega',
    ],
    emoji: '🏏',
    headerColor: '#2563eb',
    isWin: true,
    backCaption: '"Yeh tournament toh hamara hi hai."\n— Every single IPL fan, March 22, 2026',
  },
  {
    id: 1,
    date: 'April 1, 2026',
    title: 'GOENKA SAHAB MOMENT 😭',
    lines: [
      'LSG 141 all out. KL Rahul: golden duck.',
      'First ball. FIRST. BALL.',
      '"Aa gayi poori family Pant ki class lene"',
      'April Fool\'s? Nahi yaar, yeh sach tha.',
    ],
    emoji: '😭',
    headerColor: '#dc2626',
    isWin: false,
    backCaption: '"KL Rahul bhai... ek baar toh dekho ball ko."\n— Every LSG fan simultaneously, April 1',
  },
  {
    id: 2,
    date: 'April 2, 2026',
    title: '226 RUNS AND STILL STRESS ☀️',
    lines: [
      'SRH: Travis Head 46 off 21 balls.',
      'SRH posted 226/6. Dominant.',
      'KKR fans: "Easy chase."',
      '*nervous laughter* (it was not easy)',
    ],
    emoji: '😬',
    headerColor: '#f7a721',
    isWin: true,
    backCaption: '"226 run daal ke bhi neend nahi aati."\n— SRH fans, always, forever, eternally',
  },
  {
    id: 3,
    date: 'April 3, 2026',
    title: 'PRIYANSH ARYA 39 OFF 11 💀',
    lines: [
      'CSK vs PBKS at Chepauk.',
      'Priyansh Arya: 39 runs in 11 deliveries.',
      'Sanju Samson: 7 runs off 7 (first CSK match)',
      'Ma Chidambaram went very, very quiet.',
    ],
    emoji: '💀',
    headerColor: '#ED1B24',
    isWin: false,
    backCaption: '"Dhoni sir... aap kahan ho?"\n— 40,000 CSK fans, Chepauk, simultaneously',
  },
  {
    id: 4,
    date: 'April 4, 2026',
    title: 'HARDIK PANDYA: INJURED 🩹',
    lines: [
      'MI vs DC. Hardik limps off.',
      'Maheika didn\'t come to watch 🐰',
      'Suryakumar SKY took over, smiled throughout.',
      'MI lost anyway. Bumrah cried internally.',
    ],
    emoji: '🩹',
    headerColor: '#004c93',
    isWin: false,
    backCaption: '"Ek aur season, ek aur drama."\n— MI fans, reading about it at 2 AM on Cricbuzz',
  },
  {
    id: 5,
    date: 'April 5, 2026 — Today',
    title: 'YOUR FAN PROGNOSIS →',
    lines: [
      'The tournament is young.',
      'Your suffering is just beginning.',
      'Scroll ahead for your personality type.',
      'Doctor Dhoni\'s diagnosis awaits...',
    ],
    emoji: '🔮',
    headerColor: '#7c3aed',
    isWin: true,
    backCaption: '"Yeh sirf cricket nahi hai.\nYeh ek lifestyle hai."\n— You, right now',
  },
];
