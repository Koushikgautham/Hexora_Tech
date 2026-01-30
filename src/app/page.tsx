import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Hero } from "@/components/sections";

// Critical sections - load immediately
import { Services } from "@/components/sections";

// Below-the-fold sections - lazy load
const Process = dynamic(() => import("@/components/sections").then(mod => ({ default: mod.Process })), {
  loading: () => <div className="min-h-screen bg-[#0a0a0a]" />,
});

const Projects = dynamic(() => import("@/components/sections").then(mod => ({ default: mod.Projects })), {
  loading: () => <div className="min-h-screen bg-[#0a0a0a]" />,
});

const Team = dynamic(() => import("@/components/sections").then(mod => ({ default: mod.Team })), {
  loading: () => <div className="min-h-screen bg-[#0a0a0a]" />,
});

const Testimonials = dynamic(() => import("@/components/sections").then(mod => ({ default: mod.Testimonials })), {
  loading: () => <div className="min-h-screen bg-[#0a0a0a]" />,
});

const Contact = dynamic(() => import("@/components/sections").then(mod => ({ default: mod.Contact })), {
  loading: () => <div className="min-h-[50vh] bg-[#0a0a0a]" />,
});

export default function Home() {
  return (
    <>
      {/* Hero - Main intro and hook - Critical above-the-fold */}
      <Hero />

      {/* Services - What we do (detailed) - Important above-the-fold */}
      <Services />

      {/* Below-the-fold sections wrapped in Suspense for progressive loading */}
      <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a]" />}>
        {/* Process - How we work */}
        <Process />
      </Suspense>

      <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a]" />}>
        {/* Projects - Our work with CardSwap animation */}
        <Projects />
      </Suspense>

      <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a]" />}>
        {/* Team - Who we are (includes Globe - heavy 3D component) */}
        <Team />
      </Suspense>

      <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a]" />}>
        {/* Testimonials - Social proof */}
        <Testimonials />
      </Suspense>

      <Suspense fallback={<div className="min-h-[50vh] bg-[#0a0a0a]" />}>
        {/* Contact - Get in touch */}
        <Contact />
      </Suspense>
    </>
  );
}
