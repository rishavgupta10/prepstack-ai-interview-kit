import { Loader2, Sparkles } from "lucide-react";

export function InterviewLoader() {
    return (
        <div
            className="
      flex
      min-h-[400px]
      flex-col
      items-center
      justify-center
      h-screen
      px-6
      text-center
      "
        >
            <div
                className="
        flex
        h-16
        w-16
        items-center
        justify-center
        rounded-2xl
        border
        border-violet-500/20
        bg-violet-500/10
        "
            >
                <Loader2
                    className="
          h-8
          w-8
          animate-spin
          text-violet-400
          "
                />
            </div>

            <h2
                className="
        mt-6
        text-xl
        font-semibold
        "
            >
                Preparing Interview
            </h2>

            <p
                className="
        mt-2
        max-w-sm
        text-sm
        text-zinc-500
        "
            >
                Generating personalized questions and
                setting up your interview session.
            </p>

            <div
                className="
        mt-8
        flex
        items-center
        gap-2
        rounded-full
        border
        border-zinc-800
        bg-zinc-900
        px-4
        py-2
        text-sm
        text-zinc-400
        "
            >
                <Sparkles
                    size={14}
                    className="text-violet-400"
                />

                Please wait...
            </div>
        </div>
    );
}