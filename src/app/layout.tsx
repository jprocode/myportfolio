import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navigation } from "@/components/Navigation";
import { CustomCursor } from "@/components/CustomCursor";
import { AIChat } from "@/components/AIChat";
import { KonamiCode } from "@/components/KonamiCode";
import { ConsoleMessage } from "@/components/ConsoleMessage";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jay Pandya | Full-Stack Developer & AI Enthusiast",
  description: "Portfolio of Jay Pandya - Temple University CS student specializing in full-stack development, AI, and building elegant solutions with modern technologies.",
  keywords: ["Jay Pandya", "Full-Stack Developer", "AI", "Temple University", "React", "TypeScript", "Java", "Spring Boot", "Portfolio"],
  authors: [{ name: "Jay Pandya" }],
  creator: "Jay Pandya",
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.svg",
  },
  openGraph: {
    title: "Jay Pandya | Full-Stack Developer & AI Enthusiast",
    description: "Temple University CS student building full-stack apps with React, TypeScript, Java & Spring Boot.",
    type: "website",
    locale: "en_US",
    siteName: "Jay Pandya Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jay Pandya | Full-Stack Developer",
    description: "Temple University CS student building full-stack apps with React, TypeScript, Java & Spring Boot.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <CustomCursor />
          <Navigation />
          {children}
          <AIChat />
          <KonamiCode />
          <ConsoleMessage />
        </ThemeProvider>
      </body>
    </html>
  );
}

