import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Target, Eye, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  FadeIn,
  StaggerChildren,
  staggerItemVariants,
  SpotlightCard,
  AuroraBackground,
  CountUp,
} from "@/components/animations";
import { TeamCard } from "@/components/team-card";
import { team } from "@/data/team";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Hexora - our mission to empower MSMEs with digital transformation solutions and the team behind our success.",
};

const values = [
  {
    icon: Target,
    title: "Mission",
    description:
      "To democratize digital transformation and make cutting-edge technology accessible to every MSME, regardless of size or budget.",
  },
  {
    icon: Eye,
    title: "Vision",
    description:
      "A world where every small business can compete on a level playing field, powered by intelligent digital solutions.",
  },
  {
    icon: Heart,
    title: "Values",
    description:
      "Innovation, integrity, and impact. We measure our success by the growth of our clients, not just our own.",
  },
];

const milestones = [
  { year: "2019", event: "Hexora founded with a mission to serve MSMEs" },
  { year: "2020", event: "Expanded services to include automation solutions" },
  { year: "2021", event: "Reached 50+ successful digital transformations" },
  { year: "2022", event: "Launched ecommerce management division" },
  { year: "2023", event: "Achieved 98% client satisfaction rate" },
  { year: "2024", event: "Expanded team and opened new office" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <AuroraBackground className="pb-16 pt-32 sm:pb-24 sm:pt-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
              About Hexora
            </span>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Empowering MSMEs to{" "}
              <span className="text-primary">Thrive Digitally</span>
            </h1>
            <p className="text-lg text-muted-foreground sm:text-xl">
              We believe every business deserves access to world-class digital
              solutions. That&apos;s why we&apos;ve dedicated ourselves to
              serving the backbone of the economy - MSMEs.
            </p>
          </FadeIn>
        </div>
      </AuroraBackground>

      {/* Story Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <FadeIn>
              <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
                Our Story
              </span>
              <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
                Born from a Simple Observation
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Hexora was founded by six passionate individuals who noticed
                  something troubling: while large enterprises were rapidly
                  digitizing, MSMEs were being left behind. The tools and
                  expertise they needed were either too expensive or too complex.
                </p>
                <p>
                  Our founding team - Koushik Gautham H, Pavan Sai HV, Abishek
                  Pechiappan, Nand Kishore Rathore, Siddharth S, and Jyoti
                  Prakash Behera - came together with a shared belief that size
                  shouldn&apos;t determine access to technology.
                </p>
                <p>
                  Today, we&apos;ve helped over 150 MSMEs transform their
                  operations, increase efficiency, and compete in the digital
                  age. But we&apos;re just getting started.
                </p>
              </div>
            </FadeIn>

            {/* Stats Grid */}
            <FadeIn delay={0.2}>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: 150, suffix: "+", label: "Projects Completed" },
                  { value: 50, suffix: "+", label: "Happy Clients" },
                  { value: 98, suffix: "%", label: "Satisfaction Rate" },
                  { value: 5, suffix: "+", label: "Years Experience" },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-border bg-card p-6 text-center"
                  >
                    <div className="text-3xl font-bold text-primary sm:text-4xl">
                      <CountUp
                        end={stat.value}
                        suffix={stat.suffix}
                        duration={2}
                        delay={0.5 + index * 0.1}
                      />
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="border-y border-border bg-secondary/30 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              What Drives Us
            </h2>
          </FadeIn>

          <StaggerChildren className="grid gap-8 md:grid-cols-3" staggerDelay={0.15}>
            {values.map((value, index) => (
              <FadeIn key={index}>
                <SpotlightCard className="h-full text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <value.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </SpotlightCard>
              </FadeIn>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-16 text-center">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
              Our Journey
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Key Milestones
            </h2>
          </FadeIn>

          <div className="relative mx-auto max-w-3xl">
            {/* Vertical Line */}
            <div className="absolute left-4 top-0 h-full w-0.5 bg-border md:left-1/2 md:-translate-x-1/2" />

            <StaggerChildren className="space-y-8" staggerDelay={0.1}>
              {milestones.map((milestone, index) => (
                <FadeIn
                  key={index}
                  direction={index % 2 === 0 ? "left" : "right"}
                  className={`relative flex items-center gap-4 md:gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 z-10 h-3 w-3 rounded-full bg-primary md:left-1/2 md:-translate-x-1/2" />

                  {/* Content */}
                  <div
                    className={`ml-12 flex-1 rounded-xl border border-border bg-card p-4 md:ml-0 ${
                      index % 2 === 0 ? "md:text-right" : "md:text-left"
                    }`}
                  >
                    <span className="text-sm font-bold text-primary">
                      {milestone.year}
                    </span>
                    <p className="mt-1 text-muted-foreground">{milestone.event}</p>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden flex-1 md:block" />
                </FadeIn>
              ))}
            </StaggerChildren>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="border-t border-border bg-secondary/30 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-16 text-center">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
              Our Founders
            </span>
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Meet the Founding Team
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Six passionate individuals united by a mission to empower MSMEs
              with digital transformation solutions.
            </p>
          </FadeIn>

          <StaggerChildren
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            staggerDelay={0.1}
          >
            {team.map((member) => (
              <FadeIn key={member.id}>
                <TeamCard member={member} />
              </FadeIn>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Join Our Success Stories?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Let&apos;s discuss how we can help your business thrive in the
              digital age.
            </p>
            <Button asChild size="lg" className="rounded-full">
              <Link href="/contact">
                Get in Touch
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
