"use client";

import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuestionCategory {
  id: string;
  name: string;
  type: "technical" | "behavioral" | "ethical" | "situational";
  completed: boolean;
}

interface InterviewStepperProps {
  categories: QuestionCategory[];
  currentCategory?: string;
}

export function InterviewStepper({
  categories,
  currentCategory,
}: InterviewStepperProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Interview Progress
        </h3>
        <div className="space-y-4">
          {categories.map((category, index) => {
            const isActive = currentCategory === category.id;
            const isCompleted = category.completed;
            const isUpcoming = !isCompleted && !isActive;

            return (
              <div key={category.id} className="relative">
                {/* Connector Line */}
                {index < categories.length - 1 && (
                  <div
                    className={cn(
                      "absolute left-5 top-10 w-0.5 h-8 transition-colors",
                      isCompleted
                        ? "bg-primary"
                        : "bg-primary/20"
                    )}
                  />
                )}

                {/* Category Item */}
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div
                    className={cn(
                      "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all",
                      isCompleted
                        ? "bg-primary border-primary text-white"
                        : isActive
                        ? "bg-primary/10 border-primary text-primary"
                        : "bg-background border-primary/20 text-muted-foreground"
                    )}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      <Circle className="h-5 w-5" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <div
                      className={cn(
                        "font-medium text-sm transition-colors",
                        isCompleted || isActive
                          ? "text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {category.name}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5 capitalize">
                      {category.type} Questions
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


