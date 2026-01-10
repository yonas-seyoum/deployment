"use client";

import { Play } from "lucide-react";

interface InterviewEmptyStateProps {
  variant: "ready" | "preparing";
}

export function InterviewEmptyState({ variant }: InterviewEmptyStateProps) {
  if (variant === "preparing") {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-4 max-w-md">
          <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto border border-primary/20 shadow-lg">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Preparing your interview...
            </h3>
            <p className="text-sm text-muted-foreground">
              AI is crafting personalized questions for you
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center space-y-6 max-w-md px-6">
        <div className="w-20 h-20 bg-gradient-to-br from-primary/20 via-primary/15 to-primary/10 rounded-3xl flex items-center justify-center mx-auto border border-primary/20 shadow-xl">
          <Play className="h-10 w-10 text-primary" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Ready to Start?
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Configure your interview settings on the left and click "Start
            Interview" to begin your practice session.
          </p>
        </div>
      </div>
    </div>
  );
}
