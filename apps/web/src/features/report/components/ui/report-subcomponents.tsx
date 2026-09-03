
"use client"

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
    s >= 4.5 ? "text-violet-400" : s >= 3.5 ? "text-teal-400" : s >= 2.5 ? "text-amber-400" : "text-red-400";

const verdictConfig: Record<Verdict, { label: string; dot: string; pill: string }> = {
    pass: { label: "Recommended", dot: "bg-emerald-400", pill: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" },
    review: { label: "Needs review", dot: "bg-amber-400", pill: "bg-amber-500/10 border-amber-500/20 text-amber-400" },
    fail: { label: "Not recommended", dot: "bg-red-400", pill: "bg-red-500/10 border-red-500/20 text-red-400" },
};

export function StatTile({ value, label, sub, valueClass = "text-slate-100" }: {
    value: string | number;
    label: string;
    sub: string;
    valueClass?: string;
}) {
    return (
        <div className="bg-[#13161f] border border-[#1e2231] rounded-2xl p-4 lg:p-5">
            <p className={`text-3xl font-semibold leading-none mb-1 ${valueClass}`}>{value}</p>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-white mb-0.5">{label}</p>
            <p className="text-[11px] text-white">{sub}</p>
        </div>
    );
}

export function ScoreBadge({ value, label }: { value: number; label: string }) {
    return (
        <div className="flex flex-col items-center bg-[#0d1017] border border-[#1e2231] rounded-xl px-3 py-2.5 min-w-[54px]">
            <span className={`text-lg font-semibold leading-none ${scoreColor(value)}`}>{value}</span>
            <span className="text-[10px] font-medium uppercase tracking-wider text-[#334155] mt-1">{label}</span>
        </div>
    );
}

export function ActionButton({ icon: Icon, label, colorClass, onClick }: {
    icon: React.ElementType;
    label: string;
    colorClass: string;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-1.5 bg-[#0d1017] border border-[#1e2231] hover:border-[#2d3a4f] hover:bg-[#13161f] rounded-lg px-3 py-1.5 text-[12px] font-medium transition-all duration-150 whitespace-nowrap ${colorClass}`}
        >
            <Icon size={13} />
            {label}
        </button>
    );
}

export function ReportCard({ report }: { report: Report }) {
    const vc = verdictConfig[report.verdict];
    const date = new Date(report.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    const router = useRouter()

    const handleAction = (action: string) => {
        // Wire these to your router / modal / API
        console.log(action, report.id);
    };

    return (
        <div className="bg-[#13161f] border border-[#1e2231] hover:border-[#2d3a4f] rounded-2xl overflow-hidden transition-colors duration-150 group">
            {/* Top section */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 p-5">
                <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-semibold text-slate-200 mb-0.5 truncate group-hover:text-white transition-colors">
                        {report.role}
                    </p>
                    <p className="text-[12px] text-[#475569] mb-3">{report.role}</p>
                    <div className="flex flex-wrap gap-1.5">
                        {report?.tags?.map((t) => (
                            <span
                                key={t}
                                className="inline-flex items-center gap-1 bg-violet-500/10 border border-violet-500/20 text-violet-400 rounded-md px-2 py-0.5 text-[11px] font-medium"
                            >
                                <Tag size={9} />
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                    <ScoreBadge value={report.overall} label="Overall" />
                    <ScoreBadge value={report.technical} label="Tech" />
                    <ScoreBadge value={report.communication} label="Comm" />
                </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-[#1a1f2e] mx-5" />

            {/* Footer */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 py-3.5">
                <div className="flex items-center gap-3 flex-wrap">
                    <span className="flex items-center gap-1.5 text-[11px] text-[#334155]">
                        <Calendar size={12} />
                        {date}
                    </span>
                    <span className={`inline-flex items-center gap-1.5 border rounded-full px-2.5 py-1 text-[11px] font-medium ${vc?.pill}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${vc?.dot}`} />
                        {vc?.label}
                    </span>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                    <ActionButton icon={FileText} label="See report" colorClass="text-violet-400 hover:text-violet-300" onClick={() => router.push(`/report/${report?.interviewId}`)} />
                    <ActionButton icon={Lightbulb} label="view answer" colorClass="text-teal-400 hover:text-teal-300" onClick={() =>  router.push(`/report/${report?.interviewId}?viewanswer-sheet=true`)} />
                    <ActionButton icon={Lightbulb} label="Get suggestions" colorClass="text-teal-400 hover:text-teal-300" onClick={() => handleAction("suggest")} />
                    <ActionButton icon={BookOpen} label="Study material" colorClass="text-amber-400 hover:text-amber-300" onClick={() => handleAction("study")} />
                    <ActionButton icon={Compass} label="Topics to explore" colorClass="text-slate-400 hover:text-slate-200" onClick={() => handleAction("topics")} />
                </div>
            </div>
        </div>
    );
}
