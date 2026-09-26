import { Skeleton } from "@/components/ui/skeleton";

export const ProductImagesSkeleton = () => {
  return (
    <div className="flex w-full max-w-5xl flex-col gap-4">
      <section className="space-y-3">
        <Skeleton className="h-6 w-32" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {Array.from({ length: 4 }, (_, index) => (
            <Skeleton className="aspect-square w-full" key={index} />
          ))}
        </div>
      </section>

      {/* <section className="space-y-3">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-56 w-full" />
      </section> */}
    </div>
  );
};
