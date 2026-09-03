"use client";

import Sidebar from "./sidebar";
import { ProtectedRoute } from "./protected-route";

export function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ProtectedRoute>
            <div className="flex min-h-screen bg-[#f8fafc] text-slate-950">
                <Sidebar />
                <main className="flex-1 max-h-screen overflow-y-auto bg-[#f8fafc]">
                    {children}
                </main>
            </div>
        </ProtectedRoute>
    );
}