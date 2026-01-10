"use client";

import JobsManagerProvider from "@/context/JobsManagerProvider";
import ResumeManagerProvider from "@/context/ResumeManagerProvider";
import { SocketProvider } from "@/context/SocketProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ResumeManagerProvider>
      <JobsManagerProvider>
        {/* <SocketProvider> */}
          <div className="@component/main px-6 h-full w-full pb-4">
            {children}
          </div>
        {/* </SocketProvider> */}
      </JobsManagerProvider>
    </ResumeManagerProvider>
  );
}
