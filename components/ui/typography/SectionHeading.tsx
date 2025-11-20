"use client";

import React from "react";
import clsx from "clsx";

export default function SectionHeading({
  title,
  subtitle,
  align = "center",
  className,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={clsx("mb-10", align === "center" && "text-center", className)}>
      <h2 className="heading text-gray-900 dark:text-white mb-3">{title}</h2>
      {subtitle && <p className="subheading text-lg max-w-3xl mx-auto">{subtitle}</p>}
    </div>
  );
}

