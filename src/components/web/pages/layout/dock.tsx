"use client";

import { Button } from "@/components/ui/button";
import { CTAButton } from "@/components/web/pages/layout/cta-button";
import { Phone } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

export const Dock = () => {
  const dockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const orderForm = document.getElementById("order-form");
    const dock = dockRef.current;

    if (!(orderForm && dock)) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          dock.classList.add("translate-y-full");
          dock.setAttribute("aria-hidden", "true");
        } else {
          dock.classList.remove("translate-y-full");
          dock.setAttribute("aria-hidden", "false");
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(orderForm);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="fixed bottom-1 left-1/2 z-50 flex w-full max-w-max -translate-x-1/2 transform gap-1 rounded-2xl bg-web-card p-1 text-center text-web-primary-foreground transition-transform duration-200 ease-out will-change-transform"
      ref={dockRef}
      style={{
        boxShadow:
          "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px",
      }}
    >
      <CTAButton
        className="bg-web-accent p-4.5 text-sm text-web-accent-foreground hover:bg-web-accent/80 md:p-6"
        label="অর্ডার করুন"
      />
      <Button
        asChild
        className="max-w-max bg-web-primary p-4.5 font-hind text-sm text-web-primary-foreground hover:bg-web-accent hover:text-accent-foreground sm:px-6 md:p-6 lg:px-10 lg:text-lg"
      >
        <Link href="tel:09613825382">
          <Phone />
          কল করুন
        </Link>
      </Button>
    </div>
  );
};
