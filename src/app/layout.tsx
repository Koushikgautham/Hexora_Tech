import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/providers/providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap", // Prevent FOIT (Flash of Invisible Text)
  preload: true,
  fallback: ['system-ui', 'arial'],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hexora.com"),
  title: {
    default: "Hexor | Digital Transformation for MSMEs",
    template: "%s | Hexor",
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
    "web development",
    "digital marketing",
    "Chennai digital agency",
  ],
  authors: [{ name: "Hexor" }],
  creator: "Hexor",
  publisher: "Hexor",
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hexora.com",
    siteName: "Hexor",
    title: "Hexor | Digital Transformation for MSMEs",
    description:
      "Empowering MSMEs with cutting-edge digital transformation solutions.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Hexor - Digital Transformation for MSMEs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hexor | Digital Transformation for MSMEs",
    description:
      "Empowering MSMEs with cutting-edge digital transformation solutions.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add when available
    // google: 'verification-code',
    // yandex: 'verification-code',
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
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />

        {/* Viewport optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Hexor",
              url: "https://hexora.com",
              logo: "https://hexora.com/logo.png",
              description: "Digital transformation solutions for MSMEs",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Chennai",
                addressRegion: "Tamil Nadu",
                addressCountry: "IN",
              },
              sameAs: [
                // Add social media URLs when available
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Customer Service",
                availableLanguage: ["English"],
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
