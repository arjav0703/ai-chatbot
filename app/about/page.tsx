import Link from "next/link";
import { Button } from "@/components/ui/button";
import Myheader from "@/components/MyHeader";

export default function AboutPage() {
  return (
    <div className="flex flex-col bg-zinc-900 min-h-screen dark color-bg">
      <Myheader />

      <main className="flex-1 container mx-auto px-4 py-4 max-w-4xl border-2 rounded-lg border-white backdrop-blur-sm backdrop-brightness-75">
        <h2 className="text-4xl font-bold text-white mb-8">About CBSE AI</h2>

        <div className="prose prose-invert max-w-none">
          <p className="text-xl text-zinc-100 mb-6">
            CBSE AI is an innovative educational platform designed to help CBSE
            students excel in their studies through AI-powered assistance.
          </p>

          <h3 className="text-2xl font-semibold text-white mt-8 mb-4">
            Our Mission
          </h3>
          <p className="text-zinc-100 mb-6">
            Our mission is to make quality education accessible to all CBSE
            students by providing instant, accurate, and personalized assistance
            for their academic queries.
          </p>

          <h3 className="text-2xl font-semibold text-white mt-8 mb-4">
            How It Works
          </h3>
          <p className="text-zinc-100 mb-6">
            CBSE AI uses advanced artificial intelligence to understand your
            questions and provide detailed, curriculum-aligned answers. Simply
            select your class, ask your question, and receive instant help.
          </p>

          <h3 className="text-2xl font-semibold text-white mt-8 mb-4">
            Features
          </h3>
          <ul className="list-disc pl-6 text-zinc-100 mb-6">
            <li className="mb-2">
              Instant answers to CBSE curriculum questions
            </li>
            <li className="mb-2">Support for all (almost) CBSE subjects.</li>
            <li className="mb-2">
              Step-by-step explanations for complex problems
            </li>
            <li className="mb-2">Personalized learning experience</li>
            <li className="mb-2">24/7 availability for study assistance</li>
          </ul>

          <h3 className="text-2xl font-semibold text-white mt-8 mb-4">
            Get Started
          </h3>
          <p className="text-zinc-100 mb-6">
            Ready to enhance your learning experience? Sign up now and start
            exploring the power of AI-assisted education.
          </p>
          <p>
            <strong>NOTE:</strong>CBSE AI is not at all related to CBSE (Central
            Board of Secondary Education).
          </p>

          <div className="mt-8">
            <Link href="/login">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg"
              >
                Sign Up Now
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <footer className="p-6 text-center text-zinc-500 text-sm">
        <p>© {new Date().getFullYear()} CBSE AI. All rights reserved.</p>
      </footer>
    </div>
  );
}
