import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  FadeIn,
  SpotlightCard,
  AuroraBackground,
  CountUp,
} from "@/components/animations";
import { portfolioItems } from "@/data/portfolio";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return portfolioItems.map((item) => ({
    slug: item.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = portfolioItems.find((p) => p.id === slug);

  if (!project) {
    return {
      title: "Case Study Not Found",
    };
  }

  return {
    title: `${project.title} | Case Study`,
    description: project.description,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = portfolioItems.find((p) => p.id === slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = portfolioItems
    .filter((p) => p.id !== project.id && p.service === project.service)
    .slice(0, 2);

  return (
    <>
      {/* Hero Section */}
      <AuroraBackground className="pb-16 pt-32 sm:pb-24 sm:pt-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <Link
              href="/portfolio"
              className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Portfolio
            </Link>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <Badge>{project.service}</Badge>
              <span className="text-sm text-muted-foreground">
                {project.industry}
              </span>
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {project.title}
            </h1>
            <p className="max-w-3xl text-lg text-muted-foreground sm:text-xl">
              {project.description}
            </p>
          </FadeIn>

          {/* Project Info */}
          <FadeIn delay={0.2} className="mt-8">
            <div className="flex flex-wrap gap-8 rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm">
              <div>
                <div className="text-sm text-muted-foreground">Client</div>
                <div className="font-semibold">{project.client}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Industry</div>
                <div className="font-semibold">{project.industry}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Service</div>
                <div className="font-semibold">{project.service}</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </AuroraBackground>

      {/* Results Section */}
      <section className="border-b border-border py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-8 text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Key Results
            </span>
          </FadeIn>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {project.results.map((result, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary sm:text-5xl">
                    {result.metric.includes("%") ? (
                      <CountUp
                        end={parseInt(result.metric)}
                        suffix="%"
                        duration={2}
                        delay={0.5}
                      />
                    ) : result.metric.includes("x") ? (
                      <CountUp
                        end={parseInt(result.metric)}
                        suffix="x"
                        duration={2}
                        delay={0.5}
                      />
                    ) : (
                      result.metric
                    )}
                  </div>
                  <div className="mt-2 text-muted-foreground">{result.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Challenge */}
            <FadeIn>
              <SpotlightCard>
                <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
                  The Challenge
                </span>
                <h2 className="mb-4 text-2xl font-bold">What They Faced</h2>
                <p className="text-muted-foreground">{project.challenge}</p>
              </SpotlightCard>
            </FadeIn>

            {/* Solution */}
            <FadeIn delay={0.2}>
              <SpotlightCard>
                <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
                  Our Solution
                </span>
                <h2 className="mb-4 text-2xl font-bold">What We Delivered</h2>
                <p className="text-muted-foreground">{project.solution}</p>
              </SpotlightCard>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Image Gallery Placeholder */}
      <section className="border-y border-border bg-secondary/30 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-12 text-center">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
              Project Gallery
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Visual Results
            </h2>
          </FadeIn>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <FadeIn key={item} delay={item * 0.1}>
                <div className="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 to-accent/10">
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    Project Screenshot {item}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-3xl">
            <div className="rounded-2xl border border-border bg-card p-8 sm:p-12">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Quote className="h-6 w-6 text-primary" />
              </div>
              <blockquote className="mb-8 text-xl leading-relaxed sm:text-2xl">
                &ldquo;{project.testimonial.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 border-2 border-primary/20">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {project.testimonial.author.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">{project.testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">
                    {project.testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="border-t border-border bg-secondary/30 py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <FadeIn className="mb-12 text-center">
              <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
                More Case Studies
              </span>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Related Projects
              </h2>
            </FadeIn>

            <div className="grid gap-8 md:grid-cols-2">
              {relatedProjects.map((related, index) => (
                <FadeIn key={related.id} delay={index * 0.1}>
                  <Link href={`/portfolio/${related.id}`}>
                    <div className="group overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/50">
                      <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20" />
                      <div className="p-6">
                        <Badge variant="secondary" className="mb-2">
                          {related.industry}
                        </Badge>
                        <h3 className="mb-2 text-xl font-bold group-hover:text-primary">
                          {related.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {related.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Want Similar Results for Your Business?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Let&apos;s discuss how we can help you achieve your digital
              transformation goals.
            </p>
            <Button asChild size="lg" className="rounded-full">
              <Link href="/contact">
                Start Your Transformation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
