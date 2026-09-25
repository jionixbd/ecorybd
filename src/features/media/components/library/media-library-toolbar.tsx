import { ButtonGroup } from "@/components/ui/button-group";
import { MediaFilter } from "@/features/media/components/media-filter";
import { MediaSort } from "@/features/media/components/media-sort";

export const MediaLibraryToolbar = () => (
  <div className="sticky top-0 z-10">
    <div className="flex w-full items-center justify-between overflow-hidden rounded-2xl p-1 backdrop-blur-2xl">
      <MediaFilter />
      <ButtonGroup>
        <MediaSort />
      </ButtonGroup>
    </div>
  </div>
);
