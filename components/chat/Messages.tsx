import { Loader2 } from "lucide-react";
import { SidebarTrigger } from "../ui/sidebar";
import { Button } from "../ui/button";
import Markdown from "react-markdown";

const Messages = ({ isLoading, messages }) => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <SidebarTrigger className="lg:hidden mb-4 flex">
        <Button
          variant="outline"
          size="sm"
          className="border-white/30 text-white bg-white/5 hover:bg-white/10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12H3M3 6h18M9 18h12" />
          </svg>
          <span className="ml-2">History</span>
        </Button>
      </SidebarTrigger>

      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${
            message.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-[85%] rounded-2xl p-5 ${
              message.role === "user"
                ? "bg-gradient-to-r from-blue-600/40 to-indigo-600/40 border border-blue-500/30 text-white"
                : "bg-white/5 border border-white/10 text-white"
            }`}
          >
            <div className="whitespace-pre-wrap markdown-content prose prose-invert prose-headings:text-blue-300 prose-a:text-blue-300 max-w-none">
              <Markdown>{message.content}</Markdown>
            </div>
            <div className="mt-2 text-xs text-white/50 flex justify-end">
              {new Date(message.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        </div>
      ))}

      {isLoading && (
        <div className="flex justify-start">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center space-x-3">
            <Loader2 size={18} className="animate-spin text-blue-400" />
            <span className="text-zinc-300">Thinking...</span>
          </div>
        </div>
      )}
    </div>
  );
};
export default Messages;
