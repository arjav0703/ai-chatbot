import { ToggleSlider } from "react-toggle-slider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import SubSelector from "./SubSelector";
import { Button } from "../ui/button";

const ChatSettings = ({
  isOpen,
  setIsOpen,
  selectedWebhook,
  setSelectedWebhook,
  isLongAnswer,
  setIsLongAnswer,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-zinc-900 border border-white/10 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white text-xl">
            Chat Settings
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            Customize your chat experience
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div>
            <h3 className="text-white mb-3 font-medium">Select Subject</h3>
            <SubSelector
              selectedWebhook={selectedWebhook}
              setSelectedWebhook={setSelectedWebhook}
            />
          </div>

          <div>
            <h3 className="text-white mb-3 font-medium">Answer Length</h3>
            <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
              <div>
                <p className="text-white">Detailed Responses</p>
                <p className="text-zinc-400 text-sm">
                  Get longer, more detailed answers
                </p>
              </div>
              <ToggleSlider
                onToggle={setIsLongAnswer}
                barBackgroundColorActive="#4f46e5"
                barBackgroundColor="rgba(255,255,255,0.1)"
                handleBackgroundColor="white"
                handleSize={20}
                active={isLongAnswer}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            onClick={() => setIsOpen(false)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0"
          >
            Save Settings
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default ChatSettings;
