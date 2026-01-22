"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface CountUpProps {
  end: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  once?: boolean;
}

export function CountUp({
  end,
  duration = 2,
  delay = 0,
  prefix = "",
  suffix = "",
  className,
  once = true,
}: CountUpProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, amount: 0.5 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;

      const startTime = Date.now() + delay * 1000;
      const endTime = startTime + duration * 1000;

      const updateCount = () => {
        const now = Date.now();

        if (now < startTime) {
          requestAnimationFrame(updateCount);
          return;
        }

        if (now >= endTime) {
          setCount(end);
          return;
        }

        const progress = (now - startTime) / (duration * 1000);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOutQuart * end));
        requestAnimationFrame(updateCount);
      };

      requestAnimationFrame(updateCount);
    }
  }, [isInView, end, duration, delay]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay }}
      className={cn("tabular-nums", className)}
    >
      {prefix}
      {count}
      {suffix}
    </motion.span>
  );
}
