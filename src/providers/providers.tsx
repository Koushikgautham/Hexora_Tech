"use client";

import { ThemeProvider } from "@/providers/theme-provider";
import { AuthProvider } from "../contexts/AuthContext";
import { SplashCursor } from "@/components/animations/splash-cursor";
import { ClickSpark } from "@/components/animations/click-spark";
import { Toaster } from "sonner";
import { ConditionalLayout } from "@/components/layout/conditional-layout";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SplashCursor />
        <ClickSpark global sparkColor="var(--primary)" sparkCount={8} sparkRadius={25} duration={400} />
        <ConditionalLayout>{children}</ConditionalLayout>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "hsl(var(--card))",
              color: "hsl(var(--card-foreground))",
              border: "1px solid hsl(var(--border))",
            },
          }}
        />
      </AuthProvider>
    </ThemeProvider>
  );
}
