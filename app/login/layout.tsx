import { Metadata } from "next";

export const metadata: Metadata = {
  manifest: "/manifest.json",
  keywords: [
    "CBSE AI",
    "CBSE AI login",
    "study companion class 10",
    "study companion class 9",
    "CBSE AI assistant",
  ],
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
  title: "Login",
  description:
    "Login to CBSE AI, an AI assistant to help 9th and 10th graders with their academic needs",
  openGraph: {
    title: "Login to CBSE AI",
    description:
      "Login to CBSE AI, an AI assistant to help 9th and 10th graders with their academic needs",
    url: "https://cbseai.vercel.app/download",
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

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
