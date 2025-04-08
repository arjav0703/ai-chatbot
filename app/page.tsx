"use client";
import { useEffect } from "react";
import "@n8n/chat/style.css";
import { createChat } from "@n8n/chat";
export default function App() {
  useEffect(() => {
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
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <div id="n8n-chat" className="" />
    </div>
  );
}
