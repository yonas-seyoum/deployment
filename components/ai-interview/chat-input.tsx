"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({
  onSend,
  disabled = false,
  placeholder = "Type your message...",
}: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex-shrink-0 border border-primary/10 border-t-0 bg-gradient-to-br from-background via-background to-primary/5 dark:from-background dark:via-background dark:to-primary/10 backdrop-blur-xl p-4 shadow-lg rounded-b-3xl">
      <div className="flex items-end gap-3">
        <div className="flex-1 relative">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            className="min-h-[70px] max-h-[140px] resize-none text-[15px] leading-relaxed rounded-2xl border-primary/20 bg-card/50 backdrop-blur-sm focus:bg-card focus:border-primary/40 transition-all"
            rows={2}
          />
        </div>
        <Button
          onClick={handleSend}
          disabled={disabled || !message.trim()}
          size="lg"
          className="h-[70px] px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
