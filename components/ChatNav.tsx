import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import NewChat from "./NewChat";

export default function ChatNav() {
  return (
    <nav className="flex justify-between items-center w-full mb-4">
      <Link
        href="/"
        className="text-l lg:text-2xl font-bold tars-mono items-center gap-2 hidden lg:flex"
      >
        <ArrowLeft className="w-6 h-6" />
        <span className="hidden lg:flex">CBSE-AI</span>
      </Link>
      <NewChat />
    </nav>
  );
}
