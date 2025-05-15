import Link from "next/link";
import Motiondiv from "@/components/motion/div";
import { Button } from "@/components/ui/button";
import MyFooter from "@/components/MyFooter";
export default function PublicHero() {
  return (
    <div className="flex flex-col bg-gradient-to-br from-zinc-900 via-zinc-900 to-black min-h-screen dark">
      <main className="flex-1 flex flex-col items-center justify-center px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-6 mt-16 leading-tight tracking-tight sm:text-6xl">
            YOUR AI POWERED{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
              STUDY COMPANION
            </span>
          </h2>
          <p className="text-xl text-zinc-300 mb-10 max-w-2xl mx-auto">
            Get instant answers to your questions and improve your understanding
            of key concepts for CBSE Class 9 & 10 students.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            <Link href="/login">
              <Motiondiv>
                <Button
                  size="lg"
                  className="px-8 py-6 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 shadow-lg shadow-blue-900/30"
                >
                  Get Started
                </Button>
              </Motiondiv>
            </Link>
            <Link href="/about">
              <Motiondiv>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/40 text-white px-8 py-6 text-lg backdrop-blur-md bg-white/5 hover:bg-white/10"
                >
                  Learn More
                </Button>
              </Motiondiv>
            </Link>
            <Link href="/download">
              <Motiondiv>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/40 text-white px-8 py-6 text-lg backdrop-blur-md bg-white/5 hover:bg-white/10"
                >
                  Download
                </Button>
              </Motiondiv>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full px-4">
          <div className="bg-white/5 border border-white/10 p-8 rounded-xl backdrop-blur-sm shadow-lg hover:shadow-xl transition-all hover:border-white/20">
            <div className="w-12 h-12 bg-blue-500/20 flex items-center justify-center rounded-lg mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="text-blue-400"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m16 10-4 4-4-4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Instant Answers
            </h3>
            <p className="text-zinc-300">
              Get immediate help with your questions across all CBSE subjects
              with detailed explanations.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 p-8 rounded-xl backdrop-blur-sm shadow-lg hover:shadow-xl transition-all hover:border-white/20">
            <div className="w-12 h-12 bg-indigo-500/20 flex items-center justify-center rounded-lg mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="text-indigo-400"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              24/7 Availability
            </h3>
            <p className="text-zinc-300">
              Study anytime, anywhere with our always-available AI assistant,
              ready to help whenever you need it.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 p-8 rounded-xl backdrop-blur-sm shadow-lg hover:shadow-xl transition-all hover:border-white/20">
            <div className="w-12 h-12 bg-purple-500/20 flex items-center justify-center rounded-lg mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                strokeLinejoin="round"
                className="text-purple-400"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="12" y1="18" x2="12" y2="12" />
                <line x1="9" y1="15" x2="15" y2="15" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              CBSE Aligned
            </h3>
            <p className="text-zinc-300">
              Designed specifically for CBSE curriculum with accurate and
              relevant information for class 9 and 10.
            </p>
          </div>
        </div>
      </main>
      <MyFooter />
    </div>
  );
}
