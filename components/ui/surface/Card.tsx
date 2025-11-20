"use client";

import React from "react";
import clsx from "clsx";

export default function Card({ className, children, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={clsx("card p-6", className)} {...rest}>
      {children}
    </div>
  );
}

