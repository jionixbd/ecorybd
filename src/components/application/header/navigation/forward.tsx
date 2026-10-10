"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavStack } from "@/hooks/use-navigation-stack";
import { cn } from "cn";
import { Redo2 } from "lucide-react";

interface ForwardButtonProps extends React.ComponentProps<typeof Button> {
  label?: string;
  tooltip?: string;
}

export const ForwardButton = ({
  label = "Go Forward",
  className,
  tooltip,

  ...props
}: ForwardButtonProps) => {
  const { canGoForward, forward } = useNavStack();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          aria-label={label}
          className={cn("gap-2", className)}
          disabled={!canGoForward}
          onClick={forward}
          size={"icon"}
          variant="outline"
          {...props}
        >
          <Redo2 aria-hidden className="size-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>{tooltip ?? label}</TooltipContent>
    </Tooltip>
  );
};
