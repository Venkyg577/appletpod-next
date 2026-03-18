// Audio configuration
var audioEnabled = true; // Set to false to disable all audio

// Web Audio API context
var audioContext = null;

// Initialize Web Audio API
function initAudio() {
  if (!audioEnabled) return;
  
  // If already initialized, return
  if (audioContext) return;
  
  try {
    // Create audio context (handle browser differences)
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioContext = new AudioContextClass();
      // Resume if suspended
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
    } else {
      audioEnabled = false;
    }
  } catch (e) {
    console.log('Web Audio API not supported:', e);
    audioEnabled = false;
  }
}

// Ensure audio context is initialized before playing
function ensureAudioContext() {
  if (!audioEnabled) return false;
  if (!audioContext) {
    initAudio();
  }
  return audioContext !== null;
}

// Generate a tone with envelope
function playTone(frequency, duration, options = {}) {
  if (!ensureAudioContext()) return null;
  
  // Resume audio context if suspended (required for user interaction)
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
  
  // Ensure frequency is valid
  if (!isFinite(frequency) || frequency <= 0) return null;
  if (!isFinite(duration) || duration <= 0) return null;
  
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.type = options.type || 'sine';
  oscillator.frequency.value = frequency;
  
  const volume = options.volume !== undefined ? options.volume : 0.3;
  const attack = Math.max(0.001, options.attack || 0.01);
  const decay = Math.max(0.001, options.decay || 0.1);
  const sustain = options.sustain !== undefined ? options.sustain : 0.7;
  const release = Math.max(0.001, options.release || 0.2);
  
  const now = Math.max(0, audioContext.currentTime);
  const sustainTime = Math.max(0, duration - attack - decay - release);
  
  // Envelope: attack -> decay -> sustain -> release
  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(volume, now + attack);
  gainNode.gain.linearRampToValueAtTime(volume * sustain, now + attack + decay);
  if (sustainTime > 0) {
    gainNode.gain.setValueAtTime(volume * sustain, now + attack + decay + sustainTime);
  }
  gainNode.gain.linearRampToValueAtTime(0, now + duration);
  
  oscillator.start(now);
  oscillator.stop(now + duration);
  
  return oscillator;
}

// Generate a frequency sweep (for swish/woosh effects)
function playSweep(startFreq, endFreq, duration, options = {}) {
  if (!ensureAudioContext()) return null;
  
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
  
  // Ensure frequencies and duration are valid
  if (!isFinite(startFreq) || startFreq <= 0) return null;
  if (!isFinite(endFreq) || endFreq <= 0) return null;
  if (!isFinite(duration) || duration <= 0) return null;
  
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.type = options.type || 'sine';
  const now = Math.max(0, audioContext.currentTime);
  oscillator.frequency.setValueAtTime(startFreq, now);
  oscillator.frequency.exponentialRampToValueAtTime(endFreq, now + duration);
  
  const volume = options.volume !== undefined ? options.volume : 0.25;
  const attack = Math.max(0.001, options.attack || 0.01);
  const release = Math.max(0.001, options.release || 0.15);
  
  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(volume, now + attack);
  if (duration > release) {
    gainNode.gain.setValueAtTime(volume, now + duration - release);
  }
  gainNode.gain.linearRampToValueAtTime(0, now + duration);
  
  oscillator.start(now);
  oscillator.stop(now + duration);
  
  return oscillator;
}

// Generate multiple tones in sequence
function playToneSequence(tones, options = {}) {
  if (!ensureAudioContext()) return;
  
  // Resume audio context if suspended
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
  
  const startTime = Math.max(0, audioContext.currentTime);
  let currentTime = 0;
  
  tones.forEach((tone, index) => {
    // Skip if tone is a gap
    if (tone.gap) {
      currentTime += tone.gap;
      return;
    }
    
    const playTime = startTime + currentTime;
    
    if (tone.sweep) {
      // Schedule sweep at the correct time
      const duration = Math.max(0.01, tone.duration || 0.2);
      const startFreq = tone.startFreq || tone.frequency;
      const endFreq = tone.endFreq || tone.frequency;
      
      // Validate frequencies
      if (!isFinite(startFreq) || startFreq <= 0 || !isFinite(endFreq) || endFreq <= 0) {
        currentTime += duration + (tone.gap || 0);
        return;
      }
      
      const sweep = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      sweep.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      sweep.type = tone.type || 'sine';
      sweep.frequency.setValueAtTime(startFreq, playTime);
      sweep.frequency.exponentialRampToValueAtTime(endFreq, playTime + duration);
      
      const volume = Math.max(0, Math.min(1, tone.volume || options.volume || 0.3));
      gainNode.gain.setValueAtTime(0, playTime);
      gainNode.gain.linearRampToValueAtTime(volume, playTime + 0.01);
      if (duration > 0.02) {
        gainNode.gain.setValueAtTime(volume, playTime + duration - 0.01);
      }
      gainNode.gain.linearRampToValueAtTime(0, playTime + duration);
      
      sweep.start(playTime);
      sweep.stop(playTime + duration);
    } else {
      // Schedule tone at the correct time
      const frequency = tone.frequency;
      
      // Validate frequency
      if (!isFinite(frequency) || frequency <= 0) {
        currentTime += (tone.duration || 0.2) + (tone.gap || 0);
        return;
      }
      
      const duration = Math.max(0.01, tone.duration || 0.2);
      const volume = Math.max(0, Math.min(1, tone.volume || options.volume || 0.3));
      
      const osc = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      osc.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      osc.type = tone.type || 'sine';
      osc.frequency.value = frequency;
      
      gainNode.gain.setValueAtTime(0, playTime);
      gainNode.gain.linearRampToValueAtTime(volume, playTime + 0.01);
      if (duration > 0.02) {
        gainNode.gain.setValueAtTime(volume, playTime + duration - 0.01);
      }
      gainNode.gain.linearRampToValueAtTime(0, playTime + duration);
      
      osc.start(playTime);
      osc.stop(playTime + duration);
    }
    
    currentTime += (tone.duration || 0.2) + (tone.gap || 0);
  });
}

