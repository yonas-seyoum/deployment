"use client";

import { Bot } from "lucide-react";

export function InterviewLoadingIndicator() {
  return (
    <div className="flex justify-start gap-3">
      <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/10 text-primary border border-primary/20">
        <Bot className="h-5 w-5" />
      </div>
      <div className="bg-card/80 backdrop-blur-sm border border-primary/15 rounded-2xl rounded-bl-md px-5 py-3.5 shadow-lg">
        <div className="flex items-center gap-2">
          <div
            className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          />
          <div
            className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          />
          <div
            className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    </div>
  );
}

