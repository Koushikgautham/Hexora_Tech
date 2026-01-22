import { Zap, ShoppingCart, Share2, Layers } from "lucide-react";

export const services = [
  {
    id: "digital-transformation",
    title: "Digital Transformation",
    shortDescription: "Modernize your business processes and infrastructure",
    description:
      "We help MSMEs transition from traditional operations to digital-first approaches. Our comprehensive digital transformation services include process digitization, cloud migration, and legacy system modernization.",
    icon: Layers,
    features: [
      "Business process digitization",
      "Cloud migration & infrastructure",
      "Legacy system modernization",
      "Digital workflow implementation",
      "Data analytics & insights",
      "Custom software development",
    ],
    benefits: [
      "Increased operational efficiency",
      "Reduced operational costs",
      "Improved customer experience",
      "Better data-driven decisions",
      "Scalable infrastructure",
      "Competitive advantage",
    ],
  },
  {
    id: "automation",
    title: "Automation Solutions",
    shortDescription: "Streamline operations with intelligent automation",
    description:
      "Transform your workflow with our cutting-edge automation solutions. We implement smart systems that reduce manual work, minimize errors, and free your team to focus on strategic initiatives.",
    icon: Zap,
    features: [
      "Workflow automation",
      "Custom integrations & APIs",
      "AI/ML implementation",
      "Robotic Process Automation (RPA)",
      "Automated reporting",
      "Smart notifications",
    ],
    benefits: [
      "80% reduction in manual tasks",
      "99.9% accuracy in processes",
      "24/7 operational capability",
      "Faster turnaround times",
      "Lower operational costs",
      "Improved employee satisfaction",
    ],
  },
  {
    id: "ecommerce",
    title: "Ecommerce Management",
    shortDescription: "Launch and scale your online store successfully",
    description:
      "From platform setup to daily operations, we provide end-to-end ecommerce management services. Our team helps you sell more, manage inventory efficiently, and deliver exceptional customer experiences.",
    icon: ShoppingCart,
    features: [
      "Platform setup & optimization",
      "Inventory management",
      "Order fulfillment automation",
      "Multi-channel selling",
      "Analytics & reporting",
      "Customer service integration",
    ],
    benefits: [
      "Increased online sales",
      "Reduced cart abandonment",
      "Better inventory control",
      "Expanded market reach",
      "Improved customer loyalty",
      "Data-driven marketing",
    ],
  },
  {
    id: "social-media",
    title: "Social Media Management",
    shortDescription: "Build and engage your audience across platforms",
    description:
      "Elevate your brand presence with strategic social media management. We create compelling content, engage with your audience, and drive meaningful results across all major platforms.",
    icon: Share2,
    features: [
      "Strategy development",
      "Content creation & curation",
      "Community management",
      "Paid advertising campaigns",
      "Influencer partnerships",
      "Performance analytics",
    ],
    benefits: [
      "Increased brand awareness",
      "Higher engagement rates",
      "More qualified leads",
      "Stronger brand loyalty",
      "Better ROI on ad spend",
      "Real-time customer insights",
    ],
  },
];

export type Service = (typeof services)[number];
