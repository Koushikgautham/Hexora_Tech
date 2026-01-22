"use client";

/* ENHANCEMENT: Parallax scrolling effect for background elements
 * To remove: Delete this file and remove imports where used
 */

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxLayerProps {
  children: React.ReactNode;
  className?: string;
  /** Speed multiplier: 0 = no movement, 1 = normal scroll, -1 = opposite direction */
  speed?: number;
  /** Direction of parallax movement */
  direction?: "vertical" | "horizontal";
  /** Offset range in pixels [start, end] */
  offset?: [number, number];
}

export function ParallaxLayer({
  children,
  className,
  speed = 0.5,
  direction = "vertical",
  offset,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Calculate offset range based on speed
  const range = offset || [-100 * speed, 100 * speed];

  const y = useTransform(scrollYProgress, [0, 1], range);
  const x = useTransform(scrollYProgress, [0, 1], range);

  return (
    <motion.div
      ref={ref}
      className={cn("will-change-transform", className)}
      style={{
        y: direction === "vertical" ? y : 0,
        x: direction === "horizontal" ? x : 0,
      }}
    >
      {children}
    </motion.div>
  );
}

/* Parallax container with multiple layers at different speeds */
interface ParallaxContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function ParallaxContainer({ children, className }: ParallaxContainerProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {children}
    </div>
  );
}

/* Pre-configured parallax background element */
interface ParallaxBackgroundProps {
  className?: string;
  /** Background color or gradient */
  background?: string;
  /** Speed multiplier */
  speed?: number;
  /** Opacity of the element */
  opacity?: number;
}

export function ParallaxBackground({
  className,
  background = "bg-primary/10",
  speed = 0.3,
  opacity = 1,
}: ParallaxBackgroundProps) {
  return (
    <ParallaxLayer
      speed={speed}
      className={cn(
        "absolute inset-0 -z-10 h-[120%] w-full",
        background,
        className
      )}
      offset={[-50, 50]}
    >
      <div className="h-full w-full" style={{ opacity }} />
    </ParallaxLayer>
  );
}

/* Floating element with parallax effect */
interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  /** Speed of parallax movement */
  speed?: number;
  /** Position from top (percentage) */
  top?: string;
  /** Position from left (percentage) */
  left?: string;
  /** Position from right (percentage) */
  right?: string;
  /** Position from bottom (percentage) */
  bottom?: string;
}

export function FloatingElement({
  children,
  className,
  speed = 0.4,
  top,
  left,
  right,
  bottom,
}: FloatingElementProps) {
  return (
    <ParallaxLayer
      speed={speed}
      className={cn("absolute pointer-events-none", className)}
    >
      <div
        style={{
          position: "absolute",
          top,
          left,
          right,
          bottom,
        }}
      >
        {children}
      </div>
    </ParallaxLayer>
  );
}

/* Parallax image with zoom effect on scroll */
interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  /** Speed of parallax movement */
  speed?: number;
  /** Enable zoom effect on scroll */
  zoom?: boolean;
  /** Zoom range [start, end] */
  zoomRange?: [number, number];
}

export function ParallaxImage({
  src,
  alt,
  className,
  speed = 0.2,
  zoom = true,
  zoomRange = [1, 1.1],
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-50 * speed, 50 * speed]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [zoomRange[0], zoomRange[1], zoomRange[0]]);

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        style={{
          y,
          scale: zoom ? scale : 1,
        }}
      />
    </div>
  );
}

export default ParallaxLayer;
