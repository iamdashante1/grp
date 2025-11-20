"use client";

import React from "react";
import clsx from "clsx";

export default function IconBadge({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={clsx("p-3 rounded-lg bg-white/20 dark:bg-white/10 w-fit", className)}>
      {children}
    </div>
  );
}

