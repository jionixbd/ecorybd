import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export const ProductDetailSkeleton = () => (
  <div className="flex w-full max-w-5xl flex-col gap-4">
    <section className="flex w-full justify-center">
      <div className="w-full max-w-5xl space-y-4 rounded-xl border p-6">
        <Skeleton className="h-7 w-1/3" />
        <Skeleton className="h-4 w-1/4" />

        <Separator />

        <Skeleton className="h-16 w-full" />

        <Separator />

        <div className="space-y-3 pt-4">
          <div className="grid grid-cols-2 gap-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-40" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Skeleton className="h-5 w-30" />
            <Skeleton className="h-5 w-60" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-36" />
          </div>
        </div>
      </div>
    </section>
  </div>
);
