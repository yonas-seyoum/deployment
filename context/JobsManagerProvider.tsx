"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Job, JobManagerContextType } from "@/app/types";
import { jobApi } from "@/app/api/job";

export const JobsManagerContext = createContext<
  JobManagerContextType | undefined
>(undefined);

export const useJobsManager = () => {
  const context = useContext(JobsManagerContext);
  if (!context) {
    throw new Error("useJobsManager must be used within a JobsManagerProvider");
  }
  return context;
};

export default function JobsManagerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = useQueryClient();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const {
    data: jobsData,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["jobs"],
    queryFn: jobApi.fetchJobs,
    staleTime: 1000 * 60 * 5,
  });

  const searchJobsMutation = useMutation({
    mutationFn: ({
      searchTerm,
      location,
    }: {
      searchTerm: string;
      location: string;
    }) => jobApi.searchJob(searchTerm, location),

    onSuccess: (data) => {
      queryClient.setQueryData(["jobs"], data);
      setSelectedJob(data.jobs[0] || null);
    },

    onError: (err) => {
      console.error("Error searching jobs:", err);
    },
  });

  const searchJobs = async (searchTerm: string, location: string) => {
    return searchJobsMutation.mutateAsync({ searchTerm, location });
  };

  const selectJob = (id: string) => {
    const job = jobsData?.jobs.find((job) => job.id === id) || null;
    setSelectedJob(job);
  };

  const saveJob = useMutation({
    mutationFn: async ({
      job: newJob,
      source,
    }: {
      job: Job;
      source: "external" | "internal";
    }) => jobApi.saveJob(newJob, source),
  });

  useEffect(() => {
    setSelectedJob(jobsData?.jobs[0] || null);
  }, [jobsData]);

  return (
    <JobsManagerContext.Provider
      value={{
        jobsData,
        loading,
        error: error ? (error as Error).message : null,
        selectedJob,
        selectJob,
        saveJob,
        searchJobs,
      }}
    >
      {children}
    </JobsManagerContext.Provider>
  );
}
