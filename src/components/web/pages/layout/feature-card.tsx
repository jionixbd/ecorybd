import { Lead, Text } from "@/components/web/pages/layout/typography";
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
  title,
  iconBg,
  iconColor,
  description,
  className,
}: FeaturesCardProps) => (
  <div
    className={cn(
      "flex aspect-auto max-w-auto flex-row gap-4 rounded-2xl border border-web-border bg-web-card p-4 lg:aspect-square lg:flex-col",
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
    <div>
      <Lead className="text-web-card-foreground">{title}</Lead>
      <Text className="7b8d84] text-sm text-web-card-foreground/70">
        {description}
      </Text>
    </div>
  </div>
);
