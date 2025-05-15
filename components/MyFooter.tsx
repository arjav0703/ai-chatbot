import Link from "next/link";
export default function MyFooter() {
  return (
    <footer className="py-10 px-6 border-t border-white/10">
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
  );
}
