import SignIn from "@/components/auth/SignIn";
import Link from "next/link";
import Motiondiv from "@/components/motion/div";
import MyFooter from "@/components/MyFooter";
import BackToHome from "@/components/BackToHome";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-900 to-black dark">
      <BackToHome />
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
      <MyFooter />
    </div>
  );
}
