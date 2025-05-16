import { Loader2, Send, Settings } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { ToggleSlider } from "react-toggle-slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const ChatInput = ({
  handleSubmit,
  setIsLongAnswer,
  setIsOpen,
  isLoading,
  input,
  setInput,
  handleKeyDown,
  session,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-white/10 bg-black/20 backdrop-blur-sm p-4 sm:px-8 dark"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-end gap-3 mb-3">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-zinc-400">Long Answer</span>
            <ToggleSlider
              onToggle={setIsLongAnswer}
              barBackgroundColorActive="#4f46e5"
              barBackgroundColor="rgba(255,255,255,0.1)"
              handleBackgroundColor="white"
              handleSize={18}
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="hidden md:flex gap-2 border-white/20 text-white bg-white/5 hover:bg-white/10"
                    onClick={() => setIsOpen(true)}
                  >
                    <Settings size={16} />
                    {/* <span>Settings</span> */}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Change subject and settings</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="md:hidden border-white/20 text-white bg-white/5 hover:bg-white/10"
            onClick={() => setIsOpen(true)}
          >
            <Settings size={16} />
          </Button>
        </div>

        <div className="relative flex items-end">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question about your CBSE curriculum..."
            disabled={isLoading}
            aria-label="Message input"
            className="w-full min-h-[100px] rounded-xl p-4 pr-12 bg-white/5 border border-white/20 text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
            maxLength={500}
          />
          <div className="absolute top-4 right-4 text-xs text-zinc-400">
            {input.length}/500
          </div>
          {session && (
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute bottom-3 right-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 h-10 w-10 p-0 flex items-center justify-center"
            >
              {isLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Send size={18} />
              )}
            </Button>
          )}
          {!session && (
            <Link
              href="/login"
              className="absolute right-2 bottom-2 flex px-3 py-1.5 items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
            >
              Sign in to Chat
            </Link>
          )}
        </div>
      </div>
    </form>
  );
};
export default ChatInput;
