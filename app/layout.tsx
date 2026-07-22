import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Xai — Intelligence Workspace",
  description:
    "From raw data to structured intelligence to actionable insight to AI automations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="grain bg-base-950 antialiased">{children}</body>
    </html>
  );
}
