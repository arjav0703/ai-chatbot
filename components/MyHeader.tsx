import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Myheader() {
  return (
    <header className="sm:px-8 px-6 py-6 flex justify-between items-center backdrop-blur-sm bg-black/5 sticky top-0 z-50 border-b border-white/10">
      <Link href="/">
        <h1 className="sm:text-2xl text-xl font-bold text-white tracking-tight">
          CBSE AI
        </h1>
      </Link>
      <Link href="/login">
        <Button
          variant="outline"
          className="text-white border-white/70 hover:bg-white/10 hover:text-white transition-all"
        >
          Sign In
        </Button>
      </Link>
    </header>
  );
}
