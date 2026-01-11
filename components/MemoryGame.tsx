"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Clock,
  Gamepad2,
  MousePointerClick,
  Play,
  RotateCcw,
  Trophy,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactConfetti from "react-confetti";
import type { Project } from "@/lib/notion";
import { cn } from "@/lib/utils";

// Types
interface GameCard {
  id: string;
  projectId: string;
  image: string;
  title: string;
  isFlipped: boolean;
  isMatched: boolean;
  type: "cover" | "logo";
}

type Difficulty = 6 | 8 | 12 | 16;
type ScoreMode = "time" | "moves" | "combo";
type CardType = "cover" | "logo";
type GameStatus = "setup" | "playing" | "won";

interface HighScoreEntry {
  score: number;
  date: string;
}

interface HighScores {
  [difficulty: number]: {
    [scoreMode: string]: HighScoreEntry;
  };
}

const STORAGE_KEY = "portfolio-memory-highscores";

// Scoring functions
function calculateScore(
  mode: ScoreMode,
  seconds: number,
  moves: number
): number {
  switch (mode) {
    case "time":
      return Math.max(10_000 - seconds * 50, 1000);
    case "moves":
      return Math.max(10_000 - moves * 100, 1000);
    case "combo":
      return Math.max(10_000 - seconds * 25 - moves * 50, 1000);
    default:
      return 0;
  }
}

