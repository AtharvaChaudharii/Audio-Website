import { useState, useCallback } from 'react';
import { type Team } from '@/data/teams';
import { playBrainClick, playMRIBeep } from '@/lib/audio';

interface Props {
  team: Team;
  traumaScore: number;
  onTraumaIncrease: (amount: number) => void;
}

const REGION_CONFIGS = [
  { label: 'Prefrontal\n(Logic)', top: '10%', left: '30%', w: 40, h: 40, name: 'Logic Center' },
  { label: 'Amygdala\n(Fear)', top: '35%', left: '15%', w: 36, h: 36, name: 'Fear Center' },
  { label: 'Hippocampus\n(Memory)', top: '35%', left: '55%', w: 36, h: 36, name: 'Memory' },
  { label: 'Temporal\n(Sound)', top: '58%', left: '20%', w: 34, h: 34, name: 'Sound Zone' },
  { label: 'Cerebellum\n(Reflex)', top: '58%', left: '50%', w: 34, h: 34, name: 'Reflex' },
  { label: 'Brainstem\n(Survival)', top: '75%', left: '36%', w: 38, h: 38, name: 'Survival' },
];

interface TooltipData {
  text: string;
  x: number;
  y: number;
}

export function Scene2Brain({ team, traumaScore, onTraumaIncrease }: Props) {
  const [clickedRegions, setClickedRegions] = useState<Set<number>>(new Set());
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);

  const handleRegionClick = useCallback((index: number, e: React.MouseEvent) => {
    playBrainClick();
    const text = team.brainRegions[index] || 'Processing trauma data...';
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setTooltip({ text, x: rect.right + 10, y: rect.top });

    if (!clickedRegions.has(index)) {
      setClickedRegions(prev => new Set([...prev, index]));
      onTraumaIncrease(12 + Math.floor(Math.random() * 8));
    }

    setTimeout(() => setTooltip(null), 3000);
  }, [team, clickedRegions, onTraumaIncrease]);

  const handleRegionHover = useCallback(() => {
    playMRIBeep();
  }, []);

  const traumaPercent = Math.min(traumaScore, 100);

  return (
    <section className="scene-brain" id="scene-2">
      {/* Trauma counter */}
      <div className="trauma-counter">
        <div>TRAUMA LEVEL</div>
        <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: traumaPercent > 70 ? '#ff3333' : '#00d4ff' }}>
          {traumaPercent}%
        </div>
        <div className="trauma-bar">
          <div className="trauma-fill" style={{ width: `${traumaPercent}%` }} />
        </div>
      </div>

      <h2 className="brain-heading">FAN BRAIN DIAGNOSTIC SCAN</h2>
      <p className="brain-subheading">
        MRI Analysis — {team.name} Fan Neural Network
        <br />
        <span style={{ fontSize: '0.75rem' }}>Click each region to reveal your trauma data</span>
      </p>

      {/* MRI Brain Container */}
      <div className="mri-container">
        <div className="mri-outer" />
        <div className="scan-line-h" />

        {/* Brain SVG */}
        <svg
          viewBox="0 0 200 200"
          style={{ position: 'absolute', inset: '5%', width: '90%', height: '90%', opacity: 0.3 }}
        >
          <ellipse cx="100" cy="90" rx="70" ry="65" fill={team.primary} opacity="0.4" />
          <ellipse cx="80" cy="85" rx="45" ry="50" fill="none" stroke={team.primary} strokeWidth="2" opacity="0.6" />
          <ellipse cx="120" cy="85" rx="45" ry="50" fill="none" stroke={team.primary} strokeWidth="2" opacity="0.6" />
          <line x1="100" y1="30" x2="100" y2="145" stroke={team.primary} strokeWidth="1.5" opacity="0.5" />
          <path d="M 60 70 Q 80 50 100 70 Q 120 50 140 70" fill="none" stroke={team.primary} strokeWidth="1.5" opacity="0.5" />
          <path d="M 50 100 Q 70 85 100 100 Q 130 85 150 100" fill="none" stroke={team.primary} strokeWidth="1.5" opacity="0.5" />
          <ellipse cx="100" cy="155" rx="25" ry="15" fill={team.secondary} opacity="0.5" />
        </svg>

        {/* Clickable Regions */}
        {REGION_CONFIGS.map((region, index) => (
          <button
            key={index}
            className={`brain-region ${clickedRegions.has(index) ? 'active' : ''}`}
            style={{
              top: region.top,
              left: region.left,
              width: `${region.w}px`,
              height: `${region.h}px`,
              '--team-color': team.primary,
              animationDelay: `${index * 0.3}s`,
              background: clickedRegions.has(index)
                ? `${team.primary}30`
                : 'rgba(0, 212, 255, 0.05)',
              borderColor: clickedRegions.has(index)
                ? team.primary
                : 'rgba(0, 212, 255, 0.3)',
            } as React.CSSProperties}
            onClick={(e) => handleRegionClick(index, e)}
            onMouseEnter={handleRegionHover}
            title={region.name}
          >
            <span style={{ fontSize: '0.75rem', color: clickedRegions.has(index) ? team.primary : '#00d4ff', lineHeight: 1.1, textAlign: 'center', display: 'block', whiteSpace: 'pre-line', fontFamily: 'Courier Prime, monospace' }}>
              {region.label}
            </span>
          </button>
        ))}
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="region-tooltip"
          style={{
            left: Math.min(tooltip.x, window.innerWidth - 300),
            top: Math.max(tooltip.y - 20, 10),
            '--team-color': team.primary,
          } as React.CSSProperties}
        >
          <div style={{ color: team.primary, fontSize: '0.7rem', marginBottom: '0.5rem', fontFamily: 'Courier Prime, monospace', letterSpacing: '0.05em' }}>
            🧠 DIAGNOSIS RESULT:
          </div>
          <div style={{ color: 'white', fontSize: '0.9rem', fontWeight: '700', lineHeight: '1.4' }}>
            {tooltip.text}
          </div>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem', marginTop: '0.4rem', fontFamily: 'Courier Prime, monospace' }}>
            +TRAUMA POINTS RECORDED
          </div>
        </div>
      )}

      <div style={{ marginTop: '1rem', textAlign: 'center' }}>
        <span style={{ color: 'rgba(0, 212, 255, 0.6)', fontSize: '0.75rem', fontFamily: 'Courier Prime, monospace' }}>
          {clickedRegions.size}/6 regions scanned
          {clickedRegions.size === 6 ? ' — FULL SCAN COMPLETE 🧠' : ''}
        </span>
      </div>

      <p className="scroll-prompt">▼ SCROLL TO SEE IPL 2026 TRAUMA TIMELINE ▼</p>
    </section>
  );
}
