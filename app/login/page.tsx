import SignIn from "@/components/auth/SignIn";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex flex-col bg-zinc-900 min-h-screen justify-center items-center">
      <div className="text-center dark text-white max-w-md p-8 rounded-lg bg-zinc-800 shadow-xl">
        <h1 className="text-5xl font-bold mb-2 tars-mono">CBSE AI</h1>
        <p className="text-zinc-400 mb-8">Your AI-powered study companion</p>
        
        <div className="mb-6">
          <SignIn />
        </div>
        
        <div className="text-sm text-zinc-500 mt-4">
          <p>By signing in, you agree to our <Link href="/terms" className="text-blue-400 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-blue-400 hover:underline">Privacy Policy</Link></p>
        </div>
      </div>
    </div>
  );
} 