"use client";

import AiSpeakingIndicator from "@/shared/components/speech/aispeakingindicator";
import { useSpeech } from "@/shared/hooks/use-speech";
import { motion } from "framer-motion";
import { Bot, Mic, User2 } from "lucide-react";

interface Props {
  sender: string;
  content: string;
  isTyping?: boolean;
}

export function MessageBubble({
  sender,
  content,
  isTyping = false,
}: Props) {
  const isUser = sender === "user";
  const { speak, status } = useSpeech();

  function handleSpeakContent() {
    speak(content);
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 12,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.2,
      }}
      className={`
        flex
        gap-3
        ${isUser ? "justify-end" : "justify-start"}
      `}
    >
      {/* AI Avatar */}

      {!isUser && (
        <>
          {status !== "speaking" ? (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-purple-200 bg-purple-50 text-purple-600 shadow-2xs">
              <Bot size={18} />
            </div>
          ) : (
            <AiSpeakingIndicator isUser={isUser} variant="avatar" active={status === "speaking"} />
          )}
        </>
      )}

      {/* Bubble */}

      <div
        className={`
          max-w-[80%]
          rounded-2xl
          relative
          px-4
          py-3
          shadow-xs
          ${isUser
            ? `
                rounded-br-xs
                bg-gradient-to-r
                from-purple-600
                to-blue-600
                text-white
                font-medium
              `
            : `
                rounded-bl-xs
                border
                border-slate-200
                bg-white
                text-slate-800
              `
          }
        `}
      >
        {/* Header */}

        <div className="mb-1">
          <span
            className={`text-xs font-bold ${
              isUser ? "text-purple-100" : "text-slate-400"
            }`}
          >
            {isUser ? "You" : "AI Interviewer"}
          </span>
        </div>

        {/* Typing State */}

        {isTyping ? (
          <div className="flex items-center gap-1 py-1">
            <span className="h-2 w-2 animate-bounce rounded-full bg-purple-600 [animation-delay:-0.3s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-purple-600 [animation-delay:-0.15s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-purple-600" />
          </div>
        ) : (
          <p className="whitespace-pre-wrap break-words text-sm sm:text-[15px] leading-relaxed font-normal">
            {content}
          </p>
        )}
        <div className={`absolute -bottom-8 ${isUser ? "right-0" : "left-0"}`}>
          {status === "speaking" ? (
            <AiSpeakingIndicator isUser={isUser} variant="pill" showIdle active={status === "speaking"} />
          ) : (
            <button
              type="button"
              onClick={handleSpeakContent}
              className="p-1 text-purple-600 hover:text-purple-800 transition-colors"
              title="Read aloud"
            >
              <Mic size={18} />
            </button>
          )}
        </div>
      </div>

      {/* User Avatar */}

      {isUser && (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-700 shadow-2xs">
          <User2 size={18} />
        </div>
      )}
    </motion.div>
  );
}