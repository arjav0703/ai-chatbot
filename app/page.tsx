import { auth } from "@/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import DeveloperNote from "@/components/DeveloperNote";
import Myheader from "@/components/MyHeader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Motiondiv from "@/components/motion/div";
import { signOut } from "@/auth";
export default async function Home() {
  const session = await auth();
  console.log("User Image URL:", session?.user?.image);

  if (!session) {
    return (
      <div className="flex flex-col bg-zinc-900 min-h-screen dark color-bg ">
        <Myheader />

        <main className="flex-1 flex flex-col items-center justify-center px-4">
          <div className="text-center max-w-3xl">
            <h2 className="text-3xl font-bold text-white mb-6 mt-14 tars-mono leading-12 sm:text-5xl sm:leading-18">
              YOUR AI POWERED STUDY COMPANION
            </h2>
            <p className="text-xl text-zinc-300 mb-8">
              Get instant answers to your questions, and improve your
              understanding of key concepts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Motiondiv>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white px-8 py-6 text-lg backdrop-blur-md bg-transparent"
                  >
                    Get Started
                  </Button>
                </Motiondiv>
              </Link>
              <Link href="/about">
                <Motiondiv>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white px-8 py-6 text-lg backdrop-blur-md bg-transparent"
                  >
                    Learn More
                  </Button>
                </Motiondiv>
              </Link>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full ">
            <div className="bg-zinc-800/30 border-1 border-zinc-100 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-white mb-3">
                Instant Answers
              </h3>
              <p className="text-zinc-50">
                Get immediate help with your questions across all CBSE subjects.
              </p>
            </div>
            <div className="bg-zinc-800/30 backdrop-blur-sm border-1 border-zinc-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-3">
                Personalized Learning
              </h3>
              <p className="text-zinc-50">
                Adapts to your learning style and pace for better understanding.
              </p>
            </div>
            <div className="bg-zinc-800/30 backdrop-blur-sm border-1 border-zinc-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-3">
                24/7 Availability
              </h3>
              <p className="text-zinc-50">
                Study anytime, anywhere with our always-available AI assistant.
              </p>
            </div>
          </div>
          <DeveloperNote />
        </main>

        <footer className="p-6 text-center text-zinc-200 text-sm">
          <p>© {new Date().getFullYear()} CBSE AI. All rights reserved.</p>
        </footer>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-zinc-900 min-h-screen dark color-bg">
      <header className="sm:p-6 p-4 flex justify-between items-center">
        <h1 className="sm:text-3xl text-2xl font-bold text-white tars-mono">
          CBSE AI
        </h1>
        <div className="flex items-center gap-4">
          <Motiondiv>
            <Avatar className="w-8 h-8 lg:w-11 lg:h-11">
              <AvatarImage src={`${session.user?.image}`} />
              <AvatarFallback>
                {`${session.user?.name?.[0] || ""}${session.user?.name?.[1] || ""}`}
              </AvatarFallback>
            </Avatar>
          </Motiondiv>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Motiondiv>
              <Button
                size="default"
                type="submit"
                variant="outline"
                className="border-white text-white px-4 py-3 text-lg backdrop-blur-md bg-transparent"
              >
                Sign out
              </Button>
            </Motiondiv>
          </form>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-2xl mb-12">
          <h2 className="text-3xl font-bold text-white mb-14 mt-14 tars-mono leading-12 sm:text-5xl sm:leading-18">
            YOUR AI POWERED STUDY COMPANION
          </h2>
          <p className="text-xl text-zinc-300">
            Get help with Class 9th and Class 10th Syllabus
          </p>
        </div>

        <div className="text-white">
          <Motiondiv>
            <Link
              href="/chat"
              className="p-2 border-white border-2 rounded-lg backdrop-blur-md backdrop-brightness-80 hover:backdrop-brightness-70"
            >
              Get Started
            </Link>
          </Motiondiv>
        </div>

        <DeveloperNote />
      </main>

      <footer className="p-6 text-center text-zinc-200 text-sm">
        <p>© {new Date().getFullYear()} CBSE AI. All rights reserved.</p>
      </footer>
    </div>
  );
}
