import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Myheader() {
  return (
    <header className="p-6 flex justify-between items-center">
      <Link href="/">
        <h1 className="text-3xl font-bold text-white tars-mono">CBSE AI</h1>
      </Link>
      <Link href="/login">
        <Button variant="outline" className="text-white border-white ">
          Sign In
        </Button>
      </Link>
    </header>
  );
}
