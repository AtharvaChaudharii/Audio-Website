import { useState, useEffect, useCallback, useRef } from 'react';
import { Cursor } from '@/components/Cursor';
import { Scene0Disclaimer } from '@/components/Scene0Disclaimer';
import { Scene1Teams } from '@/components/Scene1Teams';
import { Scene2Brain } from '@/components/Scene2Brain';
import { Scene3Timeline } from '@/components/Scene3Timeline';
import { Scene4Personality } from '@/components/Scene4Personality';
import { Scene5Prescription } from '@/components/Scene5Prescription';
import { Scene6Table } from '@/components/Scene6Table';
import { type Team } from '@/data/teams';
import { setMuted, isMuted, resumeAudioContext } from '@/lib/audio';

const SCENE_IDS = ['scene-0', 'scene-1', 'scene-2', 'scene-3', 'scene-4', 'scene-5', 'scene-6'];

export default function App() {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [traumaScore, setTraumaScore] = useState(0);
  const [activeScene, setActiveScene] = useState(0);
  const [muted, setMutedState] = useState(false);

  const handleSelectTeam = useCallback((team: Team) => {
    setSelectedTeam(team);
    document.documentElement.style.setProperty('--team-color', team.primary);
    setTimeout(() => {
      document.getElementById('scene-2')?.scrollIntoView({ behavior: 'smooth' });
    }, 1400);
  }, []);

  const handleTraumaIncrease = useCallback((amount: number) => {
    setTraumaScore(prev => Math.min(prev + amount, 100));
  }, []);

  const handleReset = useCallback(() => {
    setSelectedTeam(null);
    setTraumaScore(0);
    document.documentElement.style.setProperty('--team-color', '#ffc107');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    setMutedState(next);
    resumeAudioContext();
  };

  // Track active scene via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SCENE_IDS.forEach((id, index) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveScene(index);
        },
        { threshold: 0.5 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, [selectedTeam]);

  // Resume audio on first interaction
  useEffect(() => {
    const resume = () => resumeAudioContext();
    window.addEventListener('click', resume, { once: true });
    window.addEventListener('touchstart', resume, { once: true });
    return () => {
      window.removeEventListener('click', resume);
      window.removeEventListener('touchstart', resume);
    };
  }, []);

  return (
    <>
      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;600;700&family=Courier+Prime:ital,wght@0,400;0,700;1,400&display=swap"
        rel="stylesheet"
      />

      <Cursor teamColor={selectedTeam?.primary || '#ffc107'} />

      {/* Sound toggle */}
      <button
        className="sound-toggle"
        onClick={toggleMute}
        title={muted ? 'Unmute sounds' : 'Mute sounds'}
        style={{ border: 'none' }}
      >
        {muted ? '🔇' : '🔊'}
      </button>

      {/* Nav dots */}
      <div className="nav-dots">
        {SCENE_IDS.map((id, index) => (
          <button
            key={id}
            className={`nav-dot ${activeScene === index ? 'active' : ''}`}
            onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
            title={`Scene ${index}`}
            style={{ border: 'none', padding: 0 }}
          />
        ))}
      </div>

      {/* Scene 0 — Always shown */}
      <Scene0Disclaimer />

      {/* Scene 1 — Team Selection */}
      <Scene1Teams onSelectTeam={handleSelectTeam} />

      {/* Scenes 2-6 — Shown only after team selection */}
      {selectedTeam ? (
        <>
          <Scene2Brain
            team={selectedTeam}
            traumaScore={traumaScore}
            onTraumaIncrease={handleTraumaIncrease}
          />
          <Scene3Timeline
            onTraumaIncrease={handleTraumaIncrease}
            teamColor={selectedTeam.primary}
          />
          <Scene4Personality
            team={selectedTeam}
            traumaScore={traumaScore}
          />
          <Scene5Prescription
            team={selectedTeam}
            traumaScore={traumaScore}
          />
          <Scene6Table
            selectedTeam={selectedTeam}
            onReset={handleReset}
          />
        </>
      ) : (
        /* Teaser scenes */
        <>
          <div style={{
            minHeight: '100vh',
            background: '#0d1b2a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(0, 212, 255, 0.4)',
            fontFamily: 'Courier Prime, monospace',
            fontSize: '1.1rem',
            textAlign: 'center',
            padding: '2rem',
          }}>
            <div>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🧠</div>
              <div>Select your team above to<br />begin the brain scan...</div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
