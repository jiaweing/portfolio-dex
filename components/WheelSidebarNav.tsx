"use client";

import { usePathname, useRouter } from "next/navigation";
import { NAV_ITEMS } from "@/components/nav-items";
import { OptionWheel } from "@/components/ui/option-wheel";

const LABELS = NAV_ITEMS.map((item) => item.label);
const HOME_INDEX = NAV_ITEMS.findIndex((item) => item.href === "/");

function activeIndex(pathname: string) {
  return NAV_ITEMS.findIndex((item) =>
    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
  );
}

// Scroll, drag or click the wheel to move between pages
export function WheelSidebarNav() {
  const pathname = usePathname();
  const router = useRouter();
  const current = activeIndex(pathname);

  return (
    <nav
      aria-label="Main"
      className="fixed top-1/2 left-0 z-[100] hidden h-[420px] w-[220px] -translate-y-1/2 lg:block"
    >
      <OptionWheel
        activeColor="var(--foreground)"
        blur={1}
        curve={1}
        defaultSelected={current === -1 ? HOME_INDEX : current}
        fade={0.22}
        fontSize={1.05}
        inset={36}
        items={LABELS}
        minOpacity={0.08}
        onCommit={(index) => {
          const href = NAV_ITEMS[index]?.href;
          if (href && index !== activeIndex(window.location.pathname)) {
            router.push(href as never);
          }
        }}
        selected={current === -1 ? undefined : current}
        side="left"
        spacing={2.2}
        textColor="var(--muted-foreground)"
        tilt={9}
      />
    </nav>
  );
}
