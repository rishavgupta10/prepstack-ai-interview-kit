interface EmptyStateProps {
    title: string;
    description: string;
}

export function EmptyState({
    title,
    description,
}: EmptyStateProps) {
    return (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-8 text-center shadow-xs">
            <h2 className="text-xl font-bold text-slate-950">
                {title}
            </h2>

            <p className="text-slate-500 text-sm mt-2 max-w-md mx-auto leading-relaxed">
                {description}
            </p>
        </div>
    );
}