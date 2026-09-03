import { useState } from "react";

import {
  speak as speechSpeak,
  stopSpeaking,
  pauseSpeaking,
  resumeSpeaking,
} from "../lib/speech/text-to-speech";

export const useSpeech = () => {
  const [status, setStatus] = useState<"idle" | "speaking" | "paused">("idle");

  const speak = (text: string) => {
    speechSpeak(
      text,
      {},
      {
        onStart: () => setStatus("speaking"),
        onEnd: () => setStatus("idle"),
        onPause: () => setStatus("paused"),
        onResume: () => setStatus("speaking"),
      },
    );
  };

  return {
    status,
    speak,
    stop: () => {
      stopSpeaking();
      setStatus("idle");
    },
    pause: () => {
      pauseSpeaking();
      setStatus("paused");
    },
    resume: () => {
      resumeSpeaking();
      setStatus("speaking");
    },
  };
};
