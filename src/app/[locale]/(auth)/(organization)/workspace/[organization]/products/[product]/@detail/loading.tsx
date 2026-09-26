import { Skeleton } from "@/components/ui/skeleton";

export default function ProductLoading() {
  return (
    <div className="flex flex-col gap-4">
      <section className="flex w-full justify-center">
        <div className="w-full max-w-5xl space-y-4 rounded-xl border p-6">
          <Skeleton className="h-7 w-1/3" />
          <Skeleton className="h-4 w-1/4" />

          <div className="space-y-3 pt-4">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-4/5" />
            <Skeleton className="h-5 w-3/5" />
          </div>

          <Skeleton className="h-24 w-full" />
        </div>
      </section>
    </div>
  );
}
