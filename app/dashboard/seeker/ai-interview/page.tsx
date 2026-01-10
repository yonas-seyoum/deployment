"use client";

import { useState } from "react";
import { InterviewHeader } from "@/components/ai-interview/interview-header";
import { InterviewSidebar } from "@/components/ai-interview/interview-sidebar";
import { InterviewChatPanel } from "@/components/ai-interview/interview-chat-panel";
import { InterviewSummaryPanel } from "@/components/ai-interview/interview-summary-panel";
import { InterviewTips } from "@/components/ai-interview/interview-tips";
import { useInterviewTimer } from "@/hooks/use-interview-timer";
import { useInterviewState } from "@/hooks/use-interview-state";
import { getInterviewResults } from "@/components/ai-interview/interview-utils";

export default function AiInterviewPage() {
  const [interviewType, setInterviewType] = useState("Software Engineer");
  const [difficulty, setDifficulty] = useState("Medium");

  const {
    messages,
    isInterviewStarted,
    isInterviewComplete,
    isLoading,
    currentCategory,
    questionCategories,
    startInterview,
    sendMessage,
    resetInterview,
  } = useInterviewState();

  const { interviewTime, resetTimer } = useInterviewTimer(
    isInterviewStarted,
    isInterviewComplete
  );

  const handleStartInterview = () => {
    startInterview(interviewType, difficulty);
    resetTimer();
  };

  const handleReset = () => {
    resetInterview();
    resetTimer();
  };

  return (
    <div className="h-full w-full p-4 md:p-6 space-y-6 overflow-hidden">
      <InterviewHeader
        interviewTime={interviewTime}
        isInterviewStarted={isInterviewStarted}
        isInterviewComplete={isInterviewComplete}
        onReset={handleReset}
      />

      <div className="grid lg:grid-cols-12 gap-6 h-[calc(100vh-200px)]">
        <InterviewSidebar
          interviewType={interviewType}
          difficulty={difficulty}
          isInterviewStarted={isInterviewStarted}
          isInterviewComplete={isInterviewComplete}
          questionCategories={questionCategories}
          currentCategory={currentCategory}
          onInterviewTypeChange={setInterviewType}
          onDifficultyChange={setDifficulty}
          onStartInterview={handleStartInterview}
        />

        <div className="lg:col-span-6 flex flex-col min-h-0">
          {isInterviewComplete ? (
            <InterviewSummaryPanel
              results={getInterviewResults()}
              onReset={handleReset}
            />
          ) : (
            <InterviewChatPanel
              messages={messages}
              isLoading={isLoading}
              isInterviewStarted={isInterviewStarted}
              onSendMessage={sendMessage}
            />
          )}
        </div>

        <div className="lg:col-span-3 space-y-4">
          <InterviewTips />
        </div>
      </div>
    </div>
  );
}
