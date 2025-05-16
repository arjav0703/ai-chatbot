"use client";

import * as React from "react";
import { Progress } from "@/components/ui/progress";

export default function Loading() {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-900 to-black min-h-screen dark">
      <div className="text-center mb-4">
        <p className="text-zinc-300 text-lg">Loading your AI assistant...</p>
      </div>
      <Progress
        value={progress}
        className="w-[60%] max-w-md"
        // Use the theme's color scheme
        style={
          {
            backgroundColor: "var(--color-muted)",
            "--progress-background": "var(--color-sidebar-primary)",
          } as React.CSSProperties
        }
      />
    </div>
  );
}
