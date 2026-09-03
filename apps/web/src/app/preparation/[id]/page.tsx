"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { DashboardLayout } from "@/shared/components/dashboard-layout";
import { usePreparationDetail, useGenerateMoreQuestions } from "@/features/preparation/hooks/use-preparation";
import { Loader } from "@/shared/components/Loader";
import { ErrorState } from "@/shared/components/error-state";
import { Accordion } from "@/shared/components/accordion";
import { FormattedText } from "@/shared/components/formatted-text";
import { ArrowLeft, Sparkles, Copy, Check, ChevronDown, ChevronUp, FileText, HelpCircle } from "lucide-react";

export default function PreparationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [copiedIntro, setCopiedIntro] = useState(false);
  const [isJdExpanded, setIsJdExpanded] = useState(false);

  const { data, isLoading, isError, error } = usePreparationDetail(id);
  const generateMoreMutation = useGenerateMoreQuestions();

  const handleCopyIntro = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIntro(true);
    setTimeout(() => setCopiedIntro(false), 2000);
  };

  const handleGenerateMore = () => {
    generateMoreMutation.mutate(id, {
      onSuccess: () => {
        console.log("More questions generated successfully!");
      },
      onError: (err: any) => {
        alert("Failed to generate more questions: " + (err.message || "Unknown error"));
      },
    });
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

  if (isError || !data?.data) {
    return (
      <DashboardLayout>
        <div className="space-y-6 mt-12 md:p-6 p-3">
          <ErrorState message={error?.message || "Failed to load preparation details."} />
          <button
            onClick={() => router.push("/preparation")}
            className="flex items-center gap-2 mx-10 px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:text-slate-950 rounded-xl text-sm font-semibold transition-colors shadow-xs"
          >
            <ArrowLeft size={16} /> Back to List
          </button>
        </div>
      </DashboardLayout>
    );
  }

  const prep = data.data;
  const accordionItems = (prep.questions || []).map((q: any) => ({
    question: q.question,
    answer: <FormattedText text={q.answer} />,
    badge: "AI Suggested Response",
  }));

  return (
    <DashboardLayout>
      <div className="space-y-6 mt-12 md:p-6 p-3 text-slate-950 max-w-7xl mx-auto">
        
        {/* Back and Title */}
        <div className="flex flex-col gap-4">
          <button
            onClick={() => router.push("/preparation")}
            className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-950 transition-colors w-fit"
          >
            <ArrowLeft size={14} /> Back to preparations
          </button>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 flex flex-col gap-4 shadow-xs">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-violet-600 bg-clip-text text-transparent flex items-center gap-2">
                  <FileText size={20} className="text-purple-600" />
                  Interview Prep Kit
                </h1>
                <p className="text-xs font-medium text-slate-500 mt-1">
                  Prepared on {new Date(prep.createdAt).toLocaleDateString(undefined, { dateStyle: "long" })}
                </p>
              </div>

              <div className="text-xs font-bold px-3 py-1 border border-slate-200 bg-slate-50 rounded-full text-slate-700">
                {prep.questions?.length || 0} Questions Prepared
              </div>
            </div>

            {/* Target JD Box */}
            <div className="border-t border-slate-100 pt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Target Job Description (JD)</span>
                <button
                  onClick={() => setIsJdExpanded((prev) => !prev)}
                  className="flex items-center gap-1 text-xs font-bold text-purple-600 hover:underline"
                >
                  {isJdExpanded ? (
                    <>
                      Collapse <ChevronUp size={12} />
                    </>
                  ) : (
                    <>
                      Expand Full JD <ChevronDown size={12} />
                    </>
                  )}
                </button>
              </div>
              <div className={`text-sm text-slate-700 ${isJdExpanded ? "" : "line-clamp-2"}`}>
                <FormattedText text={prep.jobDescription} />
              </div>
            </div>
          </div>
        </div>

        {/* 1. Introduction Script */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-purple-600" />
              <h2 className="text-lg font-bold text-slate-950">Senior Personal Introduction Script</h2>
            </div>
            <button
              onClick={() => handleCopyIntro(prep.introductionScript)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 hover:bg-purple-100 border border-purple-200 text-xs font-bold text-purple-700 rounded-xl transition-all shadow-2xs"
            >
              {copiedIntro ? (
                <>
                  <Check size={12} className="text-emerald-600" /> Copied!
                </>
              ) : (
                <>
                  <Copy size={12} /> Copy Script
                </>
              )}
            </button>
          </div>
          <div className="p-5 bg-slate-50/70 border border-slate-200/80 rounded-xl">
            <FormattedText text={prep.introductionScript} />
          </div>
        </div>

        {/* 2. Questions & Answers */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <HelpCircle size={18} className="text-purple-600" />
            <h2 className="text-lg font-bold text-slate-950">Questions & Answers to Prepare</h2>
          </div>

          {accordionItems.length === 0 ? (
            <div className="p-6 bg-white border border-slate-200 rounded-2xl text-center text-slate-500 font-medium shadow-xs">
              No questions generated yet.
            </div>
          ) : (
            <Accordion items={accordionItems} />
          )}
        </div>

        {/* 3. Generate More Option */}
        <div className="flex flex-col items-center justify-center p-8 bg-white border border-slate-200/90 rounded-2xl text-center gap-4 shadow-xs">
          <div className="space-y-1">
            <h3 className="font-bold text-slate-950 text-base">Need more questions?</h3>
            <p className="text-sm font-medium text-slate-500 max-w-sm">
              Generate 5 more unique questions and detailed answers based on this JD without repeating existing ones.
            </p>
          </div>
          <button
            onClick={handleGenerateMore}
            disabled={generateMoreMutation.isPending}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 text-white text-sm font-bold rounded-xl transition-all shadow-md shadow-purple-500/20"
          >
            {generateMoreMutation.isPending ? (
              <>
                Generating 5 more...
              </>
            ) : (
              <>
                <Sparkles size={16} />
                Generate More Questions (5 Set)
              </>
            )}
          </button>
        </div>

      </div>
    </DashboardLayout>
  );
}
