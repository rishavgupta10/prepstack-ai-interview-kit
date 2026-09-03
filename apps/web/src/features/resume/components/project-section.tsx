import { FolderGit2, ArrowUpRight } from "lucide-react";

interface Props {
  projects: string[];
}

export function ProjectsSection({
  projects,
}: Props) {
  return (
    <section className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-950">
            Featured Projects
          </h2>
          <p className="mt-0.5 text-xs font-medium text-slate-500">
            Showcase of your core work & project experience
          </p>
        </div>

        <div className="rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-bold text-purple-700 shadow-2xs">
          {projects.length} {projects.length === 1 ? "Project" : "Projects"}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {projects.map((project, index) => (
          <div
            key={project}
            className="group flex items-center justify-between rounded-xl border border-slate-200/80 bg-slate-50/50 p-4 transition-all hover:border-purple-200 hover:bg-slate-100/70 hover:shadow-2xs"
          >
            <div className="flex items-center gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 border border-purple-200 text-purple-600 shadow-2xs">
                <FolderGit2 size={18} />
              </div>

              <div>
                <p className="font-bold text-slate-950 text-sm group-hover:text-purple-600 transition-colors">
                  {project}
                </p>
                <p className="mt-0.5 text-[11px] font-semibold text-slate-500">
                  Project #{index + 1}
                </p>
              </div>
            </div>

            <ArrowUpRight
              size={16}
              className="text-slate-400 transition-all group-hover:text-purple-600 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 shrink-0"
            />
          </div>
        ))}
      </div>
    </section>
  );
}