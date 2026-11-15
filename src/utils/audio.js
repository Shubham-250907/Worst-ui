// Web Audio API helper
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * High-pitched screech jumpscare sound:
 * Sawtooth + square oscillators sweeping between 3200Hz and 4400Hz at 0.45 gain for 1.5 seconds.
 */
export function playJumpscareScreech() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const duration = 1.5;

    // Master gain
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.45, now);
    masterGain.gain.setValueAtTime(0.45, now + duration - 0.05);
    masterGain.gain.linearRampToValueAtTime(0.001, now + duration);

    // Filter to make it piercingly harsh
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(2500, now);

    // Osc 1: Sawtooth sweeping 3200Hz -> 4400Hz -> 3200Hz -> 4400Hz
    const oscSaw = ctx.createOscillator();
    oscSaw.type = 'sawtooth';
    oscSaw.frequency.setValueAtTime(3200, now);
    oscSaw.frequency.linearRampToValueAtTime(4400, now + 0.35);
    oscSaw.frequency.linearRampToValueAtTime(3300, now + 0.7);
    oscSaw.frequency.linearRampToValueAtTime(4400, now + 1.1);
    oscSaw.frequency.linearRampToValueAtTime(3800, now + duration);

    // Osc 2: Square sweeping slightly detuned for dissonance
    const oscSquare = ctx.createOscillator();
    oscSquare.type = 'square';
    oscSquare.frequency.setValueAtTime(3250, now);
    oscSquare.frequency.linearRampToValueAtTime(4350, now + 0.4);
    oscSquare.frequency.linearRampToValueAtTime(3180, now + 0.8);
    oscSquare.frequency.linearRampToValueAtTime(4420, now + 1.15);
    oscSquare.frequency.linearRampToValueAtTime(3750, now + duration);

    // Add vibrato/LFO for maximum horror jitter
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(28, now); // 28Hz flutter
    lfoGain.gain.setValueAtTime(350, now);
    lfo.connect(lfoGain);
    lfoGain.connect(oscSaw.frequency);
    lfoGain.connect(oscSquare.frequency);

    oscSaw.connect(filter);
    oscSquare.connect(filter);
    filter.connect(masterGain);
    masterGain.connect(ctx.destination);

    oscSaw.start(now);
    oscSquare.start(now);
    lfo.start(now);

    oscSaw.stop(now + duration);
    oscSquare.stop(now + duration);
    lfo.stop(now + duration);
  } catch (err) {
    console.warn("Audio playback error:", err);
  }
}

/**
 * Sarcastic low buzzer for wrong input, click frustration, or failed verification
 */
export function playBuzzer() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const duration = 0.28;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(95, now);
    osc.frequency.linearRampToValueAtTime(70, now + duration);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.linearRampToValueAtTime(0.01, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration);
  } catch (err) {
    console.warn("Audio error:", err);
  }
}

/**
 * Irritating high-pitch button click beep for calculator buttons
 */
export function playCalcBeep() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const duration = 0.05;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square';
    // Randomize slightly between 1600Hz and 2200Hz to be extra grating
    const freq = 1600 + Math.random() * 600;
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration);
  } catch (err) {
    console.warn("Audio error:", err);
  }
}

/**
 * Sarcastic pass chime
 */
export function playSuccessChime() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((freq, idx) => {
      const now = ctx.currentTime + idx * 0.08;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    });
  } catch (err) {
    console.warn("Audio error:", err);
  }
}
