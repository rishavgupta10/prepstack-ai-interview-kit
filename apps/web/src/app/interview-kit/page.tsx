"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { DashboardLayout } from "@/shared/components/dashboard-layout";
import { InterviewKitList } from "@/features/interview-kit/components/interview-kit-list";
import { CreateInterviewKitForm } from "@/features/interview-kit/components/create-interview-kit-form";

export default function InterviewKitPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-6 mt-12 md:p-6 p-3 text-slate-950 max-w-7xl mx-auto">
        {/* Page Hero Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-violet-600 bg-clip-text text-transparent">
              Interview Kit & Company Prep
            </h1>
            <p className="text-sm font-medium text-slate-600 mt-1">
              Automated company crawling, deep JD requirement extraction, custom questions, flashcards & daily study schedules.
            </p>
          </div>

          {!isFormOpen && (
            <button
              onClick={() => setIsFormOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-sm font-bold rounded-xl transition-all shadow-md shadow-purple-500/20 shrink-0 self-start sm:self-auto"
            >
              <Sparkles size={16} />
              <span>Generate Interview Kit</span>
            </button>
          )}
        </div>

        {/* Create Form Section */}
        {isFormOpen && (
          <CreateInterviewKitForm onClose={() => setIsFormOpen(false)} />
        )}

        {/* List Section */}
        {!isFormOpen && (
          <InterviewKitList onCreateClick={() => setIsFormOpen(true)} />
        )}
      </div>
    </DashboardLayout>
  );
}
