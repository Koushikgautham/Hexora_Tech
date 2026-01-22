"use client";

/* ENHANCEMENT: Text that reveals as it scrolls into view
 * To remove: Delete this file and remove imports where used
 */

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollRevealTextProps {
  children: string;
  className?: string;
  /** Animation style: "words" reveals word by word, "chars" reveals character by character */
  mode?: "words" | "chars";
  /** Delay before animation starts (seconds) */
  delay?: number;
  /** Duration for each element animation (seconds) */
  duration?: number;
  /** Stagger delay between elements (seconds) */
  stagger?: number;
  /** Only animate once when entering viewport */
  once?: boolean;
  /** Custom tag to render */
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

const containerVariants: Variants = {
  hidden: {},
  visible: (stagger: number) => ({
    transition: {
      staggerChildren: stagger,
    },
  }),
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(4px)",
  },
  visible: (duration: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
};

export function ScrollRevealText({
  children,
  className,
  mode = "words",
  delay = 0,
  duration = 0.5,
  stagger = 0.05,
  once = true,
  as: Tag = "p",
}: ScrollRevealTextProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, {
    once,
    margin: "-10% 0px -10% 0px",
  });

  const elements = mode === "words" ? children.split(" ") : children.split("");

  return (
    <Tag ref={ref as React.RefObject<HTMLParagraphElement>} className={cn("inline-block", className)}>
      <motion.span
        className="inline-flex flex-wrap"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        custom={stagger}
        style={{ transitionDelay: `${delay}s` }}
      >
        {elements.map((element, index) => (
          <motion.span
            key={index}
            className="inline-block"
            variants={itemVariants}
            custom={duration}
          >
            {element}
            {mode === "words" && index < elements.length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}

/* Alternative: Clip-path mask reveal animation */
interface MaskRevealTextProps {
  children: React.ReactNode;
  className?: string;
  /** Direction of reveal */
  direction?: "up" | "down" | "left" | "right";
  /** Duration in seconds */
  duration?: number;
  /** Delay in seconds */
  delay?: number;
  /** Only animate once */
  once?: boolean;
}

const getClipPath = (direction: "up" | "down" | "left" | "right", revealed: boolean) => {
  const hidden = {
    up: "inset(100% 0 0 0)",
    down: "inset(0 0 100% 0)",
    left: "inset(0 100% 0 0)",
    right: "inset(0 0 0 100%)",
  };
  const visible = "inset(0 0 0 0)";
  return revealed ? visible : hidden[direction];
};

export function MaskRevealText({
  children,
  className,
  direction = "up",
  duration = 0.8,
  delay = 0,
  once = true,
}: MaskRevealTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once,
    margin: "-10% 0px -10% 0px",
  });

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div
        initial={{ clipPath: getClipPath(direction, false) }}
        animate={{ clipPath: getClipPath(direction, isInView) }}
        transition={{
          duration,
          delay,
          ease: [0.25, 0.4, 0.25, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default ScrollRevealText;
