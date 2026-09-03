"use client";

import { useParams } from "next/navigation";
import { DashboardLayout } from "@/shared/components/dashboard-layout";
import { InterviewKitDetail } from "@/features/interview-kit/components/interview-kit-detail";

export default function InterviewKitDetailPage() {
  const params = useParams();
  const id = (params?.id as string) || "";

  return (
    <DashboardLayout>
      <div className="mt-12 md:p-6 p-3 text-slate-200 max-w-7xl mx-auto">
        <InterviewKitDetail id={id} />
      </div>
    </DashboardLayout>
  );
}
