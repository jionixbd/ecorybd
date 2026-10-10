"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavStack } from "@/hooks/use-navigation-stack";
import { cn } from "cn";
import { Undo2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface BackButtonProps extends React.ComponentProps<typeof Button> {
  fallbackHref?: string;
  label?: string;
  tooltip?: string;
}

export const BackButton = ({
  fallbackHref,
  label = "Go back",
  className,
  tooltip,
  ...props
}: BackButtonProps) => {
  const router = useRouter();
  const { back, canGoBack } = useNavStack();

  const handleClick = () => {
    if (canGoBack) {
      back();
    } else if (fallbackHref) {
      router.push(fallbackHref);
    }
  };

  const disabled = !(canGoBack || fallbackHref);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          aria-label={label}
          className={cn(className)}
          disabled={disabled}
          onClick={handleClick}
          size={"icon"}
          variant="outline"
          {...props}
        >
          <Undo2 aria-hidden className="size-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>{tooltip ?? label}</TooltipContent>
    </Tooltip>
  );
};
