"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ChatNav from "@/components/ChatNav";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
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
      <div className="w-screen bg-primary text-white">
        <div className="max-w-screen w-screen h-screen bg-primary text-white flex">
          <div className="flex-1 py-4 mb-5">
            <SidebarTrigger className="lg:top-4 lg:left-4 lg:relative fixed" />
            <section className="max-w-6xl h-full flex flex-col lg:mx-auto mx-5">
              <div className="flex gap-4 dark ml-5 lg:mx-2">
                <ChatNav />
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                  {error}
                </div>
              )}
              <div className="flex-1 mb-4 p-4 min-w-full overflow-y-auto">
                <div className="space-y-4">
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
                        className={`max-w-[80%] rounded-xl p-4 ${
                          message.role === "user"
                            ? "bg-zinc-800 text-white"
                            : "text-white"
                        }`}
                      >
                        <div className="whitespace-pre-wrap markdown-content">
                          <Markdown>{message.content}</Markdown>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 text-gray-900 rounded-lg p-3">
                        <Loader2 className="animate-spin" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 w-full"
              >
                <div className="flex self-end gap-2">
                  <p>Long Answer</p>
                  <ToggleSlider
                    onToggle={setIsLongAnswer}
                    barBackgroundColorActive="#789a30"
                  />
                </div>
                <div className="relative">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    disabled={isLoading}
                    aria-label="Message input"
                    className="w-full min-h-[120px] rounded-lg p-4 bg-zinc-800/50 border border-zinc-700 text-white resize-none focus:outline-none focus:ring-2 focus:ring-zinc-500"
                  />
                  <div className="absolute bottom-2 right-4 text-xs text-gray-400">
                    {input.length}/500
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2">
                  <SubSelector
                    selectedWebhook={selectedWebhook}
                    setSelectedWebhook={setSelectedWebhook}
                  />
                  {session && (
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="flex items-center gap-2 rounded-lg bg-zinc-800/50 text-white border border-zinc-700 hover:bg-zinc-700/50 transition-colors"
                    >
                      {isLoading ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        "Send"
                      )}
                    </Button>
                  )}
                  {!session && (
                    <Link
                      href="/login"
                      className="flex px-3 py-1.5 items-center gap-2 rounded-lg bg-zinc-800/50 text-white border border-zinc-700 hover:bg-zinc-700/50 transition-colors"
                    >
                      Sign in
                    </Link>
                  )}
                </div>
              </form>
            </section>
          </div>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="dark">
            <DialogHeader className="gap-8 items-center p-0">
              <DialogTitle className="text-white">Select Subject</DialogTitle>
              <DialogDescription>
                <SubSelector
                  selectedWebhook={selectedWebhook}
                  setSelectedWebhook={setSelectedWebhook}
                />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </SidebarProvider>
  );
}
