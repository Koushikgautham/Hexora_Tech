"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AuroraBackgroundProps {
  className?: string;
  children?: React.ReactNode;
  // ENHANCEMENT: Added id prop for scroll progress navigation
  id?: string;
}

export function AuroraBackground({
  className,
  children,
  id,
}: AuroraBackgroundProps) {
  return (
    <div
      id={id}
      className={cn(
        "relative overflow-hidden bg-background",
        className
      )}
    >
      {/* Aurora gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-[40%] -left-[20%] h-[80%] w-[80%] rounded-full opacity-30 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, oklch(0.577 0.245 16.439 / 40%) 0%, transparent 70%)",
          }}
          animate={{
            x: [0, 100, 50, 0],
            y: [0, 50, 100, 0],
            scale: [1, 1.2, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-[40%] -right-[20%] h-[80%] w-[80%] rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, oklch(0.645 0.246 16.439 / 40%) 0%, transparent 70%)",
          }}
          animate={{
            x: [0, -100, -50, 0],
            y: [0, -50, -100, 0],
            scale: [1, 1.1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute top-[20%] right-[10%] h-[60%] w-[60%] rounded-full opacity-15 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, oklch(0.505 0.213 16.439 / 30%) 0%, transparent 70%)",
          }}
          animate={{
            x: [0, -50, 50, 0],
            y: [0, 100, -50, 0],
            scale: [1, 1.3, 1, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: "100px 100px",
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
