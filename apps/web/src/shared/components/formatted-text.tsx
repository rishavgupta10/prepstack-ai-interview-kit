"use client";

import { useMemo } from "react";

interface FormattedTextProps {
  text?: string | null;
  className?: string;
}

export function FormattedText({ text, className = "" }: FormattedTextProps) {
  const blocks = useMemo(() => {
    if (!text || typeof text !== "string") return [];

    const raw = text.trim();
    if (!raw) return [];

    // Check if text already has newline separators
    if (raw.includes("\n")) {
      const lines = raw.split(/\r?\n+/).map((l) => l.trim()).filter(Boolean);
      return lines;
    }

    // If it's a huge single block without newlines (e.g. 300+ chars), split into 2-3 sentences per paragraph
    if (raw.length > 250) {
      // Split on sentence boundaries: period/exclamation/question followed by space and capital letter
      const sentenceRegex = /([.!?])\s+(?=[A-Z0-9])/g;
      const parts = raw.split(sentenceRegex);
      
      const sentences: string[] = [];
      for (let i = 0; i < parts.length; i += 2) {
        const sentence = (parts[i] + (parts[i + 1] || "")).trim();
        if (sentence) sentences.push(sentence);
      }

      if (sentences.length > 2) {
        const paragraphs: string[] = [];
        let current = "";
        sentences.forEach((s, idx) => {
          current = current ? `${current} ${s}` : s;
          // Every 2-3 sentences, push as a paragraph
          if ((idx + 1) % 2 === 0 || idx === sentences.length - 1) {
            paragraphs.push(current);
            current = "";
          }
        });
        return paragraphs.filter(Boolean);
      }
    }

    return [raw];
  }, [text]);

  if (!blocks.length) {
    return null;
  }

  return (
    <div className={`space-y-3.5 leading-relaxed text-slate-800 text-sm sm:text-[15px] font-normal ${className}`}>
      {blocks.map((block, index) => {
        const isBullet = /^[•\-\*]\s+/.test(block) || /^\d+\.\s+/.test(block);

        if (isBullet) {
          const cleanText = block.replace(/^[•\-\*]\s+/, "").replace(/^\d+\.\s+/, "");
          return (
            <div key={index} className="flex items-start gap-2.5 pl-1 text-slate-800">
              <span className="text-purple-600 font-bold shrink-0 mt-0.5">•</span>
              <span className="flex-1">{cleanText}</span>
            </div>
          );
        }

        return (
          <p key={index} className="text-slate-800 leading-relaxed">
            {block}
          </p>
        );
      })}
    </div>
  );
}
