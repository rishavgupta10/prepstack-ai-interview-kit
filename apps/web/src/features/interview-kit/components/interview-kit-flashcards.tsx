"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  Grid,
  Layers,
  RotateCcw,
  Shuffle,
} from "lucide-react";
import { FormattedText } from "@/shared/components/formatted-text";
import type {
  InterviewFlashcard,
  InterviewRequirement,
} from "../types/interview-kit.types";

interface InterviewKitFlashcardsProps {
  flashcards: InterviewFlashcard[];
  requirements?: InterviewRequirement[];
}

export function InterviewKitFlashcards({
  flashcards = [],
  requirements = [],
}: InterviewKitFlashcardsProps) {
  const [cards, setCards] = useState<InterviewFlashcard[]>(flashcards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [viewMode, setViewMode] = useState<"card" | "grid">("card");

  // Keep cards in sync if props change
  useEffect(() => {
    setCards(flashcards);
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [flashcards]);

  const currentCard = cards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
  };

  const handleReset = () => {
    setIsFlipped(false);
    setCards(flashcards);
    setCurrentIndex(0);
  };

  if (cards.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-xs">
        <Layers className="mx-auto h-8 w-8 text-slate-400 mb-2" />
        <p className="text-sm font-bold text-slate-900">No flashcards available for this kit.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-slate-200/80">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setViewMode("card")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
              viewMode === "card"
                ? "bg-purple-600 border-purple-600 text-white shadow-xs"
                : "bg-white border-slate-200 text-slate-600 hover:text-slate-950 hover:bg-slate-50"
            }`}
          >
            <Layers size={13} />
            Flip Mode
          </button>
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
              viewMode === "grid"
                ? "bg-purple-600 border-purple-600 text-white shadow-xs"
                : "bg-white border-slate-200 text-slate-600 hover:text-slate-950 hover:bg-slate-50"
            }`}
          >
            <Grid size={13} />
            Grid View ({cards.length})
          </button>
        </div>

        {viewMode === "card" && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShuffle}
              className="flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-950 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <Shuffle size={12} />
              Shuffle
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-950 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <RotateCcw size={12} />
              Reset Order
            </button>
          </div>
        )}
      </div>

      {viewMode === "card" ? (
        /* Single Flip Card Experience */
        <div className="flex flex-col items-center max-w-2xl mx-auto space-y-4">
          {/* Progress Bar & Indicators */}
          <div className="w-full flex items-center justify-between text-xs text-slate-600 font-medium px-1">
            <span className="font-bold text-slate-950">
              Card {currentIndex + 1} of {cards.length}
            </span>
            <span className="text-[11px] text-slate-500 font-semibold">
              Click anywhere on card to flip
            </span>
          </div>

          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-purple-600 to-blue-600 h-full rounded-full transition-all duration-300"
              style={{
                width: `${((currentIndex + 1) / cards.length) * 100}%`,
              }}
            />
          </div>

          {/* Flip Card Container */}
          <div
            onClick={() => setIsFlipped((prev) => !prev)}
            className="w-full min-h-[300px] cursor-pointer rounded-2xl border-2 border-purple-100 bg-white p-6 sm:p-8 flex flex-col justify-between hover:border-purple-300 transition-all shadow-md hover:shadow-lg group relative select-none"
          >
            {/* Card Top Pill */}
            <div className="flex items-center justify-between">
              <span
                className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                  isFlipped
                    ? "bg-purple-50 border-purple-200 text-purple-700"
                    : "bg-purple-50 border-purple-200 text-purple-700"
                }`}
              >
                {isFlipped ? "Answer / Key Takeaway" : "Question / Prompt"}
              </span>

              <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 group-hover:text-purple-600 transition-colors">
                <Eye size={13} />
                {isFlipped ? "Click to view front" : "Click to reveal back"}
              </span>
            </div>

            {/* Card Content */}
            <div className="py-6 my-auto text-center">
              {isFlipped ? (
                <div className="text-left max-w-xl mx-auto">
                  <FormattedText text={currentCard.back} />
                </div>
              ) : (
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-950 leading-relaxed">
                    {currentCard.front}
                  </h3>
                </div>
              )}
            </div>

            {/* Card Bottom Hint */}
            <div className="text-center pt-3 border-t border-slate-100">
              <span className="text-xs text-slate-400 font-medium">
                Tip: Formulate your answer first, then tap to reveal key takeaways.
              </span>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-4 pt-2">
            <button
              type="button"
              onClick={handlePrev}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:text-slate-950 hover:bg-slate-50 transition-colors text-sm font-semibold shadow-xs"
            >
              <ArrowLeft size={16} />
              Previous
            </button>

            <button
              type="button"
              onClick={() => setIsFlipped((prev) => !prev)}
              className="px-5 py-2 rounded-xl bg-purple-50 border border-purple-200 text-purple-700 hover:bg-purple-100 transition-colors text-sm font-bold shadow-2xs"
            >
              Flip Card
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:text-slate-950 hover:bg-slate-50 transition-colors text-sm font-semibold shadow-xs"
            >
              Next
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      ) : (
        /* Grid View of all Flashcards */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cards.map((card, idx) => (
            <div
              key={card.id || idx}
              className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3 flex flex-col justify-between shadow-xs hover:border-purple-200 transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-400">
                    Card #{idx + 1}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded">
                    Front
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-950">{card.front}</h4>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-1.5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-purple-700">
                  Key Takeaway:
                </span>
                <FormattedText text={card.back} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
