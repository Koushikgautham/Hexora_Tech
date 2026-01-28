"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, CheckCircle2, Users, Zap, Clock, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [refsReady, setRefsReady] = useState(false);

  // Check when all refs are populated
  useEffect(() => {
    const checkRefs = () => {
      const allRefsReady = statsRefs.current.every(ref => ref !== null) &&
                          statsRefs.current.length === 4;
      if (allRefsReady) {
        setRefsReady(true);
      }
    };

    checkRefs();
    const timeoutId = setTimeout(checkRefs, 100);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (!refsReady) return; // Wait for refs to be ready
    const ctx = gsap.context(() => {
      // Animate bento cards
      gsap.from(".bento-card", {
        scrollTrigger: {
          trigger: ".bento-grid",
          start: "top 75%",
        },
        opacity: 0,
        y: 60,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });

      // Animate numbers
      statsRefs.current.forEach((ref) => {
        if (!ref || !document.contains(ref)) return; // Verify ref exists in DOM
        const value = ref.dataset.value;
        const suffix = ref.dataset.suffix || "";

        gsap.from(ref, {
          scrollTrigger: {
            trigger: ref,
            start: "top 85%",
          },
          textContent: 0,
          duration: 2,
          ease: "power1.inOut",
          snap: { textContent: 1 },
          onUpdate: function() {
            ref.textContent = Math.ceil(parseFloat(this.targets()[0].textContent)) + suffix;
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [refsReady]); // Add refsReady dependency

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0a0a0a] py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 lg:mb-16">
          <span className="mb-4 block font-mono text-xs text-gray-500">
            // why choose us
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Trusted by businesses
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="bento-grid grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {/* Card 1: Years of Experience - Large */}
          <div className="bento-card group relative col-span-1 row-span-2 overflow-hidden rounded-2xl border border-white/5 bg-[#111] p-6 transition-all hover:border-white/10 lg:p-8">
            <span className="mb-4 block font-mono text-xs text-gray-600">
              // experience
            </span>
            <div
              ref={(el) => (statsRefs.current[0] = el)}
              data-value="5"
              data-suffix="+"
              className="mb-2 text-5xl font-bold text-white lg:text-6xl"
            >
              5+
            </div>
            <p className="text-base text-gray-400 lg:text-lg">
              Years building digital experiences
            </p>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </div>

          {/* Card 2: Projects Completed */}
          <div className="bento-card group relative col-span-1 overflow-hidden rounded-2xl border border-white/5 bg-[#111] p-6 transition-all hover:border-white/10">
            <span className="mb-3 block font-mono text-xs text-gray-600">
              // delivered
            </span>
            <div
              ref={(el) => (statsRefs.current[1] = el)}
              data-value="150"
              data-suffix="+"
              className="mb-2 text-4xl font-bold text-primary"
            >
              150+
            </div>
            <p className="text-sm text-gray-400">Projects completed</p>
          </div>

          {/* Card 3: Client Satisfaction */}
          <div className="bento-card group relative col-span-1 overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-primary/10 to-transparent p-6 transition-all hover:border-primary/20">
            <span className="mb-3 block font-mono text-xs text-gray-600">
              // satisfaction
            </span>
            <div
              ref={(el) => (statsRefs.current[2] = el)}
              data-value="98"
              data-suffix="%"
              className="mb-2 text-4xl font-bold text-primary"
            >
              98%
            </div>
            <p className="text-sm text-gray-400">Client satisfaction rate</p>
            <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
          </div>

          {/* Card 4: Fast Turnaround */}
          <div className="bento-card group col-span-1 row-span-2 rounded-2xl border border-white/5 bg-[#111] p-6 transition-all hover:border-white/10 lg:p-8">
            <span className="mb-4 block font-mono text-xs text-gray-600">
              // speed
            </span>
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-3 text-xl font-semibold text-white lg:text-2xl">
              Fast turnaround
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-gray-400">
              Projects delivered in 2-4 weeks on average. We move fast without compromising quality.
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Clock className="h-4 w-4" />
              <span>24-48hr response time</span>
            </div>
          </div>

          {/* Card 5: Happy Clients */}
          <div className="bento-card group relative col-span-1 overflow-hidden rounded-2xl border border-white/5 bg-[#111] p-6 transition-all hover:border-white/10">
            <span className="mb-3 block font-mono text-xs text-gray-600">
              // clients
            </span>
            <div
              ref={(el) => (statsRefs.current[3] = el)}
              data-value="50"
              data-suffix="+"
              className="mb-2 text-4xl font-bold text-white"
            >
              50+
            </div>
            <p className="text-sm text-gray-400">Trusted partners</p>
          </div>

          {/* Card 6: Scalable Solutions */}
          <div className="bento-card group col-span-1 md:col-span-2 lg:col-span-2 rounded-2xl border border-white/5 bg-[#111] p-6 transition-all hover:border-white/10 lg:p-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div className="flex-1">
                <span className="mb-4 block font-mono text-xs text-gray-600">
                  // reliability
                </span>
                <h3 className="mb-3 text-xl font-semibold text-white lg:text-2xl">
                  Built to scale with your business
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-gray-400">
                  Our solutions grow with you. From startup to enterprise, we build systems that scale.
                </p>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-400">
                    <CheckCircle2 className="h-3 w-3 text-primary" />
                    Cloud-native
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-400">
                    <CheckCircle2 className="h-3 w-3 text-primary" />
                    Secure
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-400">
                    <CheckCircle2 className="h-3 w-3 text-primary" />
                    Performance-first
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 7: Support CTA */}
          <div className="bento-card group col-span-1 md:col-span-2 lg:col-span-2 rounded-2xl border border-white/5 bg-gradient-to-br from-primary/5 to-transparent p-6 transition-all hover:border-primary/10 lg:p-8">
            <div className="flex items-center justify-between">
              <div>
                <span className="mb-3 block font-mono text-xs text-gray-600">
                  // let&apos;s work together
                </span>
                <h3 className="mb-2 text-xl font-semibold text-white lg:text-2xl">
                  Ready to start your project?
                </h3>
                <p className="text-sm text-gray-400">
                  Get a free consultation and custom proposal
                </p>
              </div>
              <a
                href="#contact"
                className="group flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary text-white transition-all hover:bg-primary/90 lg:h-14 lg:w-14"
              >
                <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 lg:h-6 lg:w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
