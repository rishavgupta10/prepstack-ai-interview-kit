"use client";

import { useRef } from "react";
import Script from "next/script";


import { useGoogleLogin } from "@/features/auth/hooks/use-login";
import { authStorage } from "@/shared/lib/auth";
import { useRouter } from "next/navigation";

export function GoogleAuth() {
    const router = useRouter();
    const googleLoginMutation = useGoogleLogin()
    const googleButtonRef =
        useRef<HTMLDivElement>(null);

    const handleCredentialResponse = async (
        response: { credential: string }
    ) => {
        try {
            console.log(
                "Google credential received"
            );

            const result = await googleLoginMutation.mutateAsync(response.credential);

            authStorage.setToken(result.data.token);
            router.push("/dashboard");



            console.log(
                "Google login response:",
                result
            );
        } catch (error) {
            console.error(
                "Google login failed:",
                error
            );
        }
    };

    const initializeGoogle = () => {
        if (!window.google) {
            return;
        }

        window.google.accounts.id.initialize({
            client_id:
                process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
            callback: handleCredentialResponse,
        });

        // Normal Google button
        if (googleButtonRef.current) {
            window.google.accounts.id.renderButton(
                googleButtonRef.current,
                {
                    theme: "outline",
                    size: "large",
                    text: "continue_with",
                    shape: "rectangular",
                }
            );
        }

        // Google One Tap
        window.google.accounts.id.prompt();
    };

    return (
        <>
            <Script
                src="https://accounts.google.com/gsi/client"
                strategy="afterInteractive"
                onLoad={initializeGoogle}
            />

            <div className="w-full" ref={googleButtonRef} />
        </>
    );
}