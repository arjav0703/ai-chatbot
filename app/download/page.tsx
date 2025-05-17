"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Motiondiv from "@/components/motion/div";
import MyFooter from "@/components/MyFooter";
import BackToHome from "@/components/BackToHome";

const DownloadPage = () => {
  return (
    <div className="flex flex-col bg-gradient-to-br from-zinc-900 via-zinc-900 to-black min-h-screen dark text-zinc-100">
      <BackToHome />
      <main className="flex-1 flex flex-col items-center justify-center px-6 lg:px-8">
        <div className="text-center max-w-3xl">
          <h1 className="text-3xl font-bold mb-6 mt-14 tars-mono leading-tight tracking-tight sm:text-5xl sm:leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
              DOWNLOAD THE APP
            </span>
          </h1>
          <p className="text-xl text-zinc-300 mb-12 max-w-2xl mx-auto">
            Access your CBSE AI study companion on all your devices
          </p>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-8 max-w-5xl mb-16">
          <Motiondiv>
            <InstallButton os="android" />
          </Motiondiv>
          <Motiondiv>
            <InstallButton os="ios" />
          </Motiondiv>
          <Motiondiv>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex items-center justify-center hover:border-white/30 transition-all shadow-lg h-[120px]">
              <Button
                className="bg-transparent w-fit h-fit"
                onClick={() => {
                  window.open(
                    "https://github.com/arjav0703/cbse-ai-app/releases/download/v1.0.0/cbse-ai-linux-x64-1.0.0.zip",
                    "_blank",
                  );
                }}
              >
                <Image
                  src="/linux.svg"
                  alt="Linux Logo"
                  width={60}
                  height={60}
                />
              </Button>
            </div>
          </Motiondiv>
          <Motiondiv>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex items-center justify-center hover:border-white/30 transition-all shadow-lg h-[120px]">
              <Button
                className="bg-transparent w-fit h-fit"
                onClick={() => {
                  window.open(
                    "https://github.com/arjav0703/cbse-ai-app/releases/download/v1.0.0/cbse-ai_1.0.0_amd64.deb",
                    "_blank",
                  );
                }}
              >
                <Image
                  src="/debian.svg"
                  alt="Debian Logo"
                  width={60}
                  height={60}
                />
              </Button>
            </div>
          </Motiondiv>
          <Motiondiv>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex items-center justify-center hover:border-white/30 transition-all shadow-lg h-[120px]">
              <Button
                className="bg-transparent w-fit h-fit"
                onClick={() => {
                  window.open(
                    "https://github.com/arjav0703/cbse-ai-app/releases/download/v1.0.0/cbse-ai-1.0.0.Setup.exe",
                    "_blank",
                  );
                }}
              >
                <Image
                  src="/windows.svg"
                  alt="Windows Logo"
                  width={60}
                  height={60}
                />
              </Button>
            </div>
          </Motiondiv>
          <Motiondiv>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex items-center justify-center hover:border-white/30 transition-all shadow-lg h-[120px]">
              <Button
                className="bg-transparent w-fit h-fit"
                onClick={() => {
                  window.open(
                    "https://github.com/arjav0703/cbse-ai-app/releases/download/v1.0.0/cbse-ai-1.0.0-arm64.dmg",
                    "_blank",
                  );
                }}
              >
                <Image
                  src="/macos.svg"
                  alt="MacOS Logo"
                  width={60}
                  height={60}
                />
              </Button>
            </div>
          </Motiondiv>
        </div>
      </main>
      <MyFooter />
    </div>
  );
};

export default DownloadPage;

function InstallButton({ os }: { os: "android" | "ios" }) {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [isPWASupported, setIsPWASupported] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsPWASupported(true);
    };

    window.addEventListener("beforeinstallprompt", handler as EventListener);

    // Check if already installed or on iOS (different install method)
    if (window.matchMedia("(display-mode: standalone)").matches) {
      // Already installed
      setIsPWASupported(false);
    } else if (
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
      !(window as any).MSStream
    ) {
      // iOS devices - PWA support works differently
      setIsPWASupported(true);
    }

    return () =>
      window.removeEventListener(
        "beforeinstallprompt",
        handler as EventListener,
      );
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
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
    } else if (os === "ios") {
      // Show iOS installation instructions
      alert(
        "To install this app on your iPhone: tap the share button, then 'Add to Home Screen'",
      );
    } else {
      // Generic message for browsers that don't support installation
      alert("Installation is not supported on this browser or device.");
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex items-center justify-center hover:border-white/30 transition-all shadow-lg h-[120px]">
      <Button
        className="bg-transparent w-fit h-fit"
        onClick={handleInstallClick}
      >
        <Image src={`/${os}.svg`} alt={`${os} Logo`} width={60} height={60} />
      </Button>
    </div>
  );
}
