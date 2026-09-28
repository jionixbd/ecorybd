import { AsyncBoundary } from "@/components/boundaries/async-boundary";
import { MediaLibrary } from "@/features/media/components/library/media-library";
import { MediaUpload } from "@/features/media/components/upload/media-upload";
import { mediaSearchParam } from "@/features/media/parsers/media";
import { getMediaUseCase } from "@/features/media/use-cases/media";
import { getActiveContext } from "@/lib/auth/get-active-context";

export default async function LibraryPage(
  props: PageProps<"/[locale]/workspace/[organization]/library">
) {
  return (
    <div className="mx-auto max-w-5xl">
      <AsyncBoundary>
        <LibraryPageWrapper {...props} />
      </AsyncBoundary>
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
    <div className="max-w-4xl">
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
