"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn, CardSwap, Card } from "@/components/animations";
import "@/components/animations/card-swap.css";
import { portfolioItems } from "@/data/portfolio";

export function PortfolioPreview() {
  const featuredProjects = portfolioItems.filter((item) => item.featured);

  return (
    // ENHANCEMENT: Added id for scroll progress navigation
    <section id="work" className="py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <div>
            <FadeIn>
              <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
                Our Work
              </span>
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Success Stories
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Real results for real businesses. See how we&apos;ve helped MSMEs
                transform and grow with our digital solutions.
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="space-y-6">
                {featuredProjects.slice(0, 3).map((project, index) => (
                  <Link
                    key={project.id}
                    href={`/portfolio/${project.id}`}
                    className="group flex items-start gap-4 rounded-lg border border-transparent p-4 transition-all hover:border-border hover:bg-secondary/50"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <ArrowUpRight className="h-4 w-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
                        {project.description}
                      </p>
                      <div className="mt-2 flex gap-3">
                        {project.results.slice(0, 2).map((result, i) => (
                          <span key={i} className="text-xs">
                            <span className="font-semibold text-primary">
                              {result.metric}
                            </span>{" "}
                            <span className="text-muted-foreground">
                              {result.label}
                            </span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.4} className="mt-8">
              <Button asChild className="rounded-full">
                <Link href="/portfolio">
                  View All Case Studies
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </FadeIn>
          </div>

          {/* Right Column - Card Swap Animation */}
          <FadeIn delay={0.3} className="relative hidden lg:block">
            <div className="relative h-[500px] flex items-center justify-center">
              <CardSwap
                width={400}
                height={320}
                cardDistance={50}
                verticalDistance={60}
                delay={4000}
                pauseOnHover={true}
                skewAmount={4}
                easing="elastic"
              >
                {featuredProjects.map((project) => (
                  <Card key={project.id} className="group bg-background">
                    {/* Card Image Area - Solid opaque background */}
                    <div className="relative h-40 overflow-hidden bg-secondary">
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                        <span className="text-6xl font-bold text-primary/30">
                          {project.client.charAt(0)}
                        </span>
                      </div>
                      {/* Service Badge */}
                      <Badge className="absolute top-3 left-3" variant="secondary">
                        {project.service}
                      </Badge>
                    </div>

                    {/* Card Content - Solid background */}
                    <div className="p-5 bg-background">
                      <h3 className="mb-1 text-base font-semibold line-clamp-1 text-foreground">
                        {project.title}
                      </h3>
                      <p className="mb-3 text-xs text-muted-foreground line-clamp-2">
                        {project.description}
                      </p>

                      {/* Results */}
                      <div className="flex gap-4">
                        {project.results.slice(0, 2).map((result, index) => (
                          <div key={index}>
                            <div className="text-lg font-bold text-primary">
                              {result.metric}
                            </div>
                            <div className="text-[10px] text-muted-foreground">
                              {result.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </CardSwap>
            </div>
          </FadeIn>

          {/* Mobile Fallback - Simple Card List */}
          <div className="lg:hidden space-y-4">
            {featuredProjects.slice(0, 2).map((project) => (
              <FadeIn key={project.id}>
                <Link href={`/portfolio/${project.id}`}>
                  <div className="group overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/50">
                    <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl font-bold text-primary/30">
                          {project.client.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <Badge variant="secondary" className="mb-2">
                        {project.service}
                      </Badge>
                      <h3 className="mb-1 font-semibold">{project.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
