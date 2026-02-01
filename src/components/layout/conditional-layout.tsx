"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/layout/scroll-progress";

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Check if we're on admin, auth, or client routes
    const isAdminRoute = pathname?.startsWith("/admin");
    const isAuthRoute = pathname?.startsWith("/auth");
    const isClientRoute = pathname?.startsWith("/client");

    // Don't show main website header/footer on admin, auth, or client pages
    if (isAdminRoute || isAuthRoute || isClientRoute) {
        return <>{children}</>;
    }

    // Show main website layout for all other pages
    return (
        <>
            <ScrollProgress
                sections={[
                    { id: "hero", label: "Home" },
                    { id: "services", label: "Services" },
                    { id: "work", label: "Our Work" },
                    { id: "cta", label: "Get Started" },
                ]}
            />
            <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
            </div>
        </>
    );
}
