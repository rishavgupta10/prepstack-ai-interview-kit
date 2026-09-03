"use client";

import {
    Medal, Terminal, MessageCircleMore,
    Bolt, TrendingUp, Brain, AlertTriangle, CircleCheck,
    Sparkles, Calendar, Database, Clock,
    ShieldCheck,
    Award
} from "lucide-react";
import { useReport } from "../hooks/use-report";
import { Loader } from "@/shared/components/Loader";
import { useParams, useSearchParams } from "next/navigation";
import { ErrorState } from "@/shared/components/error-state";
import { Accordion } from "@/shared/components/accordion";
import { FormattedText } from "@/shared/components/formatted-text";
import { GoReport } from "react-icons/go";

function ScoreCard({
    label, score, perfect, icon: Icon, color, bg, accent,
}: {
    label: string; score: number; perfect: boolean;
    icon: React.ElementType; color: string; bg: string; accent: string;
}) {
    const pct = (score / 5) * 100;
    return (
        <div className="relative bg-white border border-slate-200/90 rounded-2xl p-5 overflow-hidden shadow-xs hover:shadow-md transition-all">
            <div className="absolute top-0 inset-x-0 h-1.5 rounded-t-2xl" style={{ background: accent }} />
            <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{label}</span>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center border border-slate-200/60 shadow-2xs" style={{ background: bg }}>
                    <Icon size={16} style={{ color }} />
                </div>
            </div>
            <div className="mb-1">
                <span className="text-3xl font-bold leading-none text-slate-950">{score}</span>
                <span className="text-sm font-semibold text-slate-400 ml-1">/5</span>
            </div>
            <p className="text-xs font-semibold text-slate-500 mb-3">{perfect ? "Perfect score" : `Score · ${pct}%`}</p>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: accent }} />
            </div>
        </div>
    );
}

function Panel({ title, icon: Icon, iconColor, iconBg, count, children }: {
    title: string; icon: React.ElementType; iconColor: string; iconBg: string;
    count?: string; children: React.ReactNode;
}) {
    return (
        <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center border border-slate-200/60 shadow-2xs" style={{ background: iconBg }}>
                        <Icon size={16} style={{ color: iconColor }} />
                    </div>
                    <span className="text-sm font-bold text-slate-950">{title}</span>
                </div>
                {count && (
                    <span className="text-xs font-bold text-purple-700 bg-purple-50 border border-purple-200 rounded-full px-3 py-0.5">
                        {count}
                    </span>
                )}
            </div>
            <div className="p-5">{children}</div>
        </div>
    );
}

function AlertItem({ text, variant }: { text: string; variant: "amber" | "teal" }) {
    const cfg = {
        amber: { bg: "#fffbeb", border: "#fef3c7", iconBg: "#fef3c7", iconColor: "#d97706", textColor: "#92400e", Icon: AlertTriangle },
        teal: { bg: "#ecfdf5", border: "#a7f3d0", iconBg: "#d1fae5", iconColor: "#059669", textColor: "#065f46", Icon: CircleCheck },
    }[variant];
    return (
        <div className="flex gap-3 items-start rounded-xl p-4 shadow-2xs" style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}>
            <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: cfg.iconBg }}>
                <cfg.Icon size={15} style={{ color: cfg.iconColor }} />
            </div>
            <p className="text-sm font-semibold leading-relaxed" style={{ color: cfg.textColor }}>{text}</p>
        </div>
    );
}

