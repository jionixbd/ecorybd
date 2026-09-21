import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/shadcn/utils";
import type { LucideIcon } from "lucide-react";
import type * as React from "react";

export interface TooltipButtonProps
  extends React.ComponentPropsWithRef<typeof Button> {
  align?: "start" | "center" | "end";
  icon?: LucideIcon;
  iconClassName?: string;
  side?: "top" | "right" | "bottom" | "left";
  text?: string;
  tooltip: React.ReactNode;
}

export function TooltipButton({
  icon: Icon,
  tooltip,
  text,
  side = "bottom",
  align = "center",
  variant = "ghost",
  size = text ? "default" : "icon",
  iconClassName = "h-4 w-4",
  className,
  ref,
  ...props
}: TooltipButtonProps) {
  const content = text ? (
    <span>{text}</span>
  ) : (
    typeof tooltip === "string" && <span className="sr-only">{tooltip}</span>
  );

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          className={cn(text && "gap-2", className)}
          ref={ref}
          size={size}
          variant={variant}
          {...props}
        >
          {!!Icon && <Icon className={cn(iconClassName)} />}

          {content}
        </Button>
      </TooltipTrigger>
      <TooltipContent align={align} side={side}>
        {tooltip}
      </TooltipContent>
    </Tooltip>
  );
}
