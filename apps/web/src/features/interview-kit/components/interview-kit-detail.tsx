"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileText,
  Globe,
  HelpCircle,
  Layers,
  MapPin,
  ShieldCheck,
  Target,
  Trash2,
} from "lucide-react";
import { Confirm, Notify } from "notiflix";
import { useDeleteInterviewKit, useInterviewKit } from "../hooks/use-interview-kit";
import { InterviewKitQuestions } from "./interview-kit-questions";
import { InterviewKitFlashcards } from "./interview-kit-flashcards";
import { Loader } from "@/shared/components/Loader";
import { ErrorState } from "@/shared/components/error-state";
import { FormattedText } from "@/shared/components/formatted-text";
import type { InterviewKit } from "../types/interview-kit.types";

interface InterviewKitDetailProps {
  id: string;
}

type TabKey = "questions" | "flashcards" | "schedule" | "company" | "coverage";

export function InterviewKitDetail({ id }: InterviewKitDetailProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabKey>("questions");

  const { data: kit, isLoading, isError, error, refetch } = useInterviewKit(id);
  const deleteMutation = useDeleteInterviewKit();

  const handleDelete = () => {
    if (!kit) return;
    const company = kit.source?.company_name || "this";

    Confirm.show(
      "Delete Interview Kit",
      `Are you sure you want to delete the kit for ${company}? This cannot be undone.`,
      "Delete",
      "Cancel",
      async () => {
        try {
          await deleteMutation.mutateAsync(kit._id);
          Notify.success("Interview kit deleted successfully.");
          router.push("/interview-kit");
        } catch (err: unknown) {
          const message =
            err instanceof Error ? err.message : "Failed to delete kit.";
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
      <div className="flex h-[80vh] items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (isError || !kit) {
    return (
      <div className="space-y-6 mt-6">
        <ErrorState
          message={error?.message || "Interview kit not found or failed to load."}
        />
        <div className="flex justify-center gap-3">
          <button
            type="button"
            onClick={() => router.push("/interview-kit")}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:text-slate-950 rounded-xl text-sm font-medium transition-colors shadow-xs"
          >
            <ArrowLeft size={16} /> Back to Kits
          </button>
          <button
            type="button"
            onClick={() => refetch()}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const companyName = kit.source?.company_name || "Target Company";
  const roleTitle = kit.source?.role || kit.role?.title || "Target Role";
  const seniority = kit.role?.seniority;
  const location = kit.source?.location;
  const questions = kit.questions || [];
  const flashcards = kit.flashcards || [];
  const scheduleDays = kit.schedule?.days || [];
  const requirements = kit.role?.requirements || [];
  const totalScheduleMinutes = scheduleDays.reduce((acc, d) => acc + (d.minutes || 0), 0);

  // Map question id to question for schedule display
  const questionMap = new Map(questions.map((q) => [q.id, q]));

  // Coverage statistics
  const uncoveredIds = new Set(kit.coverage?.uncovered_requirement_ids || []);
  const coveredCount = requirements.filter((r) => !uncoveredIds.has(r.id)).length;
  const coveragePercent =
    requirements.length > 0
      ? Math.round((coveredCount / requirements.length) * 100)
      : 100;

  return (
    <div className="space-y-6 pb-12">
      {/* Back Button & Actions Row */}
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => router.push("/interview-kit")}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-950 transition-colors"
        >
          <ArrowLeft size={14} /> Back to all interview kits
        </button>

        <button
          type="button"
          onClick={handleDelete}
          disabled={deleteMutation.isPending}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-rose-200 bg-rose-50 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition-colors"
        >
          <Trash2 size={13} />
          <span>Delete Kit</span>
        </button>
      </div>

      {/* Hero Header Card */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-xs">
        {/* Top Radiant Accent Bar */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-purple-600 via-blue-600 to-violet-600" />

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pt-1">
          <div className="space-y-3 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-purple-50 border border-purple-200 px-2.5 py-1 text-xs font-semibold text-purple-700">
                <Building2 size={13} />
                {companyName}
              </span>
              {seniority && (
                <span className="rounded-md bg-slate-100 border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700 capitalize">
                  {seniority} Level
                </span>
              )}
              {location && (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500">
                  <MapPin size={12} className="text-slate-400" />
                  {location}
                </span>
              )}
            </div>

            <h1 className="text-2xl line-clamp-5 sm:text-3xl font-bold text-slate-950 tracking-tight">
              {roleTitle}
            </h1>

            {kit.company_brief?.what_they_do && (
              <div className="text-slate-700 line-clamp-3 max-w-3xl">
                <FormattedText text={kit.company_brief.what_they_do} />
              </div>
            )}

            {/* Links & Crawler Attribution */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 pt-2 border-t border-slate-100">
              {kit.source?.company_url && (
                <a
                  href={kit.source.company_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-purple-600 font-semibold hover:underline"
                >
                  <Globe size={13} />
                  {kit.source.company_url.replace(/^https?:\/\//i, "")}
                  <ExternalLink size={11} />
                </a>
              )}
              {kit.source?.researched_at && (
                <span className="flex items-center gap-1 text-slate-500">
                  <Calendar size={13} />
                  Researched on{" "}
                  {new Date(kit.source.researched_at).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              )}
              {kit.source?.pages_used?.length ? (
                <span className="flex items-center gap-1 text-slate-500">
                  <FileText size={13} />
                  {kit.source.pages_used.length} pages crawled
                </span>
              ) : null}
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mt-6 pt-6 border-t border-slate-100">
          <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
              Questions
            </span>
            <span className="text-2xl font-bold text-slate-950 flex items-center gap-2">
              <HelpCircle size={20} className="text-violet-600" />
              {questions.length}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
              Flashcards
            </span>
            <span className="text-2xl font-bold text-slate-950 flex items-center gap-2">
              <Layers size={20} className="text-blue-600" />
              {flashcards.length}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
              Study Schedule
            </span>
            <span className="text-2xl font-bold text-slate-950 flex items-center gap-2">
              <Clock size={20} className="text-amber-600" />
              {kit.schedule?.days_available || scheduleDays.length} Days
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
              JD Coverage
            </span>
            <span className="text-2xl font-bold text-slate-950 flex items-center gap-2">
              <ShieldCheck size={20} className="text-emerald-600" />
              {coveragePercent}%
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200/90 overflow-x-auto no-scrollbar gap-1">
        <button
          type="button"
          onClick={() => setActiveTab("questions")}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
            activeTab === "questions"
              ? "border-purple-600 text-purple-600 bg-purple-50/50"
              : "border-transparent text-slate-600 hover:text-slate-950 hover:bg-slate-100/50"
          }`}
        >
          <HelpCircle size={16} />
          <span>Questions & Answers</span>
          <span className="rounded-full bg-slate-100 border border-slate-200 text-slate-700 px-2 py-0.5 text-xs font-semibold">
            {questions.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("flashcards")}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
            activeTab === "flashcards"
              ? "border-purple-600 text-purple-600 bg-purple-50/50"
              : "border-transparent text-slate-600 hover:text-slate-950 hover:bg-slate-100/50"
          }`}
        >
          <Layers size={16} />
          <span>Flashcards</span>
          <span className="rounded-full bg-slate-100 border border-slate-200 text-slate-700 px-2 py-0.5 text-xs font-semibold">
            {flashcards.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("schedule")}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
            activeTab === "schedule"
              ? "border-purple-600 text-purple-600 bg-purple-50/50"
              : "border-transparent text-slate-600 hover:text-slate-950 hover:bg-slate-100/50"
          }`}
        >
          <Calendar size={16} />
          <span>Daily Schedule</span>
          <span className="rounded-full bg-slate-100 border border-slate-200 text-slate-700 px-2 py-0.5 text-xs font-semibold">
            {scheduleDays.length}d
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("company")}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
            activeTab === "company"
              ? "border-purple-600 text-purple-600 bg-purple-50/50"
              : "border-transparent text-slate-600 hover:text-slate-950 hover:bg-slate-100/50"
          }`}
        >
          <Building2 size={16} />
          <span>Company & Role</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("coverage")}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
            activeTab === "coverage"
              ? "border-purple-600 text-purple-600 bg-purple-50/50"
              : "border-transparent text-slate-600 hover:text-slate-950 hover:bg-slate-100/50"
          }`}
        >
          <Target size={16} />
          <span>Coverage Report</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div className="pt-2">
        {/* 1. Questions Tab */}
        {activeTab === "questions" && (
          <InterviewKitQuestions questions={questions} requirements={requirements} />
        )}

        {/* 2. Flashcards Tab */}
        {activeTab === "flashcards" && (
          <InterviewKitFlashcards flashcards={flashcards} requirements={requirements} />
        )}

        {/* 3. Daily Schedule Tab */}
        {activeTab === "schedule" && (
          <div className="space-y-5">
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-bold text-slate-950">
                    Structured Study Roadmap ({scheduleDays.length} Days)
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Estimated total preparation time: {totalScheduleMinutes} minutes (~
                    {(totalScheduleMinutes / 60).toFixed(1)} hours)
                  </p>
                </div>
              </div>

              {scheduleDays.length === 0 ? (
                <p className="text-sm text-slate-500">No schedule generated.</p>
              ) : (
                <div className="space-y-4">
                  {scheduleDays.map((day) => {
                    const dayQuestions = (day.question_ids || [])
                      .map((qid) => questionMap.get(qid))
                      .filter(Boolean);

                    return (
                      <div
                        key={day.day}
                        className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-5 space-y-3"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-600 text-white font-bold font-mono text-xs shadow-xs">
                              D{day.day}
                            </span>
                            <div>
                              <h4 className="font-bold text-slate-950 text-base">
                                Day {day.day}: {day.focus}
                              </h4>
                              <p className="text-xs text-slate-500 font-medium">
                                {day.question_ids?.length || 0} Questions assigned
                              </p>
                            </div>
                          </div>

                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg self-start sm:self-auto">
                            <Clock size={13} />
                            {day.minutes} min
                          </span>
                        </div>

                        {/* List of Questions for this Day */}
                        {dayQuestions.length > 0 && (
                          <div className="pt-3 border-t border-slate-200/60 space-y-2">
                            {dayQuestions.map((q, qIndex) => (
                              <div
                                key={q!.id}
                                className="flex items-start gap-2.5 text-xs font-medium text-slate-800 bg-white rounded-lg p-3 border border-slate-200/80 shadow-2xs"
                              >
                                <span className="font-mono text-slate-400 font-bold shrink-0">
                                  #{qIndex + 1}
                                </span>
                                <span className="flex-1">{q!.prompt}</span>
                                <span className="capitalize text-[11px] font-semibold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded shrink-0">
                                  {q!.category}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 4. Company & Role Tab */}
        {activeTab === "company" && (
          <div className="space-y-6">
            {/* Company Research Brief */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 space-y-5 shadow-xs">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <Building2 size={18} className="text-purple-600" />
                <h3 className="text-lg font-bold text-slate-950">Company Intelligence Brief</h3>
              </div>

              {kit.company_brief ? (
                <div className="space-y-5">
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Overview & Executive Summary
                    </h4>
                    <div className="bg-slate-50/80 p-5 rounded-xl border border-slate-200/80">
                      <FormattedText text={kit.company_brief.summary || "No summary available."} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      What They Do & Product Strategy
                    </h4>
                    <div className="bg-slate-50/80 p-5 rounded-xl border border-slate-200/80">
                      <FormattedText text={kit.company_brief.what_they_do || "No data available."} />
                    </div>
                  </div>

                  {kit.company_brief.sources?.length > 0 && (
                    <div className="space-y-2 pt-3 border-t border-slate-100">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Crawled Research Sources
                      </h4>
                      <ul className="flex flex-wrap gap-2">
                        {kit.company_brief.sources.map((src, i) => (
                          <li key={i}>
                            <a
                              href={src}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-semibold text-purple-600 hover:underline bg-purple-50/50 border border-purple-200 px-3 py-1 rounded-lg"
                            >
                              <Globe size={12} />
                              {src}
                              <ExternalLink size={10} />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-sm text-slate-500">No company brief generated.</p>
              )}
            </div>

            {/* Role Responsibilities & Requirements */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 space-y-6 shadow-xs">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <Briefcase size={18} className="text-purple-600" />
                <h3 className="text-lg font-bold text-slate-950">Target Role Profile</h3>
              </div>

              {/* Responsibilities */}
              {kit.role?.responsibilities?.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Key Responsibilities
                  </h4>
                  <ul className="space-y-2">
                    {kit.role.responsibilities.map((resp, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm font-medium text-slate-800 bg-slate-50/70 p-3.5 rounded-xl border border-slate-200/80"
                      >
                        <span className="text-purple-600 font-bold text-base leading-none">•</span>
                        <span className="leading-relaxed">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Requirements Table */}
              {requirements.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    JD Requirements & Competencies ({requirements.length})
                  </h4>
                  <div className="divide-y divide-slate-100 rounded-xl border border-slate-200 overflow-hidden bg-white shadow-2xs">
                    {requirements.map((req) => (
                      <div
                        key={req.id}
                        className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50/80 transition-colors"
                      >
                        <span className="text-sm font-medium text-slate-900">{req.text}</span>
                        <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
                          <span className="rounded-md bg-slate-100 border border-slate-200 px-2.5 py-0.5 text-xs font-semibold text-slate-700 capitalize">
                            {req.kind}
                          </span>
                          <span
                            className={`rounded-md px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider ${
                              req.priority === "must"
                                ? "bg-rose-50 border border-rose-200 text-rose-700"
                                : "bg-purple-50 border border-purple-200 text-purple-700"
                            }`}
                          >
                            {req.priority}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 5. Coverage Report Tab */}
        {activeTab === "coverage" && (
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 space-y-6 shadow-xs">
            <div className="flex items-center justify-between flex-wrap gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-950 flex items-center gap-2">
                  <Target size={18} className="text-emerald-600" />
                  JD Requirement Coverage Analysis
                </h3>
                <p className="text-xs font-medium text-slate-500 mt-0.5">
                  Verifies that generated questions evaluate all essential required competencies.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500 font-medium">
                  Coverage Passes:{" "}
                  <strong className="text-slate-950 font-bold">{kit.coverage?.passes ?? 1}</strong>
                </span>
                <span className="rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-700">
                  {coveragePercent}% Covered
                </span>
              </div>
            </div>

            {/* Covered Requirements */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-600" />
                Covered Competencies ({coveredCount})
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {requirements
                  .filter((r) => !uncoveredIds.has(r.id))
                  .map((req) => (
                    <div
                      key={req.id}
                      className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-50/40 border border-emerald-200/80 text-xs font-medium"
                    >
                      <span className="text-slate-900">{req.text}</span>
                      <span className="rounded bg-emerald-100 text-emerald-800 px-2 py-0.5 text-[10px] font-bold capitalize shrink-0 ml-2">
                        {req.kind}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Uncovered Requirements */}
            {uncoveredIds.size > 0 && (
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center gap-2">
                  <AlertCircle size={16} />
                  Uncovered Competencies ({uncoveredIds.size})
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {requirements
                    .filter((r) => uncoveredIds.has(r.id))
                    .map((req) => (
                      <div
                        key={req.id}
                        className="flex items-center justify-between p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs font-medium"
                      >
                        <span className="text-slate-900">{req.text}</span>
                        <span className="rounded bg-amber-100 text-amber-800 px-2 py-0.5 text-[10px] font-bold uppercase shrink-0 ml-2">
                          {req.priority}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
