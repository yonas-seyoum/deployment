"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play } from "lucide-react";
import { ApiKeyTest } from "./api-key-test";
import { InterviewSettings } from "./interview-settings";
import { InterviewStepper } from "./interview-stepper";
import type { QuestionCategory } from "./types";

interface InterviewSidebarProps {
  interviewType: string;
  difficulty: string;
  isInterviewStarted: boolean;
  isInterviewComplete: boolean;
  questionCategories: QuestionCategory[];
  currentCategory: string;
  onInterviewTypeChange: (type: string) => void;
  onDifficultyChange: (difficulty: string) => void;
  onStartInterview: () => void;
}

export function InterviewSidebar({
  interviewType,
  difficulty,
  isInterviewStarted,
  isInterviewComplete,
  questionCategories,
  currentCategory,
  onInterviewTypeChange,
  onDifficultyChange,
  onStartInterview,
}: InterviewSidebarProps) {
  return (
    <div className="lg:col-span-3 space-y-4">
      <ApiKeyTest />
      <InterviewSettings
        interviewType={interviewType}
        difficulty={difficulty}
        onInterviewTypeChange={onInterviewTypeChange}
        onDifficultyChange={onDifficultyChange}
      />

      {!isInterviewStarted && (
        <Card className="p-6 bg-gradient-to-br from-primary/10 via-primary/8 to-primary/5 border-primary/20 shadow-lg rounded-2xl">
          <Button
            onClick={onStartInterview}
            size="lg"
            className="w-full h-14 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
            disabled={!interviewType || !difficulty}
          >
            <Play className="h-5 w-5 mr-2" />
            Start Interview
          </Button>
          <p className="text-sm text-muted-foreground mt-4 text-center leading-relaxed">
            Select your interview type and difficulty, then click to begin your
            practice session
          </p>
        </Card>
      )}

      {isInterviewStarted && !isInterviewComplete && (
        <Card className="p-5 bg-card/60 backdrop-blur-sm border-primary/10 shadow-md rounded-2xl">
          <InterviewStepper
            categories={questionCategories}
            currentCategory={currentCategory}
          />
        </Card>
      )}
    </div>
  );
}

