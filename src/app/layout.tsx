import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import { SplashCursor } from "@/components/animations/splash-cursor";
import { ClickSpark } from "@/components/animations/click-spark";
import { Toaster } from "sonner";
import "./globals.css";
import { ConditionalLayout } from "@/components/layout/conditional-layout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Hexora | Digital Transformation for MSMEs",
    template: "%s | Hexora",
  },
  description:
    "Empowering MSMEs with cutting-edge digital transformation solutions. We provide automation, ecommerce management, and social media services to help your business thrive.",
  keywords: [
    "digital transformation",
    "MSME",
    "automation",
    "ecommerce",
    "social media management",
    "business solutions",
  ],
  authors: [{ name: "Hexora" }],
  creator: "Hexora",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hexora.com",
    siteName: "Hexora",
    title: "Hexora | Digital Transformation for MSMEs",
    description:
      "Empowering MSMEs with cutting-edge digital transformation solutions.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hexora | Digital Transformation for MSMEs",
    description:
      "Empowering MSMEs with cutting-edge digital transformation solutions.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
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
        </ThemeProvider>
      </body>
    </html>
  );
}
