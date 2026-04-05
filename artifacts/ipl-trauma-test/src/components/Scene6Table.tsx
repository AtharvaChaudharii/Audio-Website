import { useEffect, useRef, useState } from 'react';
import { TEAMS, type Team } from '@/data/teams';
import { playShareSuccess, playTableUpdate } from '@/lib/audio';

interface Props {
  selectedTeam: Team;
  onReset: () => void;
}

interface TableRow {
  team: Team;
  w: number;
  l: number;
  meme: string;
  suffering: string;
  twitter: string;
  hope: string;
}

const TABLE_DATA: TableRow[] = TEAMS.map(t => ({
  team: t,
  ...t.tableRow,
})).sort((a, b) => b.w - a.w || a.l - b.l);

function AnimatedNumber({ target, trigger }: { target: number; trigger: boolean }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const step = Math.ceil(target / 30);
    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      setCurrent(start);
      if (start >= target) clearInterval(timer);
    }, 30);
    return () => clearInterval(timer);
  }, [trigger, target]);

  return <>{current}</>;
}

export function Scene6Table({ selectedTeam, onReset }: Props) {
  const [triggered, setTriggered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTriggered(true);
          TABLE_DATA.forEach((_, i) => {
            setTimeout(() => playTableUpdate(), i * 80);
          });
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [triggered]);

  const handleShare = () => {
    playShareSuccess();
    const text = `IPL 2026 POINTS TABLE (EMOTIONAL EDITION) 🏏\n\n${TABLE_DATA.map(r =>
      `${r.team.emoji} ${r.team.id}: ${r.w}W ${r.l}L | Suffering: ${r.suffering} | Hope: ${r.hope}`
    ).join('\n')}\n\n#IPL2026 #IPLTraumaTest`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  return (
    <section ref={sectionRef} className="scene-table" id="scene-6">
      <h2 className="table-heading">
        😭 IPL 2026 POINTS TABLE (EMOTIONAL EDITION) 😭
      </h2>
      <p className="table-subheading">
        Official stats approved by your group chat
      </p>

      <div style={{ width: '100%', maxWidth: '900px', overflowX: 'auto' }}>
        <table className="points-table">
          <thead>
            <tr>
              <th>#&nbsp;&nbsp;TEAM</th>
              <th>W</th>
              <th>L</th>
              <th>MEME OUTPUT</th>
              <th>FAN SUFFERING</th>
              <th>TWITTER WARS</th>
              <th>HOPE LEFT %</th>
            </tr>
          </thead>
          <tbody>
            {TABLE_DATA.map((row, index) => {
              const isUserTeam = row.team.id === selectedTeam.id;
              return (
                <tr
                  key={row.team.id}
                  className={isUserTeam ? 'user-team' : ''}
                  style={isUserTeam ? {
                    boxShadow: `0 0 0 1px ${selectedTeam.primary}`,
                    background: `${selectedTeam.primary}18`,
                  } : {}}
                >
                  <td>
                    <div className="table-team-cell">
                      <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', minWidth: '1rem' }}>
                        {index + 1}
                      </span>
                      <span className="table-team-emoji">{row.team.emoji}</span>
                      <span style={{ fontWeight: isUserTeam ? '900' : '700', color: isUserTeam ? selectedTeam.primary : 'white' }}>
                        {row.team.id}
                        {isUserTeam && ' 👆'}
                      </span>
                    </div>
                  </td>
                  <td style={{ color: '#00cc66', fontWeight: '800' }}>
                    {triggered ? <AnimatedNumber target={row.w} trigger={triggered} /> : '—'}
                  </td>
                  <td style={{ color: '#ff4444', fontWeight: '800' }}>
                    {triggered ? <AnimatedNumber target={row.l} trigger={triggered} /> : '—'}
                  </td>
                  <td>{row.meme}</td>
                  <td style={{ color: parseInt(row.suffering) > 70 ? '#ff4444' : 'rgba(255,255,255,0.8)' }}>
                    {row.suffering}
                  </td>
                  <td>{row.twitter}</td>
                  <td style={{ color: row.hope === '99%' ? '#00cc66' : row.hope.startsWith('"') ? '#ffc107' : 'rgba(255,255,255,0.8)', fontWeight: '700' }}>
                    {row.hope}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        Table accurate as of April 5, 2026 &nbsp;|&nbsp;
        Emotional columns: ± ∞ error margin &nbsp;|&nbsp;
        Source: Your group chats
      </div>

      <button className="share-btn share-btn-whatsapp" style={{ marginTop: '1.5rem', maxWidth: '340px' }} onClick={handleShare}>
        📊 Share This Table on WhatsApp
      </button>

      {/* Reset button */}
      <button className="reset-btn" onClick={onReset}>
        🔄 Retake The Test (Pick Another Team)
      </button>

      {/* End credits */}
      <div style={{
        marginTop: '3rem',
        padding: '1.5rem 2rem',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '12px',
        maxWidth: '500px',
        width: '100%',
        textAlign: 'center',
      }}>
        <div style={{ color: '#ffc107', fontFamily: 'Impact, Arial Black, sans-serif', fontSize: '1.1rem', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
          IPL 2026 FAN TRAUMA TEST
        </div>
        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', fontFamily: 'Courier Prime, monospace', lineHeight: 1.8 }}>
          No actual medical advice.<br />
          No real doctors were harmed.<br />
          All suffering is 100% real.<br />
          <br />
          Share in your IPL WhatsApp group.<br />
          Papa will forward it. Guaranteed.<br />
          <br />
          <span style={{ color: '#ffc107' }}>🏏 Thala for a Reason 🏏</span>
        </div>
      </div>
    </section>
  );
}
