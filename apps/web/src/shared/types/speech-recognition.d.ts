export {};

declare global {
  interface AppSpeechRecognitionResultItem {
    transcript: string;
    confidence: number;
  }

  interface AppSpeechRecognitionResult {
    isFinal: boolean;
    length: number;
    [index: number]: AppSpeechRecognitionResultItem;
  }

  interface AppSpeechRecognitionResultList {
    length: number;
    [index: number]: AppSpeechRecognitionResult;
  }

  interface AppSpeechRecognitionEvent extends Event {
    resultIndex: number;
    results: AppSpeechRecognitionResultList;
  }

  interface AppSpeechRecognitionErrorEvent extends Event {
    error: string;
    message: string;
  }

  interface AppSpeechRecognition extends EventTarget {
    lang: string;
    continuous: boolean;
    interimResults: boolean;
    onstart: (() => void) | null;
    onend: (() => void) | null;
    onsoundstart: (() => void) | null;
    onresult: ((event: AppSpeechRecognitionEvent) => void) | null;
    onerror: ((event: AppSpeechRecognitionErrorEvent) => void) | null;
    start: () => void;
    stop: () => void;
    abort: () => void;
  }

  interface AppSpeechRecognitionStatic {
    new (): AppSpeechRecognition;
  }

  interface Window {
    SpeechRecognition: AppSpeechRecognitionStatic;
    webkitSpeechRecognition: AppSpeechRecognitionStatic;
  }
}