let audioCtx: AudioContext | null = null;
let muted = false;

function getCtx() {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  return audioCtx;
}

export function setMuted(val: boolean) {
  muted = val;
}

export function isMuted() {
  return muted;
}

function playTone(
  frequency: number,
  duration: number,
  type: OscillatorType = 'sine',
  volume = 0.3,
  startDelay = 0,
  fadeIn = 0.01,
  fadeOut = 0.1
) {
  if (muted) return;
  try {
    const ctx = getCtx();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime + startDelay);
    gainNode.gain.setValueAtTime(0, ctx.currentTime + startDelay);
    gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + startDelay + fadeIn);
    gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + startDelay + duration - fadeOut);
    oscillator.start(ctx.currentTime + startDelay);
    oscillator.stop(ctx.currentTime + startDelay + duration);
  } catch (e) {
    // Ignore audio errors
  }
}

function playNoise(duration: number, volume = 0.05, startDelay = 0) {
  if (muted) return;
  try {
    const ctx = getCtx();
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * volume;
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(volume, ctx.currentTime + startDelay);
    gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + startDelay + duration);
    source.connect(gainNode);
    gainNode.connect(ctx.destination);
    source.start(ctx.currentTime + startDelay);
  } catch (e) {}
}

export function playHeartbeat() {
  if (muted) return;
  playTone(60, 0.08, 'square', 0.4);
  playTone(80, 0.06, 'square', 0.3, 0.12);
}

export function playSiren() {
  if (muted) return;
  for (let i = 0; i < 3; i++) {
    playTone(880, 0.3, 'sawtooth', 0.15, i * 0.7);
    playTone(660, 0.3, 'sawtooth', 0.15, i * 0.7 + 0.35);
  }
}

export function playCardFlip() {
  if (muted) return;
  playNoise(0.1, 0.08);
  playTone(1200, 0.05, 'triangle', 0.1);
}

export function playCrowdCheer() {
  if (muted) return;
  for (let i = 0; i < 5; i++) {
    const freq = 200 + Math.random() * 800;
    playTone(freq, 0.4 + Math.random() * 0.3, 'sine', 0.04 + Math.random() * 0.05, Math.random() * 0.3);
  }
  playNoise(0.8, 0.03, 0);
}

export function playMRIBeep() {
  if (muted) return;
  playTone(1000, 0.08, 'sine', 0.2);
  playTone(800, 0.06, 'sine', 0.15, 0.1);
}

export function playBrainClick() {
  if (muted) return;
  playTone(1500, 0.05, 'triangle', 0.2);
  playTone(1200, 0.1, 'sine', 0.15, 0.05);
}

export function playCrowdGroan() {
  if (muted) return;
  for (let i = 0; i < 4; i++) {
    const freq = 150 + Math.random() * 300;
    playTone(freq, 0.5, 'sine', 0.04, Math.random() * 0.4);
  }
  playNoise(0.6, 0.02);
}

export function playDrumRoll() {
  if (muted) return;
  for (let i = 0; i < 16; i++) {
    const t = i * 0.04;
    playNoise(0.02, 0.15 + i * 0.01, t);
  }
}

export function playRevealCrash() {
  if (muted) return;
  playTone(880, 0.8, 'sawtooth', 0.25);
  playTone(1320, 0.5, 'sine', 0.2, 0.1);
  playTone(660, 0.6, 'triangle', 0.15, 0.2);
  playNoise(0.4, 0.08);
}

export function playStampSFX() {
  if (muted) return;
  playNoise(0.06, 0.3);
  playTone(200, 0.15, 'square', 0.2);
}

export function playPaperScribble() {
  if (muted) return;
  playNoise(0.12, 0.04);
}

export function playShareSuccess() {
  if (muted) return;
  playTone(523, 0.1, 'sine', 0.2);
  playTone(659, 0.1, 'sine', 0.2, 0.1);
  playTone(784, 0.2, 'sine', 0.25, 0.2);
}

export function playTableUpdate() {
  if (muted) return;
  playTone(400, 0.05, 'triangle', 0.1);
}

export function playWhistle() {
  if (muted) return;
  playTone(2000, 0.15, 'sine', 0.3);
  playTone(2400, 0.2, 'sine', 0.25, 0.1);
  playTone(1800, 0.1, 'sine', 0.15, 0.3);
}

export function playHoverDrum() {
  if (muted) return;
  playNoise(0.04, 0.12);
  playTone(150, 0.06, 'sine', 0.15);
}

export function resumeAudioContext() {
  try {
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  } catch (e) {}
}
