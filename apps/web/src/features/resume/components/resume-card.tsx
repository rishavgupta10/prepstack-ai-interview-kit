"use client";

import { FileText, Briefcase, Tag, Loader2 } from "lucide-react";

import { useResume } from "../hooks/use-resume";
import { ProjectsSection } from "./project-section";

export function ResumeCard() {

    const { data, isLoading } = useResume();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center gap-2 rounded-2xl border border-[#1E2D45] bg-[#0D1526] p-10 text-sm text-slate-500">
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading resume…
            </div>
        );
    }

    const resume = data?.data;

    return (
        <div className="rounded-2xl border border-[#1E2D45] bg-[#0D1526] p-6">

            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-blue-600/15 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-blue-400" strokeWidth={1.75} />
                </div>
                <div className="min-w-0">
                    <h2 className="text-sm font-semibold text-slate-100 truncate">
                        {resume?.fileName}
                    </h2>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                        <Briefcase className="w-3.5 h-3.5" strokeWidth={1.75} />
                        {resume?.experienceYears} years experience
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-[#1E2D45] mb-5" />

            {/* Skills */}
            <div>
                <h3 className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-slate-500 mb-3">
                    <Tag className="w-3.5 h-3.5" strokeWidth={1.75} />
                    Skills
                </h3>

                <div className="flex flex-wrap gap-2">
                    {resume?.skills?.map((skill: string) => (
                        <span
                            key={skill}
                            className="rounded-full border border-[#1E2D45] bg-blue-600/10 px-3 py-1 text-xs text-blue-300"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
          

            <ProjectsSection
                projects={
                    resume.projects
                }
            />
        </div>
    );
}