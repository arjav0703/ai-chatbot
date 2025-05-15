import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import subConfig from "@/lib/subConfig";

function SubSelector({
  selectedWebhook,
  setSelectedWebhook,
}: {
  selectedWebhook: { id: string; name: string };
  setSelectedWebhook: (webhook: { id: string; name: string }) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="rounded-lg bg-zinc-800/50 text-white hover:text-white border border-zinc-700 hover:bg-zinc-700/50"
        >
          {selectedWebhook.id} <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-zinc-800 text-white border border-zinc-700">
        {subConfig.map((webhook) => (
          <DropdownMenuItem
            key={webhook.id}
            onClick={() => setSelectedWebhook(webhook)}
            className="hover:bg-zinc-700/50"
          >
            {webhook.id}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default SubSelector;
