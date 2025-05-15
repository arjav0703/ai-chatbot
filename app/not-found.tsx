import Link from "next/link";
import Motiondiv from "@/components/motion/div";

export default function NotFound() {
  return (
    <div className="flex flex-col bg-gradient-to-br from-zinc-900 via-zinc-900 to-black min-h-screen dark text-zinc-100">
      <header className="sm:px-8 px-6 py-6 backdrop-blur-sm bg-black/5 border-b border-white/10">
        <Link href="/">
          <h1 className="sm:text-2xl text-xl font-bold text-white tracking-tight">
            CBSE AI
          </h1>
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 lg:px-8">
        <Motiondiv>
          <div className="max-w-3xl bg-white/5 border border-white/10 p-8 rounded-xl backdrop-blur-sm shadow-lg mx-auto my-12">
            <h1 className="text-3xl font-bold mb-6 tars-mono tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
                404 - PAGE NOT FOUND
              </span>
            </h1>

            <p className="text-lg text-zinc-300 mb-8">
              Ahoy Sailor! Looks like you{"'"}ve ventured into uncharted waters.
              This page has vanished into the digital deep.
            </p>

            <p className="text-zinc-400 mb-8">
              Fear not! Navigate back to safer shores using these coordinates:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <Link href="/" className="w-full">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-3 hover:border-white/30 transition-all shadow-md">
                  <div className="w-10 h-10 bg-blue-500/20 flex items-center justify-center rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-blue-400"
                    >
                      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                  </div>
                  <span className="text-zinc-200">Home Port</span>
                </div>
              </Link>

              <Link href="/about" className="w-full">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-3 hover:border-white/30 transition-all shadow-md">
                  <div className="w-10 h-10 bg-indigo-500/20 flex items-center justify-center rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-indigo-400"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <circle cx="12" cy="10" r="3"></circle>
                      <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"></path>
                    </svg>
                  </div>
                  <span className="text-zinc-200">Explore</span>
                </div>
              </Link>

              <Link href="/whoami" className="w-full">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-3 hover:border-white/30 transition-all shadow-md">
                  <div className="w-10 h-10 bg-purple-500/20 flex items-center justify-center rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-purple-400"
                    >
                      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                      <line x1="4" x2="4" y1="22" y2="15"></line>
                    </svg>
                  </div>
                  <span className="text-zinc-200">Your Boat</span>
                </div>
              </Link>
            </div>
          </div>
        </Motiondiv>
      </main>

      <footer className="py-10 px-6 border-t border-white/10 mt-auto">
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
