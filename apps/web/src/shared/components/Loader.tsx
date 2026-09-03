"use client";

import { Loader2, BrainCircuit } from "lucide-react";

export function Loader() {
    return (
        <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4">

            {/* Ambient glow */}
            <div
                className="absolute w-[420px] h-[420px] rounded-full opacity-15 blur-3xl pointer-events-none"
                style={{
                    background: "radial-gradient(circle, #6366F1 0%, transparent 70%)",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            />

            <div className="relative flex flex-col items-center gap-4">

                {/* Logo */}
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 border border-purple-500/30 shadow-md shadow-purple-500/20">
                    <BrainCircuit className="w-7 h-7 text-white" strokeWidth={1.75} />
                </div>

                {/* App name */}
                <div className="flex flex-col items-center gap-1">
                    <h1 className="text-lg font-bold tracking-tight text-slate-950">
                        prepStack<span className="text-purple-600"> AI</span>
                    </h1>
                    <p className="text-[10px] text-slate-400 font-semibold tracking-widest uppercase">
                        Communication Coach
                    </p>
                </div>

                {/* Spinner */}
                <Loader2 className="w-5 h-5 text-purple-600 animate-spin mt-2" />
            </div>
        </div>
    );
}