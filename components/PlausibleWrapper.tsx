"use client";

import PlausibleProvider from "next-plausible";

export function PlausibleWrapper({ children }: { children: React.ReactNode }) {
  return (
    <PlausibleProvider
      customDomain="https://stats.jiaweing.com"
      domain="jiaweing.com"
    >
      {children}
    </PlausibleProvider>
  );
}
