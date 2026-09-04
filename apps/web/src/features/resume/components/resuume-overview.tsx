"use client";

import { useResume } from "../hooks/use-resume";
import { ErrorState } from "@/shared/components/error-state";
import { ResumeHeader } from "./resume-header";
import { SkillsSection } from "./skills-section";
import { Loader } from "@/shared/components/Loader";
import { ProjectsSection } from "./project-section";
import ResumeUploadForm from "./resume-upload-form";
import { EyeOff, ScanSearchIcon, UploadIcon } from "lucide-react";
import { useState } from "react";
import { AxiosError } from "axios";
import { useAnalyseResume } from "../hooks/use-analyse-resume";
import Notiflix from "notiflix";

export function ResumeOverview() {
  const [openForm, setOpenForm] = useState<boolean>(false);
  const {
    data,
    isLoading,
    isError,
    error,
    refetch: refetchResume,
  } = useResume();

  const { mutate, isPending } = useAnalyseResume();

  function handleAnalyseResume() {
    mutate(undefined, {
      onSuccess: async () => {
        await refetchResume();
      },
      onError: (error) => {
        Notiflix.Notify.failure(error.message || "An error occurred while analyzing the resume.");
      }
    });
  }

  const ErrorResponse = (error as AxiosError<{ message?: string }>)?.response;

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="space-y-6">
        {!openForm ? (
          <button
            onClick={() => setOpenForm(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-sm font-bold rounded-xl transition-all shadow-md shadow-purple-500/20"
          >
            <UploadIcon size={16} /> Upload Resume
          </button>
        ) : (
          <button
            onClick={() => setOpenForm(false)}
            className="flex items-center gap-2 px-4 py-2 bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 text-xs font-bold rounded-xl transition-colors"
          >
            <EyeOff size={16} /> Hide Upload Form
          </button>
        )}

        {openForm && <ResumeUploadForm formClose={() => setOpenForm(false)} />}

        <ErrorState message={ErrorResponse?.data?.message || error.message} />
      </div>
    );
  }

  const resume = data?.data;

  return (
    <div className="space-y-6 bg-white border border-slate-200/90 pt-8 p-6 rounded-2xl shadow-xs">
      <div className="flex items-center justify-between">
        {!openForm ? (
          <button
            onClick={() => setOpenForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-50 border border-purple-200 text-purple-700 hover:bg-purple-600 hover:text-white text-xs font-bold rounded-xl transition-all shadow-2xs"
          >
            <UploadIcon size={15} /> Upload New Resume
          </button>
        ) : (
          <button
            onClick={() => setOpenForm(false)}
            className="flex items-center gap-2 px-4 py-2 bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 text-xs font-bold rounded-xl transition-colors"
          >
            <EyeOff size={15} /> Hide Upload Form
          </button>
        )}
      </div>

      {openForm && <ResumeUploadForm formClose={() => setOpenForm(false)} />}

      <ResumeHeader
        fileName={resume.fileName}
        experienceYears={resume.experienceYears}
      />

      <ProjectsSection projects={resume.projects} />

      <button
        onClick={handleAnalyseResume}
        disabled={isPending}
        className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold text-sm transition-all shadow-md shadow-purple-500/20 disabled:opacity-50"
      >
        {isPending ? (
          <div className="flex items-center gap-2 justify-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            Analyzing Resume...
          </div>
        ) : (
          <div className="flex items-center gap-2 justify-center">
            <ScanSearchIcon size={18} /> <span>Click to {resume.skills.length ? "Re-analyze" : "Analyze"} Resume Profile</span>
          </div>
        )}
      </button>

      <SkillsSection skills={resume.skills} />
    </div>
  );
}
