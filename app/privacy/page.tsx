// import Link from "next/link";
// import { Button } from "@/components/ui/button";
import Myheader from "@/components/MyHeader";

export default function PrivacyPage() {
  return (
    <div className="flex flex-col bg-zinc-900 min-h-screen dark">
      <Myheader />

      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <h2 className="text-4xl font-bold text-white mb-8">Privacy Policy</h2>

        <div className="prose prose-invert max-w-none">
          <p className="text-zinc-300 mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <h3 className="text-2xl font-semibold text-white mt-8 mb-4">
            1. Introduction
          </h3>
          <p className="text-zinc-300 mb-6">
            At CBSE AI, we respect your privacy and are committed to protecting
            your personal data. This privacy policy will inform you about how we
            look after your personal data when you visit our website and tell
            you about your privacy rights and how the law protects you.
          </p>

          <h3 className="text-2xl font-semibold text-white mt-8 mb-4">
            2. The Data We Collect
          </h3>
          <p className="text-zinc-300 mb-6">
            We may collect, use, store and transfer different kinds of personal
            data about you which we have grouped together as follows:
          </p>
          <ul className="list-disc pl-6 text-zinc-300 mb-6">
            <li className="mb-2">
              Identity Data: includes first name, last name, username or similar
              identifier
            </li>
            <li className="mb-2">Contact Data: includes email address</li>
            <li className="mb-2">
              Technical Data: includes internet protocol (IP) address, browser
              type and version, time zone setting and location, browser plug-in
              types and versions, operating system and platform, and other
              technology on the devices you use to access this website
            </li>
            <li className="mb-2">
              Usage Data: includes information about how you use our website and
              services
            </li>
          </ul>

          <h3 className="text-2xl font-semibold text-white mt-8 mb-4">
            3. How We Use Your Data
          </h3>
          <p className="text-zinc-300 mb-6">
            We will only use your personal data when the law allows us to. Most
            commonly, we will use your personal data in the following
            circumstances:
          </p>
          <ul className="list-disc pl-6 text-zinc-300 mb-6">
            <li className="mb-2">To provide and maintain our service</li>
            <li className="mb-2">To notify you about changes to our service</li>
            <li className="mb-2">To provide customer support</li>
            <li className="mb-2">
              To gather analysis or valuable information so that we can improve
              our service
            </li>
            <li className="mb-2">To monitor the usage of our service</li>
            <li className="mb-2">
              To detect, prevent and address technical issues
            </li>
          </ul>

          <h3 className="text-2xl font-semibold text-white mt-8 mb-4">
            4. Data Security
          </h3>
          <p className="text-zinc-300 mb-6">
            We have put in place appropriate security measures to prevent your
            personal data from being accidentally lost, used, or accessed in an
            unauthorized way, altered, or disclosed. In addition, we limit
            access to your personal data to those employees, agents,
            contractors, and other third parties who have a business need to
            know.
          </p>

          <h3 className="text-2xl font-semibold text-white mt-8 mb-4">
            5. Your Legal Rights
          </h3>
          <p className="text-zinc-300 mb-6">
            Under certain circumstances, you have rights under data protection
            laws in relation to your personal data, including the right to:
          </p>
          <ul className="list-disc pl-6 text-zinc-300 mb-6">
            <li className="mb-2">Request access to your personal data</li>
            <li className="mb-2">Request correction of your personal data</li>
            <li className="mb-2">Request erasure of your personal data</li>
            <li className="mb-2">Object to processing of your personal data</li>
            <li className="mb-2">
              Request restriction of processing your personal data
            </li>
            <li className="mb-2">Request transfer of your personal data</li>
            <li className="mb-2">Right to withdraw consent</li>
          </ul>

          <h3 className="text-2xl font-semibold text-white mt-8 mb-4">
            6. Contact Us
          </h3>
          <p className="text-zinc-300 mb-6">
            If you have any questions about this privacy policy or our privacy
            practices, please contact us at:
          </p>
          <p className="text-zinc-300 mb-6">Email: arjav@hackclub.app</p>
        </div>
      </main>

      <footer className="p-6 text-center text-zinc-500 text-sm">
        <p>This page was vibe coded.</p>
        <p>© {new Date().getFullYear()} CBSE AI. All rights reserved.</p>
      </footer>
    </div>
  );
}
