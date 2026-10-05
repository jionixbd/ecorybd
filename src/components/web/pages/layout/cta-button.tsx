"use client";

import { Button } from "@/components/ui/button";
import { cn } from "cn";
import Link from "next/link";
import type React from "react";

interface CTAButtonProps extends React.ComponentPropsWithRef<typeof Button> {
  className?: string;
  label: string;
  scrollToId?: string;
  secondary?: boolean;
}

export const CTAButton = ({
  label,
  className,
  scrollToId = "order-form",
  secondary,
  onClick,
  ...rest
}: CTAButtonProps) => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e as unknown as React.MouseEvent<HTMLButtonElement>);
    }

    const targetElement = document.getElementById(scrollToId);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Button
      {...rest}
      asChild
      className={cn(
        "max-w-max bg-[#173c2d] px-6 py-6 font-hind text-[#f8f7f1] text-base hover:bg-[#e87541] sm:px-6 lg:px-10 lg:text-lg",
        secondary && "bg-[#e87541] hover:bg-[#f0b273]",
        className
      )}
    >
      <Link href="#order-form" onClick={handleScroll}>
        {label}
      </Link>
    </Button>
  );
};
