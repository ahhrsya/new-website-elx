import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const monigue = localFont({
  src: "../../public/fonts/Monigue.woff2",
  variable: "--font-monigue-headline",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Elux AI Native — Zentry-Style Interactions",
  description: "Interactive web experience with preloader, card zoom, and smooth scrolling powered by GSAP and Lenis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${monigue.variable} antialiased`}
    >
      <body>
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
