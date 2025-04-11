import SignIn from "@/components/auth/SignIn";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center color-bg">
      <div className="text-center dark text-white max-w-md p-8 rounded-lg backdrop-blur-md backdrop-brightness-80 border-white border-2 shadow-xl">
        <h1 className="text-5xl font-bold mb-2 tars-mono">CBSE AI</h1>
        <p className="text-zinc-100 mb-8">Your AI-powered study companion</p>

        <div className="mb-6">
          <SignIn />
        </div>

        <div className="text-sm text-zinc-300 mt-4">
          <p>
            By signing in, you agree to our{" "}
            <Link href="/terms" className="text-blue-200 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-blue-200 hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
