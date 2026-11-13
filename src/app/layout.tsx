import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { MusicProvider, MuteButton } from "@/components/music/MusicProvider";
import { site } from "@/content/site";
import "./globals.css";

const nunito = localFont({
  variable: "--font-nunito",
  src: "./fonts/nunito-latin-wght-normal.woff2",
  weight: "200 1000",
  display: "swap",
});

const cormorant = localFont({
  variable: "--font-cormorant",
  src: [
    { path: "./fonts/cormorant-garamond-latin-wght-normal.woff2", weight: "300 700", style: "normal" },
    { path: "./fonts/cormorant-garamond-latin-wght-italic.woff2", weight: "300 700", style: "italic" },
  ],
  display: "swap",
});

const greatVibes = localFont({
  variable: "--font-great-vibes",
  src: "./fonts/great-vibes-latin-400-normal.woff2",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Happy Birthday Ritu",
  description: "A little universe of memories, made just for Ritu.",
};

export const viewport: Viewport = {
  themeColor: "#070318",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} ${cormorant.variable} ${greatVibes.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <MusicProvider src={site.music} roomTracks={site.roomMusic}>
          {children}
          <MuteButton />
        </MusicProvider>
      </body>
    </html>
  );
}
