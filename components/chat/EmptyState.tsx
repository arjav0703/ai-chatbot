import React from "react";
import { Button } from "@/components/ui/button";
const EmptyState = ({
  setInput,
  setSelectedWebhook,
  setIsLongAnswer,
  subConfig,
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6">
      <div className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-full flex items-center justify-center mb-8 border border-blue-500/30">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-blue-300"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </div>
      <h3 className="text-2xl font-semibold text-white mb-3">
        Start a conversation
      </h3>
      <p className="text-zinc-300 mb-6 max-w-md">
        Ask any questions about your CBSE curriculum for class 9{" & "}
        10. I{"'"}m here to help you understand concepts, solve problems, and
        prepare for exams.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg w-full">
        <Button
          variant="outline"
          onClick={() => {
            setInput("Explain the concept of photosynthesis");
            setSelectedWebhook(subConfig[1]);
            setIsLongAnswer(true);
          }}
          className="justify-start text-left border-white/20 text-white bg-white/5 hover:bg-white/10"
        >
          Explain photosynthesis
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setInput("Write a summary of 'A letter to God' by G.L. Funtes");
            setSelectedWebhook(subConfig[0]);
            setIsLongAnswer(true);
          }}
          className="justify-start text-left border-white/20 text-white bg-white/5 hover:bg-white/10"
        >
          Summarize {"'A Letter to God'"}
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setInput("Explain Reign of terror");
            setSelectedWebhook(subConfig[2]);
            setIsLongAnswer(true);
          }}
          className="justify-start text-left border-white/20 text-white bg-white/5 hover:bg-white/10"
        >
          Explain Reign of terror
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setInput("Explain Newton's laws of motion with examples");
            setSelectedWebhook(subConfig[1]);
            setIsLongAnswer(true);
          }}
          className="justify-start text-left border-white/20 text-white bg-white/5 hover:bg-white/10"
        >
          Explain Newton{"'"}s laws
        </Button>
      </div>
    </div>
  );
};

export default EmptyState;
