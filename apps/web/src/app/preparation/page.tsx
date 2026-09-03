"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/shared/components/dashboard-layout";
import { usePreparations, useCreatePreparation } from "@/features/preparation/hooks/use-preparation";
import { Loader } from "@/shared/components/Loader";
import { EmptyState } from "@/shared/components/empty-state";
import { ErrorState } from "@/shared/components/error-state";
import { Sparkles, Calendar, BookOpen, ArrowRight, X, AlertCircle } from "lucide-react";

export default function PreparationPage() {
  const router = useRouter();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { data, isLoading, isError, error, refetch } = usePreparations();
  const createMutation = useCreatePreparation();

  const handleStartPrep = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobDescription.trim()) return;

    setErrorMsg(null);
    createMutation.mutate(
      { jobDescription },
      {
        onSuccess: (res: any) => {
          if (res?.success && res?.data?._id) {
            router.push(`/preparation/${res.data._id}`);
          } else {
            setErrorMsg(res?.message || "Failed to generate interview preparation.");
          }
        },
        onError: (err: any) => {
          setErrorMsg(err?.response?.data?.message || err?.message || "Something went wrong.");
        },
      }
    );
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex h-[80vh] items-center justify-center">
          <Loader />
        </div>
      </DashboardLayout>
    );
  }

  if (isError) {
    return (
      <DashboardLayout>
        <div className="space-y-6 mt-12 md:p-6 p-3">
          <ErrorState message={error?.message || "Failed to load preparations."} />
          <button
            onClick={() => refetch()}
            className="mx-10 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-colors shadow-sm"
          >
            Retry
          </button>
        </div>
      </DashboardLayout>
    );
  }

  const preps = data?.data ?? [];

  return (
    <DashboardLayout>
      <div className="space-y-6 mt-12 md:p-6 p-3 text-slate-950 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-violet-600 bg-clip-text text-transparent">
              Q&A Sheet & Intro Prep
            </h1>
            <p className="text-sm font-medium text-slate-600 mt-1">
              Analyze JDs against your resume to generate customized introduction scripts and Q&A sheets.
            </p>
          </div>
          {!isFormOpen && (
            <button
              onClick={() => {
                setIsFormOpen(true);
                setErrorMsg(null);
                setJobDescription("");
              }}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-sm font-bold rounded-xl transition-all shadow-md shadow-purple-500/20 shrink-0 self-start sm:self-auto"
            >
              <Sparkles size={16} />
              Prepare for Interview
            </button>
          )}
        </div>

        {/* Generate / Form state */}
        {isFormOpen && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 relative overflow-hidden transition-all shadow-xl">
            {createMutation.isPending && (
              <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-10 flex flex-col items-center justify-center gap-4 text-center p-6">
                <Loader />
                <div className="space-y-1">
                  <p className="font-bold text-lg text-slate-950 animate-pulse">Analyzing Job Description & Resume...</p>
                  <p className="text-sm font-medium text-slate-600 max-w-sm">Generating a senior-level introduction script and 20 tailored Q&As. This may take up to 20 seconds.</p>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-bold text-slate-950">Create New Preparation Sheet</h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">We will extract requirements matching your resume's experience</p>
              </div>
              <button
                onClick={() => setIsFormOpen(false)}
                className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-950 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleStartPrep} className="space-y-4">
              {errorMsg && (
                <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex gap-3 text-rose-800 text-sm font-medium shadow-2xs">
                  <AlertCircle className="shrink-0 text-rose-600" size={18} />
                  <div>
                    <p className="font-bold">Generation Failed</p>
                    <p className="mt-0.5 text-rose-700">{errorMsg}</p>
                    {errorMsg.toLowerCase().includes("resume") && (
                      <button
                        type="button"
                        onClick={() => router.push("/resume")}
                        className="mt-2 text-xs font-bold text-purple-600 hover:underline block"
                      >
                        Go to Resume Upload &rarr;
                      </button>
                    )}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Paste the Job Description (JD)
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the target job description here..."
                  required
                  rows={8}
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl p-4 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-purple-600 focus:ring-3 focus:ring-purple-100 resize-y leading-relaxed transition-all placeholder-slate-400"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-100 rounded-xl text-sm font-semibold text-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-sm font-bold rounded-xl transition-all shadow-md shadow-purple-500/20"
                >
                  Generate Prep Kit
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Previous Preparations List */}
        {!isFormOpen && (
          <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h2 className="font-bold text-slate-950 text-base">Your Prep Kits</h2>
                <p className="text-xs text-slate-500 font-medium">Prepared sessions for interview success</p>
              </div>
              <div className="px-3 py-1 text-xs border border-slate-200 bg-white rounded-full font-bold text-slate-700 shadow-2xs">
                {preps.length} Total
              </div>
            </div>

            {preps.length === 0 ? (
              <div className="p-8">
                <EmptyState
                  title="No Preparations Yet"
                  description="Paste a job description to generate your first tailored interview preparation kit."
                />
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {preps.map((prep: any) => (
                  <div
                    key={prep._id}
                    className="group flex flex-col sm:flex-row sm:items-center justify-between p-5 sm:p-6 gap-4 hover:bg-slate-50/80 transition-colors"
                  >
                    <div className="space-y-1.5 max-w-2xl">
                      <p className="text-sm font-bold text-slate-950 line-clamp-2 leading-relaxed">
                        {prep.jobDescription}
                      </p>
                      <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-500">
                        <span className="flex items-center gap-1.5 text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded">
                          <BookOpen size={13} />
                          {prep.questions?.length || 0} Questions
                        </span>
                        <span className="flex items-center gap-1 text-slate-400">
                          <Calendar size={13} />
                          {new Date(prep.createdAt).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => router.push(`/preparation/${prep._id}`)}
                      className="shrink-0 flex items-center justify-center gap-1.5 px-4 py-2 bg-purple-50 border border-purple-200 text-purple-700 font-bold text-xs rounded-xl hover:bg-purple-600 hover:text-white transition-all shadow-2xs"
                    >
                      Open Prep Kit
                      <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
