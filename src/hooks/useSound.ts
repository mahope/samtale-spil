"use client";

import { useCallback, useRef, useEffect } from "react";

// Web Audio API-based sound effects (no external files needed)
export function useSound() {
  const audioContextRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  // Cleanup AudioContext on unmount to prevent memory leak
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {
          // Ignore errors during cleanup
        });
        audioContextRef.current = null;
      }
    };
  }, []);

  // Card flip sound - soft "whoosh" effect
  const playFlip = useCallback(() => {
    try {
      const ctx = getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Create a soft noise-like sweep
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(400, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.15);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(2000, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(500, ctx.currentTime + 0.15);

      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

      oscillator.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.15);
    } catch {
      // Audio not supported, fail silently
    }
  }, [getAudioContext]);

  // Success/favorite sound - pleasant "ding"
  const playSuccess = useCallback(() => {
    try {
      const ctx = getAudioContext();
      
      // First note
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      gain1.gain.setValueAtTime(0.15, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(ctx.currentTime);
      osc1.stop(ctx.currentTime + 0.3);

      // Second note (harmony)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
      gain2.gain.setValueAtTime(0, ctx.currentTime);
      gain2.gain.setValueAtTime(0.12, ctx.currentTime + 0.1);
      gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(ctx.currentTime + 0.1);
      osc2.stop(ctx.currentTime + 0.4);
    } catch {
      // Audio not supported, fail silently
    }
  }, [getAudioContext]);

  // Button click - subtle tap
  const playTap = useCallback(() => {
    try {
      const ctx = getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(800, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.05);

      gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.05);
    } catch {
      // Audio not supported, fail silently
    }
  }, [getAudioContext]);

  // Timeout warning sound - urgent double beep
  const playTimeout = useCallback(() => {
    try {
      const ctx = getAudioContext();
      
      // First beep
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "square";
      osc1.frequency.setValueAtTime(880, ctx.currentTime); // A5
      gain1.gain.setValueAtTime(0.1, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(ctx.currentTime);
      osc1.stop(ctx.currentTime + 0.1);

      // Second beep
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "square";
      osc2.frequency.setValueAtTime(880, ctx.currentTime + 0.15);
      gain2.gain.setValueAtTime(0, ctx.currentTime);
      gain2.gain.setValueAtTime(0.1, ctx.currentTime + 0.15);
      gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(ctx.currentTime + 0.15);
      osc2.stop(ctx.currentTime + 0.25);
    } catch {
      // Audio not supported, fail silently
    }
  }, [getAudioContext]);

  // Timer tick sound - subtle tick for last 5 seconds
  const playTick = useCallback(() => {
    try {
      const ctx = getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(1000, ctx.currentTime);

      gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.03);

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.03);
    } catch {
      // Audio not supported, fail silently
    }
  }, [getAudioContext]);

  // Intense speed tick - more urgent "tick-tock" for speed mode
  const playSpeedTick = useCallback((secondsLeft: number) => {
    try {
      const ctx = getAudioContext();
      
      // Higher frequency and louder as time runs out
      const baseFreq = secondsLeft <= 3 ? 1200 : 1000;
      const volume = secondsLeft <= 3 ? 0.12 : 0.08;
      
      // First tick
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(baseFreq, ctx.currentTime);
      gain1.gain.setValueAtTime(volume, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(ctx.currentTime);
      osc1.stop(ctx.currentTime + 0.05);

      // Second tick (tock) - lower frequency
      if (secondsLeft <= 5) {
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(baseFreq * 0.8, ctx.currentTime + 0.1);
        gain2.gain.setValueAtTime(0, ctx.currentTime);
        gain2.gain.setValueAtTime(volume * 0.7, ctx.currentTime + 0.1);
        gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start(ctx.currentTime + 0.1);
        osc2.stop(ctx.currentTime + 0.15);
      }
    } catch {
      // Audio not supported, fail silently
    }
  }, [getAudioContext]);

  // Speed bonus celebration sound - triumphant fanfare
  const playSpeedBonus = useCallback(() => {
    try {
      const ctx = getAudioContext();
      
      // Quick ascending arpeggio
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.setValueAtTime(0.15, ctx.currentTime + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.08 + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.08);
        osc.stop(ctx.currentTime + i * 0.08 + 0.15);
      });
      
      // Add a final "sparkle" effect
      setTimeout(() => {
        try {
          const sparkleOsc = ctx.createOscillator();
          const sparkleGain = ctx.createGain();
          sparkleOsc.type = "sine";
          sparkleOsc.frequency.setValueAtTime(2093, ctx.currentTime); // C7 - high sparkle
          sparkleGain.gain.setValueAtTime(0.08, ctx.currentTime);
          sparkleGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
          sparkleOsc.connect(sparkleGain);
          sparkleGain.connect(ctx.destination);
          sparkleOsc.start(ctx.currentTime);
          sparkleOsc.stop(ctx.currentTime + 0.2);
        } catch {
          // Ignore
        }
      }, 350);
    } catch {
      // Audio not supported, fail silently
    }
  }, [getAudioContext]);

  return { playFlip, playSuccess, playTap, playTimeout, playTick, playSpeedTick, playSpeedBonus };
}
