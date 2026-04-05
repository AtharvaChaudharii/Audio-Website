import { useEffect, useRef, useState } from 'react';
import { playSiren, playHeartbeat } from '@/lib/audio';

const TYPEWRITER_TEXT = `⚠ CAUTION: This test has been deemed medically dangerous for CSK fans.
PBKS fans are annoyingly fine. MI fans are in denial.
RCB fans never had hope to lose.

Loading fan mental health records...

▼ SCROLL DOWN TO BEGIN YOUR DIAGNOSIS ▼`;

export function Scene0Disclaimer() {
  const [displayed, setDisplayed] = useState('');
  const indexRef = useRef(0);
  const heartbeatRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        if (indexRef.current < TYPEWRITER_TEXT.length) {
          setDisplayed(TYPEWRITER_TEXT.slice(0, indexRef.current + 1));
          indexRef.current++;
        } else {
          clearInterval(interval);
        }
      }, 35);
      return () => clearInterval(interval);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const sirenTimer = setTimeout(() => playSiren(), 800);
    heartbeatRef.current = setInterval(() => playHeartbeat(), 1200);
    return () => {
      clearTimeout(sirenTimer);
      if (heartbeatRef.current) clearInterval(heartbeatRef.current);
    };
  }, []);

  return (
    <section className="scene-disclaimer" id="scene-0">
      <div className="scan-line" />
      <span className="siren-emoji">🚨</span>

      <h1 className="disclaimer-title">
        IPL 2026<br />FAN TRAUMA ASSESSMENT
      </h1>

      <div className="section-divider" style={{ background: '#ff3333', margin: '1rem auto' }} />

      <p className="disclaimer-typewriter">{displayed}</p>

      <div className="scroll-hint">
        ▼ SCROLL TO BEGIN ▼
      </div>

      {/* Decorative corners */}
      <div style={{
        position: 'absolute', top: '1rem', left: '1rem',
        borderTop: '2px solid #ff3333', borderLeft: '2px solid #ff3333',
        width: '30px', height: '30px', opacity: 0.6
      }} />
      <div style={{
        position: 'absolute', top: '1rem', right: '1rem',
        borderTop: '2px solid #ff3333', borderRight: '2px solid #ff3333',
        width: '30px', height: '30px', opacity: 0.6
      }} />
      <div style={{
        position: 'absolute', bottom: '1rem', left: '1rem',
        borderBottom: '2px solid #ff3333', borderLeft: '2px solid #ff3333',
        width: '30px', height: '30px', opacity: 0.6
      }} />
      <div style={{
        position: 'absolute', bottom: '1rem', right: '1rem',
        borderBottom: '2px solid #ff3333', borderRight: '2px solid #ff3333',
        width: '30px', height: '30px', opacity: 0.6
      }} />
    </section>
  );
}
