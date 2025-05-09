"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
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
    <Sidebar
      className="dark text-white w-80"
      style={{ "--sidebar-width": "20rem" } as React.CSSProperties}
    >
      <SidebarHeader className="p-4">
        <h1 className="text-xl font-bold">Previous Chats</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="space-y-4 p-2">
          {sessions.map((session) => (
            <SidebarMenuItem key={session.session_id} className="w-full">
              <SidebarMenuButton
                className="bg-zinc-800 hover:bg-zinc-700 p-4 rounded-lg w-full min-h-fit transition-colors"
                onClick={() => onSessionSelect(session.session_id)}
                isActive={currentSessionId === session.session_id}
              >
                <div className="flex flex-col gap-2">
                  <span className="font-medium">
                    {session.subject || "Untitled"}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(session.created_at).toLocaleString()}
                  </span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4" />
    </Sidebar>
  );
}
