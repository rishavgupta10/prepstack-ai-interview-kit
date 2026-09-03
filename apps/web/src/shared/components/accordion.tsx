import { useState, ReactNode } from "react";
import { ChevronDown, Sparkles } from "lucide-react";

interface AccordionItemProps {
  question: string;
  answer: ReactNode;
  defaultOpen?: boolean;
  badge?: string; // e.g. "AI assessed" — omit to hide
  // Optional controlled mode — pass these when using inside <Accordion allowMultipleOpen={false} />
  isOpen?: boolean;
  onToggle?: () => void;
}

export function AccordionItem({
  question,
  answer,
  defaultOpen = false,
  badge,
  isOpen: controlledIsOpen,
  onToggle,
}: AccordionItemProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);

  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalOpen;
  const toggle = isControlled ? onToggle! : () => setInternalOpen((prev) => !prev);

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs hover:border-purple-200 transition-all">
      <button
        type="button"
        onClick={toggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-2xl hover:bg-slate-50/50 transition-colors"
      >
        <span className="text-base sm:text-lg font-semibold text-slate-950 leading-relaxed">
          {question}
        </span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-purple-600" : ""
          }`}
        />
      </button>

      <div
        className={`grid transition-all duration-200 ease-in-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-slate-100 bg-slate-50/30">
            <p className="text-3xl leading-none text-purple-200 font-serif mb-1">
              &ldquo;
            </p>
            <div className="text-sm sm:text-base leading-relaxed text-slate-800 font-normal">
              {answer}
            </div>

            {badge && (
              <div className="flex items-center justify-end mt-4 pt-3 border-t border-slate-100">
                <div className="flex items-center gap-1.5 bg-purple-50 border border-purple-200 rounded-lg px-2.5 py-1 text-xs font-semibold text-purple-700">
                  <Sparkles size={12} />
                  {badge}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface AccordionProps {
  items: { question: string; answer: ReactNode; badge?: string }[];
  allowMultipleOpen?: boolean; // false = only one item open at a time
  defaultOpenIndex?: number; // only used when allowMultipleOpen is false
}

export function Accordion({
  items,
  allowMultipleOpen = true,
  defaultOpenIndex,
}: AccordionProps) {
  // Only used in single-open mode; each item manages its own state otherwise.
  const [openIndex, setOpenIndex] = useState<number | null>(
    defaultOpenIndex ?? null
  );

  return (
    <div className="flex flex-col gap-3.5">
      {items.map((item, i) =>
        allowMultipleOpen ? (
          <AccordionItem key={i} {...item} />
        ) : (
          <AccordionItem
            key={i}
            {...item}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex((prev) => (prev === i ? null : i))}
          />
        )
      )}
    </div>
  );
}