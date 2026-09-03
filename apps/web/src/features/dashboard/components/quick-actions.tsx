import Link from "next/link";
import {
  FileText,
  BarChart3,
  Mic,
  Briefcase,
  BookOpen,
  ArrowRight,
} from "lucide-react";

const actions = [
  {
    label: "Interview Kit",
    description: "Company crawling, custom Q&A & daily plan",
    href: "/interview-kit",
    icon: Briefcase,
    color: "text-purple-600 bg-purple-50 border-purple-200",
  },
  {
    label: "AI Interview Practice",
    description: "Simulated interactive speech & feedback",
    href: "/interview",
    icon: Mic,
    color: "text-blue-600 bg-blue-50 border-blue-200",
  },
  {
    label: "Q&A Sheet Prep",
    description: "JD matching & tailored answer sheets",
    href: "/preparation",
    icon: BookOpen,
    color: "text-violet-600 bg-violet-50 border-violet-200",
  },
  {
    label: "Resume Profile",
    description: "Upload resume & analyze skill insights",
    href: "/resume",
    icon: FileText,
    color: "text-emerald-600 bg-emerald-50 border-emerald-200",
  },
  {
    label: "Performance Reports",
    description: "Communication scores & actionable feedback",
    href: "/report",
    icon: BarChart3,
    color: "text-amber-600 bg-amber-50 border-amber-200",
  },
];

export function QuickActions() {
  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs">
      <h2 className="text-lg font-bold text-slate-950">Quick Actions</h2>
      <p className="text-xs text-slate-500 font-medium mt-0.5 mb-4">
        Jump directly into your interview preparation workflow
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.label}
              href={action.href}
              className="group flex items-center justify-between rounded-xl border border-slate-200/80 bg-slate-50/40 p-4 transition-all hover:bg-slate-100/70 hover:border-purple-200 hover:shadow-2xs"
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${action.color}`}
                >
                  <Icon size={18} />
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-950 group-hover:text-purple-600 transition-colors">
                    {action.label}
                  </p>
                  <p className="text-xs text-slate-500 font-medium line-clamp-1">
                    {action.description}
                  </p>
                </div>
              </div>

              <ArrowRight
                size={16}
                className="text-slate-400 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-purple-600 shrink-0"
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}