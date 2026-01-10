"use client";

import { ReactNode } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface ChatLayoutProps {
  children: ReactNode;
  className?: string;
}

export function ChatLayout({ children, className }: ChatLayoutProps) {
  return (
    <div
      className={cn(
        "flex flex-col h-full bg-gradient-to-br from-background via-background to-primary/5 dark:from-background dark:via-background dark:to-primary/10 rounded-t-3xl border-b-0 shadow-lg backdrop-blur-xl overflow-hidden",
        className
      )}
    >
      <div className="h-[70vh] overflow-hidden flex flex-col">
        <ScrollArea className="flex-1 py-6 overflow-y-auto">
          <div className="space-y-4 px-4 pr-6">{children}</div>
        </ScrollArea>
      </div>
    </div>
  );
}
