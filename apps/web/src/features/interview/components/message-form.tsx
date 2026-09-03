"use client";

import { useState } from "react";
import { SendHorizonal, Loader2, MemoryStick, Mic } from "lucide-react";

import { useSendMessage } from "../hooks/use-send-message";
import { useGenerateReport } from "@/features/report/hooks/use-generate-report";
import Notiflix, { Notify } from "notiflix";
import { useSpeechToText } from "@/shared/hooks/use-speech-to-text";
import AiSpeakingIndicator, { MiniWaveform } from "@/shared/components/speech/aispeakingindicator";
import { useSpeech } from "@/shared/hooks/use-speech";
import { useRouter } from "next/navigation";

export function MessageForm({
    interviewId,
    messagesLength
}: {
    interviewId: string;
    messagesLength: number
}) {
    const router = useRouter()
    const {
        transcript,
        isListening,
        startListening,
        stopListening,
    } = useSpeechToText();
    const { speak } = useSpeech()
    const [message, setMessage] =
        useState("");

    const sendMessageMutation =
        useSendMessage();

    const { isPending: generateReportPending, mutateAsync } = useGenerateReport()

    const handleSend =
        async () => {
            if (
                !message.trim() ||
                sendMessageMutation.isPending
            ) {
                return;
            }

            await sendMessageMutation.mutateAsync({
                interviewId,
                content: message,
            });

            setMessage("");
        };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (
            e.key === "Enter" &&
            !e.shiftKey
        ) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleReportGeneration = async () => {
        if (messagesLength < 20) {
            Notiflix.Notify.info("not enough question answered to generate report")
            return
        }
        const res = await mutateAsync(interviewId)
        if(res.success){
            router.push(`/report/${interviewId}`)
        }
        
        Notiflix.Notify.success("report generated now")
    }





    return (

        <>
            <div onClick={handleReportGeneration} className="fixed text-xs top-4 rounded-full right-4 z-50  hover:bg-violet-500 hover:scale-95 active:scale-75 hover:shadow-violet-400 px-2 cursor-pointer duration-200 py-1 text-emerald-200 capitalize border border-emerald-200/60 shadow-2xl bg-emerald-400/5 shadow-emerald-500 md:hidden flex items-center gap-2">
                {generateReportPending ? "submitting..." : "submit"}
                {generateReportPending ? <Loader2 className="animate-spin" /> : <MemoryStick />}
            </div>
            <div
                className="
            sticky
            bottom-0
            border-t
            border-zinc-800
            bg-white/80
            backdrop-blur-xl
            md:p-4
            p-2
            "
            >
                <div>
                    <p>{transcript} </p>
                    <button className="text-emerald-500 underline-2 underline-offset-2 " onClick={() => setMessage(transcript)}>select answer text</button>
                </div>
                <div
                    className="
                flex
                items-center
                gap-2
                rounded-2xl
                border
                border-zinc-800
                bg-zinc-950
                p-2
                mt-3
                focus-within:border-violet-500
                transition-colors
                "
                >
                    <input
                        value={message}
                        onChange={(e) =>
                            setMessage(
                                e.target.value
                            )
                        }
                        onKeyDown={
                            handleKeyDown
                        }
                        placeholder="Type your answer..."
                        className="
                    flex-1
                    bg-transparent
                    px-3
                    py-2
                    text-sm
                    outline-none
                    placeholder:text-zinc-500
                    "
                    />
                    <button onMouseDown={startListening} onMouseUp={() => { stopListening(); speak(transcript) }} type="button">
                        {!isListening ? <Mic className="hover:text-blue-600" /> : <MiniWaveform active={true} />}
                    </button>

                    <button
                        onClick={
                            handleSend
                        }
                        disabled={
                            !message.trim() ||
                            sendMessageMutation.isPending
                        }
                        className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-violet-600
                    text-white
                    transition-all
                    hover:bg-violet-500
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                    "
                    >
                        {sendMessageMutation.isPending ? (
                            <Loader2
                                size={18}
                                className="animate-spin"
                            />
                        ) : (
                            <SendHorizonal
                                size={18}
                            />
                        )}
                    </button>
                    <div onClick={handleReportGeneration} className="rounded-md  hover:bg-violet-500 hover:scale-95 active:scale-75 hover:shadow-violet-400 px-2 cursor-pointer duration-200 py-1 text-emerald-200 capitalize border border-emerald-200/60 shadow-2xl bg-emerald-400/5 shadow-emerald-500 hidden md:flex items-center gap-2">
                        {generateReportPending ? "generating..." : "generate report"}
                        {generateReportPending ? <Loader2 className="animate-spin" /> : <MemoryStick />}
                    </div>
                </div>

                <p
                    className="
                mt-2
                text-center
                text-xs
                text-zinc-500
                "
                >
                    Press Enter to send
                </p>
            </div>
        </>
    );
}