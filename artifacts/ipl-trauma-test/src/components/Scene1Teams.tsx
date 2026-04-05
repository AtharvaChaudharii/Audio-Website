import { useRef } from 'react';
import { TEAMS, type Team } from '@/data/teams';
import { playCardFlip, playCrowdCheer, playHoverDrum, playWhistle } from '@/lib/audio';

interface Props {
  onSelectTeam: (team: Team) => void;
}

function spawnConfetti(x: number, y: number, color1: string, color2: string) {
  for (let i = 0; i < 30; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    const angle = Math.random() * Math.PI * 2;
    const dist = 80 + Math.random() * 120;
    const rot = (Math.random() - 0.5) * 720;
    piece.style.setProperty('--cx', `${Math.cos(angle) * dist}px`);
    piece.style.setProperty('--cy', `${Math.sin(angle) * dist}px`);
    piece.style.setProperty('--cr', `${rot}deg`);
    piece.style.left = x + 'px';
    piece.style.top = y + 'px';
    piece.style.background = Math.random() > 0.5 ? color1 : color2;
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    piece.style.width = `${6 + Math.random() * 8}px`;
    piece.style.height = `${6 + Math.random() * 8}px`;
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 1300);
  }
}

export function Scene1Teams({ onSelectTeam }: Props) {
  const selectedRef = useRef<string | null>(null);

  const handleSelect = (team: Team, e: React.MouseEvent) => {
    if (selectedRef.current) return;
    selectedRef.current = team.id;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    spawnConfetti(cx, cy, team.primary, team.secondary);
    playCrowdCheer();
    setTimeout(() => playWhistle(), 600);
    setTimeout(() => onSelectTeam(team), 1200);
  };

  return (
    <section className="scene-teams" id="scene-1">
      <h2 className="teams-heading">CHOOSE YOUR TEAM</h2>
      <p className="teams-subheading">चुनो अपनी तकदीर</p>
      <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '1.5rem', fontFamily: 'Courier Prime, monospace' }}>
        (Your suffering level will be calibrated accordingly)
      </p>

      <div className="teams-grid">
        {TEAMS.map((team) => (
          <button
            key={team.id}
            className="team-card"
            style={{ '--card-team-color': team.primary } as React.CSSProperties}
            onClick={(e) => handleSelect(team, e)}
            onMouseEnter={() => playHoverDrum()}
            onMouseDown={() => playCardFlip()}
          >
            <span className="team-card-emoji">{team.emoji}</span>
            <div
              className="team-card-name"
              style={{ color: team.primary }}
            >
              {team.name}
            </div>
            <div className="team-card-tagline">{team.tagline}</div>
          </button>
        ))}
      </div>

      <p className="scroll-prompt" style={{ color: '#aaa' }}>
        ↑ Click your team to begin the diagnosis ↑
      </p>
    </section>
  );
}
