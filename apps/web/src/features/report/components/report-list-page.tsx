"use client";

import { useState } from "react";
import {
  FileText,
  Lightbulb,
  BookOpen,
  Compass,
  Plus,
  Search,
  Calendar,
  Tag,
  ChevronRight,
  LayoutDashboard,
  TrendingUp,
  Award,
} from "lucide-react";
import {
  Report,
  ReportCard,
  StatTile,
  Verdict,
} from "./ui/report-subcomponents";
import { useGenerateReport } from "../hooks/use-generate-report";
import { useReportStats } from "../hooks/use-report-stats";
import { StartInterviewForm } from "@/features/interview/components/start-interview-form";

// ─── Types ───────────────────────────────────────────────────────────────────

// ─── Data ────────────────────────────────────────────────────────────────────

// const reports: Report[] = [
//     { id: 1, role: "Senior backend engineer", topic: "MERN Authentication & Security", date: "2026-06-17", overall: 5, technical: 5, comm: 4.5, verdict: "pass", tags: ["Security", "MERN", "Node.js"] },
//     { id: 2, role: "Frontend engineer", topic: "React performance & state management", date: "2026-06-14", overall: 4, technical: 4, comm: 4.5, verdict: "pass", tags: ["React", "Performance", "TypeScript"] },
//     { id: 3, role: "Full-stack engineer", topic: "System design — URL shortener", date: "2026-06-10", overall: 3.5, technical: 3, comm: 4, verdict: "review", tags: ["System design", "Scalability"] },
//     { id: 4, role: "DevOps engineer", topic: "CI/CD pipelines & Kubernetes", date: "2026-06-05", overall: 4.5, technical: 5, comm: 4, verdict: "pass", tags: ["DevOps", "K8s", "Docker"] },
//     { id: 5, role: "ML engineer", topic: "Model evaluation & deployment", date: "2026-05-29", overall: 3, technical: 3, comm: 3.5, verdict: "review", tags: ["ML", "Python", "MLOps"] },
//     { id: 6, role: "Android engineer", topic: "Jetpack Compose & architecture patterns", date: "2026-05-22", overall: 2.5, technical: 2, comm: 3, verdict: "fail", tags: ["Android", "Kotlin", "Compose"] },
//     { id: 7, role: "Backend engineer", topic: "Database design & query optimisation", date: "2026-05-18", overall: 4.5, technical: 4.5, comm: 4.5, verdict: "pass", tags: ["PostgreSQL", "Redis", "Indexing"] },
//     { id: 8, role: "iOS engineer", topic: "Swift concurrency & UIKit vs SwiftUI", date: "2026-05-12", overall: 4, technical: 4, comm: 3.5, verdict: "pass", tags: ["iOS", "Swift", "SwiftUI"] },
// ];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const FILTERS: { key: "all" | Verdict; label: string }[] = [
  { key: "all", label: "All" },
  { key: "pass", label: "Recommended" },
  { key: "review", label: "Needs review" },
  { key: "fail", label: "Not recommended" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ReportListPage() {
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<"all" | Verdict>("all");
  const [query, setQuery] = useState("");
  const { data: reportStats } = useReportStats();
  console.log("stats ", reportStats);
  const reports: Report[] = reportStats?.data || [];
  const filtered = reports.filter((r) => {
    const matchFilter = activeFilter === "all" || r.verdict === activeFilter;
    const q = query.toLowerCase();
    const matchSearch =
      !q ||
      r.role.toLowerCase().includes(q) ||
      r.topic.toLowerCase().includes(q) ||
      r.tags.some((t) => t.toLowerCase().includes(q));
    return matchFilter && matchSearch;
  });

  const avgScore = reports.length
    ? (reports.reduce((a, r) => a + r.overall, 0) / reports.length).toFixed(1)
    : 0;
  const passed = reports.filter((r) => r.verdict === "pass").length;
  const thisMonth = reports.filter((r) => r.date.startsWith("2026-06")).length;

  console.log("[report]: ", reports);
  console.log("[calculation]: ");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-[#13161f] border border-[#1e2231] rounded-xl px-3 py-2">
          <div className="w-2 h-2 rounded-full bg-violet-500" />
          <span className="text-[13px] font-medium text-slate-400">
            prepStack AI
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 bg-[#13161f] border border-[#1e2231] hover:border-[#2d3a4f] text-slate-400 hover:text-slate-200 rounded-xl px-3 py-2 text-[13px] font-medium transition-all">
            <LayoutDashboard size={14} />
            <span className="hidden sm:inline">Dashboard</span>
          </button>
          {!openForm && (
            <button
              onClick={() => setOpenForm(true)}
              className="flex items-center gap-1.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl px-3.5 py-2 text-[13px] font-medium transition-colors"
            >
              <Plus size={14} />
              New interview
            </button>
          )}
        </div>
      </div>
      {openForm && <StartInterviewForm onClose={() => setOpenForm(false)} />}

      {/* Page heading */}
      <div className="my-6">
        <h1 className="text-2xl sm:text-3xl font-semibold text-slate-950 mb-1">
          Interview reports
        </h1>
        <p className="text-[13px] text-purple-900">
          All your completed interview sessions and performance reports
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        <StatTile value={reports.length} label="Total" sub="All sessions" />
        <StatTile
          value={passed}
          label="Passed"
          sub="Recommended"
          valueClass="text-emerald-400"
        />
        <StatTile
          value={avgScore}
          label="Avg score"
          sub="Out of 5"
          valueClass="text-violet-400"
        />
        <StatTile
          value={thisMonth}
          label="This month"
          sub="Jun 2026"
          valueClass="text-teal-400"
        />
      </div>

      {/* Filters + search */}
      <div className="flex items-center gap-2 mb-5 flex-wrap">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={`px-3 py-1.5 rounded-lg text-[12px] font-medium border transition-all duration-150 ${
              activeFilter === f.key
                ? "bg-violet-500/15 border-violet-500/40 text-violet-400"
                : "bg-[#13161f] border-[#1e2231] text-purple-50 hover:border-[#2d3a4f] hover:text-slate-400"
            }`}
          >
            {f?.label}
          </button>
        ))}
        <div className="relative ml-auto">
          <Search
            size={13}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#334155] pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search reports…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-[#13161f] border border-[#1e2231] focus:border-violet-500/40 outline-none rounded-xl pl-8 pr-3 py-1.5 text-[12px] text-slate-300 placeholder:text-gray-300/70 w-44 sm:w-52 transition-colors"
          />
        </div>
      </div>

      {/* Cards */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#13161f] border border-[#1e2231] flex items-center justify-center mb-4">
            <FileText size={22} className="text-[#334155]" />
          </div>
          <p className="text-[15px] font-medium text-slate-400 mb-1">
            No reports found
          </p>
          <p className="text-[13px] text-[#334155]">
            Try adjusting your filters or search query
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((r) => (
            <ReportCard key={r.id} report={r} />
          ))}
        </div>
      )}

      {/* Footer */}
      <p className="text-center text-[11px] text-[#1e2231] mt-10">
        AI-generated assessments · results should be reviewed by a human
        interviewer
      </p>
    </div>
  );
}
