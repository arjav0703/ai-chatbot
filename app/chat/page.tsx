"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Send, Settings } from "lucide-react";
import { ToggleSlider } from "react-toggle-slider";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import subConfig from "@/lib/subConfig";
import ChatSidebar from "@/components/chat/ChatSidebar";
import "./style.css";
import { supabase } from "@/lib/supabase";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import EmptyState from "@/components/chat/EmptyState";
import Messages from "@/components/chat/Messages";
import ChatSettings from "@/components/chat/ChatSettings";
import ChatHeader from "@/components/chat/ChatHeader";

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
        <ChatHeader
          setIsOpen={setIsOpen}
          session={session}
          selectedWebhook={selectedWebhook}
        />
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
                <EmptyState
                  setInput={setInput}
                  setSelectedWebhook={setSelectedWebhook}
                  setIsLongAnswer={setIsLongAnswer}
                  subConfig={subConfig}
                />
              )}

              {messages.length > 0 && (
                <Messages isLoading={isLoading} messages={messages} />
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
        <ChatSettings
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          selectedWebhook={selectedWebhook}
          setSelectedWebhook={setSelectedWebhook}
          isLongAnswer={isLongAnswer}
          setIsLongAnswer={setIsLongAnswer}
        />
      </div>
    </SidebarProvider>
  );
}
