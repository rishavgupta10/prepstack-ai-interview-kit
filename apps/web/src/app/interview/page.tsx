"use client";

import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import { InterviewList } from "@/features/interview/components/interview-list";
import { StartInterviewForm } from "@/features/interview/components/start-interview-form";
import { DashboardLayout } from "@/shared/components/dashboard-layout";

export default function InterviewPage() {
  const [openForm, setOpenForm] = useState<boolean>(false);

  return (
    <DashboardLayout>
      <div className="space-y-6 mt-12 md:p-6 p-3 text-slate-950 max-w-7xl mx-auto">
        {/* Hero Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-violet-600 bg-clip-text text-transparent">
              AI Interview Practice
            </h1>
            <p className="text-sm font-medium text-slate-600 mt-1">
              Simulated interactive practice sessions with real-time feedback & scoring.
            </p>
          </div>

          {!openForm && (
            <button
              onClick={() => setOpenForm(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-sm font-bold rounded-xl transition-all shadow-md shadow-purple-500/20 shrink-0 self-start sm:self-auto"
            >
              <Sparkles size={16} />
              <span>Start Practice Session</span>
            </button>
          )}
        </div>

        {/* Start Form */}
        {openForm && <StartInterviewForm onClose={() => setOpenForm(false)} />}

        {/* Interview List */}
        <InterviewList />
      </div>
    </DashboardLayout>
  );
}
