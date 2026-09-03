export interface SpeakOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
  lang?: string;
}

export const getIndianVoice = () => {
  const voices = speechSynthesis.getVoices();

  return (
    voices.find(v => v.lang === "en-IN") ||
    voices.find(v => v.lang.startsWith("hi")) ||
    voices.find(v => v.name.toLowerCase().includes("india")) ||
    voices[0]
  );
};

export const speak = (
  text: string,
  options?: SpeakOptions,
  callbacks?: {
    onStart?: () => void;
    onEnd?: () => void;
    onPause?: () => void;
    onResume?: () => void;
  }
) => {
  if (typeof window === "undefined") return;

  speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  utterance.rate = options?.rate ?? 1.2;
  utterance.voice = getIndianVoice()
  utterance.pitch = options?.pitch ?? 1;
  utterance.volume = options?.volume ?? 1;
  utterance.lang = options?.lang ?? "en-IN";

utterance.onstart = callbacks?.onStart ?? null;
utterance.onend = callbacks?.onEnd ?? null;
utterance.onpause = callbacks?.onPause ?? null;
utterance.onresume = callbacks?.onResume ?? null;

  speechSynthesis.speak(utterance);
};

export const stopSpeaking = () => {
  speechSynthesis.cancel();
};

export const pauseSpeaking = () => {
  speechSynthesis.pause();
};

export const resumeSpeaking = () => {
  speechSynthesis.resume();
};