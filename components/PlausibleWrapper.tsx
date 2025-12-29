"use client";

import PlausibleProvider from "next-plausible";

export function PlausibleWrapper({ children }: { children: React.ReactNode }) {
  return (
    <PlausibleProvider
      customDomain="https://quasarite.com"
      domain="jiaweing.com"
    >
      {children}
    </PlausibleProvider>
  );
}
