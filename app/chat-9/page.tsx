"use client";
import "@n8n/chat/style.css";
import { createChat } from "@n8n/chat";
import { useEffect, useState } from "react";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/check");
        const data = await response.json();
        setIsAuthenticated(data.authenticated);
      } catch (error) {
        console.error("Authentication error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      createChat({
        webhookUrl:
          "https://n8n.arjav.hackclub.app/webhook/79f0a176-56bf-41e7-aeba-338288130bde/chat",
        webhookConfig: {
          method: "POST",
          headers: {},
        },
        target: "#n8n-chat",
        mode: "fullscreen",
        chatInputKey: "chatInput",
        chatSessionKey: "sessionId",
        metadata: {},
        showWelcomeScreen: false,
        defaultLanguage: "en",
        initialMessages: [
          "Hi! 👋",
          "I am Chemi. I am here to help you with your questions.",
        ],
        i18n: {
          en: {
            title: "Class 9",
            subtitle: "",
            footer: "",
            getStarted: "New Conversation",
            inputPlaceholder: "Ask chemi",
            closeButtonTooltip: "Close chat",
          },
        },
      });
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>Not authenticated</div>;
  }

  return (
    <div className="h-screen">
      <div id="n8n-chat" className="h-full w-full" />
    </div>
  );
}
