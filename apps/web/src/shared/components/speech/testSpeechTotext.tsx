"use client"
import { useSpeechToText } from '@/shared/hooks/use-speech-to-text';
import React from 'react'

const TestSpeechTotext = () => {
    const {
        transcript,
        isListening,
        startListening,
        stopListening,
    } = useSpeechToText();
    console.log(isListening)
    console.log(transcript)
    return (
        <div>
            <button
                className="bg-blue-400 p-4"
                onClick={() => {startListening()}}
            >
                {!isListening ? "🎤 Speak" : "listing..."}
            </button>
            {isListening && <span>listing....</span>}
            <p className="bg-white">{transcript}</p>
        </div>
    )
}

export default TestSpeechTotext
