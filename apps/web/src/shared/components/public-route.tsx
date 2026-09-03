"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "../hooks/use-auth";
import { Loader } from "./Loader";

export function PublicRoute({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();

    const {
        isAuthenticated,
        isLoading,
    } = useAuth();

    useEffect(() => {
        if (
            !isLoading &&
            isAuthenticated
        ) {
            router.replace(
                "/dashboard"
            );
        }
    }, [
        isAuthenticated,
        isLoading,
        router,
    ]);

    if (isLoading) {
        return <Loader/>;
    }

    if (isAuthenticated) {
        return null;
    }

    return children;
}