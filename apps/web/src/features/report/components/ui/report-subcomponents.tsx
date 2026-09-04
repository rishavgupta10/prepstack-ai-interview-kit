"use client";

import {
  FileText,
  Lightbulb,
  BookOpen,
  Compass,
  Calendar,
  Tag,
} from "lucide-react";
import { useRouter } from "next/navigation";

export type Verdict = "pass" | "review" | "fail";

export interface Report {
  id: number;
  interviewId: string;
  role: string;
  topic: string;
  date: string;
  overall: number;
  technical: number;
  communication: number;
  verdict: Verdict;
  tags: string[];
}

const scoreColor = (s: number) =>
  s >= 4.5
    ? "text-violet-400"
    : s >= 3.5
      ? "text-teal-400"
      : s >= 2.5
        ? "text-amber-400"
        : "text-red-400";

const verdictConfig: Record<
  Verdict,
  { label: string; dot: string; pill: string }
> = {
  pass: {
    label: "Recommended",
    dot: "bg-emerald-400",
    pill: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
  },
  review: {
    label: "Needs review",
    dot: "bg-amber-400",
    pill: "bg-amber-500/10 border-amber-500/20 text-amber-400",
  },
  fail: {
    label: "Not recommended",
    dot: "bg-red-400",
    pill: "bg-red-500/10 border-red-500/20 text-red-400",
  },
};

export function StatTile({
  value,
  label,
  sub,
  valueClass = "text-slate-800",
}: {
  value: string | number;
  label: string;
  sub: string;
  valueClass?: string;
}) {
  return (
    <div className="bg-white border-t-7 shadow-inner shadow-black/90 border-indigo-500 rounded-2xl p-4 lg:p-5">
      <p className={`text-3xl font-semibold leading-none mb-1 ${valueClass}`}>
        {value}
      </p>
      <p className="text-[11px] font-semibold uppercase tracking-widest text-indigo-400 mb-0.5">
        {label}
      </p>
      <p className="text-[11px] text-black">{sub}</p>
    </div>
  );
}

export function ScoreBadge({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center bg-[#0d1017] border border-[#1e2231] rounded-xl px-3 py-2.5 min-w-[54px]">
      <span
        className={`text-lg font-semibold leading-none ${scoreColor(value)}`}
      >
        {value}
      </span>
      <span className="text-[10px] font-medium uppercase tracking-wider text-white font-semibold mt-1">
        {label}
      </span>
    </div>
  );
}

export function ActionButton({
  icon: Icon,
  label,
  colorClass,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  colorClass: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 bg-[#0d1017] border border-[#1e2231] hover:border-[#2d3a4f] hover:bg-[#13161f] rounded-lg px-3 py-1.5 text-[16px] font-medium transition-all duration-150 whitespace-nowrap ${colorClass}`}
    >
      <Icon size={13} />
      {label}
    </button>
  );
}

export function ReportCard({ report }: { report: Report }) {
  const vc = verdictConfig[report.verdict];
  const date = new Date(report.date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const router = useRouter();

  return (
    <div className="group relative bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-[0_1px_3px_rgba(15,23,42,0.06)] hover:shadow-[0_12px_28px_-8px_rgba(15,23,42,0.15)] hover:border-slate-300 transition-all duration-300">
      {/* Accent line — single point of color, not a border */}
      <div className="h-[3px] w-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-500" />

      {/* Top section */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5 p-6">
        <div className="flex-1 min-w-0">
          <h3 className="text-[17px] font-semibold text-slate-900 tracking-[-0.01em] truncate">
            {report.role}
          </h3>
          <p className="text-[13px] text-slate-500 mt-0.5 mb-3">
            {report.role}
          </p>

          {report?.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {report.tags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 text-slate-600 rounded-md px-2 py-0.5 text-[11px] font-medium"
                >
                  <Tag size={9} className="text-slate-400" />
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Score cluster — grouped stat block instead of 3 separate badges */}
        <div className="flex items-stretch shrink-0 rounded-xl border border-slate-200 bg-slate-50/60 divide-x divide-slate-200 overflow-hidden">
          <ScoreStat value={report.overall} label="Overall" />
          <ScoreStat value={report.technical} label="Tech" />
          <ScoreStat value={report.communication} label="Comm" />
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-slate-100 mx-6" />

      {/* Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 py-4">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="flex items-center gap-1.5 text-[12px] text-slate-500">
            <Calendar size={13} className="text-slate-400" />
            {date}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 border rounded-full px-2.5 py-1 text-[11px] font-medium ${vc?.pill}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${vc?.dot}`} />
            {vc?.label}
          </span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <ActionButton
            icon={FileText}
            label="See report"
            colorClass="text-white border-indigo-200 hover:bg-indigo-500 hover:border-indigo-300"
            onClick={() => router.push(`/report/${report?.interviewId}`)}
          />
          <ActionButton
            icon={Lightbulb}
            label="View answer"
            colorClass="text-white border-teal-200 hover:bg-teal-500 hover:border-teal-300"
            onClick={() =>
              router.push(
                `/report/${report?.interviewId}?viewanswer-sheet=true`,
              )
            }
          />
        </div>
      </div>
    </div>
  );
}

/** Compact stat cell used inside the grouped score cluster */
function ScoreStat({ value, label }: { value: number; label: string }) {
  const tone =
    value >= 80
      ? "text-emerald-600"
      : value >= 50
        ? "text-amber-600"
        : "text-rose-600";

  return (
    <div className="flex flex-col items-center justify-center px-4 py-2 min-w-[64px]">
      <span className={`text-[17px] font-semibold leading-none ${tone}`}>
        {value}
      </span>
      <span className="text-[10px] text-slate-500 mt-1 font-medium">
        {label}
      </span>
    </div>
  );
}
