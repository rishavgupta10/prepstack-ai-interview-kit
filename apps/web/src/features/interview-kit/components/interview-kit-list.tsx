"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  Building2,
  Calendar,
  Layers,
  HelpCircle,
  Eye,
  Trash2,
  Clock,
  ExternalLink,
} from "lucide-react";
import { Confirm, Notify } from "notiflix";
import { useDeleteInterviewKit, useInterviewKits } from "../hooks/use-interview-kit";
import { Loader } from "@/shared/components/Loader";
import { EmptyState } from "@/shared/components/empty-state";
import { ErrorState } from "@/shared/components/error-state";
import type { InterviewKit } from "../types/interview-kit.types";

interface InterviewKitListProps {
  onCreateClick?: () => void;
}

export function InterviewKitList({ onCreateClick }: InterviewKitListProps) {
  const router = useRouter();
  const { data: kits, isLoading, isError, error, refetch } = useInterviewKits();
  const deleteMutation = useDeleteInterviewKit();

  const handleDelete = (e: React.MouseEvent, kit: InterviewKit) => {
    e.stopPropagation();
    const company = kit.source?.company_name || "this";
    const role = kit.source?.role || kit.role?.title || "role";

    Confirm.show(
      "Delete Interview Kit",
      `Are you sure you want to delete the kit for ${company} (${role})? This action cannot be undone.`,
      "Delete",
      "Cancel",
      async () => {
        try {
          await deleteMutation.mutateAsync(kit._id);
          Notify.success("Interview kit deleted successfully.");
        } catch (err: unknown) {
          const message =
            err instanceof Error ? err.message : "Failed to delete interview kit.";
          Notify.failure(message);
        }
      },
      () => {},
      {
        backgroundColor: "#ffffff",
        titleColor: "#0f172a",
        messageColor: "#475569",
        okButtonBackground: "#ef4444",
        okButtonColor: "#ffffff",
        cancelButtonBackground: "#f1f5f9",
        cancelButtonColor: "#334155",
        borderRadius: "16px",
      },
    );
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-4">
        <ErrorState message={error?.message || "Failed to load interview kits."} />
        <div className="flex justify-center">
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const kitList = kits ?? [];

  if (kitList.length === 0) {
    return (
      <div className="bg-white border border-slate-200/90 rounded-2xl p-8 text-center space-y-4 shadow-xs">
        <EmptyState
          title="No Interview Kits Yet"
          description="Generate your first tailored interview kit with custom questions, company insights, flashcards, and a day-by-day prep schedule."
        />
        {onCreateClick && (
          <button
            onClick={onCreateClick}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-purple-500/20"
          >
            Create Your First Kit
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
        <div>
          <h2 className="font-bold text-slate-950 text-base">Your Interview Kits</h2>
          <p className="text-xs text-slate-500 font-medium">
            Tailored prep kits synthesized from company research and job descriptions
          </p>
        </div>

        <div className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-slate-700 shadow-2xs">
          {kitList.length} {kitList.length === 1 ? "Kit" : "Kits"}
        </div>
      </div>

      {/* List */}
      <div className="divide-y divide-slate-100">
        {kitList.map((kit) => {
          const companyName = kit.source?.company_name || "Company";
          const roleTitle = kit.source?.role || kit.role?.title || "Role";
          const seniority = kit.role?.seniority;
          const questionsCount = kit.questions?.length ?? 0;
          const flashcardsCount = kit.flashcards?.length ?? 0;
          const scheduleDays = kit.schedule?.days_available ?? kit.schedule?.days?.length ?? 0;
          const date = kit.createdAt
            ? new Date(kit.createdAt).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : null;

          return (
            <div
              key={kit._id}
              onClick={() => router.push(`/interview-kit/${kit._id}`)}
              className="group flex flex-col md:flex-row md:items-center justify-between p-5 sm:p-6 gap-4 hover:bg-slate-50/80 transition-colors cursor-pointer"
            >
              {/* Left Details */}
              <div className="flex items-start gap-4 min-w-0 flex-1">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200/80 text-purple-600 shadow-2xs">
                  <Building2 size={22} />
                </div>

                <div className="space-y-1.5 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-bold text-slate-950 text-base truncate group-hover:text-purple-600 transition-colors">
                      {companyName}
                    </h3>
                    {seniority && (
                      <span className="rounded-md bg-purple-50 border border-purple-200 px-2.5 py-0.5 text-xs font-semibold text-purple-700 capitalize">
                        {seniority}
                      </span>
                    )}
                    {kit.coverage?.passes ? (
                      <span className="rounded-md bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
                        {kit.coverage.passes} Pass Coverage
                      </span>
                    ) : null}
                  </div>

                  <p className="text-sm font-semibold text-slate-700 flex items-center gap-1.5 truncate">
                    <Briefcase size={14} className="text-slate-400 shrink-0" />
                    <span className="truncate">{roleTitle}</span>
                  </p>

                  {/* Metadata Chips */}
                  <div className="flex flex-wrap items-center gap-3.5 pt-1 text-xs font-medium text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <HelpCircle size={14} className="text-violet-600" />
                      {questionsCount} Questions
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Layers size={14} className="text-blue-600" />
                      {flashcardsCount} Flashcards
                    </span>
                    {scheduleDays > 0 && (
                      <span className="flex items-center gap-1.5">
                        <Clock size={14} className="text-amber-600" />
                        {scheduleDays}-Day Plan
                      </span>
                    )}
                    {date && (
                      <span className="flex items-center gap-1.5 text-slate-400">
                        <Calendar size={14} />
                        {date}
                      </span>
                    )}
                    {kit.source?.company_url && (
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(kit.source.company_url, "_blank", "noopener,noreferrer");
                        }}
                        className="inline-flex items-center gap-1 text-purple-600 hover:underline cursor-pointer font-semibold"
                      >
                        <ExternalLink size={12} />
                        Company site
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div
                className="flex items-center gap-2.5 self-end md:self-center shrink-0"
                onClick={(e) => e.stopPropagation()}
              >
                <Link
                  href={`/interview-kit/${kit._id}`}
                  className="flex items-center gap-1.5 rounded-xl border border-purple-200 bg-purple-50/70 px-4 py-2 text-xs font-bold text-purple-700 hover:bg-purple-600 hover:text-white transition-all shadow-2xs"
                >
                  <Eye size={15} />
                  <span>Open Kit</span>
                </Link>

                <button
                  type="button"
                  onClick={(e) => handleDelete(e, kit)}
                  disabled={deleteMutation.isPending}
                  title="Delete interview kit"
                  className="flex items-center justify-center h-9 w-9 rounded-xl border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-all disabled:opacity-50"
                  aria-label="Delete interview kit"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
