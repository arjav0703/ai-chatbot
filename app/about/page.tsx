import Link from "next/link";
import { Button } from "@/components/ui/button";
import MyFooter from "@/components/MyFooter";
import BackToHome from "@/components/BackToHome";

export default function AboutPage() {
  return (
    <div className="flex flex-col bg-gradient-to-br from-zinc-900 via-zinc-900 to-black min-h-screen dark">
      <BackToHome />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <h2 className="text-4xl font-bold text-white mb-8 tracking-tight">
          About{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
            CBSE AI
          </span>
        </h2>

        <div className="prose prose-invert max-w-none bg-white/5 border border-white/10 p-8 rounded-xl backdrop-blur-sm shadow-lg">
          <p className="text-xl text-zinc-300 mb-6">
            CBSE AI is an innovative educational platform designed to help CBSE
            students excel in their studies through AI-powered assistance.
          </p>

          <h3 className="text-2xl font-semibold text-white mt-8 mb-4">
            Our Mission
          </h3>
          <p className="text-zinc-300 mb-6">
            Our mission is to make quality education accessible to all CBSE
            students by providing instant, accurate, and personalized assistance
            for their academic queries.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur-sm shadow-lg hover:shadow-xl transition-all hover:border-white/20">
              <div className="w-10 h-10 bg-blue-500/20 flex items-center justify-center rounded-lg mb-4">
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
                  <circle cx="12" cy="12" r="10" />
                  <path d="m16 10-4 4-4-4" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">
                Instant Answers
              </h4>
              <p className="text-zinc-300 text-sm">
                Get immediate help with detailed explanations for all subjects.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur-sm shadow-lg hover:shadow-xl transition-all hover:border-white/20">
              <div className="w-10 h-10 bg-indigo-500/20 flex items-center justify-center rounded-lg mb-4">
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
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">
                24/7 Availability
              </h4>
              <p className="text-zinc-300 text-sm">
                Study anytime with our always-ready AI assistant.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur-sm shadow-lg hover:shadow-xl transition-all hover:border-white/20">
              <div className="w-10 h-10 bg-purple-500/20 flex items-center justify-center rounded-lg mb-4">
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
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="12" y1="18" x2="12" y2="12" />
                  <line x1="9" y1="15" x2="15" y2="15" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">
                CBSE Aligned
              </h4>
              <p className="text-zinc-300 text-sm">
                Tailored specifically for CBSE Classes 9 & 10 curriculum.
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-white mt-8 mb-4">
            How It Works
          </h3>
          <p className="text-zinc-300 mb-6">
            CBSE AI uses advanced artificial intelligence to understand your
            questions and provide detailed, curriculum-aligned answers. Simply
            select your class, ask your question, and receive instant help.
          </p>

          <h3 className="text-2xl font-semibold text-white mt-8 mb-4">
            Features
          </h3>
          <ul className="list-disc pl-6 text-zinc-300 mb-6">
            <li className="mb-2">
              Instant answers to CBSE curriculum questions
            </li>
            <li className="mb-2">Support for all (almost) CBSE subjects</li>
            <li className="mb-2">
              Step-by-step explanations for complex problems
            </li>
            <li className="mb-2">24/7 availability for study assistance</li>
          </ul>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6 my-8">
            <p className="text-zinc-300 mb-0 flex items-start">
              <span className="text-blue-400 mr-2 font-bold text-lg">
                NOTE:
              </span>
              CBSE AI is not affiliated with or endorsed by the Central Board of
              Secondary Education (CBSE).
            </p>
          </div>

          <h3 className="text-2xl font-semibold text-white mt-8 mb-4">
            Get Started
          </h3>
          <p className="text-zinc-300 mb-6">
            Ready to enhance your learning experience? Sign up now and start
            exploring the power of AI-assisted education.
          </p>

          <div className="mt-8">
            <Link href="/login">
              <Button
                size="lg"
                className="px-8 py-6 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 shadow-lg shadow-blue-900/30"
              >
                Get Started Now
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <MyFooter />
    </div>
  );
}
