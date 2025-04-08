import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chemie AI",
  description: "An AI assistant to help 9th graders with science",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
