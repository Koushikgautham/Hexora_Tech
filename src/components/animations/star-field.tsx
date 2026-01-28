"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  opacity: number;
}

interface StarFieldProps {
  starCount?: number;
  speed?: number;
  starColor?: string;
  backgroundColor?: string;
  className?: string;
}

export function StarField({
  starCount = 200,
  speed = 0.5,
  starColor = "#e11d48",
  backgroundColor = "transparent",
  className = "",
}: StarFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize stars
    const initStars = () => {
      starsRef.current = [];
      for (let i = 0; i < starCount; i++) {
        starsRef.current.push({
          x: Math.random() * 2 - 1,
          y: Math.random() * 2 - 1,
          z: Math.random(),
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.3,
        });
      }
    };

    initStars();

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const centerX = width / 2;
      const centerY = height / 2;

      // Clear canvas
      ctx.fillStyle = backgroundColor;
      if (backgroundColor === "transparent") {
        ctx.clearRect(0, 0, width, height);
      } else {
        ctx.fillRect(0, 0, width, height);
      }

      // Calculate mouse offset for parallax
      const mouseOffsetX = (mouseRef.current.x - 0.5) * 50;
      const mouseOffsetY = (mouseRef.current.y - 0.5) * 50;

      // Draw stars
      starsRef.current.forEach((star) => {
        // Move star towards camera
        star.z -= speed * 0.01;

        // Reset star if it passes the camera
        if (star.z <= 0) {
          star.x = Math.random() * 2 - 1;
          star.y = Math.random() * 2 - 1;
          star.z = 1;
        }

        // Project star position to 2D
        const scale = 1 / star.z;
        const x = centerX + (star.x * scale * centerX * 0.5) + mouseOffsetX * (1 - star.z);
        const y = centerY + (star.y * scale * centerY * 0.5) + mouseOffsetY * (1 - star.z);

        // Calculate size and opacity based on depth
        const size = star.size * scale * 2;
        const opacity = star.opacity * (1 - star.z * 0.5);

        // Draw star
        if (x >= 0 && x <= width && y >= 0 && y <= height) {
          ctx.beginPath();
          ctx.arc(x, y, Math.max(0.5, size), 0, Math.PI * 2);
          ctx.fillStyle = starColor;
          ctx.globalAlpha = opacity;
          ctx.fill();

          // Add glow for closer stars
          if (star.z < 0.3) {
            ctx.beginPath();
            ctx.arc(x, y, size * 2, 0, Math.PI * 2);
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 2);
            gradient.addColorStop(0, starColor);
            gradient.addColorStop(1, "transparent");
            ctx.fillStyle = gradient;
            ctx.globalAlpha = opacity * 0.5;
            ctx.fill();
          }
        }
      });

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, [starCount, speed, starColor, backgroundColor]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 ${className}`}
      style={{ zIndex: 0 }}
    />
  );
}
