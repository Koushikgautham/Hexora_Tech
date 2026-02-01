"use client";

import * as React from "react";

// Lazy import AuthProvider for code splitting
const LazyAuthProvider = React.lazy(() =>
    import("../contexts/AuthContext").then((mod) => ({
        default: mod.AuthProvider,
    }))
);

// Wrapper component that only loads AuthProvider when needed
export function AuthProviderWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <React.Suspense fallback={null}>
            <LazyAuthProvider>{children}</LazyAuthProvider>
        </React.Suspense>
    );
}
