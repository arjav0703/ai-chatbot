import SignIn from "@/components/auth/SignIn";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import Motiondiv from "@/components/motion/div";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-900 to-black dark">
      <div className="sm:px-8 px-6 py-6 backdrop-blur-sm bg-black/5 border-b border-white/10">
        <Link
          href="/"
          className="flex items-center w-fit hover:text-blue-400 transition-colors text-white"
        >
          <ChevronLeft size={24} />
          <span className="ml-2 font-medium">Back to Home</span>
        </Link>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center px-4">
        <Motiondiv>
          <div className="text-center dark text-white max-w-md p-8 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl hover:border-white/20 transition-all">
            <h1 className="text-4xl font-bold mb-2 tars-mono tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
                CBSE AI
              </span>
            </h1>
            <p className="text-zinc-300 mb-8">
              Your AI-powered study companion
            </p>

            <div className="mb-6">
              <SignIn />
            </div>

            <div className="text-sm text-zinc-400 mt-6">
              <p>
                By signing in, you agree to our{" "}
                <Link
                  href="/terms"
                  className="text-blue-400 hover:text-blue-300 hover:underline"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-blue-400 hover:text-blue-300 hover:underline"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </Motiondiv>
      </div>

      <footer className="py-6 px-6 border-t border-white/10 mt-auto">
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