export default function InterviewReport() {
    const searchParams = useSearchParams();

    const viewanswersheet = searchParams.get("viewanswer-sheet");
    const { interviewId } = useParams<{
        interviewId: string;
    }>();
    const { data, isLoading, error, isError } = useReport(interviewId);
    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <ErrorState message={error?.message || "Something went wrong. Couldn't load report."} />;
    }

    function getVerdict(score: number) {
        if (score >= 5) {
            return "Strongly Recommended";
        } else if (score < 5 && score >= 4) {
            return "Recommended";
        } else if (score < 4 && score > 3) {
            return "Needs Improvement";
        }

        return "Requires Further Study";
    }

    const report = data?.data;
    const date = new Date(report?.createdAt);
    const dateStr = date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    const timeStr = date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

    return (
        <div className="min-h-screen bg-[#f8fafc] text-slate-950 p-4 sm:p-7">
            <div className="max-w-6xl mx-auto space-y-6">

                {/* Top bar */}
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 bg-white border border-slate-200/90 rounded-xl px-3.5 py-1.5 shadow-2xs">
                        <div className="w-2 h-2 rounded-full bg-purple-600" />
                        <span className="text-xs font-bold text-slate-700">prepStack AI</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 rounded-full px-3.5 py-1.5 text-xs font-bold text-emerald-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Report Complete
                    </div>
                </div>

                {/* Hero */}
                <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 mb-5 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 shadow-xs">
                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">Technical Practice Session · {dateStr}</p>
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-950 leading-snug mb-1">
                            {report.interviewId?.role}
                        </h1>
                        <p className="text-sm font-semibold text-slate-600 mb-5">{report.interviewId?.role}</p>
                        <div className="flex flex-wrap gap-2">
                            {[
                                { label: "Security", Icon: ShieldCheck, cls: "bg-purple-50 text-purple-700 border-purple-200" },
                                { label: "MERN stack", Icon: Database, cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
                                { label: "45 min", Icon: Clock, cls: "bg-slate-100 text-slate-700 border-slate-200" },
                            ].map(({ label, Icon, cls }) => (
                                <span key={label} className={`inline-flex items-center gap-1.5 border rounded-lg px-3 py-1 text-xs font-bold ${cls}`}>
                                    <Icon size={12} />{label}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-center shrink-0 sm:min-w-[160px] shadow-2xs">
                        <Medal size={24} className="text-purple-600 mx-auto mb-2" />
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Overall Verdict</p>
                        <p className="text-sm font-bold text-purple-700">{getVerdict(report.overallScore)}</p>
                    </div>
                </div>

                {!viewanswersheet && (
                    <section className="space-y-6">
                        {/* Score cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <ScoreCard label="Overall" score={report?.overallScore} perfect icon={Award} color="#4f46e5" bg="#eef2ff" accent="#4f46e5" />
                            <ScoreCard label="Technical" score={report.technicalScore} perfect icon={Terminal} color="#059669" bg="#ecfdf5" accent="#059669" />
                            <ScoreCard label="Communication" score={report.communicationScore} perfect={false} icon={MessageCircleMore} color="#d97706" bg="#fffbeb" accent="#d97706" />
                        </div>

                        {/* Two-column body */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                            <Panel title="Strengths" icon={Bolt} iconColor="#4f46e5" iconBg="#eef2ff" count={`${report.strengths?.length || 0} Identified`}>
                                <div className="space-y-2.5">
                                    {report.strengths.map((s: string, i: number) => (
                                        <div key={i} className="flex gap-3 items-start bg-slate-50/70 border border-slate-200/80 rounded-xl px-3.5 py-3">
                                            <span className="text-xs font-bold text-purple-600 shrink-0 pt-0.5 font-mono">
                                                {String(i + 1).padStart(2, "0")}
                                            </span>
                                            <p className="text-xs sm:text-sm font-medium leading-relaxed text-slate-800">{s}</p>
                                        </div>
                                    ))}
                                </div>
                            </Panel>

                            <div className="flex flex-col gap-5">
                                <Panel title="Key Improvements" icon={TrendingUp} iconColor="#d97706" iconBg="#fffbeb">
                                    <AlertItem text={report.improvements[0]} variant="amber" />
                                </Panel>
                                <Panel title="Missed Concepts" icon={Brain} iconColor="#059669" iconBg="#ecfdf5">
                                    <AlertItem text={report.missedConcepts[0]} variant="teal" />
                                </Panel>
                            </div>
                        </div>

                        {/* Final feedback */}
                        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-xs">
                            <p className="text-3xl leading-none text-purple-200 font-serif mb-1">&ldquo;</p>
                            <FormattedText text={report.finalFeedback} />
                            <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100 flex-wrap gap-3">
                                <span className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                                    <Calendar size={13} />{dateStr} · {timeStr}
                                </span>
                                <div className="flex items-center gap-1.5 bg-purple-50 border border-purple-200 rounded-lg px-3 py-1.5 text-xs font-bold text-purple-700">
                                    <Sparkles size={12} />AI Assessed Feedback
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {viewanswersheet === "true" && (
                    <div className="my-4 space-y-4">
                        <div className="flex gap-2 items-center justify-start rounded-full text-purple-700 bg-purple-50 border border-purple-200 px-4 py-2 text-xs font-bold w-fit shadow-2xs">
                            <GoReport /> Answer Sheet Reference
                        </div>
                        <h3 className="text-2xl font-bold text-slate-950">Answer Sheet Reference</h3>
                        <p className="text-slate-600 text-xs font-medium">Interview-ready answers to every question asked in this session.</p>
                        <Accordion items={report.preferedAnswers} />
                    </div>
                )}

                <p className="text-center text-[11px] font-semibold text-slate-400 mt-8">
                  AI-generated assessment · recommendations should be reviewed alongside human feedback
                </p>
            </div>
        </div>
    );
}