import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LayoutWidthWrapper } from "@/components/LayoutWidthWrapper";
import { MobileNav } from "@/components/MobileNav";
import { PlausibleWrapper } from "@/components/PlausibleWrapper";
import { SiteHeader } from "@/components/SiteHeader";
import { SeasonalEffects } from "@/components/seasonal-effects";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ProgressiveBlur } from "@/components/ui/skiper-ui/progressive-blur";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { OpenSourceToast } from "@/components/open-source-toast";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/lib/metadata";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s \u00A0·\u00A0 ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Jia Wei Ng",
    "Software Engineer",
    "Designer",
    "Singapore",
    "Portfolio",
    "AI",
    "Blockchain",
    "Game Development",
    "Web Developer",
    "Full Stack Developer",
  ],
  authors: [{ name: "Jia Wei Ng", url: "https://jiaweing.com" }],
  creator: "Jia Wei Ng",
  publisher: "Jia Wei Ng",
  manifest: "/manifest.webmanifest",
  metadataBase: new URL("https://jiaweing.com"),
  alternates: {
    canonical: "https://jiaweing.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jiaweing.com",
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: siteConfig.links.twitter.replace("https://twitter.com/", "@"),
    images: [siteConfig.ogImage],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: siteConfig.name,
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Performance optimizations */}
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link
          crossOrigin="anonymous"
          href="https://fonts.gstatic.com"
          rel="preconnect"
        />
        <link href="https://github.com" rel="dns-prefetch" />
        <link href="https://images.unsplash.com" rel="dns-prefetch" />
        <link href="https://quasarite.com" rel="dns-prefetch" />

        {/* Preload critical fonts */}
        <link
          as="style"
          href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&display=swap"
          rel="preload"
        />
        <link
          as="style"
          href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500&display=swap"
          rel="preload"
        />

        {/* PWA and app metadata */}
        <meta content="Jia Wei Ng" name="application-name" />
        <meta content="Jia Wei Ng" name="apple-mobile-web-app-title" />
        <meta content="yes" name="apple-mobile-web-app-capable" />
        <meta content="default" name="apple-mobile-web-app-status-bar-style" />
        <meta content="yes" name="mobile-web-app-capable" />
        <link href="/ios/1024.png" rel="apple-touch-icon" />
        <link href="/humans.txt" rel="author" />
        <link href="/manifest.webmanifest" rel="manifest" />
        <link href="/.well-known/llms.txt" rel="llms" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} overflow-x-hidden antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          <PlausibleWrapper>
            <div className="relative flex min-h-screen flex-col">
              <div>
                <section className="bg-white dark:bg-transparent">
                  <LayoutWidthWrapper>
                    <div className="relative z-[100] mx-auto max-w-2xl space-y-4 leading-relaxed">
                      <SiteHeader />
                      <MobileNav />
                    </div>
                    <ProgressiveBlur
                      height="100px"
                      position="top"
                      useThemeBackground
                    />
                    <div className="flex-1 pt-20">{children}</div>
                    <ProgressiveBlur
                      height="100px"
                      position="bottom"
                      useThemeBackground
                    />
                  </LayoutWidthWrapper>
                </section>
              </div>
            </div>
          </PlausibleWrapper>

          <ThemeToggle />
          <TailwindIndicator />
          <SeasonalEffects />
          <Toaster />
          <OpenSourceToast />
          <GoogleAnalytics gaId="G-MJ0F694R8J" />
        </ThemeProvider>
      </body>
    </html>
  );
}
