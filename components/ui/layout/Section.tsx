"use client";

import React from "react";
import clsx from "clsx";

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  container?: boolean;
  yPadding?: boolean;
}

export default function Section({ container = true, yPadding = true, className, children, ...rest }: SectionProps) {
  const Wrapper = container ? (props: any) => <div className="container-app" {...props} /> : React.Fragment as any;
  return (
    <section className={clsx(yPadding && "section-y", className)} {...rest}>
      {container ? <div className="container-app">{children}</div> : children}
    </section>
  );
}

