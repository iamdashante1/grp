"use client";

import React from "react";
import clsx from "clsx";

export default function PageContainer({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={clsx("container-app", className)}>{children}</div>;
}

