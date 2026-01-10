"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import OptimizeCoverLetter from "./optimize-cover-letter";
import GenerateCoverLetter from "./generate-cover-letter";
import { useState } from "react";

export function CoverLetter() {
  const [activeTab, setActiveTab] = useState<string>("generate");
  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="py-4 px-2 md:px-6 h-full overfow-y-scroll hide-scroll"
    >
      <TabsList className="bg-card rounded-lg border border-border mb-4 flex flex-wrap">
        <TabsTrigger value="generate" className="flex-1 text-center">
          Generate
        </TabsTrigger>
        <TabsTrigger value="optimize" className="flex-1 text-center">
          Optimize
        </TabsTrigger>
      </TabsList>

      <TabsContent value="generate" className="h-full">
        <GenerateCoverLetter />
      </TabsContent>

      <TabsContent value="optimize" className="h-full">
        <OptimizeCoverLetter />
      </TabsContent>
    </Tabs>
  );
}