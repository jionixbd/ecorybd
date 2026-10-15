import { Lead } from "@/components/web/pages/layout/typography";
import { cn } from "cn";
import type { LucideIcon } from "lucide-react";

export interface FeaturesCardProps {
  className?: string;
  description: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  title: string;
}

export const FeatureCard = ({
  icon: Icon,
  iconBg,
  iconColor,
  description,
  className,
}: FeaturesCardProps) => (
  <div
    className={cn(
      "flex aspect-auto max-w-auto flex-row items-center gap-2 rounded-2xl border border-web-border bg-web-card p-2.5 md:gap-4 md:p-4",
      className
    )}
  >
    <div
      className="flex aspect-square h-11 w-11 shrink-0 items-center justify-center rounded-xl"
      style={{
        background: iconBg,
      }}
    >
      <Icon
        style={{
          color: iconColor,
        }}
      />
    </div>

    <Lead className="text-web-card-foreground/80 leading-6 sm:text-lg md:text-xl">
      {description}
    </Lead>
  </div>
);
