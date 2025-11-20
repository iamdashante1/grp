"use client";

import Link from "next/link";
import React from "react";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface CommonProps {
  className?: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  disabled?: boolean;
}

type ButtonProps = CommonProps & (
  | ({ href?: undefined } & React.ButtonHTMLAttributes<HTMLButtonElement>)
  | ({ href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
);

export default function Button(props: ButtonProps) {
  const {
    className,
    children,
    variant = "primary",
    size = "md",
    fullWidth,
    disabled,
    href,
    ...rest
  } = props as ButtonProps;

  const base = "inline-flex items-center justify-center rounded-lg font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:opacity-70 disabled:cursor-not-allowed";

  const sizes: Record<Size, string> = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5",
    lg: "px-6 py-3 text-lg",
  };

  const variants: Record<Variant, string> = {
    primary: "bg-primary-600 text-white hover:bg-primary-700",
    secondary: "bg-secondary-800 text-white hover:bg-secondary-700 dark:bg-secondary-200 dark:text-secondary-900 dark:hover:bg-white",
    outline: "border-2 border-primary-600 text-primary-700 hover:bg-primary-50 dark:border-red-400 dark:text-red-300 dark:hover:bg-red-900/20",
    ghost: "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
  };

  const s = size as Size;
  const v = variant as Variant;
  const classes = clsx(base, sizes[s], variants[v], fullWidth && "w-full", className);

  if (href) {
    return (
      <Link href={href} className={classes} aria-disabled={disabled} {...(rest as any)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={disabled} {...(rest as any)}>
      {children}
    </button>
  );
}
