"use client";

import PlausibleProvider from "next-plausible";

export function PlausibleWrapper({ children }: { children: React.ReactNode }) {
  return (
    <PlausibleProvider
      customDomain="https://data.amajor.ai"
      domain="jiaweing.com"
    >
      {children}
    </PlausibleProvider>
  );
}
