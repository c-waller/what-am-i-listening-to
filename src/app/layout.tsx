import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "What Am I Listening To?",
  description: "Spotify music analyzation web app",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
