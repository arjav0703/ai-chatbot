import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { signOut } from "@/auth";
import { Session } from "next-auth";

export default function MyHeader({ session }: { session: Session | null }) {
  if (!session?.user) {
    return null;
  }

  return (
    <header className="sm:px-8 px-6 py-6 flex justify-between items-center backdrop-blur-sm bg-black/5 sticky top-0 z-50 border-b border-white/10">
      <Link href="/">
        <h1 className="sm:text-2xl text-xl font-bold text-white tracking-tight">
          CBSE AI
        </h1>
      </Link>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 bg-white/5 py-2 px-4 rounded-full border border-white/10">
          <Avatar className="w-8 h-8">
            <AvatarImage src={session.user.image || ""} />
            <AvatarFallback className="bg-blue-600/30 text-blue-200">
              {`${session.user.name?.[0] || ""}${session.user.name?.[1] || ""}`}
            </AvatarFallback>
          </Avatar>
          <span className="text-zinc-200 hidden sm:inline">
            {session.user.name}
          </span>
        </div>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Button
            type="submit"
            variant="outline"
            className="border-white/30 text-white bg-transparent hover:bg-white/10"
          >
            Sign out
          </Button>
        </form>
      </div>
    </header>
  );
}
