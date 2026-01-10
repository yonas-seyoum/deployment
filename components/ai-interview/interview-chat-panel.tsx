"use client";

import { ChatLayout } from "./chat-layout";
import { ChatInput } from "./chat-input";
import { MessageBubble } from "./message-bubble";
import { InterviewEmptyState } from "./interview-empty-state";
import { InterviewLoadingIndicator } from "./interview-loading-indicator";
import type { Message } from "./types";

interface InterviewChatPanelProps {
  messages: Message[];
  isLoading: boolean;
  isInterviewStarted: boolean;
  onSendMessage: (text: string) => void;
}

export function InterviewChatPanel({
  messages,
  isLoading,
  isInterviewStarted,
  onSendMessage,
}: InterviewChatPanelProps) {
  return (
    <div className="flex flex-col h-full min-h-0">
      <ChatLayout className="flex-1 min-h-0">
        {messages.length === 0 && isInterviewStarted ? (
          <InterviewEmptyState variant="preparing" />
        ) : messages.length === 0 ? (
          <InterviewEmptyState variant="ready" />
        ) : (
          <>
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message.text}
                variant={message.variant}
                timestamp={message.timestamp}
              />
            ))}
            {isLoading && <InterviewLoadingIndicator />}
          </>
        )}
      </ChatLayout>
      {isInterviewStarted && (
        <ChatInput
          onSend={onSendMessage}
          disabled={!isInterviewStarted || isLoading}
          placeholder="Type your answer..."
        />
      )}
    </div>
  );
}
