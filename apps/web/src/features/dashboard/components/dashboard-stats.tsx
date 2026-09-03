"use client";

import { useEffect, useRef, useState } from "react";
import {
    CalendarCheck,
    CircleCheck,
    Star,
    Target,
} from "lucide-react";
import { useDashboardStats } from "../hooks/use-dashboard";
import StatsCardSkeleton from "@/shared/components/skeletons/StatsCardSkeleton";

// ─── Animated counter hook ───────────────────────────────────────────────────

function useCountUp(target: number, duration = 900, decimals = 0) {
    const [value, setValue] = useState(0);
    const frame = useRef<number>(0);

    useEffect(() => {
        const start = performance.now();
        const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(target * eased);
            if (progress < 1) frame.current = requestAnimationFrame(tick);
        };
        frame.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame.current);
    }, [target, duration]);

    return decimals ? Number(value.toFixed(decimals)) : Math.round(value);
}

// ─── Modern Light card shell ─────────────────────────────────────────────────

function GlassCard({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative bg-white border border-slate-200/90 rounded-2xl p-5 overflow-hidden transition-all duration-200 hover:shadow-md hover:border-purple-200 shadow-2xs">
            {children}
        </div>
    );
}

function IconBadge({ icon: Icon, color, bg }: { icon: React.ElementType; color: string; bg: string }) {
    return (
        <div className="w-9 h-9 rounded-xl flex items-center justify-center border border-slate-200/60 shadow-2xs" style={{ background: bg }}>
            <Icon size={18} style={{ color }} />
        </div>
    );
}

// ─── Stars ───────────────────────────────────────────────────────────────────

function StarRow({ score }: { score: number }) {
    const full = Math.floor(score);
    const hasHalf = score % 1 >= 0.3;
    return (
        <div className="flex gap-[3px]">
            {Array.from({ length: 5 }).map((_, i) => {
                const filled = i < full;
                const half = i === full && hasHalf;
                return (
                    <Star
                        key={i}
                        size={14}
                        className={filled || half ? "text-amber-500" : "text-slate-200"}
                        fill={filled ? "currentColor" : half ? "url(#half)" : "none"}
                        strokeWidth={filled || half ? 0 : 1.5}
                    />
                );
            })}
        </div>
    );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function DashboardStats() {
    const { data: response, isLoading } = useDashboardStats();
    const data = response?.data[0];
    const total = useCountUp(data?.totalInterviews || 0);
    const completed = useCountUp(data?.completedInterviews || 0);
    const avgScore = useCountUp(data?.averageScore || 0, 900, 1);
    const passRate = useCountUp(data?.passRate || 0);

    const completePct = Math.round((completed / (total || 1)) * 100);

    // Ring math for pass rate
    const radius = 24;
    const circumference = 2 * Math.PI * radius;
    const [ringOffset, setRingOffset] = useState(circumference);
    const [barWidth, setBarWidth] = useState(0);

    useEffect(() => {
        const t = setTimeout(() => {
            setRingOffset(circumference * (1 - passRate / 100));
            setBarWidth(completePct);
        }, 80);
        return () => clearTimeout(t);
    }, [circumference, passRate, completePct]);

    return (
        <div className="bg-white border border-slate-200/90 sm:p-6 p-4 rounded-2xl shadow-xs">
            <div className="grid grid-cols-2 xs:grid-cols-2 lg:grid-cols-4 gap-4">

                {/* Total interviews */}
                {isLoading ? <StatsCardSkeleton /> : <GlassCard>
                    <div className="flex items-center justify-between mb-3">
                        <IconBadge icon={CalendarCheck} color="#4f46e5" bg="#eef2ff" />
                        <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">ALL TIME</span>
                    </div>
                    <p className="text-3xl font-bold text-slate-950 leading-none mb-1.5 tabular-nums">{total}</p>
                    <p className="text-xs font-semibold text-slate-500">Total interviews</p>
                </GlassCard>}

                {/* Completed */}
                {isLoading ? <StatsCardSkeleton /> : <GlassCard>
                    <div className="flex items-center justify-between mb-3">
                        <IconBadge icon={CircleCheck} color="#059669" bg="#ecfdf5" />
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">{completePct}%</span>
                    </div>
                    <p className="text-3xl font-bold text-slate-950 leading-none mb-1.5 tabular-nums">{completed}</p>
                    <p className="text-xs font-semibold text-slate-500 mb-3">Completed</p>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-emerald-500 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${barWidth}%` }}
                        />
                    </div>
                </GlassCard>
                }

                {/* Average score */}
                {isLoading ? <StatsCardSkeleton /> : <GlassCard>
                    <div className="flex items-center justify-between mb-3">
                        <IconBadge icon={Star} color="#d97706" bg="#fffbeb" />
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">OUT OF 5</span>
                    </div>
                    <p className="text-3xl font-bold text-slate-950 leading-none mb-1.5 tabular-nums">{avgScore}</p>
                    <p className="text-xs font-semibold text-slate-500 mb-2">Average score</p>
                    <StarRow score={data?.averageScore} />
                </GlassCard>
                }

                {/* Pass rate */}
                {isLoading ? <StatsCardSkeleton /> : <GlassCard>
                    <div className="mb-2">
                        <IconBadge icon={Target} color="#7c3aed" bg="#f5f3ff" />
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 shrink-0">
                            <svg width="48" height="48" className="-rotate-90">
                                <circle cx="24" cy="24" r="20" fill="none" stroke="#f1f5f9" strokeWidth="4" />
                                <circle
                                    cx="24"
                                    cy="24"
                                    r="20"
                                    fill="none"
                                    stroke="#7c3aed"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    strokeDasharray={2 * Math.PI * 20}
                                    strokeDashoffset={2 * Math.PI * 20 * (1 - passRate / 100)}
                                    className="transition-[stroke-dashoffset] duration-1000 ease-out"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-slate-950 tabular-nums">
                                {passRate}%
                            </div>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-950 leading-none mb-1 tabular-nums">{passRate}%</p>
                            <p className="text-xs font-semibold text-slate-500">Pass rate</p>
                        </div>
                    </div>
                </GlassCard>}

            </div>
        </div>
    );
}