// Scene-specific audio functions
function playScene1Audio() {
  // Pop-in tone sequence: quick ascending tones
  playToneSequence([
    { frequency: 400, duration: 0.1, volume: 0.4 },
    { gap: 0.05 },
    { frequency: 600, duration: 0.1, volume: 0.4 },
    { gap: 0.05 },
    { frequency: 800, duration: 0.15, volume: 0.5 }
  ]);
}

function playScene5EndAudio() {
  // Bump tone at end of scene 5 animation
  playTone(200, 0.2, { volume: 0.4, attack: 0.01, decay: 0.05, sustain: 0.8, release: 0.1 });
  setTimeout(() => {
    playTone(180, 0.15, { volume: 0.3, attack: 0.01, decay: 0.05, sustain: 0.7, release: 0.08 });
  }, 100);
}

function playExcited() {
  // Excited: quick ascending energetic tones
  playToneSequence([
    { frequency: 500, duration: 0.1, volume: 0.4 },
    { gap: 0.05 },
    { frequency: 700, duration: 0.1, volume: 0.45 },
    { gap: 0.05 },
    { frequency: 900, duration: 0.12, volume: 0.5 },
    { gap: 0.05 },
    { frequency: 1100, duration: 0.15, volume: 0.55 }
  ]);
}

function playBubblePlop() {
  // Bubble plop: quick pop sound with decay
  playTone(200, 0.15, { volume: 0.4, attack: 0.01, decay: 0.05, sustain: 0.3, release: 0.08 });
  setTimeout(() => {
    playTone(150, 0.1, { volume: 0.25, attack: 0.01, release: 0.06 });
  }, 50);
}

function playFiveTonesWithCelebration() {
  // 5 tones followed by celebration
  playToneSequence([
    { frequency: 400, duration: 0.15, volume: 0.4 },
    { gap: 0.1 },
    { frequency: 500, duration: 0.15, volume: 0.4 },
    { gap: 0.1},
    { frequency: 600, duration: 0.15, volume: 0.4 },
    { gap: 0.1 },
    { frequency: 700, duration: 0.15, volume: 0.4 },
    { gap: 0.1 },
    { frequency: 800, duration: 0.15, volume: 0.4 },
    { gap: 0.1},  { frequency: 800, duration: 0.15, volume: 0.4 },
    { gap: 0.1},
    // Celebration sequence
    { frequency: 523.25, duration: 0.15, volume: 0.4 }, // C
    { frequency: 659.25, duration: 0.15, volume: 0.4 }, // E
    { frequency: 783.99, duration: 0.15, volume: 0.4 }, // G
    { gap: 0.1 },
    { frequency: 1046.50, duration: 0.2, volume: 0.5 }, // C (octave)
    { gap: 0.1 },
    { frequency: 1318.51, duration: 0.25, volume: 0.5 }  // E (octave)
  ]);
}

function playFiveTonesWithCelebration2() {
  // 5 tones followed by celebration
  playToneSequence([
    { frequency: 400, duration: 0.15, volume: 0.4 },
    { gap: 0.25 },
    { frequency: 500, duration: 0.15, volume: 0.4 },
    { gap: 0.25},
    { frequency: 600, duration: 0.15, volume: 0.4 },
    { gap: 0.35 },
    { frequency: 700, duration: 0.15, volume: 0.4 },
    { gap: 0.25},
    { frequency: 800, duration: 0.15, volume: 0.4 },
    { gap: 0.25},
    { frequency: 800, duration: 0.15, volume: 0.4 },
    { gap: 0.25},

    // Celebration sequence
    { frequency: 523.25, duration: 0.15, volume: 0.4 }, // C
    { frequency: 659.25, duration: 0.15, volume: 0.4 }, // E
    { frequency: 783.99, duration: 0.15, volume: 0.4 }, // G
    { gap: 0.1 },
    { frequency: 1046.50, duration: 0.2, volume: 0.5 }, // C (octave)
    { gap: 0.1 },
    { frequency: 1318.51, duration: 0.25, volume: 0.5 }  // E (octave)
  ]);
}

// Initialize on load
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', initAudio);
  // Also initialize on first user interaction (required for some browsers)
  document.addEventListener('click', function initOnClick() {
    if (!audioContext && audioEnabled) {
      initAudio();
    }
    document.removeEventListener('click', initOnClick);
  }, { once: true });
}
