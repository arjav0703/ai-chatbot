"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, Send, Settings } from "lucide-react";
import { ToggleSlider } from "react-toggle-slider";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import SubSelector from "@/components/SubSelector";
import subConfig from "@/lib/subConfig";
import ChatSidebar from "@/components/ChatSidebar";
import "./style.css";
import { supabase } from "@/lib/supabase";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Markdown from "react-markdown";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

// Function to get the base URL
const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return "";
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string>("");
  const [selectedWebhook, setSelectedWebhook] = useState(subConfig[1]);
  const [isLongAnswer, setIsLongAnswer] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Dialog state
  useEffect(() => {
    setIsOpen(true);
  }, []);

  // session ID
  useEffect(() => {
    localStorage.removeItem("chat_session_id");
    const newSessionId = `session_${Date.now()}_${Math.random()}`;
    setSessionId(newSessionId);
    localStorage.setItem("chat_session_id", newSessionId);
  }, []);

  // form submission
  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    if (!session) {
      setError("You must be signed in to send a message.");
      redirect("/login");
    }

    const userMessage = input.trim();
    const timestamp = new Date().toISOString();
    setInput("");
    setIsLoading(true);
    setError(null);

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userMessage,
        timestamp,
      },
    ]);

    try {
      const response = await fetch("/api/handler", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          sessionId: sessionId,
          reqUrl: `${getBaseUrl()}/api/gemini`,
          subject: selectedWebhook.name,
          longans: isLongAnswer,
          userid: session.user.email,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to get response");
      }

      if (data.sessionId && data.sessionId !== sessionId) {
        setSessionId(data.sessionId);
        localStorage.setItem("chat_session_id", data.sessionId);
      }

      const responseContent =
        typeof data.response === "string"
          ? data.response
          : JSON.stringify(data.response);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: responseContent,
          timestamp: data.timestamp || new Date().toISOString(),
        },
      ]);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      setError(errorMessage);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Error: ${errorMessage}`,
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Authentication
  const { data: session } = useSession();
  if (session) {
    console.log(session.expires);
  }

  const loadChatHistory = async (sessionId: string, userId: string) => {
    const { data, error } = await supabase
      .from("chats")
      .select("role, content, created_at")
      .eq("session_id", sessionId)
      .eq("user_id", userId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error loading chat history:", error);
      return;
    }

    const formattedMessages = data.map((msg) => ({
      role: msg.role as "user" | "assistant",
      content: msg.content,
      timestamp: msg.created_at,
    }));

    setMessages(formattedMessages);
  };

  return (
    <SidebarProvider>
      <div className="w-screen h-screen bg-gradient-to-br from-zinc-900 via-zinc-900 to-black text-white flex flex-col">
        <header className="sm:px-8 px-6 py-4 flex justify-between items-center backdrop-blur-sm bg-black/5 sticky top-0 z-50 border-b border-white/10">
          <div className="flex items-center gap-4">
            <Link href="/">
              <h1 className="sm:text-xl text-lg font-bold text-white tracking-tight">
                CBSE AI
              </h1>
            </Link>
            {session && (
              <div className="hidden md:flex items-center gap-2 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 py-1.5 px-4 rounded-full border border-blue-500/20">
                <span className="text-blue-300 text-sm font-medium">
                  Subject:
                </span>
                <span className="text-white text-sm">
                  {selectedWebhook.name}
                </span>
              </div>
            )}
          </div>
          {session && (
            <div className="flex items-center gap-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="hidden md:flex gap-2 border-white/20 text-white bg-white/5 hover:bg-white/10"
                      onClick={() => setIsOpen(true)}
                    >
                      <Settings size={16} />
                      <span>Settings</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Change subject and settings</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

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
        <SidebarTrigger className="fixed top-24 left-6" />
        <div className="flex flex-1 overflow-hidden">
          {session && (
            <ChatSidebar
              userId={session.user.email!}
              userName={session.user.name!}
              userImage={session.user.image!}
              onSessionSelect={(selectedSessionId) => {
                setSessionId(selectedSessionId);
                loadChatHistory(selectedSessionId, session.user.email!);
              }}
              currentSessionId={sessionId}
            />
          )}

          <main className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto px-4 py-6">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center px-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-full flex items-center justify-center mb-8 border border-blue-500/30">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="36"
                      height="36"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-blue-300"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-3">
                    Start a conversation
                  </h3>
                  <p className="text-zinc-300 mb-6 max-w-md">
                    Ask any questions about your CBSE curriculum for class 9
                    {" & "}
                    10. I{"'"}m here to help you understand concepts, solve
                    problems, and prepare for exams.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg w-full">
                    <Button
                      variant="outline"
                      onClick={() =>
                        setInput("Explain the concept of photosynthesis")
                      }
                      className="justify-start text-left border-white/20 text-white bg-white/5 hover:bg-white/10"
                    >
                      Explain photosynthesis
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() =>
                        setInput(
                          "Help me solve this linear equation: 3x + 5 = 26",
                        )
                      }
                      className="justify-start text-left border-white/20 text-white bg-white/5 hover:bg-white/10"
                    >
                      Solve 3x + 5 = 26
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() =>
                        setInput(
                          "Write a summary of 'The Story of My Life' by Helen Keller",
                        )
                      }
                      className="justify-start text-left border-white/20 text-white bg-white/5 hover:bg-white/10"
                    >
                      Summarize {"'A Letter to God'"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() =>
                        setInput(
                          "Explain Newton's laws of motion with examples",
                        )
                      }
                      className="justify-start text-left border-white/20 text-white bg-white/5 hover:bg-white/10"
                    >
                      Explain Newton{"'"}s laws
                    </Button>
                  </div>
                </div>
              )}

              {messages.length > 0 && (
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
                        message.role === "user"
                          ? "justify-end"
                          : "justify-start"
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
                        <Loader2
                          size={18}
                          className="animate-spin text-blue-400"
                        />
                        <span className="text-zinc-300">Thinking...</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {error && (
              <div className="mx-auto mb-4 p-3 bg-red-500/20 border border-red-500/30 text-red-200 rounded-lg max-w-2xl">
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <span>{error}</span>
                </div>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="border-t border-white/10 bg-black/20 backdrop-blur-sm p-4 sm:px-8"
            >
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-end gap-3 mb-3">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-zinc-400">Long Answer</span>
                    <ToggleSlider
                      onToggle={setIsLongAnswer}
                      barBackgroundColorActive="#4f46e5"
                      barBackgroundColor="rgba(255,255,255,0.1)"
                      handleBackgroundColor="white"
                      handleSize={18}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="md:hidden border-white/20 text-white bg-white/5 hover:bg-white/10"
                    onClick={() => setIsOpen(true)}
                  >
                    <Settings size={16} />
                  </Button>
                </div>

                <div className="relative flex items-end">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask a question about your CBSE curriculum..."
                    disabled={isLoading}
                    aria-label="Message input"
                    className="w-full min-h-[100px] rounded-xl p-4 pr-12 bg-white/5 border border-white/20 text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                    maxLength={500}
                  />
                  <div className="absolute bottom-4 right-4 text-xs text-zinc-400">
                    {input.length}/500
                  </div>
                  {session && (
                    <Button
                      type="submit"
                      disabled={isLoading || !input.trim()}
                      className="absolute bottom-3 right-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 h-10 w-10 p-0 flex items-center justify-center"
                    >
                      {isLoading ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <Send size={18} />
                      )}
                    </Button>
                  )}
                  {!session && (
                    <Link
                      href="/login"
                      className="absolute right-2 bottom-2 flex px-3 py-1.5 items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                    >
                      Sign in to Chat
                    </Link>
                  )}
                </div>
              </div>
            </form>
          </main>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="bg-zinc-900 border border-white/10 text-white max-w-md">
            <DialogHeader>
              <DialogTitle className="text-white text-xl">
                Chat Settings
              </DialogTitle>
              <DialogDescription className="text-zinc-400">
                Customize your chat experience
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div>
                <h3 className="text-white mb-3 font-medium">Select Subject</h3>
                <SubSelector
                  selectedWebhook={selectedWebhook}
                  setSelectedWebhook={setSelectedWebhook}
                />
              </div>

              <div>
                <h3 className="text-white mb-3 font-medium">Answer Length</h3>
                <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                  <div>
                    <p className="text-white">Detailed Responses</p>
                    <p className="text-zinc-400 text-sm">
                      Get longer, more detailed answers
                    </p>
                  </div>
                  <ToggleSlider
                    onToggle={setIsLongAnswer}
                    barBackgroundColorActive="#4f46e5"
                    barBackgroundColor="rgba(255,255,255,0.1)"
                    handleBackgroundColor="white"
                    handleSize={20}
                    active={isLongAnswer}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                onClick={() => setIsOpen(false)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0"
              >
                Save Settings
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </SidebarProvider>
  );
}
