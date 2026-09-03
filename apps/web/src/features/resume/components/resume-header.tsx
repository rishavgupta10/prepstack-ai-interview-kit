import { Briefcase, FileText } from "lucide-react";

interface Props {
    fileName: string;
    experienceYears: number;
}

export function ResumeHeader({
    fileName,
    experienceYears,
}: Props) {
    return (
        <div className="flex items-center gap-4 mb-5 p-4 rounded-xl bg-slate-50/70 border border-slate-200/80">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 flex items-center justify-center shrink-0 shadow-2xs">
                <FileText className="w-5 h-5 text-purple-600" strokeWidth={2} />
            </div>
            <div className="min-w-0">
                <h2 className="text-base font-bold text-slate-950 truncate">
                    {fileName}
                </h2>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mt-0.5">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400" strokeWidth={1.75} />
                    {experienceYears} Years Professional Experience
                </div>
            </div>
        </div>
    );
}