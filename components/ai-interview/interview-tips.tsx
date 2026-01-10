"use client";

import { Card } from "@/components/ui/card";
import { Lightbulb, MessageSquare, Clock, Target } from "lucide-react";

export function InterviewTips() {
  const tips = [
    {
      icon: MessageSquare,
      title: "Be Clear & Concise",
      description: "Structure your answers with clear examples",
    },
    {
      icon: Clock,
      title: "Take Your Time",
      description: "Think before responding, quality over speed",
    },
    {
      icon: Target,
      title: "Stay Focused",
      description: "Answer the question directly and completely",
    },
  ];

  return (
    <Card className="relative overflow-hidden group p-5  dark:from-card/60 dark:via-primary/15 dark:to-primary/10 backdrop-blur-xl border-primary/10 shadow-glow-sm hover:shadow-glow rounded-2xl transition-all duration-300">
      <div className="absolute inset-0 dark:bg-gradient-to-br from-[#4d32fb]/20 via-[#6b4fff]/10 to-[#8a6cff]/5 opacity-100 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative flex items-center gap-3 mb-5">
        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#4d32fb] to-[#6b4fff] flex items-center justify-center backdrop-blur-sm shadow-glow-sm">
          <Lightbulb className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold bg-gradient-to-r from-[#4d32fb] via-[#6b4fff] to-[#8a6cff] bg-clip-text text-transparent">
          Interview Tips
        </h3>
      </div>

      <div className="relative space-y-3">
        {tips.map((tip, index) => {
          const Icon = tip.icon;
          return (
            <div
              key={index}
              className="group/item flex items-start gap-3 p-3.5 rounded-xl dark:from-primary/15 dark:via-primary/10 border border-primary/15 hover:border-primary/25 hover:from-primary/15 hover:via-primary/10 dark:hover:from-primary/20 dark:hover:via-primary/15 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#4d32fb]/20 to-[#6b4fff]/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:from-[#4d32fb]/30 group-hover/item:to-[#6b4fff]/20 transition-all">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-foreground mb-1">
                  {tip.title}
                </div>
                <div className="text-xs text-muted-foreground leading-relaxed">
                  {tip.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
