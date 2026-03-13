"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  AlignLeft,
  Minus,
  Pause,
  Play,
  Plus,
  Settings2,
  Square,
  Volume2,
  VolumeX,
} from "lucide-react";
import * as React from "react";
import ElasticSlider from "@/components/ElasticSlider";
import { Button } from "@/components/ui/button";
import { Frame } from "@/components/ui/frame";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

  const handlePlayPause = () => {
    if (speaking && !paused) pause();
    else if (paused) resume();
    else speak();
  };

  const englishVoices = voices.filter((v) => v.lang.startsWith("en"));
  const displayVoices = englishVoices.length > 0 ? englishVoices : voices;

  const isActive = speaking || progress > 0;

  return (
    <Frame className="sticky top-20 z-10 mb-6 bg-muted/95 backdrop-blur supports-[backdrop-filter]:bg-muted/60">
      {/* ── Controls row ── */}
      <div className="flex items-center gap-2 px-2 py-1.5">
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

        {/* Seek slider — time shown on top via renderValue */}
        <div className="min-w-0 flex-1 self-center">
          <ElasticSlider
            defaultValue={progress}
            isStepped={false}
            leftIcon={null}
            maxValue={100}
            onChange={(v) => seek(v)}
            onCommit={(v) => seek(v)}
            renderValue={(v) => (
              <span>
                {formatTime((v / 100) * totalSeconds)} /{" "}
                {formatTime(totalSeconds)}
              </span>
            )}
            rightIcon={null}
            startingValue={0}
            stepSize={0.1}
          />
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
      <AnimatePresence mode="wait">
        {showSettings && (
          <motion.div
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="space-y-4 bg-background/95 px-4 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60"
            data-slot="frame-panel"
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {/* Voice */}
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

            {/* Volume + Speed */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-0.5">
                <p className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
                  Volume
                </p>
                <ElasticSlider
                  defaultValue={volume * 100}
                  isStepped={false}
                  leftIcon={
                    <VolumeX className="size-3.5 text-muted-foreground" />
                  }
                  maxValue={100}
                  onCommit={(v) => setVolume(v / 100)}
                  renderValue={(v) => <span>{Math.round(v)}%</span>}
                  rightIcon={
                    <Volume2 className="size-3.5 text-muted-foreground" />
                  }
                  startingValue={0}
                  stepSize={1}
                />
              </div>

              <div className="space-y-0.5">
                <p className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
                  Speed
                </p>
                <ElasticSlider
                  defaultValue={rate}
                  isStepped={true}
                  leftIcon={
                    <Minus className="size-3.5 text-muted-foreground" />
                  }
                  maxValue={2}
                  onCommit={(v) => setRate(v)}
                  renderValue={(v) => <span>{v.toFixed(1)}×</span>}
                  rightIcon={
                    <Plus className="size-3.5 text-muted-foreground" />
                  }
                  startingValue={0.5}
                  stepSize={0.1}
                />
              </div>
            </div>

            {/* Auto-scroll */}
            <div className="flex items-center justify-between gap-4 rounded-lg border bg-muted/40 px-3 py-2.5">
              <div className="flex items-start gap-2.5">
                <AlignLeft className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <div>
                  <p className="font-medium text-sm leading-none">
                    Auto-scroll
                  </p>
                  <p className="mt-1 text-muted-foreground text-xs">
                    Follow the highlighted text as it plays
                  </p>
                </div>
              </div>
              <Switch checked={autoScroll} onCheckedChange={setAutoScroll} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Frame>
  );
}
