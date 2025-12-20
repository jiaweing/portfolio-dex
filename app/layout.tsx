import { LayoutWidthWrapper } from "@/components/LayoutWidthWrapper";
import { MobileNav } from "@/components/MobileNav";
import { PlausibleWrapper } from "@/components/PlausibleWrapper";
import { SiteHeader } from "@/components/SiteHeader";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SeasonalEffects } from "@/components/seasonal-effects";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ProgressiveBlur } from "@/components/ui/skiper-ui/progressive-blur";
import { WrappedBanner } from "@/components/wrapped/wrapped-banner";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Jia Wei Ng",
	description:
		"Software engineer and designer from Singapore specializing in AI, blockchain, and game development.",
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
		title: "Jia Wei Ng",
		description:
			"Software engineer and designer from Singapore specializing in AI, blockchain, and game development.",
		siteName: "Jia Wei Ng",
		images: [
			{
				url: "https://jiaweing.com/api/og?title=Jia%20Wei%20Ng&subtitle=Software%20Engineer%20%26%20Designer",
				width: 1200,
				height: 630,
				alt: "Jia Wei Ng",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Jia Wei Ng",
		description:
			"Software engineer and designer from Singapore specializing in AI, blockchain, and game development.",
		creator: "@j14wei",
		images: [
			"https://jiaweing.com/api/og?title=Jia%20Wei%20Ng&subtitle=Software%20Engineer%20%26%20Designer",
		],
	},
	appleWebApp: {
		capable: true,
		statusBarStyle: "default",
		title: "Jia Wei Ng",
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
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>
				<link rel="dns-prefetch" href="https://github.com" />
				<link rel="dns-prefetch" href="https://images.unsplash.com" />
				<link rel="dns-prefetch" href="https://quasarite.com" />

				{/* Preload critical fonts */}
				<link
					rel="preload"
					href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&display=swap"
					as="style"
				/>
				<link
					rel="preload"
					href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500&display=swap"
					as="style"
				/>

				{/* PWA and app metadata */}
				<meta name="application-name" content="Jia Wei Ng" />
				<meta name="apple-mobile-web-app-title" content="Jia Wei Ng" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-status-bar-style" content="default" />
				<meta name="mobile-web-app-capable" content="yes" />
				<link rel="apple-touch-icon" href="/ios/1024.png" />
				<link rel="author" href="/humans.txt" />
				<link rel="manifest" href="/manifest.webmanifest" />
				<link rel="llms" href="/.well-known/llms.txt" />
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<PlausibleWrapper>
						<div className="relative flex min-h-screen flex-col">
							<div>
								<section className="bg-white dark:bg-transparent">
									<LayoutWidthWrapper>
										<div className="relative mx-auto max-w-2xl space-y-4 leading-relaxed z-[100]">
											<SiteHeader />
											<MobileNav />
										</div>
										<ProgressiveBlur
											position="top"
											height="100px"
											useThemeBackground
										/>
										<div className="flex-1 pt-20">{children}</div>
										<ProgressiveBlur
											position="bottom"
											height="100px"
											useThemeBackground
										/>
									</LayoutWidthWrapper>
								</section>
							</div>
						</div>
					</PlausibleWrapper>
					<WrappedBanner />
					<ThemeToggle />
					<TailwindIndicator />
					<SeasonalEffects />
					<GoogleAnalytics gaId="G-MJ0F694R8J" />
				</ThemeProvider>
			</body>
		</html>
	);
}
