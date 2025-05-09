// components/ChatSidebar.tsx
"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface ChatSession {
  session_id: string;
  created_at: string;
  subject: string;
}

export default function ChatSidebar({
  userId,
  onSessionSelect,
  currentSessionId,
}: {
  userId: string;
  onSessionSelect: (sessionId: string) => void;
  currentSessionId: string;
}) {
  const [sessions, setSessions] = useState<ChatSession[]>([]);

  useEffect(() => {
    const fetchSessions = async () => {
      const { data, error } = await supabase
        .from("chats")
        .select("session_id, created_at, subject")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching sessions:", error);
        return;
      }

      const uniqueSessions = data.reduce((acc: ChatSession[], current) => {
        if (!acc.find((session) => session.session_id === current.session_id)) {
          acc.push(current);
        }
        return acc;
      }, []);

      setSessions(uniqueSessions);
    };

    if (userId) {
      fetchSessions();
    }
  }, [userId]);

  return (
    // <div className="w-64 bg-zinc-900 h-full overflow-y-auto p-4">
    //   <h2 className="text-xl font-bold mb-4">Previous Chats</h2>
    //   <div className="space-y-2">
    //     {sessions.map((session) => (
    //       <button
    //         key={session.session_id}
    //         onClick={() => onSessionSelect(session.session_id)}
    //         className={`w-full p-2 text-left rounded ${
    //           currentSessionId === session.session_id
    //             ? "bg-zinc-700"
    //             : "bg-zinc-800 hover:bg-zinc-700"
    //         }`}
    //       >
    //         <div className="text-sm font-medium">
    //           {session.subject || "Untitled"}
    //         </div>
    //         <div className="text-xs text-gray-400">
    //           {new Date(session.created_at).toLocaleString()}
    //         </div>
    //       </button>
    //     ))}
    //   </div>
    // </div>
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        Hi
        <SidebarGroup />
        <SidebarGroup />
        {sessions.map((session) => (
          <button
            key={session.session_id}
            onClick={() => onSessionSelect(session.session_id)}
            className={`w-full p-2 text-left rounded ${
              currentSessionId === session.session_id
                ? "bg-zinc-700"
                : "bg-zinc-800 hover:bg-zinc-700"
            }`}
          >
            <div className="text-sm font-medium">
              {session.subject || "Untitled"}
            </div>
            <div className="text-xs text-gray-400">
              {new Date(session.created_at).toLocaleString()}
            </div>
          </button>
        ))}
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
