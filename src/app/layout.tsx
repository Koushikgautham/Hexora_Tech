import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SplashCursor } from "@/components/animations/splash-cursor";
// Added: Global ClickSpark for site-wide click animation
import { ClickSpark } from "@/components/animations/click-spark";
// ENHANCEMENT: Scroll progress indicator
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { Toaster } from "sonner";
import "./globals.css";

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
          {/* Added: Global ClickSpark - sparks appear on every click across the site */}
          {/* Changed: Using var(--primary) which gets resolved to oklch for theme-awareness */}
          <ClickSpark global sparkColor="var(--primary)" sparkCount={8} sparkRadius={25} duration={400} />
          {/* ENHANCEMENT: Scroll progress indicator on right edge */}
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
