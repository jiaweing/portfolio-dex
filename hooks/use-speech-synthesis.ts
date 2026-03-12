"use client";

import * as React from "react";

const LS_RATE = "tts-rate";
const LS_VOLUME = "tts-volume";
const LS_VOICE = "tts-voice";

function lsRead(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function lsWrite(key: string, value: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, value);
  } catch {}
}

interface UseSpeechSynthesisOptions {
  onEnd?: () => void;
}

interface UseSpeechSynthesisReturn {
  setText: (text: string) => void;
  speak: (text: string) => void;
  cancel: () => void;
  pause: () => void;
  resume: () => void;
  seek: (percent: number) => void;
  speaking: boolean;
  paused: boolean;
  voices: SpeechSynthesisVoice[];
  selectedVoice: SpeechSynthesisVoice | null;
  setSelectedVoice: (voice: SpeechSynthesisVoice) => void;
  rate: number;
  setRate: (rate: number) => void;
  pitch: number;
  setPitch: (pitch: number) => void;
  volume: number;
  setVolume: (volume: number) => void;
  isSupported: boolean;
  progress: number;
  elapsedSeconds: number;
  totalSeconds: number;
  currentCharIndex: number;
}

const WORDS_PER_SECOND = 150 / 60;

export function useSpeechSynthesis(
  options: UseSpeechSynthesisOptions = {}
): UseSpeechSynthesisReturn {
  const { onEnd } = options;

  const [speaking, setSpeaking] = React.useState(false);
  const [paused, setPaused] = React.useState(false);
  const [voices, setVoices] = React.useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoiceState] =
    React.useState<SpeechSynthesisVoice | null>(null);
  const [rate, setRateState] = React.useState(() => {
    const saved = lsRead(LS_RATE);
    return saved ? Number.parseFloat(saved) || 1 : 1;
  });
  const [pitch, setPitchState] = React.useState(1);
  const [volume, setVolumeState] = React.useState(() => {
    const saved = lsRead(LS_VOLUME);
    return saved ? Number.parseFloat(saved) || 1 : 1;
  });
  const [progress, setProgress] = React.useState(0);
  const [elapsedSeconds, setElapsedSeconds] = React.useState(0);
  const [totalSeconds, setTotalSeconds] = React.useState(0);
  const [currentCharIndex, setCurrentCharIndex] = React.useState(0);

  // Refs for stable access inside callbacks without stale closures
  const utteranceRef = React.useRef<SpeechSynthesisUtterance | null>(null);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = React.useRef<number>(0);
  const pausedTimeRef = React.useRef<number>(0);
  const currentTextRef = React.useRef<string>("");
  const currentCharIndexRef = React.useRef(0);
  const speakingRef = React.useRef(false);
  const pausedRef = React.useRef(false);
  const rateRef = React.useRef(
    (() => {
      const saved = lsRead(LS_RATE);
      return saved ? Number.parseFloat(saved) || 1 : 1;
    })()
  );
  const pitchRef = React.useRef(1);
  const volumeRef = React.useRef(
    (() => {
      const saved = lsRead(LS_VOLUME);
      return saved ? Number.parseFloat(saved) || 1 : 1;
    })()
  );
  const selectedVoiceRef = React.useRef<SpeechSynthesisVoice | null>(null);
  const savedVoiceNameRef = React.useRef<string | null>(lsRead(LS_VOICE));
  const totalSecondsRef = React.useRef(0);

  const isSupported =
    typeof window !== "undefined" && "speechSynthesis" in window;

  const estimateDuration = React.useCallback((text: string) => {
    const totalWords = text.split(/\s+/).filter(Boolean).length;
    return (totalWords / WORDS_PER_SECOND / rateRef.current) * 1.1;
  }, []);

  const clearProgressTimer = React.useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Accepts an initialElapsed so we can continue the bar from the right position
  // when restarting mid-speech after a settings change.
  const startProgressTimer = React.useCallback(
    (totalDuration: number, initialElapsed = 0) => {
      clearProgressTimer();
      startTimeRef.current = Date.now() - initialElapsed * 1000;

      intervalRef.current = setInterval(() => {
        const elapsed = (Date.now() - startTimeRef.current) / 1000;
        setElapsedSeconds(elapsed);
        setProgress(Math.min((elapsed / totalDuration) * 100, 100));
      }, 100);
    },
    [clearProgressTimer]
  );

  React.useEffect(() => {
    if (!isSupported) return;

    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);

      if (availableVoices.length > 0 && !selectedVoiceRef.current) {
        const savedVoice = savedVoiceNameRef.current
          ? availableVoices.find((v) => v.name === savedVoiceNameRef.current)
          : null;
        const englishVoice = availableVoices.find(
          (v) => v.lang.startsWith("en") && v.localService
        );
        const voice = savedVoice ?? englishVoice ?? availableVoices[0];
        setSelectedVoiceState(voice);
        selectedVoiceRef.current = voice;
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
      clearProgressTimer();
    };
  }, [isSupported, clearProgressTimer]);

  // Core internal function — starts (or restarts) from a char offset.
  // Used by speak() and by the live-settings setters when speech is active.
  const startSpeech = React.useCallback(
    (text: string, offset: number) => {
      if (!isSupported) return;

      window.speechSynthesis.cancel();
      clearProgressTimer();

      const textToSpeak = offset > 0 ? text.slice(offset) : text;
      currentTextRef.current = text;

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utteranceRef.current = utterance;

      if (selectedVoiceRef.current) utterance.voice = selectedVoiceRef.current;
      utterance.rate = rateRef.current;
      utterance.pitch = pitchRef.current;
      utterance.volume = volumeRef.current;

      const totalDuration = estimateDuration(text);
      setTotalSeconds(totalDuration);
      totalSecondsRef.current = totalDuration;

      // Estimate where we are so the progress bar doesn't jump back to 0
      const initialElapsed =
        text.length > 0 ? (offset / text.length) * totalDuration : 0;

      utterance.onstart = () => {
        setSpeaking(true);
        speakingRef.current = true;
        setPaused(false);
        pausedRef.current = false;
        pausedTimeRef.current = 0;
        setElapsedSeconds(initialElapsed);
        startProgressTimer(totalDuration, initialElapsed);
      };

      utterance.onboundary = (event) => {
        if (event.name === "word") {
          const absIndex = offset + event.charIndex;
          currentCharIndexRef.current = absIndex;
          setCurrentCharIndex(absIndex);
        }
      };

      utterance.onend = () => {
        setSpeaking(false);
        speakingRef.current = false;
        setPaused(false);
        pausedRef.current = false;
        setProgress(100);
        setCurrentCharIndex(text.length);
        currentCharIndexRef.current = text.length;
        clearProgressTimer();
        utteranceRef.current = null;
        onEnd?.();
      };

      utterance.onerror = (event) => {
        if (event.error !== "interrupted" && event.error !== "canceled") {
          console.error("Speech synthesis error:", event.error);
        }
        setSpeaking(false);
        speakingRef.current = false;
        setPaused(false);
        pausedRef.current = false;
        clearProgressTimer();
      };

      window.speechSynthesis.speak(utterance);
    },
    [
      isSupported,
      clearProgressTimer,
      startProgressTimer,
      onEnd,
      estimateDuration,
    ]
  );

  const setText = React.useCallback(
    (text: string) => {
      currentTextRef.current = text;
      const estimated = estimateDuration(text);
      setTotalSeconds(estimated);
      totalSecondsRef.current = estimated;
      if (!(speakingRef.current || pausedRef.current)) {
        const initialProgress = text.length
          ? (currentCharIndexRef.current / text.length) * 100
          : 0;
        const initialElapsed = (initialProgress / 100) * estimated;
        setProgress(initialProgress);
        setElapsedSeconds(initialElapsed);
      }
    },
    [estimateDuration]
  );

  const speak = React.useCallback(
    (text: string) => {
      const sameText = currentTextRef.current === text;
      const offset = sameText ? currentCharIndexRef.current : 0;
      currentTextRef.current = text;
      if (!sameText) {
        currentCharIndexRef.current = 0;
        setCurrentCharIndex(0);
        setElapsedSeconds(0);
        setProgress(0);
      }
      startSpeech(text, offset);
    },
    [startSpeech]
  );

  const cancel = React.useCallback(() => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    clearProgressTimer();
    setSpeaking(false);
    speakingRef.current = false;
    setPaused(false);
    pausedRef.current = false;
    setProgress(0);
    setElapsedSeconds(0);
    setCurrentCharIndex(0);
    currentCharIndexRef.current = 0;
  }, [isSupported, clearProgressTimer]);

  const pause = React.useCallback(() => {
    if (!(isSupported && speakingRef.current) || pausedRef.current) return;
    window.speechSynthesis.pause();
    setPaused(true);
    pausedRef.current = true;
    pausedTimeRef.current = Date.now();
    clearProgressTimer();
  }, [isSupported, clearProgressTimer]);

  const resume = React.useCallback(() => {
    if (!(isSupported && pausedRef.current)) return;
    window.speechSynthesis.resume();
    setPaused(false);
    pausedRef.current = false;
    // Calculate elapsed at the moment we paused so the progress bar continues
    // from the right position. startProgressTimer would otherwise reset
    // startTimeRef to Date.now() (initialElapsed=0), losing our position.
    const elapsedAtPause =
      (pausedTimeRef.current - startTimeRef.current) / 1000;
    startProgressTimer(totalSecondsRef.current, elapsedAtPause);
  }, [isSupported, startProgressTimer]);

  // Seek to a position expressed as a percentage (0–100).
  // Maps the percentage to a char index and restarts speech from there.
  const seek = React.useCallback(
    (percent: number) => {
      const text = currentTextRef.current;
      if (!text) return;
      const clampedPercent = Math.min(Math.max(percent, 0), 100);
      const charIndex = Math.floor((clampedPercent / 100) * text.length);
      currentCharIndexRef.current = charIndex;
      setCurrentCharIndex(charIndex);
      const elapsed = (clampedPercent / 100) * totalSecondsRef.current;
      setProgress(clampedPercent);
      setElapsedSeconds(elapsed);
      if (speakingRef.current || pausedRef.current) {
        startSpeech(text, charIndex);
      }
    },
    [startSpeech]
  );

  // Smart setters — update the ref + state, then restart from the current
  // char position if speech is actively playing (not paused).
  const setRate = React.useCallback(
    (newRate: number) => {
      rateRef.current = newRate;
      setRateState(newRate);
      lsWrite(LS_RATE, String(newRate));
      if (currentTextRef.current) {
        const estimated = estimateDuration(currentTextRef.current);
        setTotalSeconds(estimated);
        totalSecondsRef.current = estimated;
      }
      if (speakingRef.current && !pausedRef.current) {
        startSpeech(currentTextRef.current, currentCharIndexRef.current);
      }
    },
    [startSpeech, estimateDuration]
  );

  const setPitch = React.useCallback(
    (newPitch: number) => {
      pitchRef.current = newPitch;
      setPitchState(newPitch);
      if (speakingRef.current && !pausedRef.current) {
        startSpeech(currentTextRef.current, currentCharIndexRef.current);
      }
    },
    [startSpeech]
  );

  const setVolume = React.useCallback(
    (newVolume: number) => {
      volumeRef.current = newVolume;
      setVolumeState(newVolume);
      lsWrite(LS_VOLUME, String(newVolume));
      if (speakingRef.current && !pausedRef.current) {
        startSpeech(currentTextRef.current, currentCharIndexRef.current);
      }
    },
    [startSpeech]
  );

  const setSelectedVoice = React.useCallback(
    (voice: SpeechSynthesisVoice) => {
      selectedVoiceRef.current = voice;
      setSelectedVoiceState(voice);
      lsWrite(LS_VOICE, voice.name);
      if (speakingRef.current && !pausedRef.current) {
        startSpeech(currentTextRef.current, currentCharIndexRef.current);
      }
    },
    [startSpeech]
  );

  return {
    setText,
    speak,
    cancel,
    pause,
    resume,
    seek,
    speaking,
    paused,
    voices,
    selectedVoice,
    setSelectedVoice,
    rate,
    setRate,
    pitch,
    setPitch,
    volume,
    setVolume,
    isSupported,
    progress,
    elapsedSeconds,
    totalSeconds,
    currentCharIndex,
  };
}
