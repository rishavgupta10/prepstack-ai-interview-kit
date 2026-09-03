"use client";

import { useRef, useState } from "react";
import { createSpeechRecognition } from "../lib/speech/speech-to-text";

export function useSpeechToText() {
  const recognitionRef = useRef<AppSpeechRecognition | null>(null);

  const restartTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const shouldContinueRef = useRef(false);

  const [transcript, setTranscript] = useState("");

  const [isListening, setIsListening] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const startListening = () => {
    try {
      setTranscript("");
      setError(null);

      const recognition = createSpeechRecognition();

      recognitionRef.current = recognition;
      recognition.continuous = true;

      recognition.onsoundstart = () => {
        console.log("Sound detected");
      };

      recognition.onstart = () => {
             console.log("Started");
        setIsListening(true);
      };

      recognition.onresult = (event: AppSpeechRecognitionEvent) => {
        let text = "";

        for (let i = 0; i < event.results.length; i++) {
          text += event.results[i][0].transcript;
        }

        setTranscript(text);
      };

      recognition.onerror = (event: AppSpeechRecognitionErrorEvent) => {
        setError(event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
             console.log("ended");
        setIsListening(false);

        if (!shouldContinueRef.current) return;

        restartTimeoutRef.current = setTimeout(() => {
          recognition.start();
          console.log("restarted")
        }, 500); // wait 2 seconds before restarting
      };

      recognition.start();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown Error");
    }
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
  };

  return {
    transcript,

    isListening,

    error,

    startListening,

    stopListening,
  };
}