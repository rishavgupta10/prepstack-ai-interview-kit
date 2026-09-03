import { SpeechRecognitionOptions } from "../../../shared/types/speech.types";

export function createSpeechRecognition(
  options?: SpeechRecognitionOptions
): AppSpeechRecognition {
  if (typeof window === "undefined") {
    throw new Error("Speech recognition is only available in the browser.");
  }

  const SpeechRecognitionCtor =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  if (!SpeechRecognitionCtor) {
    throw new Error(
      "Speech Recognition is not supported in this browser."
    );
  }

  const recognition = new SpeechRecognitionCtor();

  recognition.lang = options?.lang ?? "en-US";
  recognition.continuous = options?.continuous ?? false;
  recognition.interimResults =
    options?.interimResults ?? true;

  return recognition;
}