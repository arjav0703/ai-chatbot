import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CBSE AI",
  description:
    "An AI assistant to help 9th and 10th graders with their academic needs",
};

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
