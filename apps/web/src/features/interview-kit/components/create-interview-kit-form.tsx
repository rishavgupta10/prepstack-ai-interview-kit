"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  Calendar,
  FileText,
  Globe,
  Loader2,
  Sparkles,
  X,
} from "lucide-react";
import { Notify } from "notiflix";
import { useCreateInterviewKit } from "../hooks/use-interview-kit";
import type { InterviewKit } from "../types/interview-kit.types";

interface CreateInterviewKitFormProps {
  onClose: () => void;
  onSuccess?: (kit: InterviewKit) => void;
}

export function CreateInterviewKitForm({
  onClose,
  onSuccess,
}: CreateInterviewKitFormProps) {
  const router = useRouter();
  const createMutation = useCreateInterviewKit();

  const [jd, setJd] = useState("");
  const [companyUrl, setCompanyUrl] = useState("");
  const [days, setDays] = useState(7);
  const [clientError, setClientError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setClientError(null);

    const trimmedJd = jd.trim();
    const trimmedUrl = companyUrl.trim();

    if (!trimmedJd) {
      setClientError("Job description is required.");
      return;
    }

    if (trimmedJd.length < 30) {
      setClientError("Please provide a more complete job description (at least 30 characters).");
      return;
    }

    if (trimmedJd.length > 50000) {
      setClientError("Job description exceeds maximum 50,000 characters limit.");
      return;
    }

    if (!trimmedUrl) {
      setClientError("Company website URL is required.");
      return;
    }

    // Basic URL validation
    let normalizedUrl = trimmedUrl;
    if (!/^https?:\/\//i.test(normalizedUrl)) {
      normalizedUrl = `https://${normalizedUrl}`;
    }

    try {
      new URL(normalizedUrl);
    } catch {
      setClientError("Please enter a valid website URL (e.g., https://example.com).");
      return;
    }

    const numDays = Number(days);
    if (!Number.isInteger(numDays) || numDays < 1 || numDays > 60) {
      setClientError("Days available must be an integer between 1 and 60.");
      return;
    }

    try {
      const response = await createMutation.mutateAsync({
        jd: trimmedJd,
        company_url: normalizedUrl,
        days: numDays,
      });

      const kit: InterviewKit = response?.data ?? response;

      Notify.success("Interview kit generated successfully!");
      if (onSuccess) {
        onSuccess(kit);
      } else if (kit?._id) {
        router.push(`/interview-kit/${kit._id}`);
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "Failed to generate interview kit. Please verify the URL and job description.";
      setClientError(msg);
      Notify.failure(msg);
    }
  };

  return (
    <div className="relative rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 overflow-hidden shadow-xl transition-all">
      {/* Loading Overlay */}
      {createMutation.isPending && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-white/95 backdrop-blur-sm p-6 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 border border-purple-500/30 shadow-md shadow-purple-500/20">
            <Sparkles className="h-7 w-7 text-white animate-pulse" />
          </div>

          <div className="space-y-1.5 max-w-md">
            <h3 className="text-lg font-bold text-slate-950 flex items-center justify-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin text-purple-600" />
              Synthesizing Interview Kit...
            </h3>
            <p className="text-sm font-medium text-slate-600 leading-relaxed">
              Crawling company pages, extracting key requirements from JD, and generating
              tailored interview questions, flashcards, and a daily study schedule.
            </p>
            <p className="text-xs text-slate-400 font-semibold pt-2">
              This typically takes 20 to 35 seconds. Please don't close this page.
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-bold text-slate-950 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            Generate New Interview Kit
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            Provide the company website and job description to build a personalized preparation suite.
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          disabled={createMutation.isPending}
          className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-950 hover:bg-slate-200 transition-colors disabled:opacity-50"
          aria-label="Close form"
        >
          <X size={16} />
        </button>
      </div>

      {/* Error alert */}
      {clientError && (
        <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-3 text-rose-800 text-sm font-medium shadow-2xs">
          <AlertCircle className="shrink-0 mt-0.5 text-rose-600" size={18} />
          <div className="flex-1">
            <p className="font-bold">Creation Error</p>
            <p className="text-xs text-rose-700 mt-0.5">{clientError}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Company URL */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Company Website URL <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <Globe size={16} />
              </div>
              <input
                type="text"
                value={companyUrl}
                onChange={(e) => setCompanyUrl(e.target.value)}
                placeholder="https://company.com"
                required
                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium text-slate-950 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-purple-600 focus:ring-3 focus:ring-purple-100 transition-all"
              />
            </div>
            <p className="text-[11px] text-slate-500 font-medium mt-1.5">
              Used by AI crawler to extract mission, culture, tech stack & business context.
            </p>
          </div>

          {/* Days Available */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Preparation Timeframe (Days) <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <Calendar size={16} />
              </div>
              <input
                type="number"
                min={1}
                max={60}
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                required
                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium text-slate-950 focus:bg-white focus:outline-none focus:border-purple-600 focus:ring-3 focus:ring-purple-100 transition-all"
              />
            </div>
            <p className="text-[11px] text-slate-500 font-medium mt-1.5">
              Available days to study (1 - 60). We will synthesize a structured daily study plan.
            </p>
          </div>
        </div>

        {/* Job Description */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <FileText size={14} className="text-slate-400" />
              Target Job Description (JD) <span className="text-rose-500">*</span>
            </label>
            <span className="text-[11px] font-semibold text-slate-400">
              {jd.length} / 50,000 characters
            </span>
          </div>

          <textarea
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            placeholder="Paste the full job description here, including responsibilities, required skills, and qualification expectations..."
            required
            rows={8}
            className="w-full bg-slate-50/50 border border-slate-200 rounded-xl p-4 text-sm font-normal text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-purple-600 focus:ring-3 focus:ring-purple-100 resize-y leading-relaxed transition-all"
          />
        </div>

        {/* Form Actions */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            disabled={createMutation.isPending}
            className="w-full sm:w-auto px-5 py-2.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-950 rounded-xl text-sm font-semibold transition-colors"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={createMutation.isPending}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl text-sm font-bold transition-all shadow-md shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Sparkles size={16} />
            Generate Interview Kit
          </button>
        </div>
      </form>
    </div>
  );
}
