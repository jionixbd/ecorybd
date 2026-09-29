import { Bell, RefreshCcwIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

interface DefaultNotFoundElementProps {
  desc?: string;
  title?: string;
}

export const DefaultNotFoundElement = ({
  title = "Something went wrong",
  desc = "There was an issue loading this section. Refresh to give it another try.",
}: DefaultNotFoundElementProps) => (
  <Empty className="bg-muted/30 p-4">
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <Bell />
      </EmptyMedia>
      <EmptyTitle className="text-sm">{title}</EmptyTitle>
      <EmptyDescription className="max-w-xs text-pretty text-xs">
        {desc}
      </EmptyDescription>
    </EmptyHeader>
    <EmptyContent>
      <Button className="font-normal text-xs" variant="outline">
        <RefreshCcwIcon className="size-3.5" data-icon="inline-start" />
        Refresh
      </Button>
    </EmptyContent>
  </Empty>
);
