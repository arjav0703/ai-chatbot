import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { NotebookPen } from "lucide-react";

export default function NewChat() {
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger onClick={() => window.location.reload()}>
            <NotebookPen
              size={30}
              className="ml-3 hover:backdrop-brightness-200 my-auto"
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>New Chat</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}
