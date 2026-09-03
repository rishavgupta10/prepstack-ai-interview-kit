const StatsCardSkeleton = () => {
    return (
        <div className="relative bg-white border border-slate-200 space-y-3 animate-pulse rounded-2xl p-5 overflow-hidden shadow-2xs">
            <div className="flex items-center justify-between mb-2">
                <div className="size-8 rounded-xl bg-slate-200" />
                <div className="h-3 w-12 rounded-full bg-slate-200" />
            </div>
            <div className="h-8 w-16 rounded-lg bg-slate-200" />
            <div className="h-3 w-24 rounded-full bg-slate-200" />
            <div className="h-2 w-full rounded-full bg-slate-100" />
        </div>
    );
};

export default StatsCardSkeleton;
