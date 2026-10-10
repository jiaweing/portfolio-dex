"use client";

import { motion } from "framer-motion";
import { Check, Copy, Trophy, X } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { getRewardCode, REWARD_URL, TOTAL_EGGS } from "@/lib/easter-eggs";

export function RewardCode() {
  const [copied, setCopied] = useState(false);
  const code = getRewardCode();

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard blocked, the code is still visible
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        aria-label={`Copy code ${code}`}
        className="flex flex-1 items-center justify-between rounded-xl border border-foreground/30 border-dashed px-3 py-2 font-mono font-semibold text-sm tracking-[0.25em] transition-colors hover:bg-foreground/5"
        onClick={copy}
        type="button"
      >
        {code}
        {copied ? (
          <Check className="size-3.5" />
        ) : (
          <Copy className="size-3.5" />
        )}
      </button>
      <a
        className="rounded-xl bg-foreground px-3 py-2 font-medium text-background text-xs transition-opacity hover:opacity-80"
        href={REWARD_URL}
        rel="noopener noreferrer"
        target="_blank"
      >
        ryuhq.com
      </a>
    </div>
  );
}

export function RewardCard() {
  return (
    <div className="rounded-2xl bg-muted/60 p-3">
      <p className="flex items-center gap-1.5 font-medium">
        <Trophy className="size-4" />
        You found them all
      </p>
      <p className="mt-0.5 mb-3 text-muted-foreground text-xs">
        10% off Ryu. Enter this code at checkout.
      </p>
      <RewardCode />
    </div>
  );
}

export function RewardDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent
        className="z-[230] gap-0 p-6 text-center sm:max-w-sm"
        showCloseButton={false}
      >
        <button
          aria-label="Close"
          className="absolute top-4 right-4 inline-flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          onClick={() => onOpenChange(false)}
          type="button"
        >
          <X className="size-4" />
        </button>
        <motion.div
          animate={{ scale: 1, rotate: 0 }}
          className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-foreground text-background"
          initial={{ scale: 0, rotate: -30 }}
          transition={{ type: "spring", stiffness: 260, damping: 14 }}
        >
          <Trophy className="size-8" />
        </motion.div>
        <DialogTitle className="text-xl">
          All {TOTAL_EGGS} eggs found
        </DialogTitle>
        <p className="mt-2 mb-5 text-muted-foreground text-sm">
          You poked, held, searched and stayed up way too late. Here&apos;s 10%
          off Ryu, use it at checkout.
        </p>
        <RewardCode />
      </DialogContent>
    </Dialog>
  );
}
