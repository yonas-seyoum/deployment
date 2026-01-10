"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle, TrendingUp, Trophy, Sparkles } from "lucide-react";

interface InterviewSummaryProps {
  score: number;
  strengths: string[];
  weakAreas: string[];
  suggestions: string[];
}

export function InterviewSummary({
  score,
  strengths,
  weakAreas,
  suggestions,
}: InterviewSummaryProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "from-green-500 via-emerald-400 to-green-500";
    if (score >= 60) return "from-yellow-500 via-amber-400 to-yellow-500";
    return "from-red-500 via-rose-400 to-red-500";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    return "Needs Improvement";
  };

  return (
    <div className="h-full overflow-y-auto min-h-0">
      <div className="space-y-6 p-6 pb-8">
        {/* Header Section with Score */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#4d32fb]/20 via-[#6b4fff]/15 to-[#8a6cff]/10 dark:from-[#4d32fb]/25 dark:via-[#6b4fff]/20 dark:to-[#8a6cff]/15 backdrop-blur-xl border border-primary/20 shadow-glow-sm p-8">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl" />
          <div className="relative text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Trophy className="h-6 w-6 text-primary" />
              <h3 className="text-3xl font-bold bg-gradient-to-r from-[#4d32fb] via-[#6b4fff] to-[#8a6cff] bg-clip-text text-transparent">
                Interview Results
              </h3>
            </div>
            <div className={`text-7xl font-bold bg-gradient-to-r ${getScoreColor(score)} bg-clip-text text-transparent mb-3`}>
              {score}
            </div>
            <div className="text-2xl font-semibold text-muted-foreground mb-2">/ 100</div>
            <Badge className="bg-gradient-to-r from-[#4d32fb] to-[#6b4fff] text-white border-0 px-4 py-1.5 text-sm font-semibold shadow-glow-sm">
              {getScoreBadge(score)}
            </Badge>
            <p className="text-muted-foreground mt-4 text-sm">Overall Performance Score</p>
          </div>
        </div>

        {/* Strengths and Weaknesses Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Strengths Card */}
          <Card className="relative overflow-hidden group p-6 bg-gradient-to-br from-green-500/15 via-emerald-500/10 to-green-500/5 dark:from-green-500/20 dark:via-emerald-500/15 dark:to-green-500/10 backdrop-blur-xl border-green-500/25 shadow-glow-sm hover:shadow-glow transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center shadow-glow-sm">
                  <CheckCircle2 className="h-5 w-5 text-white" />
                </div>
                <h4 className="text-lg font-bold bg-gradient-to-r from-green-500 to-emerald-400 bg-clip-text text-transparent">
                  Strengths
                </h4>
              </div>
              <ul className="space-y-3">
                {strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-3 group/item">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-400/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:from-green-500/30 group-hover/item:to-emerald-400/30 transition-all">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                    </div>
                    <span className="text-sm text-foreground leading-relaxed flex-1">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          {/* Areas for Improvement Card */}
          <Card className="relative overflow-hidden group p-6 bg-gradient-to-br from-amber-500/15 via-orange-500/10 to-amber-500/5 dark:from-amber-500/20 dark:via-orange-500/15 dark:to-amber-500/10 backdrop-blur-xl border-amber-500/25 shadow-glow-sm hover:shadow-glow transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-400 flex items-center justify-center shadow-glow-sm">
                  <AlertCircle className="h-5 w-5 text-white" />
                </div>
                <h4 className="text-lg font-bold bg-gradient-to-r from-amber-500 to-orange-400 bg-clip-text text-transparent">
                  Areas for Improvement
                </h4>
              </div>
              <ul className="space-y-3">
                {weakAreas.map((area, index) => (
                  <li key={index} className="flex items-start gap-3 group/item">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-400/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:from-amber-500/30 group-hover/item:to-orange-400/30 transition-all">
                      <div className="h-2 w-2 rounded-full bg-amber-500" />
                    </div>
                    <span className="text-sm text-foreground leading-relaxed flex-1">{area}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>

        {/* Suggested Next Steps Card */}
        <Card className="relative overflow-hidden group p-6 bg-gradient-to-br from-[#4d32fb]/15 via-[#6b4fff]/10 to-[#8a6cff]/5 dark:from-[#4d32fb]/20 dark:via-[#6b4fff]/15 dark:to-[#8a6cff]/10 backdrop-blur-xl border-primary/25 shadow-glow-sm hover:shadow-glow transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-[#4d32fb]/20 via-[#6b4fff]/10 to-[#8a6cff]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#4d32fb] to-[#6b4fff] flex items-center justify-center shadow-glow-sm">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <h4 className="text-lg font-bold bg-gradient-to-r from-[#4d32fb] via-[#6b4fff] to-[#8a6cff] bg-clip-text text-transparent">
                Suggested Next Steps
              </h4>
            </div>
            <ul className="space-y-3">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start gap-3 group/item p-3 rounded-lg bg-gradient-to-br from-primary/5 to-transparent hover:from-primary/10 hover:to-primary/5 transition-all duration-300">
                  <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-[#4d32fb]/20 to-[#6b4fff]/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:from-[#4d32fb]/30 group-hover/item:to-[#6b4fff]/30 transition-all">
                    <Sparkles className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="text-sm text-foreground leading-relaxed flex-1">{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}


