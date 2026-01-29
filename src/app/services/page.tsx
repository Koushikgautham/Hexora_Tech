"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const services = [
  {
    id: 1,
    num: "01",
    title: "Web Development",
    shortDescription: "Custom websites & applications tailored to your business needs",
    description: "We create high-performance, scalable web applications using modern technologies and best practices.",
    features: [
      "Responsive Design",
      "SEO Optimization",
      "Fast Loading Times",
      "Security Best Practices",
      "Scalable Architecture",
      "API Integration",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL"],
  },
  {
    id: 2,
    num: "02",
    title: "E-Commerce",
    shortDescription: "Online stores & platforms that drive sales",
    description: "Build and manage powerful e-commerce solutions with seamless payment integration and inventory management.",
    features: [
      "Shopping Cart",
      "Payment Gateway Integration",
      "Inventory Management",
      "Order Tracking",
      "Customer Analytics",
      "Multi-currency Support",
    ],
    technologies: ["Shopify", "WooCommerce", "Custom Solutions", "Stripe", "PayPal"],
  },
  {
    id: 3,
    num: "03",
    title: "Brand Identity",
    shortDescription: "Logo & visual systems that make you stand out",
    description: "Develop a comprehensive brand identity that resonates with your target audience and sets you apart.",
    features: [
      "Logo Design",
      "Brand Guidelines",
      "Color Palette",
      "Typography",
      "Visual Assets",
      "Brand Strategy",
    ],
    technologies: ["Adobe Creative Suite", "Figma", "Design Systems"],
  },
  {
    id: 4,
    num: "04",
    title: "Digital Marketing",
    shortDescription: "SEO & social media strategies that deliver results",
    description: "Amplify your online presence with data-driven digital marketing strategies and campaigns.",
    features: [
      "SEO Optimization",
      "Social Media Management",
      "Content Strategy",
      "PPC Campaigns",
      "Email Marketing",
      "Analytics & Reporting",
    ],
    technologies: ["Google Analytics", "SEMrush", "Meta Ads", "Mailchimp"],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-40 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our Services
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              We offer comprehensive digital solutions to help your business grow and thrive in the digital landscape.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group rounded-2xl border border-white/10 bg-white/5 p-8 hover:bg-white/10 transition-all duration-300 hover:border-primary/50"
              >
                <div className="mb-4 font-mono text-sm text-primary">
                  {service.num}
                </div>
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-400 mb-6">{service.description}</p>

                {/* Features */}
                <div className="mb-8">
                  <h4 className="text-sm font-semibold mb-3 text-gray-300">
                    Key Features:
                  </h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-sm text-gray-400"
                      >
                        <Check className="h-4 w-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="text-sm font-semibold mb-3 text-gray-300">
                    Technologies:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-white/10 text-gray-300 px-3 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-20 text-center"
          >
            <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help your business achieve its digital goals.
            </p>
            <Button asChild className="rounded-full bg-primary hover:bg-primary/90 text-white">
              <Link href="#contact">
                Start Your Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
