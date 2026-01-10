"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui/accordion";
import {
  ArrowLeft,
  Bookmark,
  MapPin,
  DollarSign,
  Briefcase,
  Calendar,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Progress } from "../ui/progress";
import JobDetailsSkeleton from "./skeleton/job-detail-skeleton";
import { Job, User } from "@/app/types";
import { useJobsManager } from "@/context/JobsManagerProvider";
import { useState } from "react";
import EasyApplyModal from "./easy-apply/easy-apply-modal";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface JobDetailProps {
  job: (Job & { source: "internal" | "external"; easyApplied: boolean }) | null;
  onBack?: () => void;
}

export function JobDetail({ job, onBack }: JobDetailProps) {
  const { saveJob } = useJobsManager();

  const [open, setOpen] = useState<boolean>(false);
  const handleDialogState = () => setOpen((prev) => !prev);

  const fetchProfile = async () => {
    const res = await axios.get("/api/profile");
    return res.data as User;
  };

  const { data: user } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
    staleTime: Infinity,
  });

  const jobIsApplied = (id: string) => {
    const appliedJob = user?.seekerApplications?.find((job) => job.jobId === id);
    return appliedJob ? true : false;
  };

  if (!job) {
    return <JobDetailsSkeleton />;
  }

  return (
    <div className="flex-1">
      <Card className="h-full rounded-lg border border-border max-h-screen overflow-y-scroll hide-scroll shadow-none">
        <div className="p-6 space-y-6">
          {onBack && (
            <Button
              variant="outline"
              size="sm"
              onClick={onBack}
              className="md:hidden mb-2 gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          )}

          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  {job.title}
                </h1>
                <p className="text-lg text-muted-foreground">
                  {job.companyName}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => saveJob.mutate({ job, source: "external" })}
              >
                <Bookmark className="w-5 h-5 fill-amber-400" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <DollarSign className="w-4 h-4 text-muted-foreground" />
                <span>{job.fixedBudget || job.salaryMax}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Briefcase className="w-4 h-4 text-muted-foreground" />
                <span>{job.jobType}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>
                  {new Date(job.postedAt).toDateString()}
                </span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              {job.source === "external" ? (
                job.applicationLink ? (
                  <a href={job.applicationLink} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600">
                    Apply Now
                  </Button>
                </a>
                ) : (
                  <Button className="bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600" disabled>
                    Apply Now
                  </Button>
                )
              ) : (
                <Button
                  className="bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600"
                  onClick={() => setOpen(true)}
                  disabled={jobIsApplied(job.id)}
                >
                  {jobIsApplied(job.id) ? "Applied" : "Easy Apply"}
                </Button>
              )}
            </div>
          </div>

          <div className="md:hidden space-y-6">
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-32 h-32">
                <svg
                  className="w-full h-full transform -rotate-90"
                  viewBox="0 0 120 120"
                >
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                  />

                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke="url(#gaugeGradient)"
                    strokeWidth="8"
                    strokeDasharray={`${(12 / 100) * 339.29} 339.29`}
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient
                      id="gaugeGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#ef4444" />
                      <stop offset="50%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold">12%</span>
                  <span className="text-xs text-muted-foreground">
                    Match Score
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Hard Skills</span>
                  <span className="text-xs text-muted-foreground">1 / 10</span>
                </div>
                <Progress value={10} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Soft Skills</span>
                  <span className="text-xs text-muted-foreground">2 / 14</span>
                </div>
                <Progress value={14} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Other</span>
                  <span className="text-xs text-muted-foreground">0 / 1</span>
                </div>
                <Progress value={0} className="h-2" />
              </div>
            </div>

            <div className="space-y-2">
              <Button className="w-full  text-white gap-2">
                Increase Match Score
                <ArrowUpRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" className="w-full gap-2 bg-transparent">
                <Bookmark className="w-4 h-4 fill-amber-400" />
                Bookmark in Tracker
              </Button>
            </div>
          </div>

          <div className="border-t border-border" />

          <Accordion
            type="multiple"
            defaultValue={["description", "requirements", "benefits"]}
          >
            <AccordionItem value="description">
              <AccordionTrigger className="text-base font-semibold hover:no-underline">
                Job Description
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                {job.description}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="requirements">
              <AccordionTrigger className="text-base font-semibold hover:no-underline">
                Requirements
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {job.responsibilities?.map((req, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="benefits">
              <AccordionTrigger className="text-base font-semibold hover:no-underline">
                Benefits & Perks
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Competitive health insurance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>401(k) matching</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Professional development budget</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Flexible work arrangements</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Card>
      <EasyApplyModal open={open} setOpen={handleDialogState} job={job} />
    </div>
  );
}
