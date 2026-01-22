"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FadeIn,
  TiltedCard,
  AuroraBackground,
} from "@/components/animations";
import { portfolioItems } from "@/data/portfolio";

const categories = [
  { id: "all", label: "All Projects" },
  { id: "Digital Transformation", label: "Digital Transform" },
  { id: "Automation Solutions", label: "Automation" },
  { id: "Ecommerce Management", label: "Ecommerce" },
  { id: "Social Media Management", label: "Social Media" },
];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects =
    activeCategory === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.service === activeCategory);

  return (
    <>
      {/* Hero Section */}
      <AuroraBackground className="pb-16 pt-32 sm:pb-24 sm:pt-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
              Our Work
            </span>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Success Stories That{" "}
              <span className="text-primary">Inspire</span>
            </h1>
            <p className="text-lg text-muted-foreground sm:text-xl">
              Discover how we&apos;ve helped MSMEs across industries achieve
              their digital transformation goals and drive measurable results.
            </p>
          </FadeIn>
        </div>
      </AuroraBackground>

      {/* Filter & Portfolio Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Filter Tabs */}
          <FadeIn className="mb-12">
            <Tabs
              value={activeCategory}
              onValueChange={setActiveCategory}
              className="w-full"
            >
              <TabsList className="flex h-auto flex-wrap justify-center gap-2 bg-transparent p-0">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="rounded-full border border-border bg-card px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </FadeIn>

          {/* Portfolio Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid gap-8 md:grid-cols-2"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/portfolio/${project.id}`}>
                    <TiltedCard className="group h-full">
                      <div className="overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/50">
                        {/* Image */}
                        <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-6xl font-bold text-primary/20">
                              {project.client.charAt(0)}
                            </span>
                          </div>
                          {/* Hover Overlay */}
                          <div className="absolute inset-0 flex items-center justify-center bg-primary/90 opacity-0 transition-opacity group-hover:opacity-100">
                            <span className="flex items-center gap-2 text-lg font-medium text-primary-foreground">
                              View Case Study
                              <ArrowUpRight className="h-5 w-5" />
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <div className="mb-3 flex items-center gap-2">
                            <Badge variant="secondary">{project.service}</Badge>
                            <span className="text-sm text-muted-foreground">
                              {project.industry}
                            </span>
                          </div>

                          <h3 className="mb-2 text-xl font-bold">
                            {project.title}
                          </h3>
                          <p className="mb-4 text-muted-foreground line-clamp-2">
                            {project.description}
                          </p>

                          {/* Results */}
                          <div className="grid grid-cols-2 gap-4 border-t border-border pt-4">
                            {project.results.slice(0, 2).map((result, idx) => (
                              <div key={idx}>
                                <div className="text-2xl font-bold text-primary">
                                  {result.metric}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {result.label}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TiltedCard>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-muted-foreground">
                No projects found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-secondary/30 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Be Our Next Success Story?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Let&apos;s discuss how we can help your business achieve similar
              results.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Start Your Transformation
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
