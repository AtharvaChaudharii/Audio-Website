import { useEffect, useRef } from 'react';
import { type Team } from '@/data/teams';
import { playStampSFX, playPaperScribble, playShareSuccess } from '@/lib/audio';

interface Props {
  team: Team;
  traumaScore: number;
}

export function Scene5Prescription({ team, traumaScore }: Props) {
  const didPlay = useRef(false);
  const prescriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!didPlay.current) {
      didPlay.current = true;
      const lines = [0.3, 0.9, 1.5, 2.0, 2.6, 3.2, 3.8];
      lines.forEach(delay => {
        setTimeout(() => playPaperScribble(), delay * 1000);
      });
      setTimeout(() => playStampSFX(), 4600);
    }
  }, []);

  const handleWhatsApp = async () => {
    playShareSuccess();
    const text = `🏏 DR. DHONI'S PRESCRIPTION 🏏\n\nPatient: ${team.name} Fan\nTrauma Score: ${Math.min(traumaScore, 100)}%\n\n${team.prescriptionLine}\n\n— Dr. Dhoni, MBBS (CSK)\n\nTest your IPL Fan Trauma: #IPL2026FanTraumaTest`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  const handleTwitter = () => {
    playShareSuccess();
    const text = `My IPL 2026 Fan Trauma Score: ${Math.min(traumaScore, 100)}%\n\nDr. Dhoni says: "${team.prescriptionLine}"\n\nI am: ${team.personalityType}\n\n#IPL2026 #IPLTraumaTest #${team.name}`;
    const encoded = encodeURIComponent(text);
    window.open(`https://twitter.com/intent/tweet?text=${encoded}`, '_blank');
  };

  const handleDownload = () => {
    playShareSuccess();
    if (!prescriptionRef.current) return;

    import('html2canvas').then(({ default: html2canvas }) => {
      html2canvas(prescriptionRef.current!, {
        backgroundColor: '#fdf6e3',
        scale: 2,
        useCORS: true,
      }).then(canvas => {
        const link = document.createElement('a');
        link.download = `ipl-prescription-${team.id.toLowerCase()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      }).catch(() => {
        handleTwitter();
      });
    }).catch(() => {
      handleWhatsApp();
    });
  };

  const rxLines = [
    '1. Stop checking Cricbuzz at 2 AM ❌',
    `2. ${team.prescriptionLine}`,
    '3. One (1) cold Thums Up after each loss 🥤',
    '4. NO Twitter after first powerplay 🚫',
    '5. Repeat: "Yeh toh sirf cricket hai."',
    '   [Patient refused. Understandable.] 😔',
    '                                          ',
  ];

  return (
    <section className="scene-prescription" id="scene-5">
      <h2 style={{
        fontFamily: 'Impact, Arial Black, sans-serif',
        fontSize: 'clamp(1.4rem, 4vw, 2rem)',
        color: '#1a1a1a',
        textAlign: 'center',
        marginBottom: '1.5rem',
        letterSpacing: '0.05em',
      }}>
        DR. DHONI'S PRESCRIPTION PAD
      </h2>

      <div ref={prescriptionRef} className="prescription-pad">
        {/* Top red strip */}
        <div className="rx-header">
          <div className="rx-clinic-name">DR. DHONI'S CRICKET CLINIC</div>
          <div className="rx-doctor-info">
            MBBS, MS (Chennai Super Kings), PhD (Finishing Games)<br />
            Est. 2004 | Success Rate: Complicated
          </div>
        </div>

        <hr className="rx-divider" />

        <div className="rx-patient-info">
          <strong>Patient:</strong> {team.name} Fan &nbsp;&nbsp; {team.emoji}<br />
          <strong>Date:</strong> April 5, 2026<br />
          <strong>Diagnosis:</strong> Acute IPL Fever, Chronic Hope Syndrome<br />
          <strong>Trauma Score:</strong> <span style={{ color: '#c0392b', fontWeight: 'bold' }}>{Math.min(traumaScore, 100)}%</span>
        </div>

        <hr className="rx-divider" />

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
          <span className="rx-symbol">℞</span>
          <div className="rx-lines">
            {rxLines.map((line, i) => (
              <span key={i} className="rx-line">{line}</span>
            ))}
          </div>
        </div>

        <hr className="rx-divider" />

        <div className="rx-signature">— Dr. Dhoni 🦁</div>
        <div style={{
          fontFamily: 'Courier Prime, monospace',
          fontSize: '0.7rem',
          color: '#888',
          marginTop: '0.25rem',
        }}>
          Signature verified by Chennai crowd noise
        </div>

        {/* PRESCRIBED stamp */}
        <div className="rx-stamp">PRESCRIBED</div>
      </div>

      {/* Share buttons */}
      <div className="share-buttons">
        <button className="share-btn share-btn-whatsapp" onClick={handleWhatsApp}>
          📱 Share on WhatsApp (India's Choice)
        </button>
        <button className="share-btn share-btn-twitter" onClick={handleTwitter}>
          🐦 Share on Twitter / X
        </button>
        <button className="share-btn share-btn-download" onClick={handleDownload}>
          ⬇️ Download Prescription PNG
        </button>
      </div>

      <p className="scroll-prompt" style={{ color: '#888' }}>
        ▼ SCROLL FOR IPL 2026 EMOTIONAL POINTS TABLE ▼
      </p>
    </section>
  );
}
