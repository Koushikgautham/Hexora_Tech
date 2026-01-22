"use client";

import { FadeIn, CountUp } from "@/components/animations";

const stats = [
  { value: 150, suffix: "+", label: "Projects Completed" },
  { value: 50, suffix: "+", label: "Happy Clients" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 5, suffix: "+", label: "Years of Excellence" },
];

export function Stats() {
  return (
    <section className="border-y border-border bg-secondary/30 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <FadeIn
              key={index}
              delay={index * 0.1}
              className="text-center"
            >
              <div className="text-4xl font-bold text-primary sm:text-5xl">
                <CountUp
                  end={stat.value}
                  suffix={stat.suffix}
                  duration={2.5}
                  delay={0.5 + index * 0.2}
                />
              </div>
              <div className="mt-2 text-sm text-muted-foreground sm:text-base">
                {stat.label}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
