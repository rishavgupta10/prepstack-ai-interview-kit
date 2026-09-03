"use client";

import { useMemo, useState } from "react";
import {
  Check,
  ChevronDown,
  Copy,
  Filter,
  HelpCircle,
  Search,
  Sparkles,
} from "lucide-react";
import { FormattedText } from "@/shared/components/formatted-text";
import type {
  InterviewQuestion,
  InterviewRequirement,
  QuestionCategory,
} from "../types/interview-kit.types";

interface InterviewKitQuestionsProps {
  questions: InterviewQuestion[];
  requirements?: InterviewRequirement[];
}

export function InterviewKitQuestions({
  questions = [],
  requirements = [],
}: InterviewKitQuestionsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openIds, setOpenIds] = useState<Set<string>>(new Set([questions[0]?.id].filter(Boolean)));
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Map requirement ID to requirement object
  const requirementMap = useMemo(() => {
    const map = new Map<string, InterviewRequirement>();
    requirements.forEach((req) => map.set(req.id, req));
    return map;
  }, [requirements]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    questions.forEach((q) => {
      if (q.category) set.add(q.category);
    });
    return ["all", ...Array.from(set)];
  }, [questions]);

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      if (selectedCategory !== "all" && q.category !== selectedCategory) {
        return false;
      }
      if (
        selectedDifficulty !== "all" &&
        String(q.difficulty) !== selectedDifficulty
      ) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesPrompt = q.prompt.toLowerCase().includes(query);
        const matchesAnswer = q.answer_outline.toLowerCase().includes(query);
        const matchesCategory = q.category.toLowerCase().includes(query);
        return matchesPrompt || matchesAnswer || matchesCategory;
      }
      return true;
    });
  }, [questions, selectedCategory, selectedDifficulty, searchQuery]);

  const toggleQuestion = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleAll = () => {
    if (openIds.size === filteredQuestions.length) {
      setOpenIds(new Set());
    } else {
      setOpenIds(new Set(filteredQuestions.map((q) => q.id)));
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getDifficultyBadge = (difficulty: number) => {
    switch (difficulty) {
      case 1:
        return (
          <span className="rounded-md bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
            Level 1 • Fundamental
          </span>
        );
      case 2:
        return (
          <span className="rounded-md bg-amber-50 border border-amber-200 px-2.5 py-0.5 text-[11px] font-bold text-amber-700">
            Level 2 • Intermediate
          </span>
        );
      case 3:
        return (
          <span className="rounded-md bg-rose-50 border border-rose-200 px-2.5 py-0.5 text-[11px] font-bold text-rose-700">
            Level 3 • Advanced / Deep
          </span>
        );
      default:
        return null;
    }
  };

  const getCategoryBadge = (category: QuestionCategory | string) => {
    const norm = category?.toLowerCase() || "";
    if (norm.includes("technical")) {
      return "bg-purple-50 border-purple-200 text-purple-700 font-bold";
    }
    if (norm.includes("behavioural") || norm.includes("behavioral")) {
      return "bg-purple-50 border-purple-200 text-purple-700 font-bold";
    }
    if (norm.includes("system") || norm.includes("design")) {
      return "bg-cyan-50 border-cyan-200 text-cyan-800 font-bold";
    }
    return "bg-amber-50 border-amber-200 text-amber-800 font-bold";
  };

  return (
    <div className="space-y-4">
      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search
            size={16}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions or keywords..."
            className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm font-medium text-slate-950 placeholder-slate-400 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all shadow-2xs"
          />
        </div>

        {/* Action button */}
        <button
          type="button"
          onClick={toggleAll}
          className="self-end md:self-auto text-xs font-bold text-purple-600 hover:text-purple-700 transition-colors px-2 py-1"
        >
          {openIds.size === filteredQuestions.length && filteredQuestions.length > 0
            ? "Collapse All"
            : "Expand All"}
        </button>
      </div>

      {/* Category Pills & Difficulty Filter */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-200/80">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`capitalize text-xs font-bold px-3 py-1.5 rounded-lg border transition-all ${
                selectedCategory === cat
                  ? "bg-purple-600 border-purple-600 text-white shadow-xs"
                  : "bg-white border-slate-200 text-slate-600 hover:text-slate-950 hover:bg-slate-50"
              }`}
            >
              {cat === "all" ? "All Categories" : cat}
            </button>
          ))}
        </div>

        {/* Difficulty Selector */}
        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
          <Filter size={13} className="text-slate-400" />
          <span>Difficulty:</span>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-900 focus:outline-none focus:border-purple-600 shadow-2xs"
          >
            <option value="all">All Difficulties</option>
            <option value="1">Level 1 (Fundamental)</option>
            <option value="2">Level 2 (Intermediate)</option>
            <option value="3">Level 3 (Advanced)</option>
          </select>
        </div>
      </div>

      {/* Questions Accordion List */}
      {filteredQuestions.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-xs">
          <HelpCircle className="mx-auto h-8 w-8 text-slate-400 mb-2" />
          <p className="text-sm font-bold text-slate-900">No questions match your filter.</p>
          <p className="text-xs text-slate-500 mt-1">Try selecting another category or clear search.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredQuestions.map((q, index) => {
            const isOpen = openIds.has(q.id);
            const isCopied = copiedId === q.id;
            const linkedReqs = (q.requirement_ids || [])
              .map((id) => requirementMap.get(id))
              .filter(Boolean) as InterviewRequirement[];

            return (
              <div
                key={q.id || index}
                className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden transition-all shadow-2xs hover:border-purple-200"
              >
                {/* Accordion Trigger */}
                <button
                  type="button"
                  onClick={() => toggleQuestion(q.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-start justify-between gap-4 p-5 sm:p-6 text-left hover:bg-slate-50/60 transition-colors focus:outline-none"
                >
                  <div className="space-y-2 flex-1 min-w-0">
                    {/* Badges */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-400">
                        Q{index + 1}
                      </span>
                      <span
                        className={`rounded-md border px-2.5 py-0.5 text-[11px] font-bold capitalize ${getCategoryBadge(
                          q.category,
                        )}`}
                      >
                        {q.category}
                      </span>
                      {getDifficultyBadge(q.difficulty)}
                    </div>

                    {/* Question Prompt */}
                    <h4 className="text-base font-bold text-slate-950 leading-relaxed pr-2">
                      {q.prompt}
                    </h4>
                  </div>

                  <div className="pt-1 text-slate-400 shrink-0">
                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-purple-600" : ""
                      }`}
                    />
                  </div>
                </button>

                {/* Accordion Content */}
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-slate-100 bg-slate-50/30 space-y-4">
                    {/* Linked JD Requirements */}
                    {linkedReqs.length > 0 && (
                      <div className="pt-3 flex flex-wrap items-center gap-2">
                        <span className="text-[11px] uppercase tracking-wider font-bold text-slate-500">
                          Targeted JD Competencies:
                        </span>
                        {linkedReqs.map((req) => (
                          <span
                            key={req.id}
                            className="inline-flex items-center gap-1.5 rounded-md bg-white border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-800 shadow-2xs"
                          >
                            <span
                              className={`h-2 w-2 rounded-full ${
                                req.priority === "must" ? "bg-rose-500" : "bg-purple-500"
                              }`}
                            />
                            {req.text}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Answer Outline Box */}
                    <div className="rounded-xl border border-purple-100 bg-purple-50/40 p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-purple-900 flex items-center gap-1.5">
                          <Sparkles size={14} className="text-purple-600" />
                          Recommended Answer Strategy & Key Points
                        </span>

                        <button
                          type="button"
                          onClick={() => handleCopy(q.id, q.answer_outline)}
                          className="flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg border border-purple-200 bg-white text-purple-700 font-semibold hover:bg-purple-50 transition-colors shadow-2xs"
                        >
                          {isCopied ? (
                            <>
                              <Check size={12} className="text-emerald-600" />
                              <span className="text-emerald-700">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy size={12} />
                              <span>Copy Outline</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Formatted Answer Outline for optimal paragraph reading */}
                      <FormattedText text={q.answer_outline} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
