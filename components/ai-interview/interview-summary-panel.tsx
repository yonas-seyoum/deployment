"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RotateCcw } from "lucide-react";
import { InterviewSummary } from "./interview-summary";
import type { InterviewResults } from "./types";

interface InterviewSummaryPanelProps {
  results: InterviewResults;
  onReset: () => void;
}

export function InterviewSummaryPanel({
  results,
  onReset,
}: InterviewSummaryPanelProps) {
  return (
    <Card className="h-full relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-primary/10 dark:from-background dark:via-primary/10 dark:to-primary/15 border-primary/10 shadow-glow-sm flex flex-col min-h-0">
      <div className="absolute inset-0 bg-gradient-to-br from-[#4d32fb]/5 via-[#6b4fff]/3 to-transparent opacity-50" />
      <div className="relative flex flex-col h-full min-h-0">
        <div className="flex-1 overflow-y-auto min-h-0">
          <InterviewSummary {...results} />
        </div>
        <div className="flex-shrink-0 p-6 border-t border-primary/10 bg-gradient-to-br from-primary/5 to-transparent">
          <Button
            onClick={onReset}
            className="w-full h-12 text-base font-semibold bg-gradient-to-r from-[#4d32fb] via-[#6b4fff] to-[#8a6cff] hover:from-[#6b4fff] hover:via-[#8a6cff] hover:to-[#a88aff] text-white border-0 shadow-glow-sm hover:shadow-glow transition-all duration-300"
            size="lg"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Start New Interview
          </Button>
        </div>
      </div>
    </Card>
  );
}

