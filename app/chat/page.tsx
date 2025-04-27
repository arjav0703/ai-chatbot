"use client";
import { useEffect, useState } from "react";
import { Client } from "appwrite";
// import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ChatNav from "@/components/ChatNav";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const WEBHOOK_URLS = [
  {
    id: "english-chat",
    name: "English Chat",
    url: "https://6801f69d1458150c13ad.fra.appwrite.run/webhook",
  },
  {
    id: "science-chat",
    name: "Science Chat",
    url: "https://68020a0580f1c7233808.fra.appwrite.run/webhook",
  },
  {
    id: "sst-chat",
    name: "SST Chat",
    url: "https://68020a29320b98c39ebd.fra.appwrite.run/webhook",
  },
];

const client = new Client();
client
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("6801f59d003a67ca5e6e");

export default function SSTPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string>("");
  const [selectedWebhook, setSelectedWebhook] = useState(WEBHOOK_URLS[0]);

  useEffect(() => {
    localStorage.removeItem("chat_session_id");
    const newSessionId = `session_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 9)}`;
    setSessionId(newSessionId);
    localStorage.setItem("chat_session_id", newSessionId);
  }, []);

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

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
      const response = await fetch("/api/webhook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          sessionId: sessionId,
          webhookUrl: selectedWebhook.url,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to get response");
      }

      if (data.sessionId && data.sessionId !== sessionId) {
        setSessionId(data.sessionId);
        localStorage.setItem("sst_chat_session_id", data.sessionId);
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

  const [session, setSession] = useState(null);

  useEffect(() => {
    fetch("/api/auth/session")
      .then((res) => res.json())
      .then((data) => setSession(data));
  }, []);

  if (!session) return <div>If this doesn`t work, please login</div>;

  return (
    <div className="w-screen p-4 h-screen bg-primary text-white">
      <section className="max-w-6xl h-full flex flex-col mx-auto">
        <div className="flex gap-4 dark">
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
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-xl p-4 ${
                    message.role === "user"
                      ? "bg-zinc-800 text-white"
                      : " text-white"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-lg bg-zinc-800/50 text-white border border-zinc-700 hover:bg-zinc-700/50"
                >
                  {selectedWebhook.name}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-zinc-800 text-white border border-zinc-700">
                {WEBHOOK_URLS.map((webhook) => (
                  <DropdownMenuItem
                    key={webhook.id}
                    onClick={() => setSelectedWebhook(webhook)}
                    className="hover:bg-zinc-700/50"
                  >
                    {webhook.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 rounded-lg bg-zinc-800/50 text-white border border-zinc-700 hover:bg-zinc-700/50 transition-colors"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : "Send"}
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}
