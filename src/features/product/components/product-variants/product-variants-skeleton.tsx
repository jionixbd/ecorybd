import { Skeleton } from "@/components/ui/skeleton";

export const ProductVariantsSkeleton = () => (
  <div className="flex w-full max-w-5xl flex-col gap-4">
    <section className="space-y-3">
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-56 w-full" />
    </section>
  </div>
);
