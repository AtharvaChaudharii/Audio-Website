import { useEffect, useRef } from 'react';
import { resumeAudioContext } from '@/lib/audio';

interface CursorProps {
  teamColor: string;
}

export function Cursor({ teamColor }: CursorProps) {
  const cursorRef = useRef<SVGSVGElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const render = () => {
      if (cursorRef.current) {
        cursorRef.current.style.left = pos.current.x + 'px';
        cursorRef.current.style.top = pos.current.y + 'px';
      }
      frameRef.current = requestAnimationFrame(render);
    };

    const click = (e: MouseEvent) => {
      resumeAudioContext();
      const cursor = cursorRef.current;
      if (cursor) {
        cursor.classList.add('clicking');
        setTimeout(() => cursor.classList.remove('clicking'), 300);
      }
      // Spawn ball particles
      for (let i = 0; i < 3; i++) {
        const ball = document.createElement('div');
        ball.className = 'ball-particle';
        const angle = (Math.PI * 2 * i) / 3 + Math.random() * 0.5;
        const dist = 40 + Math.random() * 30;
        ball.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
        ball.style.setProperty('--dy', `${Math.sin(angle) * dist}px`);
        ball.style.left = e.clientX + 'px';
        ball.style.top = e.clientY + 'px';
        ball.style.marginLeft = '-5px';
        ball.style.marginTop = '-5px';
        document.body.appendChild(ball);
        setTimeout(() => ball.remove(), 600);
      }
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('click', click);
    frameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('click', click);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <svg
      ref={cursorRef}
      id="cricket-cursor"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'fixed', pointerEvents: 'none', zIndex: 99999 }}
    >
      {/* Cricket bat shape */}
      <rect
        x="14"
        y="2"
        width="6"
        height="20"
        rx="2"
        fill={teamColor || '#ffc107'}
        stroke="#333"
        strokeWidth="1"
      />
      <rect
        x="13"
        y="20"
        width="8"
        height="10"
        rx="1"
        fill="#8B4513"
        stroke="#333"
        strokeWidth="1"
      />
      <circle cx="17" cy="5" r="2" fill="#e74c3c" opacity="0.8" />
    </svg>
  );
}
