import { AlertOctagonIcon } from "lucide-react";

interface ErrorStateProps {
  message?: string;
}

export function ErrorState({
  message,
}: ErrorStateProps) {
  return (
    <div className="bg-rose-50/80 border border-rose-200 text-rose-800 rounded-xl p-4 shadow-xs mx-auto max-w-3xl">
      <p className="flex items-center gap-3 text-sm font-medium">
        <AlertOctagonIcon className="w-5 h-5 shrink-0 text-rose-600" />
        <span>{message || "Something went wrong"}</span>
      </p>
    </div>
  );
}