// LocalStorage helpers
function getHighScores(): HighScores {
  if (typeof window === "undefined") return {};
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function saveHighScore(
  difficulty: Difficulty,
  mode: ScoreMode,
  score: number
): boolean {
  const scores = getHighScores();
  if (!scores[difficulty]) scores[difficulty] = {};

  const existing = scores[difficulty][mode];
  if (!existing || score > existing.score) {
    scores[difficulty][mode] = {
      score,
      date: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
    return true; // New high score!
  }
  return false;
}

function getHighScore(
  difficulty: Difficulty,
  mode: ScoreMode
): HighScoreEntry | null {
  const scores = getHighScores();
  return scores[difficulty]?.[mode] || null;
}

// Shuffle array using Fisher-Yates
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Confetti wrapper using react-confetti
function GameConfetti() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      <ReactConfetti
        colors={["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]}
        height={windowSize.height}
        numberOfPieces={150}
        recycle={false}
        width={windowSize.width}
      />
    </div>
  );
}

// Memory Card component
function MemoryCard({
  card,
  onClick,
  disabled,
}: {
  card: GameCard;
  onClick: () => void;
  disabled: boolean;
}) {
  const isRevealed = card.isFlipped || card.isMatched;

  return (
    <motion.div
      className={cn(
        "perspective-1000 relative cursor-pointer",
        card.type === "logo" ? "aspect-square" : "aspect-[4/5]"
      )}
      onClick={() => !(disabled || isRevealed) && onClick()}
      whileHover={disabled || isRevealed ? {} : { scale: 1.02 }}
      whileTap={disabled || isRevealed ? {} : { scale: 0.98 }}
    >
      <motion.div
        animate={{ rotateY: isRevealed ? 180 : 0 }}
        className="relative h-full w-full"
        initial={false}
        style={{ transformStyle: "preserve-3d" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {/* Back of card (question mark) */}
        <div
          className={cn(
            "backface-hidden absolute inset-0 flex items-center justify-center rounded-xl border",
            "border-border bg-muted",
            "transition-colors hover:border-muted-foreground/50"
          )}
          style={{ backfaceVisibility: "hidden" }}
        >
          <span className="font-medium text-4xl text-muted-foreground">?</span>
        </div>

        {/* Front of card (project cover) */}
        <div
          className={cn(
            "backface-hidden absolute inset-0 overflow-hidden rounded-xl border-2",
            card.isMatched
              ? "border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.5)]"
              : "border-border"
          )}
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <Image
            alt={card.title}
            className={cn(
              "object-cover",
              card.type === "logo" ? "object-contain" : ""
            )}
            fill
            sizes="(max-width: 768px) 25vw, 15vw"
            src={card.image}
          />
          {card.isMatched && (
            <div className="absolute inset-0 flex items-center justify-center bg-green-500/20">
              <motion.div
                animate={{ scale: 1 }}
                initial={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Trophy className="h-8 w-8 text-green-400 drop-shadow-lg" />
              </motion.div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// Setup screen component
function GameSetup({
  onStart,
  difficulty,
  setDifficulty,
  scoreMode,
  setScoreMode,
  cardType,
  setCardType,
  availablePairs,
}: {
  onStart: () => void;
  difficulty: Difficulty;
  setDifficulty: (d: Difficulty) => void;
  scoreMode: ScoreMode;
  setScoreMode: (m: ScoreMode) => void;
  cardType: CardType;
  setCardType: (t: CardType) => void;
  availablePairs: number;
}) {
  const difficulties: { value: Difficulty; label: string }[] = [
    { value: 6, label: "Easy (6 pairs)" },
    { value: 8, label: "Medium (8 pairs)" },
    { value: 12, label: "Hard (12 pairs)" },
    { value: 16, label: "Expert (16 pairs)" },
  ];

  const scoreModes: {
    value: ScoreMode;
    label: string;
    icon: React.ReactNode;
    desc: string;
  }[] = [
    {
      value: "time",
      label: "Speed Run",
      icon: <Clock className="h-5 w-5" />,
      desc: "Fastest wins",
    },
    {
      value: "moves",
      label: "Memory Master",
      icon: <MousePointerClick className="h-5 w-5" />,
      desc: "Fewest moves wins",
    },
    {
      value: "combo",
      label: "Combo Mode",
      icon: <Zap className="h-5 w-5" />,
      desc: "Balance both",
    },
  ];

  const highScore = getHighScore(difficulty, scoreMode);

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-md space-y-8 px-4 py-8"
      initial={{ opacity: 0, y: 20 }}
    >
      <div className="text-center">
        <motion.div
          animate={{ scale: 1 }}
          className="mb-4 inline-flex items-center justify-center rounded-full bg-secondary p-4"
          initial={{ scale: 0 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
        >
          <Gamepad2 className="h-8 w-8 text-secondary-foreground" />
        </motion.div>
        <h2 className="font-bold text-2xl text-foreground">Memory Game</h2>
        <p className="mt-2 text-muted-foreground">Match cards to win!</p>
      </div>

      {/* Card Type Selection */}
      <div className="grid grid-cols-2 gap-2 rounded-lg bg-secondary/50 p-1">
        <button
          className={cn(
            "rounded-md py-2 font-medium text-sm transition-all",
            cardType === "cover"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
          onClick={() => setCardType("cover")}
        >
          Covers
        </button>
        <button
          className={cn(
            "rounded-md py-2 font-medium text-sm transition-all",
            cardType === "logo"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
          onClick={() => setCardType("logo")}
        >
          Logos
        </button>
      </div>

      {/* Difficulty Selection */}
      <div className="space-y-3">
        <label className="block font-medium text-muted-foreground text-sm">
          Difficulty
        </label>
        <div className="grid grid-cols-3 gap-2">
          {difficulties.map((d) => (
            <button
              className={cn(
                "rounded-lg px-3 py-2 font-medium text-sm transition-all",
                difficulty === d.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                d.value > availablePairs && "cursor-not-allowed opacity-40"
              )}
              disabled={d.value > availablePairs}
              key={d.value}
              onClick={() => setDifficulty(d.value)}
            >
              {d.value} pairs
            </button>
          ))}
        </div>
        {availablePairs < 12 && (
          <p className="text-xs text-zinc-500">
            Only {availablePairs} projects with covers available
          </p>
        )}
      </div>

      {/* Score Mode Selection */}
      <div className="space-y-3">
        <label className="block font-medium text-muted-foreground text-sm">
          Score Mode
        </label>
        <div className="space-y-2">
          {scoreModes.map((mode) => (
            <button
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-4 py-3 transition-all",
                scoreMode === mode.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
              key={mode.value}
              onClick={() => setScoreMode(mode.value)}
            >
              {mode.icon}
              <div className="text-left">
                <div className="font-medium">{mode.label}</div>
                <div
                  className={cn(
                    "text-xs",
                    scoreMode === mode.value ? "text-zinc-600" : "text-zinc-500"
                  )}
                >
                  {mode.desc}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* High Score Display */}
      {highScore && (
        <motion.div
          animate={{ opacity: 1 }}
          className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-4"
          initial={{ opacity: 0 }}
        >
          <div className="flex items-center gap-2 text-yellow-400">
            <Trophy className="h-5 w-5" />
            <span className="font-medium">
              High Score: {highScore.score.toLocaleString()}
            </span>
          </div>
        </motion.div>
      )}

      {/* Start Button */}
      <motion.button
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 font-bold text-primary-foreground transition-colors hover:bg-primary/90"
        onClick={onStart}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Play className="h-5 w-5" />
        Start Game
      </motion.button>
    </motion.div>
  );
}

// Win screen component
function WinScreen({
  score,
  isNewHighScore,
  moves,
  time,
  onPlayAgain,
  onBackToSetup,
}: {
  score: number;
  isNewHighScore: boolean;
  moves: number;
  time: number;
  onPlayAgain: () => void;
  onBackToSetup: () => void;
}) {
  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      className="mx-auto max-w-md space-y-6 px-4 py-8 text-center"
      initial={{ opacity: 0, scale: 0.9 }}
    >
      <motion.div
        animate={{ scale: 1, rotate: 0 }}
        className="inline-flex items-center justify-center rounded-full bg-secondary p-6"
        initial={{ scale: 0, rotate: -180 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <Trophy className="h-12 w-12 text-secondary-foreground" />
      </motion.div>

      <div>
        <h2 className="font-bold text-3xl text-foreground">You Won!</h2>
        {isNewHighScore && (
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 font-medium text-lg text-yellow-400"
            initial={{ opacity: 0, y: 10 }}
            transition={{ delay: 0.3 }}
          >
            🎉 New High Score! 🎉
          </motion.p>
        )}
      </div>

      <div className="rounded-xl bg-secondary/50 p-6">
        <div className="font-bold text-5xl text-foreground">
          {score.toLocaleString()}
        </div>
        <div className="mt-2 text-muted-foreground">points</div>
        <div className="mt-4 flex justify-center gap-6 text-muted-foreground text-sm">
          <div>
            <Clock className="mx-auto mb-1 h-4 w-4" />
            {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, "0")}
          </div>
          <div>
            <MousePointerClick className="mx-auto mb-1 h-4 w-4" />
            {moves} moves
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-secondary px-4 py-3 font-medium text-secondary-foreground hover:bg-secondary/80"
          onClick={onBackToSetup}
        >
          Settings
        </button>
        <button
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-medium text-primary-foreground hover:bg-primary/90"
          onClick={onPlayAgain}
        >
          <RotateCcw className="h-4 w-4" />
          Play Again
        </button>
      </div>
    </motion.div>
  );
}

// Main MemoryGame component
interface MemoryGameProps {
  projects: Project[];
}

export function MemoryGame({ projects }: MemoryGameProps) {
  // Game state
  const [status, setStatus] = useState<GameStatus>("setup");
  const [cardType, setCardType] = useState<CardType>("cover");

  // Filter projects based on card type
  const availableProjects = projects.filter((p) =>
    cardType === "cover" ? p.cover : p.logo
  );
  const availablePairs = availableProjects.length;

  const [difficulty, setDifficulty] = useState<Difficulty>(
    Math.min(8, availablePairs) as Difficulty
  );
  useEffect(() => {
    // Reset difficulty if current selection is invalid for new card type
    if (difficulty > availableProjects.length) {
      setDifficulty(Math.min(6, availableProjects.length) as Difficulty);
    }
  }, [cardType, availableProjects.length, difficulty]);

  const [scoreMode, setScoreMode] = useState<ScoreMode>("combo");
  const [cards, setCards] = useState<GameCard[]>([]);
  const [flippedIds, setFlippedIds] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [isNewHighScore, setIsNewHighScore] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const matchTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize game
  const initGame = useCallback(() => {
    // Select random projects for this game
    const shuffledProjects = shuffleArray(availableProjects);
    const selectedProjects = shuffledProjects.slice(0, difficulty);

    // Create pairs of cards
    const gamecards: GameCard[] = [];
    selectedProjects.forEach((project, idx) => {
      const image = cardType === "cover" ? project.cover! : project.logo!;
      // Create two cards for each project (a pair)
      for (let i = 0; i < 2; i++) {
        gamecards.push({
          id: `${project.id}-${i}`,
          projectId: project.id,
          image,
          type: cardType,
          title: project.title,
          isFlipped: false,
          isMatched: false,
        });
      }
    });

    // Shuffle all cards
    setCards(shuffleArray(gamecards));
    setFlippedIds([]);
    setMoves(0);
    setElapsedTime(0);
    setIsProcessing(false);
    setStatus("playing");
    setShowConfetti(false);
    setIsNewHighScore(false);
    if (matchTimerRef.current) clearTimeout(matchTimerRef.current);
  }, [difficulty, availableProjects, cardType]);

  // Timer effect
  useEffect(() => {
    if (status === "playing") {
      timerRef.current = setInterval(() => {
        setElapsedTime((t) => t + 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (matchTimerRef.current) clearTimeout(matchTimerRef.current);
    };
  }, [status]);

  const handleCardClick = useCallback(
    (cardId: string) => {
      const card = cards.find((c) => c.id === cardId);
      if (!card || card.isMatched || card.isFlipped) return;

      if (flippedIds.length >= 2) {
        if (matchTimerRef.current) clearTimeout(matchTimerRef.current);

        setCards((prev) =>
          prev.map((c) =>
            flippedIds.includes(c.id) ? { ...c, isFlipped: false } : c
          )
        );
        setFlippedIds([]);

        setCards((prev) =>
          prev.map((c) => (c.id === cardId ? { ...c, isFlipped: true } : c))
        );
        setFlippedIds([cardId]);
        return;
      }

      setCards((prev) =>
        prev.map((c) => (c.id === cardId ? { ...c, isFlipped: true } : c))
      );

      const newFlipped = [...flippedIds, cardId];
      setFlippedIds(newFlipped);

      if (newFlipped.length === 2) {
        setMoves((m) => m + 1);

        const [first, second] = newFlipped;
        const card1 = cards.find((c) => c.id === first)!;
        const card2 = cards.find((c) => c.id === second)!;

        if (card1.projectId === card2.projectId) {
          matchTimerRef.current = setTimeout(() => {
            setCards((prev) =>
              prev.map((c) =>
                c.projectId === card1.projectId
                  ? { ...c, isMatched: true, isFlipped: false }
                  : c
              )
            );
            setFlippedIds([]);
          }, 300);
        } else {
          matchTimerRef.current = setTimeout(() => {
            setCards((prev) =>
              prev.map((c) =>
                newFlipped.includes(c.id) ? { ...c, isFlipped: false } : c
              )
            );
            setFlippedIds([]);
          }, 1000);
        }
      }
    },
    [cards, flippedIds]
  );

  // Check for win
  useEffect(() => {
    if (
      status === "playing" &&
      cards.length > 0 &&
      cards.every((c) => c.isMatched)
    ) {
      if (timerRef.current) clearInterval(timerRef.current);

      const score = calculateScore(scoreMode, elapsedTime, moves);
      const isNew = saveHighScore(difficulty, scoreMode, score);

      setFinalScore(score);
      setIsNewHighScore(isNew);
      setShowConfetti(true);
      setStatus("won");
    }
  }, [cards, status, scoreMode, elapsedTime, moves, difficulty]);

  // Grid columns based on difficulty
  const gridCols =
    difficulty <= 6
      ? "grid-cols-4"
      : difficulty <= 8
        ? "grid-cols-4"
        : difficulty <= 12
          ? "grid-cols-6"
          : "grid-cols-8";

  if (availablePairs < 6) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <Gamepad2 className="mx-auto h-12 w-12 text-muted-foreground" />
        <h2 className="mt-4 font-medium text-foreground text-xl">
          Not Enough Projects
        </h2>
        <p className="mt-2 text-muted-foreground">
          You need at least 6 projects with{" "}
          {cardType === "cover" ? "covers" : "logos"} to play.
        </p>
      </div>
    );
  }

  return (
    <div className="relative min-h-[60vh] w-full">
      <AnimatePresence mode="wait">
        {status === "setup" && (
          <GameSetup
            availablePairs={availablePairs}
            cardType={cardType}
            difficulty={difficulty}
            key="setup"
            onStart={initGame}
            scoreMode={scoreMode}
            setCardType={setCardType}
            setDifficulty={setDifficulty}
            setScoreMode={setScoreMode}
          />
        )}

        {status === "playing" && (
          <motion.div
            animate={{ opacity: 1 }}
            className="px-4 py-6"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            key="playing"
          >
            {/* Game Stats Bar */}
            {/* Game Stats Bar */}
            <div className="mx-auto mb-6 flex w-full max-w-5xl items-center justify-between rounded-xl bg-secondary/50 px-4 py-3">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {Math.floor(elapsedTime / 60)}:
                  {(elapsedTime % 60).toString().padStart(2, "0")}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MousePointerClick className="h-4 w-4" />
                  {moves} moves
                </div>
              </div>
              <button
                className="rounded-lg px-3 py-1.5 text-muted-foreground text-sm hover:bg-secondary hover:text-foreground"
                onClick={() => setStatus("setup")}
              >
                Quit
              </button>
            </div>

            {/* Game Board */}
            <div
              className={cn("mx-auto grid w-full max-w-5xl gap-3", gridCols)}
            >
              {cards.map((card) => (
                <MemoryCard
                  card={card}
                  disabled={isProcessing}
                  key={card.id}
                  onClick={() => handleCardClick(card.id)}
                />
              ))}
            </div>
          </motion.div>
        )}

        {status === "won" && (
          <WinScreen
            isNewHighScore={isNewHighScore}
            key="won"
            moves={moves}
            onBackToSetup={() => setStatus("setup")}
            onPlayAgain={initGame}
            score={finalScore}
            time={elapsedTime}
          />
        )}
      </AnimatePresence>

      {showConfetti && <GameConfetti />}
    </div>
  );
}
