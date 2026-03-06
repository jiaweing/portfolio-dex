"use client";

import { AlignLeft, Pause, Play, Settings2, Square } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

interface TextToSpeechControlsProps {
  text: string;
  speak: () => void;
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
  volume: number;
  setVolume: (volume: number) => void;
  autoScroll: boolean;
  setAutoScroll: (v: boolean) => void;
  isSupported: boolean;
  progress: number;
  elapsedSeconds: number;
  totalSeconds: number;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function TextToSpeechControls({
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
  volume,
  setVolume,
  autoScroll,
  setAutoScroll,
  progress,
  elapsedSeconds,
  totalSeconds,
}: TextToSpeechControlsProps) {
  const [showSettings, setShowSettings] = React.useState(false);
  // Tracks the thumb position while the user is scrubbing (before releasing)
  const [seekingValue, setSeekingValue] = React.useState<number | null>(null);

  const handlePlayPause = () => {
    if (speaking && !paused) pause();
    else if (paused) resume();
    else speak();
  };

  const englishVoices = voices.filter((v) => v.lang.startsWith("en"));
  const displayVoices = englishVoices.length > 0 ? englishVoices : voices;

  const isActive = speaking || progress > 0;

  return (
    <div className="sticky top-20 z-10 mb-6 overflow-hidden rounded-xl border bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* ── Single controls row ── */}
      <div className="flex items-center gap-2 px-3 py-2.5">
        {/* Play / Stop */}
        <div className="flex items-center gap-1 self-center">
          <Button
            className="size-9 rounded-full"
            onClick={handlePlayPause}
            size="icon"
            variant="default"
          >
            {speaking && !paused ? (
              <Pause className="size-4" />
            ) : (
              <Play className="size-4" />
            )}
          </Button>
          <Button
            className="size-8"
            disabled={!isActive}
            onClick={cancel}
            size="icon"
            variant="ghost"
          >
            <Square className="size-3.5" />
          </Button>
        </div>

        {/* Seek slider + timestamps grouped together */}
        <div className="flex min-w-0 flex-1 flex-col gap-1 self-center pt-2.5">
          <Slider
            className="cursor-pointer"
            disabled={!isActive}
            max={100}
            min={0}
            onValueChange={([v]) => setSeekingValue(v)}
            onValueCommit={([v]) => {
              seek(v);
              setSeekingValue(null);
            }}
            step={0.1}
            value={[seekingValue ?? progress]}
          />
          <div className="flex justify-between text-[10px] text-muted-foreground tabular-nums">
            <span>
              {formatTime(
                seekingValue !== null
                  ? (seekingValue / 100) * totalSeconds
                  : elapsedSeconds
              )}
            </span>
            <span>{formatTime(totalSeconds)}</span>
          </div>
        </div>

        {/* Settings toggle */}
        <Button
          className={`size-8 self-center transition-colors ${showSettings ? "bg-accent text-accent-foreground" : ""}`}
          onClick={() => setShowSettings((s) => !s)}
          size="icon"
          variant="ghost"
        >
          <Settings2 className="size-4" />
        </Button>
      </div>

      {/* ── Settings panel ── */}
      {showSettings && (
        <div className="space-y-4 border-t px-4 py-4">
          {/* Row 1: Voice */}
          <div className="space-y-1.5">
            <p className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
              Voice
            </p>
            <Select
              onValueChange={(value) => {
                const voice = voices.find((v) => v.name === value);
                if (voice) setSelectedVoice(voice);
              }}
              value={selectedVoice?.name ?? ""}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select voice" />
              </SelectTrigger>
              <SelectContent>
                {displayVoices.map((voice) => (
                  <SelectItem key={voice.name} value={voice.name}>
                    {voice.name} ({voice.lang})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Row 2: Volume + Speed */}
          <div className="grid grid-cols-2 gap-4">
            {/* Volume */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <p className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
                  Volume
                </p>
                <span className="font-medium text-xs tabular-nums">
                  {Math.round(volume * 100)}%
                </span>
              </div>
              <Slider
                max={1}
                min={0}
                onValueChange={([v]) => setVolume(v)}
                step={0.05}
                value={[volume]}
              />
            </div>

            {/* Speed */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <p className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
                  Speed
                </p>
                <span className="font-medium text-xs tabular-nums">
                  {rate.toFixed(1)}×
                </span>
              </div>
              <Slider
                max={2}
                min={0.5}
                onValueChange={([v]) => setRate(v)}
                step={0.1}
                value={[rate]}
              />
            </div>
          </div>

          {/* Auto-scroll */}
          <div className="flex items-center justify-between gap-4 rounded-lg border bg-muted/40 px-3 py-2.5">
            <div className="flex items-start gap-2.5">
              <AlignLeft className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              <div>
                <p className="font-medium text-sm leading-none">Auto-scroll</p>
                <p className="mt-1 text-muted-foreground text-xs">
                  Follow the highlighted text as it plays
                </p>
              </div>
            </div>
            <Switch checked={autoScroll} onCheckedChange={setAutoScroll} />
          </div>
        </div>
      )}
    </div>
  );
}
