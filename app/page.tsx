import { auth } from "@/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Motiondiv from "@/components/motion/div";
import PublicHero from "@/components/PublicHero";
import MyHeader from "@/components/MyHeader";

export default async function Home() {
  const session = await auth();

  if (!session) {
    return <PublicHero />;
  }

  return (
    <div className="flex flex-col bg-gradient-to-br from-zinc-900 via-zinc-900 to-black min-h-screen dark">
      <MyHeader session={session} />
      <main className="flex-1 flex flex-col items-center justify-center px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-8 mt-14 leading-tight tracking-tight sm:text-5xl">
            Welcome to your{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
              AI study assistant
            </span>
          </h2>
          <p className="text-xl text-zinc-300 mb-12 max-w-2xl mx-auto">
            Get help with your Class 9th and 10th CBSE curriculum
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full mb-16">
          <Link href="/chat" className="w-full">
            <Motiondiv className="h-full">
              <div className="bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-blue-500/20 rounded-xl p-8 flex flex-col items-center justify-center text-center h-full hover:border-blue-500/40 transition-all shadow-lg">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-400"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">
                  Start Chatting
                </h3>
                <p className="text-zinc-300 mb-6">
                  Ask questions and get instant answers from your AI assistant
                </p>
                <Button
                  size="lg"
                  className="px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0"
                >
                  Get Started
                </Button>
              </div>
            </Motiondiv>
          </Link>
          <Link href="/download" className="w-full">
            <Motiondiv className="h-full">
              <div className="bg-white/5 border border-white/10 rounded-xl p-8 flex flex-col items-center justify-center text-center h-full hover:border-white/30 transition-all shadow-lg">
                <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-indigo-400"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">
                  Download App
                </h3>
                <p className="text-zinc-300 mb-6">
                  Access your study companion on your devices
                </p>
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 border-white/40 text-white bg-white/5 hover:bg-white/10"
                >
                  Download
                </Button>
              </div>
            </Motiondiv>
          </Link>
        </div>
      </main>

      <footer className="py-10 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-zinc-300 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} CBSE AI. All rights reserved.
          </p>
          <div className="flex gap-8 text-zinc-400">
            <Link href="/privacy" className="hover:text-white text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white text-sm">
              Terms of Use
            </Link>
            <Link href="/contact" className="hover:text-white text-sm">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
