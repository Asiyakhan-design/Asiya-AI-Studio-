import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://asiya-ai-studio.vercel.app"),
  title: {
    default: "Asiya AI Studio | AI-Powered Digital Services",
    template: "%s | Asiya AI Studio",
  },
  description:
    "Asiya AI Studio helps creators, businesses and entrepreneurs transform ideas into professional content, visuals, videos and AI-powered digital solutions.",
  openGraph: {
    title: "Asiya AI Studio | AI-Powered Digital Services",
    description:
      "Turn your ideas into professional digital work with AI — content, visuals, video, presentations and automation.",
    siteName: "Asiya AI Studio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${plexMono.variable}`}>
      <body className="relative min-h-screen bg-ink font-body text-paper antialiased">
        <div className="pointer-events-none fixed inset-0 -z-10 bg-grain-glow" />
        <Analytics />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
