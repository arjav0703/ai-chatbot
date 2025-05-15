import { auth } from "@/auth";
import PublicHero from "@/components/home/PublicHero";
import MyHeader from "@/components/home/MyHeader";
import Options from "@/components/home/Options";
import MyFooter from "@/components/MyFooter";

export default async function Home() {
  const session = await auth();

  if (!session) {
    return <PublicHero />;
  }

  return (
    <div className="flex flex-col bg-gradient-to-br from-zinc-900 via-zinc-900 to-black min-h-screen dark">
      <MyHeader session={session} />
      <main className="flex-1 flex flex-col items-center justify-center px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-8 mt-14 leading-tight tracking-tight sm:text-5xl">
            Welcome to your{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
              AI study assistant
            </span>
          </h2>
          <p className="text-xl text-zinc-300 mb-12 max-w-2xl mx-auto">
            Get help with your Class 9th and 10th CBSE curriculum
          </p>
        </div>

        <Options />
      </main>
      <MyFooter />
    </div>
  );
}
