"use client";

import { useEffect, useState } from "react";

export function useActiveHeading(headingIds: string[]) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const visibleHeadings = new Set<string>();

    const callback = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          visibleHeadings.add(entry.target.id);
        } else {
          visibleHeadings.delete(entry.target.id);
        }
      }

      const firstVisible = headingIds.find((id) => visibleHeadings.has(id));
      if (firstVisible) {
        setActiveId(firstVisible);
      } else if (visibleHeadings.size > 0) {
        setActiveId(Array.from(visibleHeadings)[0]);
      }
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: "-100px 0px -40% 0px",
    });

    for (const id of headingIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headingIds]);

  return activeId;
}
