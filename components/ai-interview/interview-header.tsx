"use client";

import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { formatTime } from "./interview-utils";

interface InterviewHeaderProps {
  interviewTime: number;
  isInterviewStarted: boolean;
  isInterviewComplete: boolean;
  onReset: () => void;
}

export function InterviewHeader({
  interviewTime,
  isInterviewStarted,
  isInterviewComplete,
  onReset,
}: InterviewHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent mb-2">
          AI Interview
        </h1>
        <p className="text-muted-foreground text-base">
          Practice your interview skills with AI-powered conversations
        </p>
      </div>
      <div className="flex items-center gap-3">
        {isInterviewStarted && !isInterviewComplete && (
          <>
            <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg border border-primary/20">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm font-mono font-semibold text-foreground">
                {formatTime(interviewTime)}
              </span>
            </div>
            <Button variant="outline" onClick={onReset} size="sm">
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

