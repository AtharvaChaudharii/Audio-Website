import { useState, useRef } from 'react';
import { TIMELINE_CARDS } from '@/data/timeline';
import { playCrowdCheer, playCrowdGroan, playCardFlip } from '@/lib/audio';

interface Props {
  onTraumaIncrease: (amount: number) => void;
  teamColor: string;
}

export function Scene3Timeline({ onTraumaIncrease, teamColor }: Props) {
  const [flipped, setFlipped] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCardClick = (id: number, isWin: boolean) => {
    if (flipped.has(id)) {
      setFlipped(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      return;
    }
    playCardFlip();
    setFlipped(prev => new Set([...prev, id]));
    setTimeout(() => {
      if (isWin) {
        playCrowdCheer();
      } else {
        playCrowdGroan();
        onTraumaIncrease(8);
      }
    }, 300);
  };

  return (
    <section className="scene-timeline" id="scene-3">
      <h2 className="timeline-heading">IPL 2026 TRAUMA TIMELINE</h2>
      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', fontFamily: 'Courier Prime, monospace', marginBottom: '1rem', textAlign: 'center' }}>
        Click each match card to reveal the post-match reality
      </p>

      {/* Timeline scroll */}
      <div ref={containerRef} className="timeline-scroll-container">
        {TIMELINE_CARDS.map((card) => (
          <div
            key={card.id}
            className={`timeline-card ${flipped.has(card.id) ? 'flipped' : ''}`}
            onClick={() => handleCardClick(card.id, card.isWin)}
          >
            <div className="timeline-card-inner" style={{ height: '220px' }}>
              {/* Front */}
              <div className="timeline-card-front" style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="timeline-card-header" style={{ background: card.headerColor }}>
                  <div className="timeline-card-date">{card.date}</div>
                </div>
                <div className="timeline-card-body" style={{ padding: '0.75rem 1rem', flex: 1 }}>
                  <div className="timeline-card-title">{card.title}</div>
                  {card.lines.map((line, i) => (
                    <div key={i} className="timeline-card-content" style={{ marginBottom: '0.15rem' }}>
                      {line}
                    </div>
                  ))}
                </div>
                <div style={{ padding: '0.5rem 1rem', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="timeline-card-emoji-float">{card.emoji}</div>
                  <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)', fontFamily: 'Courier Prime, monospace' }}>
                    Tap to see Twitter reaction →
                  </span>
                </div>
              </div>

              {/* Back */}
              <div className="timeline-card-back">
                <div>
                  <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{card.emoji}</div>
                  <p style={{
                    color: 'white',
                    fontFamily: 'Courier Prime, monospace',
                    fontSize: '0.88rem',
                    lineHeight: '1.6',
                    whiteSpace: 'pre-line',
                  }}>
                    {card.backCaption}
                  </p>
                  <div style={{
                    marginTop: '1rem',
                    padding: '0.4rem 0.75rem',
                    background: card.isWin ? 'rgba(0,200,100,0.2)' : 'rgba(200,0,0,0.2)',
                    border: `1px solid ${card.isWin ? 'rgba(0,200,100,0.4)' : 'rgba(200,0,0,0.4)'}`,
                    borderRadius: '4px',
                    fontSize: '0.7rem',
                    color: card.isWin ? '#00c864' : '#ff4444',
                    fontFamily: 'Courier Prime, monospace',
                    letterSpacing: '0.05em',
                  }}>
                    {card.isWin ? '✓ PEAK MOMENT' : '✕ TRAUMA CONFIRMED'}
                    {!card.isWin && ' (+8 TRAUMA POINTS)'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll hint arrows */}
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem', fontFamily: 'Courier Prime, monospace' }}>
        <span>← SWIPE TO SCROLL →</span>
      </div>

      <p className="scroll-prompt">▼ SCROLL FOR YOUR FAN PERSONALITY TYPE ▼</p>
    </section>
  );
}
