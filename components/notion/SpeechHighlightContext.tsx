"use client";

import * as React from "react";

interface SpeechHighlightContextValue {
  currentCharIndex: number;
  isSpeaking: boolean;
  isPaused: boolean;
  autoScroll: boolean;
}

const SpeechHighlightContext = React.createContext<SpeechHighlightContextValue>(
  {
    currentCharIndex: -1,
    isSpeaking: false,
    isPaused: false,
    autoScroll: true,
  }
);

export function useSpeechHighlight() {
  return React.useContext(SpeechHighlightContext);
}

export function SpeechHighlightProvider({
  children,
  currentCharIndex,
  isSpeaking,
  isPaused,
  autoScroll,
}: {
  children: React.ReactNode;
  currentCharIndex: number;
  isSpeaking: boolean;
  isPaused: boolean;
  autoScroll: boolean;
}) {
  const value = React.useMemo(
    () => ({ currentCharIndex, isSpeaking, isPaused, autoScroll }),
    [currentCharIndex, isSpeaking, isPaused, autoScroll]
  );

  return (
    <SpeechHighlightContext.Provider value={value}>
      {children}
    </SpeechHighlightContext.Provider>
  );
}
