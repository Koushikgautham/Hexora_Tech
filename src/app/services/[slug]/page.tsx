import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  FadeIn,
  StaggerChildren,
  SpotlightCard,
  AuroraBackground,
} from "@/components/animations";
import { services } from "@/data/services";
import { portfolioItems } from "@/data/portfolio";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.id === slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: service.title,
    description: service.description,
  };
}

const faqs: Record<string, Array<{ q: string; a: string }>> = {
  "digital-transformation": [
    {
      q: "How long does a digital transformation project take?",
      a: "Timelines vary based on scope, but most projects range from 8-16 weeks. We'll provide a detailed timeline during the discovery phase.",
    },
    {
      q: "Will my team need training?",
      a: "Yes, comprehensive training is included in all our transformation packages. We ensure your team is confident with new systems before handoff.",
    },
    {
      q: "What if we have legacy systems?",
      a: "We specialize in integrating with and modernizing legacy systems. Our approach minimizes disruption while maximizing compatibility.",
    },
  ],
  automation: [
    {
      q: "What processes can be automated?",
      a: "Almost any repetitive, rule-based process can be automated. Common examples include data entry, report generation, customer communications, and inventory updates.",
    },
    {
      q: "How much can we save with automation?",
      a: "On average, our clients see 40-80% reduction in time spent on automated tasks. ROI typically occurs within 6-12 months.",
    },
    {
      q: "Do we need technical expertise to maintain automated systems?",
      a: "No. We design user-friendly systems and provide training. Most maintenance can be handled by non-technical staff.",
    },
  ],
  ecommerce: [
    {
      q: "Which ecommerce platforms do you work with?",
      a: "We work with all major platforms including Shopify, WooCommerce, Magento, and custom solutions. We'll recommend the best fit for your needs.",
    },
    {
      q: "Can you help with existing stores?",
      a: "Absolutely. We offer optimization services for existing stores, including conversion rate optimization, SEO, and performance improvements.",
    },
    {
      q: "Do you handle fulfillment integration?",
      a: "Yes, we integrate with major fulfillment providers and can help set up efficient warehouse and shipping workflows.",
    },
  ],
  "social-media": [
    {
      q: "Which platforms do you manage?",
      a: "We manage all major platforms including Instagram, Facebook, LinkedIn, Twitter, YouTube, and TikTok. Strategy is customized based on your target audience.",
    },
    {
      q: "How often will you post?",
      a: "Posting frequency depends on your package and platforms. Typical schedules range from 3-7 posts per week per platform.",
    },
    {
      q: "Do you create all the content?",
      a: "Yes, our team creates custom content including graphics, videos, and copy. We also curate relevant third-party content when appropriate.",
    },
  ],
};

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.id === slug);

  if (!service) {
    notFound();
  }

  const relatedProjects = portfolioItems.filter(
    (item) => item.service === service.title
  );

  const serviceFaqs = faqs[slug] || [];

  return (
    <>
      {/* Hero Section */}
      <AuroraBackground className="pb-16 pt-32 sm:pb-24 sm:pt-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <Link
              href="/services"
              className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Services
            </Link>
          </FadeIn>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <FadeIn>
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <service.icon className="h-10 w-10" />
              </div>
              <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
                {service.title}
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                {service.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button asChild size="lg" className="rounded-full">
                  <Link href="/contact">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full">
                  <Link href="/contact">Schedule a Call</Link>
                </Button>
              </div>
            </FadeIn>

            {/* Quick Benefits */}
            <FadeIn delay={0.2}>
              <div className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm sm:p-8">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                  <Zap className="h-5 w-5 text-primary" />
                  Key Benefits
                </h3>
                <ul className="space-y-3">
                  {service.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </AuroraBackground>

      {/* Features Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-12 text-center">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
              What&apos;s Included
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Comprehensive {service.title} Solutions
            </h2>
          </FadeIn>

          <StaggerChildren className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {service.features.map((feature, index) => (
              <FadeIn key={index}>
                <SpotlightCard className="h-full">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <span className="text-sm font-bold">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{feature}</h3>
                    </div>
                  </div>
                </SpotlightCard>
              </FadeIn>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Related Case Studies */}
      {relatedProjects.length > 0 && (
        <section className="border-y border-border bg-secondary/30 py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <FadeIn className="mb-12 text-center">
              <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
                Success Stories
              </span>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {service.title} in Action
              </h2>
            </FadeIn>

            <div className="grid gap-8 md:grid-cols-2">
              {relatedProjects.slice(0, 2).map((project, index) => (
                <FadeIn key={project.id} delay={index * 0.1}>
                  <Link href={`/portfolio/${project.id}`}>
                    <div className="group overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/50">
                      <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20" />
                      <div className="p-6">
                        <Badge variant="secondary" className="mb-2">
                          {project.industry}
                        </Badge>
                        <h3 className="mb-2 text-xl font-bold group-hover:text-primary">
                          {project.title}
                        </h3>
                        <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex gap-6">
                          {project.results.slice(0, 2).map((result, idx) => (
                            <div key={idx}>
                              <div className="text-xl font-bold text-primary">
                                {result.metric}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {result.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {serviceFaqs.length > 0 && (
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <FadeIn className="mb-12 text-center">
              <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
                FAQ
              </span>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Common Questions About {service.title}
              </h2>
            </FadeIn>

            <FadeIn delay={0.2} className="mx-auto max-w-3xl">
              <Accordion type="single" collapsible>
                {serviceFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </FadeIn>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="border-t border-border bg-secondary/30 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Get Started with {service.title}?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Let&apos;s discuss how our {service.title.toLowerCase()} solutions
              can help your business grow.
            </p>
            <Button asChild size="lg" className="rounded-full">
              <Link href="/contact">
                Schedule Free Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
