import { Skeleton } from "@/components/ui/skeleton";

export const OrganizationSkeleton = () => (
  <div className="flex items-center gap-2 px-1 py-1.5">
    <Skeleton className="h-8 w-8 overflow-hidden rounded-lg" />
    <div className="grid w-full flex-1 gap-1">
      <Skeleton className="h-4 w-4/4" />
      <Skeleton className="h-3 w-2/4" />
    </div>
  </div>
);

export const OrganizationListSkeleton = ({ items = 2 }: { items?: number }) =>
  Array.from({ length: items }).map((_, i) => <OrganizationSkeleton key={i} />);
