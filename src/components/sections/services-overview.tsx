"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  FadeIn,
  StaggerChildren,
  staggerItemVariants,
  SpotlightCard,
} from "@/components/animations";
import { services } from "@/data/services";

export function ServicesOverview() {
  return (
    // ENHANCEMENT: Added id for scroll progress navigation
    <section id="services" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeIn className="mx-auto max-w-2xl text-center">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
            What We Do
          </span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Solutions That Drive Growth
          </h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive digital services tailored for MSMEs. We handle the
            technology so you can focus on your business.
          </p>
        </FadeIn>

        {/* Services Grid */}
        <StaggerChildren
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          staggerDelay={0.15}
        >
          {services.map((service) => (
            <motion.div key={service.id} variants={staggerItemVariants}>
              <Link href={`/services/${service.id}`}>
                <SpotlightCard className="h-full cursor-pointer">
                  <div className="flex flex-col">
                    {/* Icon */}
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <service.icon className="h-6 w-6" />
                    </div>

                    {/* Content */}
                    <h3 className="mb-2 text-lg font-semibold">{service.title}</h3>
                    <p className="mb-4 flex-1 text-sm text-muted-foreground">
                      {service.shortDescription}
                    </p>

                    {/* Features Preview */}
                    <ul className="mb-4 space-y-1">
                      {service.features.slice(0, 3).map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 text-xs text-muted-foreground"
                        >
                          <span className="h-1 w-1 rounded-full bg-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Learn More */}
                    <div className="flex items-center gap-1 text-sm font-medium text-primary">
                      Learn more
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </SpotlightCard>
              </Link>
            </motion.div>
          ))}
        </StaggerChildren>

        {/* CTA */}
        <FadeIn delay={0.6} className="mt-12 text-center">
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/services">
              View All Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
