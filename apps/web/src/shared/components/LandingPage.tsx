/**
 * Fonts: this page pairs a `font-display` utility (Fraunces, a serif with
 * some editorial weight — it carries the "case file" feel) with the default
 * `font-sans` (Inter) for body copy and `font-mono` (JetBrains Mono) for
 * requirement ids, tags, and log-style notes.
 *
 * In your root layout:
 *
 *   import { Fraunces } from "next/font/google";
 *   const fraunces = Fraunces({
 *     subsets: ["latin"],
 *     axes: ["opsz"],
 *     variable: "--font-display",
 *   });
 *   // add fraunces.variable to <html className={...}>
 *
 * In tailwind.config:
 *
 *   theme: { extend: { fontFamily: { display: ["var(--font-display)"] } } }
 */

import {
  Globe,
  FileText,
  Search,
  ListChecks,
  Sparkles,
  ClipboardCheck,
  CalendarDays,
  Layers,
  ArrowRight,
  CheckCircle2,
  Circle,
  AlertTriangle,
  Pencil,
  Pin,
  RotateCcw,
  BrainCircuit,
  Link2,
} from "lucide-react";
import { Navbar } from "./NavBar";

/* ── Data ── */

const FEATURES = [
  {
    icon: FileText,
    title: "Paste the job description",
    desc: "No scraping job boards — you paste the text, we extract what actually matters.",
  },
  {
    icon: Globe,
    title: "Crawl the company site",
    desc: "Give us the homepage. We find the careers page, handbook, or engineering blog ourselves.",
  },
  {
    icon: Search,
    title: "Find the interview process",
    desc: "We look for public write-ups of how this company actually interviews, when they exist.",
  },
  {
    icon: ListChecks,
    title: "Requirements, tagged must or nice",
    desc: "Every line of the posting becomes a trackable requirement, not a paraphrase.",
  },
  {
    icon: ClipboardCheck,
    title: "Coverage checking",
    desc: "Your code checks every requirement has a question against it — and fills the gaps.",
  },
  {
    icon: CalendarDays,
    title: "A schedule that fits your days",
    desc: "Tell us how long you have. Harder, higher-priority material lands first, not the night before.",
  },
];

const PIPELINE = [
  {
    icon: FileText,
    title: "Extract requirements",
    desc: "Parses the pasted description into discrete, id'd requirements — must-have or nice-to-have.",
  },
  {
    icon: Link2,
    title: "Crawl & rank links",
    desc: "Follows the company site, scores its links, and fetches the pages worth reading.",
  },
  {
    icon: Search,
    title: "Research the process",
    desc: "Looks for public discussion of how this company interviews, and skips what can't be found.",
  },
  {
    icon: Sparkles,
    title: "Generate per requirement",
    desc: "Each requirement gets its own question pass — technical prompts for a stack, behavioural ones for mentoring.",
  },
  {
    icon: ClipboardCheck,
    title: "Check coverage, close gaps",
    desc: "Deterministic diff of questions against requirements. Uncovered must-haves trigger another pass.",
  },
  {
    icon: CalendarDays,
    title: "Build the schedule",
    desc: "Allocates topics across your exact number of days — arithmetic, not a guess from the model.",
  },
];

const KIT_SECTIONS = [
  {
    icon: BrainCircuit,
    title: "Company brief",
    desc: "What they do, and how they hire — built from what was actually found, not invented.",
  },
  {
    icon: Layers,
    title: "Question bank",
    desc: "Organized by category, each question linked back to the requirement it covers.",
  },
  {
    icon: Pencil,
    title: "Flashcards & practice",
    desc: "Step through one at a time, rate your confidence, and resurface what you were shakiest on.",
  },
  {
    icon: CalendarDays,
    title: "Day-by-day schedule",
    desc: "A focus, a set of questions, and a duration for every day you said you had.",
  },
];

/* Small folder-tab label — the recurring structural device that stands in
   for the generic all-caps eyebrow. Color ties each section to where it
   sits in the pipeline (indigo = building, moss = verifying). */
