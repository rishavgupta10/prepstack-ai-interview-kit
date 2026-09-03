"use client";

import {
  Briefcase,
  FolderGit2,
  Mail,
  Sparkles,
} from "lucide-react";

import { EmptyState } from "@/shared/components/empty-state";
import { useDashboard } from "../hooks/use-dashboard";
import { useAuth } from "@/shared/hooks/use-auth";
import DashboardSummarySkeleton from "@/shared/components/skeletons/DashboardSummarySkeleton";

export function DashboardSummary() {
  const { user } = useAuth();
  const { resumeQuery } = useDashboard();

  if (resumeQuery.isLoading) {
    return <DashboardSummarySkeleton />;
  }

  const resume = resumeQuery.data?.data;

  if (!resume) {
    return (
      <EmptyState
        title="No Resume Found"
        description="Upload your resume to begin personalized coaching."
      />
    );
  }

  const stats = [
    {
      label: "Experience",
      value: `${resume.experienceYears}y`,
      icon: Briefcase,
    },
    {
      label: "Skills",
      value: resume.skills?.length ?? 0,
      icon: Sparkles,
    },
    {
      label: "Projects",
      value: resume.projects?.length ?? 0,
      icon: FolderGit2,
    },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs">
      {/* Accent */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-purple-600 via-blue-600 to-violet-600" />

      {/* Header */}
      <div className="flex items-center gap-4 pt-1">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 text-lg font-bold text-white shadow-md shadow-purple-500/20">
          {user?.name?.charAt(0)?.toUpperCase() ?? "U"}
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="truncate text-xl font-bold text-slate-950">
            {user?.name}
          </h2>

          <div className="mt-0.5 flex items-center gap-2 text-xs font-medium text-slate-500">
            <Mail size={14} className="text-slate-400" />
            <span className="truncate">{user?.email}</span>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-xs font-bold text-emerald-700">Active Coach</span>
        </div>
      </div>

      {/* Resume Summary */}
      <div className="mt-5 rounded-xl border border-slate-200/80 bg-slate-50/60 p-4">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Resume Overview
            </p>
            <p className="text-xs font-semibold text-slate-700">
              Professional Snapshot
            </p>
          </div>

          <div className="rounded-lg bg-purple-50 border border-purple-200 px-2.5 py-1 text-xs font-bold text-purple-700">
            Ready
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-xl border border-slate-200/90 bg-white p-3 space-y-1 shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600 border border-purple-100">
                    <Icon size={16} />
                  </div>

                  <span className="text-lg font-bold text-slate-950">
                    {stat.value}
                  </span>
                </div>

                <p className="text-xs font-semibold text-slate-500 pt-1">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}