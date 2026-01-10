import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: number;
  title: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export const StepIndicator = ({ steps, currentStep }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {steps.map((step, index) => {
        const isComplete = currentStep > step.id;
        const isActive = currentStep === step.id;
        const isPending = currentStep < step.id;

        return (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center w-14">
              <div
                className={cn(
                  "step-indicator",
                  isComplete && "step-complete",
                  isActive && "step-active",
                  isPending && "step-pending"
                )}
              >
                {isComplete ? <Check className="w-5 h-5" /> : step.id}
              </div>
              <span
                className={cn(
                  "mt-2 text-xs font-medium hidden sm:block",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "w-12 sm:w-20 h-0.5 mx-2 transition-colors duration-300",
                  isComplete ? "step-complete" : "step-pending"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
