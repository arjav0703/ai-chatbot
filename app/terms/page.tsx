import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TermsPage() {
  return (
    <div className="flex flex-col bg-zinc-900 min-h-screen">
      <header className="p-6 flex justify-between items-center">
        <Link href="/">
          <h1 className="text-3xl font-bold text-white tars-mono">CBSE AI</h1>
        </Link>
        <Link href="/login">
          <Button
            variant="outline"
            className="text-white border-white hover:bg-white hover:text-zinc-900"
          >
            Sign In
          </Button>
        </Link>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <h2 className="text-4xl font-bold text-white mb-8">Terms of Service</h2>

        <div className="prose prose-invert max-w-none">
          <p className="text-zinc-300 mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <h3 className="text-2xl font-semibold text-white mt-8 mb-4">
            1. Acceptance of Terms
          </h3>
          <p className="text-zinc-300 mb-6">
            By accessing and using CBSE AI, you agree to be bound by these Terms
            of Service and all applicable laws and regulations. If you do not
            agree with any of these terms, you are prohibited from using or
            accessing this site.
          </p>

          <h3 className="text-2xl font-semibold text-white mt-8 mb-4">
            2. Use License
          </h3>
          <p className="text-zinc-300 mb-6">
            Permission is granted to temporarily access CBSE AI for personal,
            non-commercial educational purposes. This is the grant of a license,
            not a transfer of title, and under this license you may not:
          </p>
          <ul className="list-disc pl-6 text-zinc-300 mb-6">
            <li className="mb-2">Modify or copy the materials</li>
            <li className="mb-2">
              Use the materials for any commercial purpose
            </li>
            <li className="mb-2">
              Attempt to decompile or reverse engineer any software contained on
              CBSE AI
            </li>
            <li className="mb-2">
              Remove any copyright or other proprietary notations from the
              materials
            </li>
          </ul>

          <h3 className="text-2xl font-semibold text-white mt-8 mb-4">
            3. Disclaimer
          </h3>
          <p className="text-zinc-300 mb-6">
            The materials on CBSE AI are provided on an `as is` basis. CBSE AI
            makes no warranties, expressed or implied, and hereby disclaims and
            negates all other warranties including, without limitation, implied
            warranties or conditions of merchantability, fitness for a
            particular purpose, or non-infringement of intellectual property or
            other violation of rights.
          </p>

          <h3 className="text-2xl font-semibold text-white mt-8 mb-4">
            4. Limitations
          </h3>
          <p className="text-zinc-300 mb-6">
            In no event shall CBSE AI or its suppliers be liable for any damages
            (including, without limitation, damages for loss of data or profit,
            or due to business interruption) arising out of the use or inability
            to use the materials on CBSE AI.
          </p>

          <h3 className="text-2xl font-semibold text-white mt-8 mb-4">
            5. Revisions and Errata
          </h3>
          <p className="text-zinc-300 mb-6">
            The materials appearing on CBSE AI could include technical,
            typographical, or photographic errors. CBSE AI does not warrant that
            any of the materials on its website are accurate, complete, or
            current. CBSE AI may make changes to the materials contained on its
            website at any time without notice.
          </p>

          <h3 className="text-2xl font-semibold text-white mt-8 mb-4">
            6. Links
          </h3>
          <p className="text-zinc-300 mb-6">
            CBSE AI has not reviewed all of the sites linked to its website and
            is not responsible for the contents of any such linked site. The
            inclusion of any link does not imply endorsement by CBSE AI of the
            site. Use of any such linked website is at the user`s own risk.
          </p>

          <h3 className="text-2xl font-semibold text-white mt-8 mb-4">
            7. Governing Law
          </h3>
          <p className="text-zinc-300 mb-6">
            These terms and conditions are governed by and construed in
            accordance with the laws of India and you irrevocably submit to the
            exclusive jurisdiction of the courts in that location.
          </p>
        </div>
      </main>

      <footer className="p-6 text-center text-zinc-500 text-sm">
        <p>This page was vibe coded.</p>
        <p>© {new Date().getFullYear()} CBSE AI. All rights reserved.</p>
      </footer>
    </div>
  );
}
