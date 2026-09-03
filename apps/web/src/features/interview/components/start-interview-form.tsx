"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Briefcase,
    ChevronDown,
    Mic,
    X,
} from "lucide-react";
import { interviewModes } from "../constants/interview-modes";
import { useStartInterview } from "../hooks/use-start-interview";

interface Props {
    onClose: () => void;
}

export function StartInterviewForm({ onClose }: Props) {
    const router = useRouter();
    const startInterviewMutation = useStartInterview();

    const [role, setRole] = useState("MERN Developer");
    const [mode, setMode] = useState("technical");

    const handleStart = async () => {
        const response = await startInterviewMutation.mutateAsync({
            role,
            mode,
        });

        const interviewId = response.data.interview._id;
        router.push(`/interview/${interviewId}`);
    };

    const selectedMode = interviewModes.find((m) => m.value === mode);

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xl">
            <div className="mb-6 flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                    <h2 className="text-xl font-bold text-slate-950">Start AI Interview Practice</h2>
                    <p className="mt-0.5 text-xs font-medium text-slate-500">Configure your practice session</p>
                </div>
                <button
                    onClick={onClose}
                    className="bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-950 p-2 rounded-xl transition-colors"
                >
                    <X size={16} />
                </button>
            </div>

            <div className="space-y-5">
                {/* Role */}
                <div>
                    <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                        <Briefcase size={14} className="text-slate-400" />
                        Target Role
                    </label>

                    <input
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="MERN Developer"
                        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm font-medium text-slate-950 outline-none focus:bg-white focus:border-purple-600 focus:ring-3 focus:ring-purple-100 transition-all placeholder:text-slate-400"
                    />
                </div>

                {/* Mode */}
                <div>
                    <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                        <Mic size={14} className="text-slate-400" />
                        Interview Mode
                    </label>

                    <div className="relative">
                        <select
                            value={mode}
                            onChange={(e) => setMode(e.target.value)}
                            className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/50 px-4 pr-10 text-sm font-semibold text-slate-950 outline-none focus:bg-white focus:border-purple-600 focus:ring-3 focus:ring-purple-100 transition-all cursor-pointer"
                        >
                            {interviewModes.map((mode) => (
                                <option key={mode.value} value={mode.value}>
                                    {mode.label}
                                </option>
                            ))}
                        </select>

                        <ChevronDown
                            size={16}
                            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                    </div>
                </div>

                {/* Mode Preview Description */}
                {selectedMode && (
                    <div className="rounded-xl border border-purple-100 bg-purple-50/50 p-4">
                        <p className="text-xs font-bold text-purple-900">{selectedMode.label} Mode</p>
                        <p className="text-xs font-medium text-slate-600 mt-1 leading-relaxed">
                            {selectedMode.description}
                        </p>
                    </div>
                )}

                {/* Action */}
                <div className="pt-2">
                    <button
                        onClick={handleStart}
                        disabled={startInterviewMutation.isPending}
                        className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl text-sm font-bold transition-all shadow-md shadow-purple-500/20 disabled:opacity-50"
                    >
                        {startInterviewMutation.isPending ? "Initializing AI Interviewer..." : "Start Interview Practice"}
                    </button>
                </div>
            </div>
        </div>
    );
}