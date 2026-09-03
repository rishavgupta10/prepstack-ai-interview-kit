"use client";

import { useEffect, useRef } from "react";
import { BotIcon, Sparkles, User2 } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface AiSpeakingIndicatorProps {
    isUser: boolean
    /** Whether the AI is currently speaking. When false, renders nothing (or a static idle dot if `showIdle`). */
    active: boolean;
    /** "pill" = compact label + mini waveform. "avatar" = pulsing ring around an icon. */
    variant?: "pill" | "avatar";
    /** Show a subtle idle state instead of unmounting when not active */
    showIdle?: boolean;
    label?: string;
}

// ─── Mini waveform (used inside the pill variant) ────────────────────────────

export function MiniWaveform({ active, barCount = 4 }: { active: boolean; barCount?: number }) {
    const barsRef = useRef<(HTMLDivElement | null)[]>([]);
    const phasesRef = useRef<number[]>([0.2, 1.4, 2.6, 0.8, 1.9, 0.5].slice(0, barCount));
    const frameRef = useRef<number>(0);

    useEffect(() => {
        if (!active) {
            barsRef.current.forEach((b) => { if (b) b.style.height = "4px"; });
            return;
        }
        const tick = (t: number) => {
            barsRef.current.forEach((bar, i) => {
                if (!bar) return;
                const speed = 0.0045 + (i % 3) * 0.0006;
                const wave = Math.sin(t * speed + phasesRef.current[i]);
                const amp = 4 + Math.abs(wave) * 10;
                bar.style.height = `${amp.toFixed(1)}px`;
            });
            frameRef.current = requestAnimationFrame(tick);
        };
        frameRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frameRef.current);
    }, [active]);

    return (
        <div className="flex items-center gap-[2.5px] h-3.5 ml-0.5">
            {Array.from({ length: barCount }).map((_, i) => (
                <div
                    key={i}
                    ref={(el) => { barsRef.current[i] = el; }}
                    className="w-[2.5px] rounded-[2px] bg-violet-400 transition-[height] duration-[120ms] ease-out"
                    style={{ height: "4px" }}
                />
            ))}
        </div>
    );
}

// ─── Breathing ring (used in both variants) ──────────────────────────────────

export function BreathingRing({ delay = 0, size = "inset-0" }: { delay?: number; size?: string }) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        let interval: ReturnType<typeof setInterval>;
        const loop = () => {
            el.style.transition = "none";
            el.style.opacity = "0.6";
            el.style.transform = "scale(1)";
            requestAnimationFrame(() => {
                el.style.transition = "opacity 1.6s ease-out, transform 1.6s ease-out";
                el.style.opacity = "0";
                el.style.transform = "scale(1.6)";
            });
        };
        const t = setTimeout(() => {
            loop();
            interval = setInterval(loop, 1600);
        }, delay);
        return () => { clearTimeout(t); clearInterval(interval); };
    }, [delay]);

    return (
        <div
            ref={ref}
            className={`absolute ${size} rounded-full border-[1.5px] border-violet-400/45 pointer-events-none`}
        />
    );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function AiSpeakingIndicator({
    isUser,
    active,
    variant = "pill",
    showIdle = false,
    label = "AI speaking",
}: AiSpeakingIndicatorProps) {
    if (!active && !showIdle) return null;

    if (variant === "avatar") {
        return (
            <div className="relative w-[52px] h-[52px] flex items-center justify-center">
                {active && (
                    <>
                        <BreathingRing delay={0} />
                        <BreathingRing delay={800} />
                    </>
                )}
                <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center relative z-10 transition-colors duration-300 ${active ? "bg-violet-500/[0.16]" : "bg-white/[0.04]"
                        }`}
                >
                    {isUser ? <User2 /> : <BotIcon size={17} className={active ? "text-violet-400" : "text-white/25"} />}
                </div>
            </div>
        );
    }

    // pill variant
    return (
        <div
            className={`inline-flex items-center gap-2.5 rounded-full pl-3 pr-4 py-[9px] border-[0.5px] transition-colors duration-300 ${active
                ? "bg-violet-500/10 border-violet-500/20"
                : "bg-white/[0.03] border-white/[0.06]"
                }`}
        >
            {/* <div className="relative w-[22px] h-[22px] flex items-center justify-center shrink-0">
                {active && (
                    <div
                        className="absolute inset-0 rounded-full border-[1.5px] border-violet-400/40"
                        style={{ animation: "ai-ring-pulse 1.8s ease-in-out infinite" }}
                    />
                )}
                <Sparkles size={12} className={active ? "text-violet-400" : "text-white/25"} />
            </div> */}
            {/* <span className={`text-[12.5px] font-medium ${active ? "text-violet-300" : "text-white/30"}`}>
                {active ? label : "Idle"}
            </span> */}
            {active && <MiniWaveform active={active} />}

            <style>{`
        @keyframes ai-ring-pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.18); opacity: 0.15; }
        }
      `}</style>
        </div>
    );
}