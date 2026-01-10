"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ResumePreviewProps } from "@/app/types";
import { TemplateComponents } from "./templates";

export interface Props {
  resumeData: ResumePreviewProps["resumeData"];
}

export default function DownloadResumeButton({ resumeData }: Props) {
  if (!resumeData) return null;

  const SelectedTemplate =
    TemplateComponents[resumeData.template as keyof typeof TemplateComponents];

  return (
    <PDFDownloadLink
      document={<SelectedTemplate resumeData={resumeData} />}
      fileName="resume.pdf"
    >
      {({ loading }) => (
        <Button className="gap-2 bg-blue-600 hover:bg-blue-700 transition-colors duration-200 text-white">
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">
            {loading ? "Generating..." : "Download"}
          </span>
        </Button>
      )}
    </PDFDownloadLink>
  );
}
