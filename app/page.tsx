import { auth } from "@/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Myheader from "@/components/MyHeader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Motiondiv from "@/components/motion/div";
import { signOut } from "@/auth";

export default async function Home() {
  const session = await auth();

  if (!session) {
    return (
      <div className="flex flex-col bg-gradient-to-br from-zinc-900 via-zinc-900 to-black min-h-screen dark">
        <Myheader />

        <main className="flex-1 flex flex-col items-center justify-center px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6 mt-16 leading-tight tracking-tight sm:text-6xl">
              YOUR AI POWERED{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
                STUDY COMPANION
              </span>
            </h2>
            <p className="text-xl text-zinc-300 mb-10 max-w-2xl mx-auto">
              Get instant answers to your questions and improve your
              understanding of key concepts for CBSE Class 9 & 10 students.
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

        <footer className="py-10 px-6 border-t border-white/10 mt-20">
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

  return (
    <div className="flex flex-col bg-gradient-to-br from-zinc-900 via-zinc-900 to-black min-h-screen dark">
      <header className="sm:px-8 px-6 py-6 flex justify-between items-center backdrop-blur-sm bg-black/5 sticky top-0 z-50 border-b border-white/10">
        <Link href="/">
          <h1 className="sm:text-2xl text-xl font-bold text-white tracking-tight">
            CBSE AI
          </h1>
        </Link>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 bg-white/5 py-2 px-4 rounded-full border border-white/10">
            <Avatar className="w-8 h-8">
              <AvatarImage src={`${session.user?.image}`} />
              <AvatarFallback className="bg-blue-600/30 text-blue-200">
                {`${session.user?.name?.[0] || ""}${session.user?.name?.[1] || ""}`}
              </AvatarFallback>
            </Avatar>
            <span className="text-zinc-200 hidden sm:inline">
              {session.user?.name}
            </span>
          </div>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button
              type="submit"
              variant="outline"
              className="border-white/30 text-white bg-transparent hover:bg-white/10"
            >
              Sign out
            </Button>
          </form>
        </div>
      </header>

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
