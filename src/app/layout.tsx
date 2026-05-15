import type { Metadata } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://aurelian-coffee-atelier.vercel.app"),
  title: "Aurelian Coffee Atelier — Cinematic Coffee Experience",
  description: "A cinematic interactive coffee landing page concept with scroll storytelling, orbit navigation, and premium UI motion.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Aurelian Coffee Atelier — Cinematic Coffee Experience",
    description: "A premium cinematic landing page concept created by Mohammed Ajmi, Web Designer.",
    type: "website",
    images: [
      {
        url: "/assets/images/hero-espresso.jpg",
        width: 900,
        height: 1600,
        alt: "Aurelian Coffee Atelier cinematic espresso preview",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body id="top">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

