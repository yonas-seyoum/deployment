"use client";

import { Card } from "@/components/ui/card";
import { Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface Screenshot {
  title: string;
  description: string;
  placeholder: string;
  alt: string;
}

const screenshots: Screenshot[] = [
  {
    title: "Dashboard Overview",
    description: "Comprehensive dashboard showing job matches, application status, and career insights",
    placeholder: "/api/placeholder/800/600",
    alt: "Career ScaleUp Dashboard",
  },
  {
    title: "Resume Builder",
    description: "Easy-to-use resume builder with AI-powered suggestions and templates",
    placeholder: "/api/placeholder/800/600",
    alt: "Resume Builder Interface",
  },
  {
    title: "AI Interview Coach",
    description: "Practice interviews with real-time AI feedback and personalized coaching",
    placeholder: "/api/placeholder/800/600",
    alt: "AI Interview Coach",
  },
  {
    title: "Job Matching Results",
    description: "Smart job matching with compatibility scores and detailed job information",
    placeholder: "/api/placeholder/800/600",
    alt: "Job Matching Results",
  },
  {
    title: "Messaging Interface",
    description: "Direct communication with recruiters and AI-powered response suggestions",
    placeholder: "/api/placeholder/800/600",
    alt: "Messaging Interface",
  },
  {
    title: "Analytics Dashboard",
    description: "Track your application progress and career growth with detailed analytics",
    placeholder: "/api/placeholder/800/600",
    alt: "Analytics Dashboard",
  },
];

export function PlatformScreenshots() {
  return (
    <section className="py-24 bg-muted/30 dark:bg-black/50">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            See Career ScaleUp in Action
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our platform through real screenshots and see how we transform career growth
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {screenshots.map((screenshot, index) => (
            <Card
              key={index}
              className="group overflow-hidden border-border bg-card hover:border-[#4d32fb]/50 transition-all duration-300"
            >
              <div className="relative aspect-video bg-muted dark:bg-black/50 flex items-center justify-center overflow-hidden">
                {/* 
                  TO ADD YOUR SCREENSHOTS:
                  1. Add images to public/screenshots/ folder
                  2. Update the 'placeholder' path in the screenshots array above (line 14-51)
                  3. Uncomment the Image component below
                  4. Comment out or remove the placeholder div
                */}
                
                {/* Placeholder - Remove this when you add actual images */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-3 p-8">
                    <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="text-sm text-muted-foreground font-medium">
                      Screenshot Placeholder
                    </p>
                    <p className="text-xs text-muted-foreground/70">
                      {screenshot.alt}
                    </p>
                    <p className="text-xs text-muted-foreground/50 mt-2">
                      Add image to: public/screenshots/
                    </p>
                  </div>
                </div>

                {/* Uncomment this when you have actual images */}
                {/* 
                <Image
                  src={screenshot.placeholder}
                  alt={screenshot.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                */}
              </div>
              <div className="p-6 space-y-2">
                <h3 className="text-xl font-semibold text-foreground">
                  {screenshot.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {screenshot.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Instructions for adding screenshots */}
        <div className="mt-12 p-6 rounded-lg bg-muted/50 dark:bg-black/30 border border-border">
          <div className="max-w-2xl mx-auto text-center space-y-2">
            <h3 className="text-lg font-semibold text-foreground">
              How to Add Your Screenshots
            </h3>
            <p className="text-sm text-muted-foreground">
              1. Add your screenshot images to the <code className="px-2 py-1 bg-background dark:bg-black rounded text-xs">public/screenshots/</code> folder
            </p>
            <p className="text-sm text-muted-foreground">
              2. Update the <code className="px-2 py-1 bg-background dark:bg-black rounded text-xs">placeholder</code> property in the screenshots array above
            </p>
            <p className="text-sm text-muted-foreground">
              3. Uncomment the Image component and comment out the placeholder div
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