function Tab({ color = "indigo", children }) {
  const tones = {
    indigo: "bg-[#EEF1F8] text-[#30467B] border-[#C9D3E8]",
    moss: "bg-[#EDF3EC] text-[#3F6B4E] border-[#CBDDC9]",
    ochre: "bg-[#FBF1DE] text-[#8A5F0F] border-[#EAD3A0]",
  };
  return (
    <span
      className={`inline-flex items-center rounded-t-md border border-b-0 px-3 py-1.5 text-[13px] font-medium ${tones[color]}`}
    >
      {children}
    </span>
  );
}

export default function LandingPage() {
  return (
    <div className="bg-[#F6F5F0] text-[#2A2E27] font-sans">
      <Navbar />

      {/* ───────────────────────── HERO ───────────────────────── */}
      <section className="relative overflow-hidden pt-20">
        <div
          className="absolute w-[620px] h-[620px] rounded-full opacity-[0.35] blur-3xl pointer-events-none"
          style={{
            background: "radial-gradient(circle, #DCE3F5 0%, transparent 70%)",
            top: "-220px",
            left: "-160px",
          }}
        />
        <div
          className="absolute w-[520px] h-[520px] rounded-full opacity-[0.3] blur-3xl pointer-events-none"
          style={{
            background: "radial-gradient(circle, #E1EDE1 0%, transparent 70%)",
            bottom: "-220px",
            right: "-140px",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-24 grid lg:grid-cols-2 gap-14 items-center">
          {/* Left: copy */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#DEDCD2] bg-white px-3 py-1 text-xs text-[#6B6F63] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3F6B4E]" />
              Interview prep, built from the actual posting
            </div>

            <h1 className="font-display text-4xl sm:text-5xl font-medium tracking-tight text-[#1B1F17] leading-[1.12]">
              Paste the job.
              <br />
              Point at the company.
            </h1>

            <p className="mt-5 text-base text-[#565A4F] leading-relaxed max-w-md">
              We pull the requirements from the description, crawl the
              company site for how they hire, and build a prep kit you can
              edit, practice, and work through on a schedule you set.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="/register"
                className="inline-flex items-center gap-2 rounded-lg bg-[#30467B] hover:bg-[#263A66] text-white px-5 py-3 text-sm font-medium transition-colors"
              >
                Build a prep kit
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#engine"
                className="inline-flex items-center gap-2 rounded-lg border border-[#DEDCD2] hover:border-[#B9B6A6] bg-white text-[#3A3E33] px-5 py-3 text-sm font-medium transition-colors"
              >
                See how it researches
              </a>
            </div>

            <div className="mt-10 flex items-center gap-6 text-xs text-[#7A7E70]">
              <div className="flex items-center gap-1.5">
                <ListChecks className="w-3.5 h-3.5 text-[#30467B]" />
                Requirement-linked questions
              </div>
              <div className="flex items-center gap-1.5">
                <ClipboardCheck className="w-3.5 h-3.5 text-[#3F6B4E]" />
                Nothing must-have left uncovered
              </div>
            </div>
          </div>

          {/* Right: the case file */}
          <div className="relative pt-6">
            {/* folder tab */}
            <div className="absolute -top-0 left-9 w-32 h-7 bg-[#EDEAD9] border border-[#DEDCD2] border-b-0 rounded-t-lg" />

            <div className="relative rounded-2xl rounded-tl-none border border-[#DEDCD2] bg-white shadow-xl shadow-stone-300/30 overflow-hidden">
              {/* binder holes */}
              <div className="absolute left-3 top-0 bottom-0 flex flex-col justify-evenly py-6">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F6F5F0] border border-[#DEDCD2]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#F6F5F0] border border-[#DEDCD2]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#F6F5F0] border border-[#DEDCD2]" />
              </div>

              {/* header row */}
              <div className="flex items-center justify-between pl-10 pr-4 py-3 border-b border-[#EAE8DE]">
                <div>
                  <p className="text-sm font-medium text-[#1B1F17]">
                    Case file — GitLab
                  </p>
                  <p className="text-xs text-[#8A8E7E]">
                    Senior Backend Engineer
                  </p>
                </div>
                <span className="font-mono text-[11px] text-[#3F6B4E] bg-[#EDF3EC] border border-[#CBDDC9] rounded-full px-2.5 py-1">
                  building
                </span>
              </div>

              {/* notes */}
              <div className="pl-10 pr-5 py-5 space-y-3.5 text-[13px] leading-relaxed">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#3F6B4E] mt-0.5 flex-shrink-0" />
                  <p className="text-[#3A3E33]">
                    Extracted 11 requirements — 7 must-have, 4 nice-to-have
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#3F6B4E] mt-0.5 flex-shrink-0" />
                  <p className="text-[#3A3E33]">
                    Crawled gitlab.com — found{" "}
                    <span className="font-mono text-[12px] text-[#565A4F]">
                      /handbook/hiring/interviewing
                    </span>
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-[#9C6B12] mt-0.5 flex-shrink-0" />
                  <p className="text-[#7A7E70]">
                    No public interview write-ups found — skipping, noted in
                    brief
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#3F6B4E] mt-0.5 flex-shrink-0" />
                  <p className="text-[#3A3E33]">
                    Generated 18 questions across 4 categories
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-[#9C6B12] mt-0.5 flex-shrink-0" />
                  <p className="text-[#7A7E70]">
                    Coverage check:{" "}
                    <span className="font-mono text-[12px]">req-04</span>{" "}
                    (system design) uncovered
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <Circle className="w-4 h-4 text-[#30467B] mt-0.5 flex-shrink-0" />
                  <p className="text-[#3A3E33]">
                    Second pass — generating for{" "}
                    <span className="font-mono text-[12px]">req-04</span>...
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-3 pl-10 text-xs text-[#9A9D8F]">
              Every question traces back to a requirement id.
            </p>
          </div>
        </div>
      </section>

      {/* ───────────────────────── NOT A SINGLE PROMPT ───────────────────────── */}
      <section className="border-t border-[#E4E2D6]">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="max-w-2xl mb-12">
            <Tab color="indigo">why this takes several steps</Tab>
            <h2 className="font-display text-3xl font-medium text-[#1B1F17] tracking-tight mt-0 border-t border-[#C9D3E8] pt-5">
              A kit isn&apos;t one prompt away.
            </h2>
            <p className="mt-3 text-[#565A4F]">
              A company that publishes a take-home followed by a system
              design round needs a different kit from one that says nothing
              about how it hires. That only shows up if the research happens
              before the questions do.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Single call */}
            <div className="rounded-2xl border border-[#E4E2D6] bg-[#EFEEE7] p-6">
              <p className="text-[13px] font-medium text-[#8A8E7E] mb-4">
                One call, everything at once
              </p>
              <div className="space-y-3 font-mono text-xs leading-relaxed">
                <p className="text-[#9A9D8F]">
                  prompt: &quot;here&apos;s a job description, write me an
                  interview kit&quot;
                </p>
                <p className="text-[#9A9D8F]">
                  → guesses at requirements, invents an interview process,
                  no way to check anything got missed
                </p>
              </div>
              <p className="mt-4 text-xs text-[#8A8E7E]">
                Fast, and unaccountable for what it left out.
              </p>
            </div>

            {/* Staged pipeline */}
            <div className="rounded-2xl border border-[#C9D3E8] bg-white p-6 shadow-sm shadow-stone-200/40">
              <p className="text-[13px] font-medium text-[#30467B] mb-4">
                Staged, checked pipeline
              </p>
              <div className="space-y-3 font-mono text-xs leading-relaxed">
                <p className="text-[#565A4F]">
                  <span className="text-[#30467B]">01</span> extract → tag
                  each requirement must or nice
                </p>
                <p className="text-[#565A4F]">
                  <span className="text-[#30467B]">02</span> research → crawl
                  site, find the hiring page
                </p>
                <p className="text-[#565A4F]">
                  <span className="text-[#30467B]">03</span> generate →
                  one focused call per requirement
                </p>
                <p className="text-[#565A4F]">
                  <span className="text-[#30467B]">04</span> check → diff
                  questions against requirements, refill gaps
                </p>
              </div>
              <p className="mt-4 text-xs text-[#3F6B4E]">
                The gap check is code, not another guess.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────── FEATURES ───────────────────────── */}
      <section id="features" className="border-t border-[#E4E2D6]">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="max-w-2xl mb-12">
            <Tab color="moss">what goes in</Tab>
            <h2 className="font-display text-3xl font-medium text-[#1B1F17] tracking-tight mt-0 border-t border-[#CBDDC9] pt-5">
              From a pasted description to a real kit.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl border border-[#E4E2D6] bg-white p-5 hover:border-[#C9D3E8] transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-[#EEF1F8] border border-[#C9D3E8] flex items-center justify-center mb-4">
                  <Icon className="w-4 h-4 text-[#30467B]" strokeWidth={1.75} />
                </div>
                <h3 className="text-sm font-semibold text-[#1B1F17] mb-1.5">
                  {title}
                </h3>
                <p className="text-sm text-[#7A7E70] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── ENGINE / PIPELINE ───────────────────────── */}
      <section id="engine" className="border-t border-[#E4E2D6]">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="max-w-2xl mb-14">
            <Tab color="indigo">the research pipeline</Tab>
            <h2 className="font-display text-3xl font-medium text-[#1B1F17] tracking-tight mt-0 border-t border-[#C9D3E8] pt-5">
              Six steps, run in order.
            </h2>
            <p className="mt-3 text-[#565A4F]">
              Requirement extraction and coverage checking are arithmetic —
              your code decides them, not the model.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#E4E2D6] rounded-2xl overflow-hidden border border-[#E4E2D6]">
            {PIPELINE.map(({ icon: Icon, title, desc }, i) => (
              <div key={title} className="bg-white p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-xs text-[#B0B4A2]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Icon className="w-4 h-4 text-[#3F6B4E]" strokeWidth={1.75} />
                </div>
                <h3 className="text-sm font-semibold text-[#1B1F17] mb-1.5">
                  {title}
                </h3>
                <p className="text-sm text-[#7A7E70] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── KIT CONTENTS ───────────────────────── */}
      <section id="kit" className="border-t border-[#E4E2D6]">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="max-w-2xl mb-12">
            <Tab color="moss">what you get</Tab>
            <h2 className="font-display text-3xl font-medium text-[#1B1F17] tracking-tight mt-0 border-t border-[#CBDDC9] pt-5">
              A kit you can reshape, not just read.
            </h2>
            <p className="mt-3 text-[#565A4F]">
              Every section can be edited by hand or regenerated on its own —
              a question you rewrote stays put even if you regenerate the
              rest of its category.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {KIT_SECTIONS.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl border border-[#E4E2D6] bg-white p-7"
              >
                <div className="w-10 h-10 rounded-lg bg-[#EEF1F8] border border-[#C9D3E8] flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-[#30467B]" strokeWidth={1.75} />
                </div>
                <h3 className="font-display text-lg font-medium text-[#1B1F17] mb-2">
                  {title}
                </h3>
                <p className="text-sm text-[#565A4F] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* Builder state strip */}
          <div className="mt-6 rounded-2xl border border-[#E4E2D6] bg-white p-6">
            <p className="text-[13px] font-medium text-[#8A8E7E] mb-4">
              Editing a question
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E4E2D6] px-3 py-1.5 text-[#7A7E70]">
                <Sparkles className="w-3.5 h-3.5 text-[#B0B4A2]" />
                generated
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#C9D3E8] bg-[#EEF1F8] px-3 py-1.5 text-[#30467B]">
                <Pencil className="w-3.5 h-3.5" />
                edited by you
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#CBDDC9] bg-[#EDF3EC] px-3 py-1.5 text-[#3F6B4E]">
                <Pin className="w-3.5 h-3.5" />
                pinned — survives regeneration
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E4E2D6] px-3 py-1.5 text-[#8A8E7E]">
                <RotateCcw className="w-3.5 h-3.5" />
                regenerate category
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────── CTA ───────────────────────── */}
      <section className="border-t border-[#E4E2D6]">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-medium text-[#1B1F17] tracking-tight">
            Turn a job post into a study plan.
          </h2>
          <p className="mt-3 text-[#565A4F] max-w-md mx-auto">
            Paste the description, point at the company, say how many days
            you have — the kit adapts to what it actually finds.
          </p>
          <a
            href="/register"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#30467B] hover:bg-[#263A66] text-white px-6 py-3 text-sm font-medium transition-colors"
          >
            Build a prep kit
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* ───────────────────────── FOOTER ───────────────────────── */}
      <footer className="border-t border-[#E4E2D6]">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9A9D8F]">
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-3.5 h-3.5 text-[#30467B]" />
            <span>prepStack — Interview Prep Kit Generator</span>
          </div>
          <p>© {new Date().getFullYear()} prepStack. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}