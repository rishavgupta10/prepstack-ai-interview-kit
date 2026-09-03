import { Mail } from 'lucide-react';

const DashboardSummarySkeleton = () => {
    return (
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs animate-pulse">
            {/* Accent */}
            <div className="absolute inset-x-0 top-0 h-1 bg-slate-200" />

            {/* Header */}
            <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-200" />

                <div className="min-w-0 space-y-2 flex-1">
                    <div className="h-5 w-40 rounded-lg bg-slate-200" />
                    <div className="flex items-center gap-2">
                        <Mail size={14} className="text-slate-300" />
                        <div className="h-3 w-32 rounded-full bg-slate-200" />
                    </div>
                </div>

                <div className="hidden sm:flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1">
                    <span className="h-2 w-2 rounded-full bg-slate-300" />
                    <div className="h-3 w-16 rounded-full bg-slate-200" />
                </div>
            </div>

            {/* Resume Summary */}
            <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-4 flex items-center justify-between">
                    <div className="space-y-1">
                        <div className="h-3 w-24 rounded-full bg-slate-200" />
                        <div className="h-3 w-36 rounded-full bg-slate-200" />
                    </div>

                    <div className="h-6 w-16 rounded-lg bg-slate-200" />
                </div>

                <div className="grid grid-cols-3 gap-3">
                    {[1, 2, 3].map((stat) => (
                        <div
                            key={stat}
                            className="rounded-xl border border-slate-200 bg-white p-3 space-y-2"
                        >
                            <div className="flex items-center justify-between">
                                <div className="h-8 w-8 rounded-lg bg-slate-200" />
                                <div className="h-6 w-8 rounded-lg bg-slate-200" />
                            </div>

                            <div className="h-3 w-16 rounded-full bg-slate-200" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardSummarySkeleton;
