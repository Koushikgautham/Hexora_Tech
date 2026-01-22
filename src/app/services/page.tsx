import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  FadeIn,
  StaggerChildren,
  staggerItemVariants,
  SpotlightCard,
  AuroraBackground,
} from "@/components/animations";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Comprehensive digital transformation services for MSMEs including automation, ecommerce management, and social media solutions.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <AuroraBackground className="pb-16 pt-32 sm:pb-24 sm:pt-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
              Our Services
            </span>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Digital Solutions for <span className="text-primary">Growth</span>
            </h1>
            <p className="text-lg text-muted-foreground sm:text-xl">
              Comprehensive services designed specifically for MSMEs. We
              understand your challenges and deliver solutions that drive real
              results.
            </p>
          </FadeIn>
        </div>
      </AuroraBackground>

      {/* Services Grid */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StaggerChildren
            className="grid gap-8 md:grid-cols-2"
            staggerDelay={0.15}
          >
            {services.map((service) => (
              <FadeIn key={service.id}>
                <SpotlightCard className="h-full">
                  <div className="flex h-full flex-col">
                    {/* Header */}
                    <div className="mb-6 flex items-start gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <service.icon className="h-7 w-7" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">{service.title}</h2>
                        <p className="text-sm text-muted-foreground">
                          {service.shortDescription}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="mb-6 text-muted-foreground">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="mb-6 flex-1">
                      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                        What&apos;s Included
                      </h3>
                      <ul className="grid gap-2 sm:grid-cols-2">
                        {service.features.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-sm"
                          >
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA */}
                    <Button asChild className="w-full rounded-full sm:w-auto">
                      <Link href={`/services/${service.id}`}>
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </SpotlightCard>
              </FadeIn>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-secondary/30 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Not Sure Which Service You Need?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Let&apos;s discuss your business goals and challenges. We&apos;ll
              recommend the right combination of services to achieve your
              objectives.
            </p>
            <Button asChild size="lg" className="rounded-full">
              <Link href="/contact">
                Get Free Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
