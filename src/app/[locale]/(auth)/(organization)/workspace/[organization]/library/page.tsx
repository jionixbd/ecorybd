import { Skeleton } from "@/components/ui/skeleton";
import { MediaLibrary } from "@/features/media/components/library/media-library";
import { MediaUpload } from "@/features/media/components/upload/media-upload";
import { mediaSearchParam } from "@/features/media/parsers/media";
import { getMediaUseCase } from "@/features/media/use-cases/media";
import { getActiveContext } from "@/lib/auth/get-active-context";
import { Suspense } from "react";

export default async function LibraryPage(
  props: PageProps<"/[locale]/workspace/[organization]/library">
) {
  return (
    <div className="mx-auto max-w-4xl">
      <Suspense fallback={<LibraryPageLoading />}>
        <LibraryPageWrapper {...props} />
      </Suspense>
    </div>
  );
}

async function LibraryPageWrapper(
  props: PageProps<"/[locale]/workspace/[organization]/library">
) {
  const searchParams = await props.searchParams;
  const search = mediaSearchParam.parse(searchParams);
  const context = await getActiveContext();

  if (!context.organization) {
    return null;
  }

  const data = await getMediaUseCase({
    organizationId: context.organization.organizationId,
    search,
  });

  return (
    <div className="">
      <MediaLibrary
        count={data.meta.count}
        media={data.rows}
        pages={data.meta.pages}
        toolbar={true}
        upload={
          <MediaUpload accept="all" fileRouter="mediaUploader" maxSize={1} />
        }
      />
    </div>
  );
}

const LibraryPageLoading = () => (
  <div className="flex w-full flex-col gap-4">
    <div className="flex w-full justify-between">
      <Skeleton className="h-9 w-40" />
      <Skeleton className="h-9 w-25" />
    </div>

    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
      <Skeleton className="aspect-square" />
      <Skeleton className="aspect-square" />
      <Skeleton className="aspect-square" />
      <Skeleton className="aspect-square" />
      <Skeleton className="aspect-square" />
      <Skeleton className="aspect-square" />
    </div>

    <div className="flex w-full justify-end gap-2">
      <Skeleton className="h-9 w-9 rounded-full" />
      <Skeleton className="h-9 w-9 rounded-full" />
    </div>
  </div>
);
