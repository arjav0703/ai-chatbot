import { auth } from "@/auth";
import ClassSelector from "@/components/ClassSelector";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import DeveloperNote from "@/components/DeveloperNote";

export default async function Home() {
  const session = await auth();

  if (!session) {
    return (
      <div className="flex flex-col bg-zinc-900 min-h-screen dark">
        <header className="p-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white tars-mono">CBSE AI</h1>
          <Link href="/login">
            <Button variant="outline" className="text-white border-white">
              Sign In
            </Button>
          </Link>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center px-4">
          <div className="text-center max-w-3xl">
            <h2 className="text-5xl font-bold text-white mb-6 mt-10">
              Your AI-Powered Study Companion
            </h2>
            <p className="text-xl text-zinc-300 mb-8">
              Get instant answers to your questions, and improve your
              understanding of key concepts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg"
                >
                  Get Started
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white px-8 py-6 text-lg"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
            <div className="bg-zinc-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-3">
                Instant Answers
              </h3>
              <p className="text-zinc-400">
                Get immediate help with your questions across all CBSE subjects.
              </p>
            </div>
            <div className="bg-zinc-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-3">
                Personalized Learning
              </h3>
              <p className="text-zinc-400">
                Adapts to your learning style and pace for better understanding.
              </p>
            </div>
            <div className="bg-zinc-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-3">
                24/7 Availability
              </h3>
              <p className="text-zinc-400">
                Study anytime, anywhere with our always-available AI assistant.
              </p>
            </div>
          </div>
          <DeveloperNote />
        </main>

        <footer className="p-6 text-center text-zinc-500 text-sm">
          <p>© {new Date().getFullYear()} CBSE AI. All rights reserved.</p>
        </footer>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-zinc-900 min-h-screen dark">
      <header className="p-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white tars-mono">CBSE AI</h1>
        <div className="flex items-center gap-4">
          <span className="text-zinc-300">Welcome, {session.user?.name}</span>
          {/* <form action="/api/auth/signout" method="post">
            <Button
              type="submit"
              variant="outline"
              className="text-white border-white"
            >
              Sign Out
            </Button>
          </form> */}
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-2xl mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Select Your Class
          </h2>
          <p className="text-xl text-zinc-300">
            Choose your class to start learning with CBSE AI
          </p>
        </div>

        <div className="text-white">
          <ClassSelector />
        </div>

        <DeveloperNote />
      </main>

      <footer className="p-6 text-center text-zinc-500 text-sm">
        <p>© {new Date().getFullYear()} CBSE AI. All rights reserved.</p>
      </footer>
    </div>
  );
}
