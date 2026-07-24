import type { Metadata } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import Scene from "@/components/canvas/Scene";
import Navbar from "@/components/layout/Navbar";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});
const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Xai - Intelligence Workspace",
  description:
    "From raw data to structured intelligence to actionable insight to AI automations.",
  icons: {
    icon: [
      {
        url: "/xai-black.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/xai-white.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${body.variable} ${mono.variable} bg-bg text-text font-body antialiased`}
      >
        <Scene />
        <Navbar />
        <main className="relative z-[1]">{children}</main>
      </body>
    </html>
  );
}
