import { Skeleton } from "@/components/ui/skeleton";

export const ProductImagesSkeleton = () => (
  <div className="flex w-full max-w-5xl flex-col gap-4">
    <section className="space-y-3">
      <div className="w-full max-w-5xl space-y-4 rounded-xl border p-6">
        <div className="flex w-full justify-between">
          <Skeleton className="h-9 w-40" />
          <Skeleton className="h-9 w-25" />
        </div>

        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="aspect-square" />
          <Skeleton className="aspect-square" />
          <Skeleton className="aspect-square" />
        </div>
      </div>
    </section>
  </div>
);
