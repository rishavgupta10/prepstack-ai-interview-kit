"use client"
import Link from "next/link";
import { ArrowLeft, Home} from "lucide-react";
import { useRouter } from "next/navigation"
import {getStatusInfo} from "../../utils/statusCodeMessageHandeler"

export default function NotFoundData({Icon,statusCode=404}) {
  const router = useRouter()
  const statusInfo = getStatusInfo(statusCode);
  return (
    <div className="min-h-screen bg-[#0a0c12] flex items-center justify-center px-6 py-16">
      <div className="flex flex-col items-center text-center max-w-[420px] w-full">

        {/* Orb */}
        <div className="relative w-[140px] h-[140px] flex items-center justify-center mb-10 flex-shrink-0">
          {/* Spinning rings */}
          <span className="absolute inset-0 rounded-full border border-violet-500/25 animate-[orb-spin_8s_linear_infinite]" />
          <span className="absolute inset-[10px] rounded-full border border-dashed border-violet-500/15 animate-[orb-spin_12s_linear_infinite_reverse]" />
          <span className="absolute inset-[22px] rounded-full border border-violet-500/10 animate-[orb-spin_18s_linear_infinite]" />
          {/* Glow */}
          <span className="absolute inset-[30px] rounded-full bg-[radial-gradient(circle_at_40%_40%,rgba(124,92,252,0.35),rgba(124,92,252,0.08)_70%)] blur-md animate-[orb-breathe_3s_ease-in-out_infinite]" />
          {/* Core */}
          <div className="absolute inset-[34px] rounded-full bg-violet-500/[0.14] border border-violet-500/30 flex items-center justify-center z-10">
            <Icon size={22} className="text-violet-500" />
          </div>
        </div>

        {/* 404 */}
        <div className="relative mb-2">
          <h1 className="text-[88px] font-bold leading-none tracking-[-4px] bg-gradient-to-br from-violet-300 via-violet-500 to-violet-800 bg-clip-text text-transparent select-none">
            
          </h1>
          {/* Glitch layer */}
          <h1
            aria-hidden="true"
            className="absolute inset-0 text-[88px] font-bold leading-none tracking-[-4px] bg-gradient-to-br from-teal-400 to-violet-500 bg-clip-text text-transparent animate-[glitch_4s_infinite] opacity-0 select-none pointer-events-none"
          >
            599
          </h1>
        </div>

        <p className="text-[16px] font-medium text-slate-200 mb-2.5">{statusInfo.message}</p>
        <p className="text-[13px] text-[#475569] leading-[1.75] max-w-[320px] mb-8">
          {statusInfo.UserMessage}
        </p>

        {/* Code strip */}
        <p className="font-mono text-[11px] text-[#1e2a3a] mb-8 tracking-wide">
          error_code: <span className="text-[#2d3a4f]">{statusInfo.message.toUpperCase().replaceAll(" ","_")}</span>
          &nbsp;·&nbsp;
          status: <span className="text-[#2d3a4f]">{statusCode}</span>
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap justify-center">
          <div
            onClick={() => router.back()}
            className="inline-flex cursor-pointer items-center gap-1.5 bg-white/[0.04] border border-white/[0.10] hover:bg-white/[0.07] hover:border-white/[0.16] text-[#94a3b8] hover:text-slate-200 rounded-xl px-5 py-2.5 text-[13px] font-medium transition-all duration-150 hover:-translate-y-px"
            aria-label="Go back to previous page"
          >
            <ArrowLeft size={14} />
            Go back
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl px-5 py-2.5 text-[13px] font-medium transition-all duration-150 hover:-translate-y-px shadow-[0_0_24px_rgba(124,92,252,0.3)] hover:shadow-[0_0_32px_rgba(124,92,252,0.45)]"
            aria-label="Return to home page"
          >
            <Home size={14} />
            Back to home
          </Link>
        </div>

        <p className="mt-10 text-[11px] text-[#1e2a3a]">
          © 2026 prepStack AI · All systems operational
        </p>
      </div>

      <style>{`
        @keyframes orb-spin  { to { transform: rotate(360deg); } }
        @keyframes orb-breathe {
          0%, 100% { opacity: .8; transform: scale(1); }
          50%       { opacity: 1; transform: scale(1.08); }
        }
        @keyframes glitch {
          0%,93%,100% { opacity: 0; transform: translate(0); }
          94% {
            opacity: .6;
            transform: translate(-3px, 1px);
            clip-path: polygon(0 30%, 100% 30%, 100% 55%, 0 55%);
          }
          96% {
            opacity: .4;
            transform: translate(3px, -1px);
            clip-path: polygon(0 60%, 100% 60%, 100% 75%, 0 75%);
          }
          98% { opacity: 0; transform: translate(0); }
        }
      `}</style>
    </div>
  );
}