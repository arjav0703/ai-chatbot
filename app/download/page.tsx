"use client";
import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";

const DownloadPage = () => {
  return (
    <div className="flex flex-col bg-zinc-900 min-h-screen dark color-bg text-zinc-100">
      <Link href="/">
        <ChevronLeft size={40} />
      </Link>
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-6 mt-14 tars-mono leading-12 sm:text-5xl sm:leading-18">
            DESKTOP APPLICATION
          </h2>
        </div>

        <div className="mt-15 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl">
          <InstallButton />
          <div className="bg-zinc-300 border-1 border-zinc-100 rounded-lg backdrop-blur-sm">
            <Button
              className="bg-transparent w-fit h-fit"
              onClick={() => {
                window.open(
                  "https://github.com/arjav0703/cbse-ai-app/releases/download/v1.0.0/cbse-ai-linux-x64-1.0.0.zip",
                  "_blank",
                );
              }}
            >
              <Image src="/linux.svg" alt="Logo" width={50} height={50} />
            </Button>
          </div>
          <div className="bg-zinc-300 border-1 border-zinc-100 rounded-lg backdrop-blur-sm">
            <Button
              className="bg-transparent w-fit h-fit"
              onClick={() => {
                window.open(
                  "https://github.com/arjav0703/cbse-ai-app/releases/download/v1.0.0/cbse-ai_1.0.0_amd64.deb",
                  "_blank",
                );
              }}
            >
              <Image src="/debian.svg" alt="Logo" width={50} height={50} />
            </Button>
          </div>
          <div className="bg-zinc-300 border-1 border-zinc-100 rounded-lg backdrop-blur-sm">
            <Button
              className="bg-transparent w-fit h-fit"
              onClick={() => {
                window.open(
                  "https://github.com/arjav0703/cbse-ai-app/releases/download/v1.0.0/cbse-ai-1.0.0.Setup.exe",
                  "_blank",
                );
              }}
            >
              <Image src="/windows.svg" alt="Logo" width={50} height={50} />
            </Button>
          </div>
          <div className="bg-zinc-300 border-1 border-zinc-100 rounded-lg backdrop-blur-sm">
            <Button
              className="bg-transparent w-fit h-fit"
              onClick={() => {
                window.open(
                  "https://github.com/arjav0703/cbse-ai-app/releases/download/v1.0.0/cbse-ai-1.0.0-arm64.dmg",
                  "_blank",
                );
              }}
            >
              <Image src="/apple.svg" alt="Logo" width={50} height={50} />
            </Button>
          </div>
        </div>
      </main>

      <footer className="p-6 text-center text-zinc-200 text-sm">
        <p>© {new Date().getFullYear()} CBSE AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default DownloadPage;

function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowButton(true);
    };

    window.addEventListener("beforeinstallprompt", handler as EventListener);

    return () =>
      window.removeEventListener(
        "beforeinstallprompt",
        handler as EventListener,
      );
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    (deferredPrompt as any).prompt();

    // Wait for the user to respond to the prompt
    const choiceResult = await (deferredPrompt as any).userChoice;

    if (choiceResult.outcome === "accepted") {
      console.log("User accepted the install prompt");
    } else {
      console.log("User dismissed the install prompt");
    }

    // Clear the saved prompt
    setDeferredPrompt(null);
    setShowButton(false);
  };

  if (!showButton) return null;

  return (
    // <button
    //   onClick={handleInstallClick}
    //   className="bg-blue-600 text-white px-4 py-2 rounded shadow-md hover:bg-blue-700"
    // >
    //   Install App
    // </button>
    <div className="bg-zinc-300 border-1 border-zinc-100 rounded-lg backdrop-blur-sm">
      <Button
        className="bg-transparent w-fit h-fit"
        onClick={handleInstallClick}
      >
        <Image src="/debian.svg" alt="Logo" width={50} height={50} />
      </Button>
    </div>
  );
}
