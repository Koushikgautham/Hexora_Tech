"use client";

import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
}

export function BlurText({
  text,
  className,
  delay = 0,
  duration = 0.8,
  once = true,
}: BlurTextProps) {
  const variants: Variants = {
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
      y: 20,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.span
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.5 }}
      className={cn("inline-block", className)}
    >
      {text}
    </motion.span>
  );
}
