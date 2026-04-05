import { useEffect, useRef } from 'react';
import { type Team } from '@/data/teams';
import { playRevealCrash, playDrumRoll } from '@/lib/audio';

interface Props {
  team: Team;
  traumaScore: number;
}

function ParticleBg({ color }: { color: string }) {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 3 + Math.random() * 12,
    duration: 3 + Math.random() * 5,
    dx1: (Math.random() - 0.5) * 60,
    dy1: (Math.random() - 0.5) * 60,
    dx2: (Math.random() - 0.5) * 80,
    dy2: (Math.random() - 0.5) * 80,
    delay: Math.random() * 3,
  }));

  return (
    <div className="personality-bg-particles">
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: color,
            '--duration': `${p.duration}s`,
            '--dx1': `${p.dx1}px`,
            '--dy1': `${p.dy1}px`,
            '--dx2': `${p.dx2}px`,
            '--dy2': `${p.dy2}px`,
            animationDelay: `${p.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

export function Scene4Personality({ team, traumaScore }: Props) {
  const didPlay = useRef(false);

  useEffect(() => {
    if (!didPlay.current) {
      didPlay.current = true;
      playDrumRoll();
      setTimeout(() => playRevealCrash(), 700);
    }
  }, []);

  const bgStyle = {
    background: `linear-gradient(135deg, ${team.primary}dd 0%, ${team.secondary}99 60%, #0a0a0a 100%)`,
  };

  return (
    <section className="scene-personality" id="scene-4" style={bgStyle}>
      <ParticleBg color={team.primary} />

      <p className="personality-you-are">YOU ARE...</p>

      <div className="personality-mascot">{team.emoji}</div>

      <h2
        className="personality-type"
        style={{ whiteSpace: 'pre-line' }}
      >
        {team.personalityType}
      </h2>

      <div className="personality-powers">
        {team.personalityPowers.map((power, i) => (
          <div
            key={power}
            className="personality-power"
            style={{ animationDelay: `${0.8 + i * 0.2}s` }}
          >
            <span style={{ fontSize: '1.1rem' }}>⚡</span>
            <span>{power}</span>
          </div>
        ))}
      </div>

      {/* Trauma score display */}
      <div style={{
        background: 'rgba(0,0,0,0.35)',
        border: '1px solid rgba(255,255,255,0.25)',
        borderRadius: '12px',
        padding: '1rem 1.5rem',
        textAlign: 'center',
        backdropFilter: 'blur(10px)',
        maxWidth: '320px',
        width: '100%',
      }}>
        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', fontFamily: 'Courier Prime, monospace', marginBottom: '0.25rem', letterSpacing: '0.1em' }}>
          OFFICIAL TRAUMA SCORE
        </div>
        <div style={{ color: 'white', fontSize: '3rem', fontWeight: '900', fontFamily: 'Impact, Arial Black, sans-serif', lineHeight: 1 }}>
          {Math.min(traumaScore, 100)}%
        </div>
        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem', fontFamily: 'Courier Prime, monospace', marginTop: '0.25rem' }}>
          {traumaScore >= 80 ? 'CRITICAL — Dr. Dhoni recommends immediate prescription' :
           traumaScore >= 50 ? 'MODERATE — Keep Thums Up stocked at home' :
           traumaScore >= 25 ? 'MANAGEABLE — You\'re doing okay... probably' :
           'BASELINE — Even PBKS fans have some trauma'}
        </div>
      </div>

      <p className="scroll-prompt" style={{ color: 'rgba(255,255,255,0.5)' }}>
        ▼ SCROLL FOR DR. DHONI'S PRESCRIPTION ▼
      </p>
    </section>
  );
}
