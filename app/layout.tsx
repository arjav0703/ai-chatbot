import type { Metadata } from "next";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  manifest: "/manifest.json",
  keywords: ["CBSE", "AI", "Class 9", "Class 10"],
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/icon.png",
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  authors: [{ name: "Arjav", url: "https://arjav.dino.icu" }],
  title: "CBSE AI",
  description:
    "An AI assistant to help 9th and 10th graders with their academic needs",
  openGraph: {
    title: "CBSE AI",
    description:
      "An AI assistant to help 9th and 10th graders with their academic needs",
    url: "https://cbseai.vercel.app",
    siteName: "CBSE AI",
    images: [
      {
        url: "https://cbseai.vercel.app/og.png",
        width: 1239,
        height: 475,
        alt: "CBSE AI",
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
      <head>
        <GoogleAnalytics gaId="G-G4H0DPQRG9" />
      </head>

      <body>{children}</body>
    </html>
  );
}
