"use client";

import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export const TableRefresh = () => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <Button
      aria-label="Refresh table"
      className="text-muted-foreground"
      disabled={pending}
      onClick={() => startTransition(() => router.refresh())}
      size="icon"
      title="Refresh table"
      variant="outline"
    >
      <RotateCw className={pending ? "animate-spin" : undefined} />
    </Button>
  );
};
