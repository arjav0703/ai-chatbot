import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
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

// <Head>
//     <title>Home</title>
//     <Meta
//     as={Head} // component to wrap tags in, defaults to React.Fragment
//     name="Hack Club" // site name
//     title="Home" // page title
//     description="Hackclub Vidisha is a high school coding club in vidisha" // page description
//     image="https://hackathons.hackclub.com/card.png" // large summary image URL
//     color="#ec3750" // theme color
//     manifest="/site.webmanifest" />
//     <meta name="google-site-verification" content="hThcfgfWeBT7H0Qp2yp934ergwCeAWIq8y9y9gIXqE8" />
// </Head>

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
