import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const ChatHeader = ({ session, selectedWebhook }) => {
  return (
    <header className="sm:px-8 px-6 py-4 flex justify-between items-center backdrop-blur-sm bg-black/5 sticky top-0 z-50 border-b border-white/10">
      <div className="flex items-center gap-4">
        <Link href="/">
          <h1 className="sm:text-xl text-lg font-bold text-white tracking-tight">
            CBSE AI
          </h1>
        </Link>
        {session && (
          <div className="hidden md:flex items-center gap-2 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 py-1.5 px-4 rounded-full border border-blue-500/20">
            <span className="text-blue-300 text-sm font-medium">Subject:</span>
            <span className="text-white text-sm">{selectedWebhook.name}</span>
          </div>
        )}
      </div>
      {session && (
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white/5 py-1.5 px-3 rounded-full border border-white/10">
            <Avatar className="w-6 h-6">
              <AvatarImage src={`${session.user?.image}`} />
              <AvatarFallback className="bg-blue-600/30 text-blue-200 text-xs">
                {`${session.user?.name?.[0] || ""}${session.user?.name?.[1] || ""}`}
              </AvatarFallback>
            </Avatar>
            <span className="text-zinc-200 text-sm hidden sm:inline">
              {session.user?.name}
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
export default ChatHeader;
