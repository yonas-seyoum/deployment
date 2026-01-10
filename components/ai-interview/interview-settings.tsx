"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

const interviewTypes = [
  "Software Engineer",
  "Accountant",
  "Project Manager",
  "Sales",
  "Custom",
];

const difficultyLevels = ["Easy", "Medium", "Hard"];

interface InterviewSettingsProps {
  interviewType: string;
  difficulty: string;
  onInterviewTypeChange: (value: string) => void;
  onDifficultyChange: (value: string) => void;
}

export function InterviewSettings({
  interviewType,
  difficulty,
  onInterviewTypeChange,
  onDifficultyChange,
}: InterviewSettingsProps) {
  return (
    <Card className="p-5 space-y-5 bg-card/60 backdrop-blur-sm border-primary/10 shadow-md rounded-2xl">
      <div className="space-y-2">
        <Label htmlFor="interview-type" className="text-sm font-semibold">
          Interview Type
        </Label>
        <Select value={interviewType} onValueChange={onInterviewTypeChange}>
          <SelectTrigger id="interview-type" className="w-full">
            <SelectValue placeholder="Select interview type" />
          </SelectTrigger>
          <SelectContent>
            {interviewTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="difficulty" className="text-sm font-semibold">
          Difficulty
        </Label>
        <Select value={difficulty} onValueChange={onDifficultyChange}>
          <SelectTrigger id="difficulty" className="w-full">
            <SelectValue placeholder="Select difficulty" />
          </SelectTrigger>
          <SelectContent>
            {difficultyLevels.map((level) => (
              <SelectItem key={level} value={level}>
                {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </Card>
  );
}

