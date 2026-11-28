/* The room's few sounds, made on the spot with two oscillators. No files to
   download, and nothing plays until the visitor has pressed something. */

type Wave = OscillatorType;

export function createSound() {
  let ctx: AudioContext | null = null;
  let on = true;

  const audio = () => {
    if (!on) {
      return null;
    }
    if (!ctx) {
      const Ctor =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!Ctor) {
        return null;
      }
      ctx = new Ctor();
    }
    if (ctx.state === "suspended") {
      ctx.resume().catch(() => undefined);
    }
    return ctx;
  };

  const note = (
    freq: number,
    at: number,
    len: number,
    wave: Wave = "triangle",
    loud = 0.07
  ) => {
    const a = audio();
    if (!a) {
      return;
    }
    const start = a.currentTime + at;
    const osc = a.createOscillator();
    const gain = a.createGain();
    osc.type = wave;
    osc.frequency.setValueAtTime(freq, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(loud, start + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + len);
    osc.connect(gain).connect(a.destination);
    osc.start(start);
    osc.stop(start + len + 0.02);
  };

  return {
    setOn(value: boolean) {
      on = value;
    },
    /** A toy was poked */
    poke() {
      note(520, 0, 0.09, "square", 0.03);
      note(700, 0.05, 0.1, "square", 0.025);
    },
    /** Something already found was picked up again */
    pick() {
      note(660, 0, 0.14);
      note(880, 0.07, 0.16);
    },
    /** A new find */
    unlock() {
      note(523.25, 0, 0.16);
      note(659.25, 0.09, 0.16);
      note(783.99, 0.18, 0.18);
      note(1046.5, 0.27, 0.34, "triangle", 0.08);
    },
    /** The last find */
    fanfare() {
      const run = [523.25, 659.25, 783.99, 1046.5, 783.99, 1046.5, 1318.5];
      run.forEach((f, i) => {
        note(f, i * 0.12, i === run.length - 1 ? 0.7 : 0.2, "triangle", 0.08);
      });
      note(261.63, 0.72, 0.8, "sawtooth", 0.025);
    },
    dispose() {
      ctx?.close().catch(() => undefined);
      ctx = null;
    },
  };
}

export type Sound = ReturnType<typeof createSound>;
