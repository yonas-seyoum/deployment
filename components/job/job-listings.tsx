"use client";

import { MapPin } from "lucide-react";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Card } from "../ui/card";
import { useJobsManager } from "@/context/JobsManagerProvider";
import JobListSkeleton from "./skeleton/job-listing-skeleton";
import { Job, JobListingsProps } from "@/app/types";

export default function JobListings({
  selectedJob,
  onSelectJob,
}: JobListingsProps) {
  const { jobsData, loading, error } = useJobsManager();

  if (loading) {
    return <JobListSkeleton />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center max-h-screen w-full md:w-96 border border-primary/10 rounded-lg overflow-hidden flex-col bg-card">
        {error}
      </div>
    );
  }

  if (jobsData?.jobs?.length === 0) {
    return (
      <div className="flex-1 flex w-full items-center justify-center h-full text-muted-foreground">
        No jobs found.
      </div>
    );
  }

  const now = Date.now() / 1000;

  const timeAgo = (postedAt: number) => {
    if (!postedAt) return "";
    const seconds = now - postedAt;
    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(seconds / 3600);
    const days = Math.floor(seconds / 86400);

    if (seconds < 60) return rtf.format(-seconds, "seconds");
    if (minutes < 60) return rtf.format(-minutes, "minutes");
    if (hours < 24) return rtf.format(-hours, "hours");
    return rtf.format(-days, "days");
  };

  return (
    <div className="max-h-screen w-full md:w-96 border border-border rounded-lg overflow-hidden flex flex-col bg-card">
      <div className="p-4 flex justify-between items-center gap-2">
        <h2 className="font-semibold text-foreground text-sm">
          {"10,000"}+ Jobs
        </h2>
        <Select>
          <SelectTrigger className="h-8 w-fit shadow-none">
            <SelectValue placeholder="All Jobs" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Jobs</SelectItem>
            <SelectItem value="this-site">Posted Here</SelectItem>
            <SelectItem value="other">Other Sources</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-y-scroll flex-1 hide-scroll ">
        {jobsData?.jobs.map((job: Job) => (
          <Card
            key={job.id}
            onClick={() => onSelectJob(job.id)}
            className={`w-full text-left p-4  hover:text-white  dark:hover:text-white transition-all rounded-none shadow-none cursor-pointer relative group bg-card! ${
              selectedJob?.id === job.id
                ? "border-l-4 border-l-[#4d32fb] text-white dark:border-l-[#4d32fb] dark:text-white"
                : ""
            }`}
          >
            <div className="space-y-2">
              <div>
                <h3 className="font-semibold text-foreground text-sm">
                  {job.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {job.companyName}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span>{job.location}</span>
              </div>

              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-xs">
                  {job.jobType}
                </Badge>

                {job.fixedBudget && (
                  <span className="text-xs font-medium text-foreground">
                    {job.fixedBudget}$
                  </span>
                )}

                {job.hourlyRate && (
                  <span className="text-xs font-medium text-foreground">
                    {job.hourlyRate}$/hr
                  </span>
                )}

                {job.salaryMax && job.salaryMin && (
                  <span className="text-xs font-medium text-foreground">
                    {job.salaryMin?.toLocaleString()} -{" "}
                    {job.salaryMax?.toLocaleString()}$
                  </span>
                )}
              </div>

              <p className="text-xs text-muted-foreground">
                {timeAgo(job.postedAt)}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
