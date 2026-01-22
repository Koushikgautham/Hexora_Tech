"use client";

import * as React from "react";
import Image from "next/image";
import { Linkedin, Twitter } from "lucide-react";
import { TiltedCard } from "@/components/animations";
import type { TeamMember } from "@/data/team";

interface TeamCardProps {
  member: TeamMember;
}

export function TeamCard({ member }: TeamCardProps) {
  const [imgSrc, setImgSrc] = React.useState(member.avatar);
  const [imgError, setImgError] = React.useState(false);

  // Get initials for fallback
  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleImageError = () => {
    // Try alternate extension
    if (imgSrc.endsWith(".jpg")) {
      setImgSrc(imgSrc.replace(".jpg", ".jpeg"));
    } else if (imgSrc.endsWith(".jpeg")) {
      setImgSrc(imgSrc.replace(".jpeg", ".jpg"));
    } else {
      // No valid image found
      setImgError(true);
    }
  };

  return (
    <TiltedCard
      tiltAmount={8}
      className="group h-full overflow-hidden rounded-2xl border border-border bg-card"
    >
      {/* Photo Section */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5">
        {!imgError ? (
          <Image
            src={imgSrc}
            alt={member.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={handleImageError}
          />
        ) : (
          /* Fallback with initials */
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-6xl font-bold text-primary/40">{initials}</span>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

        {/* Social Links - Appear on hover */}
        <div className="absolute right-4 top-4 flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <a
            href={member.linkedin}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur-sm transition-colors hover:bg-primary hover:text-primary-foreground"
            aria-label={`${member.name}'s LinkedIn`}
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href={member.twitter}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur-sm transition-colors hover:bg-primary hover:text-primary-foreground"
            aria-label={`${member.name}'s Twitter`}
          >
            <Twitter className="h-5 w-5" />
          </a>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-6">
        <h3 className="text-xl font-bold">{member.name}</h3>
        <p className="mb-3 text-sm font-medium text-primary">{member.role}</p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {member.bio}
        </p>
      </div>
    </TiltedCard>
  );
}
