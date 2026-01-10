"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle, Loader2, AlertCircle } from "lucide-react";

export function ApiKeyTest() {
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<{
    status: "success" | "error" | "warning" | null;
    message: string;
    configured: boolean;
  } | null>(null);

  const checkApiKey = async () => {
    setIsChecking(true);
    setResult(null);

    try {
      const response = await fetch("/api/transcribe/test");
      const data = await response.json();

      setResult({
        status: data.status === "success" ? "success" : data.status === "warning" ? "warning" : "error",
        message: data.message,
        configured: data.configured,
      });
    } catch (error: any) {
      setResult({
        status: "error",
        message: "Failed to check API key: " + error.message,
        configured: false,
      });
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <Card className="p-4 bg-card/50 backdrop-blur-sm border-primary/10">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold">Deepgram API Key Status</h4>
          <Button
            onClick={checkApiKey}
            disabled={isChecking}
            size="sm"
            variant="outline"
          >
            {isChecking ? (
              <>
                <Loader2 className="h-3 w-3 mr-2 animate-spin" />
                Checking...
              </>
            ) : (
              "Test API Key"
            )}
          </Button>
        </div>

        {result && (
          <div
            className={`p-3 rounded-lg border ${
              result.status === "success"
                ? "bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400"
                : result.status === "warning"
                ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-600 dark:text-yellow-400"
                : "bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400"
            }`}
          >
            <div className="flex items-start gap-2">
              {result.status === "success" ? (
                <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
              ) : result.status === "warning" ? (
                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              ) : (
                <XCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              )}
              <div className="flex-1">
                <p className="text-sm font-medium">{result.message}</p>
                <p className="text-xs mt-1 opacity-80">
                  {result.configured
                    ? "API key is configured"
                    : "API key is not configured"}
                </p>
              </div>
            </div>
          </div>
        )}

        {!result && (
          <p className="text-xs text-muted-foreground">
            Click "Test API Key" to verify your Deepgram API key is properly
            configured.
          </p>
        )}
      </div>
    </Card>
  );
}


