"use client";

import { cn } from "@/lib/utils";
import { User, Bot } from "lucide-react";

interface MessageBubbleProps {
  message: string;
  variant: "user" | "ai";
  timestamp?: string;
}

export function MessageBubble({ message, variant, timestamp }: MessageBubbleProps) {
  return (
    <div
      className={cn(
        "flex w-full gap-3 group transition-all duration-300 ease-out",
        variant === "user" ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all",
          variant === "user"
            ? "bg-[#4d32fb] text-white"
            : "bg-white dark:bg-black text-[#4d32fb] border border-[#4d32fb]"
        )}
      >
        {variant === "user" ? (
          <User className="h-5 w-5" />
        ) : (
          <Bot className="h-5 w-5" />
        )}
      </div>

      {/* Message Content */}
      <div className={cn("flex flex-col gap-1", variant === "user" ? "items-end" : "items-start")}>
        <div
          className={cn(
            "max-w-[75%] md:max-w-[65%] rounded-2xl py-3.5 shadow-sm transition-all",
            variant === "user"
              ? "bg-white dark:bg-black border border-black dark:border-white text-black dark:text-white rounded-br-md px-6 pr-6"
              : "bg-white dark:bg-black border border-black dark:border-white text-black dark:text-white rounded-bl-md px-5"
          )}
        >
          <p className="text-[15px] leading-relaxed whitespace-pre-wrap font-[450]">
            {message}
          </p>
        </div>
        {timestamp && (
          <p
            className={cn(
              "text-xs px-2 mt-0.5",
              variant === "user" ? "text-muted-foreground" : "text-muted-foreground"
            )}
          >
            {timestamp}
          </p>
        )}
      </div>
    </div>
  );
}

