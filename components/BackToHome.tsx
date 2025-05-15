import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function BackToHome() {
  return (
    <div className="sm:px-8 px-6 py-6 backdrop-blur-sm bg-black/5 border-b border-white/10">
      <Link
        href="/"
        className="flex items-center w-fit hover:text-blue-400 transition-colors text-white"
      >
        <ChevronLeft size={24} />
        <span className="ml-2 font-medium">Back to Home</span>
      </Link>
    </div>
  );
}
