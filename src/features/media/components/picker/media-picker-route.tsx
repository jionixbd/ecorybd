import { MediaPickerModal } from "@/features/media/components/picker/media-picker-modal";
import { mediaSearchParam } from "@/features/media/parsers/media";
import { getMediaUseCase } from "@/features/media/use-cases/media";
import { getActiveContext } from "@/lib/auth/get-active-context";
import type { ReactNode } from "react";

interface MediaPickerRouteProps {
  modal?: boolean;
  renderPicker: (props: {
    media: Awaited<ReturnType<typeof getMediaUseCase>>["rows"];
    pages: number;
  }) => ReactNode;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function MediaPickerRoute({
  modal = false,
  searchParams,
  renderPicker,
}: MediaPickerRouteProps) {
  const search = mediaSearchParam.parse(await searchParams);
  const context = await getActiveContext();

  if (!context.organization) {
    return null;
  }

  const data = await getMediaUseCase({
    organizationId: context.organization.organizationId,
    search,
  });

  const content = renderPicker({
    media: data.rows,
    pages: data.meta.pages,
  });

  return modal ? <MediaPickerModal>{content}</MediaPickerModal> : content;
}
