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
import ResumePanel from "../resume/resume-panel";
import { useIsMobile } from "@/hooks/use-mobile";

interface JobDetailProps {
  job: (Job & { source: "internal" | "external"; easyApplied: boolean }) | null;
}

export function JobDetail({ job }: JobDetailProps) {
  const { saveJob, setSelectedJob } = useJobsManager();
  const isMobile = useIsMobile();

  const [open, setOpen] = useState<boolean>(false);
  const handleDialogState = () => setOpen((prev) => !prev);

  const fetchProfile = async () => {
    const res = await axios.get("/api/profile");
    return res.data as User;
  };

  const fetchSavedJobs = async () => {
    const response = await axios.get("/api/job/saved");
    return response.data as Job[];
  };

  const { data: user } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
    staleTime: Infinity,
  });

  const { data: savedJobs } = useQuery({
    queryKey: ["savedJobs"],
    queryFn: fetchSavedJobs,
  });

  const jobIsApplied = (id: string) => {
    const appliedJob = user?.seekerApplications?.find(
      (job) => job.jobId === id
    );
    return appliedJob ? true : false;
  };

  const jobIsSaved = (jobId: string) => {
    return savedJobs?.find((job) => job.id === jobId) ? true : false;
  };

  const onBack = () => {
    setSelectedJob(null);
  };

  if (!job || !savedJobs) {
    return <JobDetailsSkeleton />;
  }

  return (
    <div className={`flex-1 rounded-md ${isMobile ? "" : "bg-card!"} `}>
      <Card
        className={`${
          isMobile ? "border-none py-0 bg-none" : "bg-card!"
        } h-full rounded-lg border border-border max-h-screen overflow-y-scroll hide-scroll shadow-none`}
      >
        <div className={`${isMobile ? "p-0" : "px-6"} space-y-6 `}>
          <Button
            variant="outline"
            size="sm"
            onClick={onBack}
            className="md:hidden mb-2 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>

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
                <Bookmark
                  className={`w-5 h-5 ${
                    jobIsSaved(job.id) ? "fill-amber-400" : ""
                  }`}
                />
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
                <span>{new Date(job.postedAt).toDateString()}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              {job.source === "external" ? (
                job.applicationLink ? (
                  <a
                    href={job.applicationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600">
                      Apply Now
                    </Button>
                  </a>
                ) : (
                  <Button
                    className="bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600"
                    disabled
                  >
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
            <ResumePanel />
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
