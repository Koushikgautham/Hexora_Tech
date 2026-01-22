"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Clock,
  Send,
  Calendar,
  MessageCircle,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  FadeIn,
  SpotlightCard,
  AuroraBackground,
} from "@/components/animations";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactOptions = [
  {
    icon: Calendar,
    title: "Schedule a Call",
    description: "Book a free 30-minute consultation with our experts",
    action: "Book Now",
    href: "#",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Chat with our team in real-time during business hours",
    action: "Start Chat",
    href: "#",
  },
];

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@hexora.com",
    href: "mailto:hello@hexora.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: "Mon - Fri: 9:00 AM - 6:00 PM",
    href: "#",
  },
];

const faqs = [
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary based on scope and complexity. A basic digital transformation can take 4-8 weeks, while comprehensive solutions may take 3-6 months. We'll provide a detailed timeline during our initial consultation.",
  },
  {
    question: "What is your pricing model?",
    answer:
      "We offer flexible pricing tailored to MSME budgets. Options include project-based pricing, monthly retainers, and hybrid models. We'll recommend the best fit based on your needs and goals.",
  },
  {
    question: "Do you provide ongoing support?",
    answer:
      "Yes! We offer various support packages ranging from basic maintenance to full managed services. Our team is always available to help you get the most out of your digital solutions.",
  },
  {
    question: "Can you work with our existing systems?",
    answer:
      "Absolutely. We specialize in integrating new solutions with existing infrastructure. Our team will assess your current setup and ensure seamless integration with minimal disruption.",
  },
  {
    question: "What industries do you serve?",
    answer:
      "We serve MSMEs across all industries including retail, manufacturing, healthcare, hospitality, professional services, and more. Our solutions are adaptable to your specific industry needs.",
  },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Form submitted:", data);
    toast.success("Message sent successfully! We'll get back to you soon.");
    reset();
    setIsSubmitting(false);
  };

  return (
    <>
      {/* Hero Section */}
      <AuroraBackground className="pb-16 pt-32 sm:pb-24 sm:pt-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
              Contact Us
            </span>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Let&apos;s Start Your{" "}
              <span className="text-primary">Transformation</span>
            </h1>
            <p className="text-lg text-muted-foreground sm:text-xl">
              Ready to take your business digital? We&apos;re here to help.
              Reach out and let&apos;s discuss how we can work together.
            </p>
          </FadeIn>
        </div>
      </AuroraBackground>

      {/* Contact Options */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 max-w-2xl mx-auto">
            {contactOptions.map((option, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <SpotlightCard className="h-full text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <option.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{option.title}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    {option.description}
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full rounded-full"
                  >
                    <Link href={option.href}>{option.action}</Link>
                  </Button>
                </SpotlightCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="border-y border-border bg-secondary/30 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Contact Form */}
            <FadeIn>
              <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
                <h2 className="mb-6 text-2xl font-bold">Send Us a Message</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        {...register("name")}
                        className={errors.name ? "border-destructive" : ""}
                      />
                      {errors.name && (
                        <p className="text-sm text-destructive">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        {...register("email")}
                        className={errors.email ? "border-destructive" : ""}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        {...register("phone")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        placeholder="Your Company"
                        {...register("company")}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="service">Service Interested In *</Label>
                    <Select onValueChange={(value) => setValue("service", value)}>
                      <SelectTrigger
                        className={errors.service ? "border-destructive" : ""}
                      >
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="digital-transformation">
                          Digital Transformation
                        </SelectItem>
                        <SelectItem value="automation">
                          Automation Solutions
                        </SelectItem>
                        <SelectItem value="ecommerce">
                          Ecommerce Management
                        </SelectItem>
                        <SelectItem value="social-media">
                          Social Media Management
                        </SelectItem>
                        <SelectItem value="multiple">
                          Multiple Services
                        </SelectItem>
                        <SelectItem value="not-sure">Not Sure Yet</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.service && (
                      <p className="text-sm text-destructive">
                        {errors.service.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your project and goals..."
                      rows={5}
                      {...register("message")}
                      className={errors.message ? "border-destructive" : ""}
                    />
                    {errors.message && (
                      <p className="text-sm text-destructive">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full rounded-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent"
                      />
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </FadeIn>

            {/* Contact Info */}
            <FadeIn delay={0.2}>
              <div className="space-y-8">
                <div>
                  <h2 className="mb-6 text-2xl font-bold">Get in Touch</h2>
                  <p className="mb-8 text-muted-foreground">
                    Have questions? We&apos;d love to hear from you. Send us a
                    message and we&apos;ll respond as soon as possible.
                  </p>
                </div>

                <div className="space-y-4">
                  {contactInfo.map((item, index) => (
                    <motion.a
                      key={index}
                      href={item.href}
                      className="flex items-start gap-4 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50"
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">
                          {item.label}
                        </div>
                        <div className="font-medium">{item.value}</div>
                      </div>
                    </motion.a>
                  ))}
                </div>

              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-12 text-center">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
              FAQ
            </span>
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Find answers to common questions about working with Hexora.
            </p>
          </FadeIn>

          <FadeIn delay={0.2} className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
