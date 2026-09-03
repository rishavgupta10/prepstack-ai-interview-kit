import { Tag } from "lucide-react";

interface Props {
    skills: string[];
}

export function SkillsSection({
    skills,
}: Props) {
    return (
        <div className="pt-4 border-t border-slate-100">
            <h3 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                <Tag className="w-3.5 h-3.5 text-purple-600" strokeWidth={2} />
                Extracted Core Skills & Competencies ({skills?.length || 0})
            </h3>

            <div className="flex flex-wrap gap-2">
                {skills?.map((skill: string) => (
                    <span
                        key={skill}
                        className="rounded-lg border border-purple-200 bg-purple-50 px-3 py-1.5 text-xs font-bold text-purple-700 shadow-2xs"
                    >
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    );
}