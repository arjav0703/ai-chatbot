"use client";
//import { createChat } from "@n8n/chat";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ChatNav from "@/components/ChatNav";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

// Define available webhook URLs
const WEBHOOK_URLS = [
  {
    id: "english-chat",
    name: "English Chat",
    url: process.env.eng_url!,
  },
  {
    id: "science-chat",
    name: "Science Chat",
    url: process.env.sci_url!,
  },
  {
    id: "sst-chat",
    name: "SST Chat",
    url: process.env.sst_url!,
  },
];

export default function SSTPage() {
  // return <div>the servers are down for development</div>;
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string>("");
  const [selectedWebhook, setSelectedWebhook] = useState(WEBHOOK_URLS[0]);

  useEffect(() => {
    // generate a session ID or retrieve from localStorage if it exists
    const storedSessionId = localStorage.getItem("sst_chat_session_id");
    if (storedSessionId) {
      setSessionId(storedSessionId);
    } else {
      const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      setSessionId(newSessionId);
      localStorage.setItem("sst_chat_session_id", newSessionId);
    }
  }, []);

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    const timestamp = new Date().toISOString();
    setInput("");
    setIsLoading(true);
    setError(null);

    // add user message to chat
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
          webhookUrl: selectedWebhook.url, // Pass the selected webhook URL
        }),
      });

      console.log("Webhook response status:", response.status);

      const data = await response.json();
      console.log("Webhook response data:", data);

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to get response");
      }

      // Update session ID if returned from the server
      if (data.sessionId && data.sessionId !== sessionId) {
        setSessionId(data.sessionId);
        localStorage.setItem("sst_chat_session_id", data.sessionId);
      }

      const responseContent =
        typeof data.response === "string"
          ? data.response
          : JSON.stringify(data.response);

      // Add assistant response to chat
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: responseContent,
          timestamp: data.timestamp || new Date().toISOString(),
        },
      ]);
    } catch (error) {
      console.error("Error:", error);
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

  if (!session) return <div>If this dosen`t work, please login</div>;

  return (
    <div className="w-screen p-4 h-screen bg-primary text-white">
      <section className="max-w-6xl h-full flex flex-col mx-auto">
        <div className="flex gap-4 dark">
          <ChatNav />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button type="button" variant="outline">
                {selectedWebhook.name}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-primary">
              {WEBHOOK_URLS.map((webhook) => (
                <DropdownMenuItem
                  key={webhook.id}
                  onClick={() => setSelectedWebhook(webhook)}
                  className="text-white"
                >
                  {webhook.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Remove error div for prod environment */}
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
                  {/* <div className="text-xs mt-1 opacity-70">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </div> */}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="grid w-full gap-2">
            <div className="flex gap-2 items-start">
              <div className="flex-1">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
                  disabled={isLoading}
                  className="min-h-[80px] resize-none bg-zinc-800/50 border-zinc-700"
                />
              </div>
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="dark bg-zinc-800/50 text-white hover:bg-zinc-700/50 hover:text-white border border-zinc-700 transition-colors"
            >
              {isLoading ? "Sending..." : "Send"}
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}
