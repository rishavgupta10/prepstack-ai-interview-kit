"use client";

import Link from "next/link";
import { Eye, Trash2, Briefcase, Clock3 } from "lucide-react";
import { useInterviews } from "../hooks/use-interviews";
import { Loader } from "@/shared/components/Loader";
import { EmptyState } from "@/shared/components/empty-state";

export function InterviewList() {
  const { data, isLoading } = useInterviews();

  if (isLoading) {
    return <Loader />;
  }

  const interviews = data?.data ?? [];

  if (interviews.length === 0) {
    return (
      <EmptyState
        title="No Interviews Yet"
        description="Start your first interactive interview session."
      />
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
        <div>
          <h2 className="font-bold text-slate-950 text-base">Interview History</h2>
          <p className="text-xs text-slate-500 font-medium">Recent interview practice sessions</p>
        </div>

        <div className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-slate-700 shadow-2xs">
          {interviews.length} Total
        </div>
      </div>

      {/* List */}
      <div className="divide-y divide-slate-100">
        {interviews.map((interview: any) => (
          <div
            key={interview._id}
            className="group flex items-center justify-between p-5 sm:p-6 hover:bg-slate-50/80 transition-colors"
          >
            {/* Left */}
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 border border-purple-200 text-purple-600 shadow-2xs">
                <Briefcase size={20} />
              </div>

              <div>
                <h3 className="font-bold text-slate-950 text-base">{interview.role}</h3>

                <div className="mt-1 flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <Clock3 size={13} className="text-slate-400" />
                  <span className="capitalize text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded">
                    {interview.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-2.5">
              <Link
                href={`/interview/${interview._id}`}
                className="flex items-center gap-1.5 rounded-xl border border-purple-200 bg-purple-50/70 px-4 py-2 text-xs font-bold text-purple-700 hover:bg-purple-600 hover:text-white transition-all shadow-2xs"
              >
                <Eye size={15} />
                View Session
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
