"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, BrainCircuit, HomeIcon } from "lucide-react";

import { useRegister } from "../hooks/use-register";
import { GoogleAuth } from "@/shared/components/auth/google-auth";
import Link from "next/link";

export function RegisterForm() {

    const router = useRouter();
    const registerMutation = useRegister();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const isLoading = registerMutation.isPending;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await registerMutation.mutateAsync({ name, email, password });

        router.push("/dashboard");
    };

    return (
        <div className="min-h-screen bg-[#0A0F1E] flex items-center justify-center px-4">

            <Link href={"/"} className="bg-blue-300/20 fixed top-10 left-10 size-10 rounded-md flex items-center justify-center"> <HomeIcon className="text-blue-400" /></Link>

            {/* Ambient glow */}
            <div
                className="absolute w-[420px] h-[420px] rounded-full opacity-20 blur-3xl pointer-events-none"
                style={{
                    background: "radial-gradient(circle, #3B82F6 0%, transparent 70%)",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            />

            {/* Card */}
            <div className="relative w-full max-w-md bg-[#111827] border border-[#1E2D45] rounded-2xl shadow-2xl shadow-blue-950/40 px-8 py-10">

                {/* App identity */}
                <div className="flex flex-col items-center gap-3 mb-8">
                    <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-blue-600/15 border border-blue-500/30">
                        <BrainCircuit className="w-7 h-7 text-blue-400" strokeWidth={1.75} />
                    </div>
                    <h1 className="text-xl font-semibold tracking-tight text-slate-100">
                        prepStack<span className="text-blue-400"> AI</span>
                    </h1>
                    <p className="text-xs text-slate-500 text-center tracking-wide uppercase">
                        AI Interview kit generator and prepration platform
                    </p>
                </div>

                {/* Divider */}
                <div className="border-t border-[#1E2D45] mb-8" />

                {/* Heading */}
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-slate-100">
                        Create an account
                    </h2>
                    <p className="text-sm text-slate-500 mt-0.5">
                        Start your AI coaching journey today
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Name */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-400 tracking-wide uppercase">
                            Full name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Smith"
                            required
                            disabled={isLoading}
                            className="w-full rounded-lg px-3.5 py-2.5 text-sm bg-[#0D1526] border border-[#1E2D45] text-slate-100 placeholder-slate-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
                        />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-400 tracking-wide uppercase">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                            disabled={isLoading}
                            className="w-full rounded-lg px-3.5 py-2.5 text-sm bg-[#0D1526] border border-[#1E2D45] text-slate-100 placeholder-slate-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
                        />
                    </div>

                    {/* Password */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-400 tracking-wide uppercase">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                disabled={isLoading}
                                className="w-full rounded-lg px-3.5 py-2.5 pr-10 text-sm bg-[#0D1526] border border-[#1E2D45] text-slate-100 placeholder-slate-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((v) => !v)}
                                disabled={isLoading}
                                className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-500 hover:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    {/* Error message */}
                    {registerMutation.isError && (
                        <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                            Registration failed. Please try again.
                        </p>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-150 mt-2"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Creating account…
                            </>
                        ) : (
                            "Create account"
                        )}
                    </button>
                </form>

                <div className="flex my-4 items-center gap-3">
                    <div className="h-px flex-1 bg-zinc-800" />

                    <span className="text-xs text-zinc-500">
                        OR
                    </span>

                    <div className="h-px flex-1 bg-zinc-800" />
                </div>

                <GoogleAuth />


                {/* Footer */}
                <p className="mt-6 text-center text-xs text-slate-600">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-400 hover:text-blue-300 transition-colors duration-150">
                        Sign in
                    </a>
                </p>
            </div>
        </div>
    );
}