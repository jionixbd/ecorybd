"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { DialogFooter } from "@/components/ui/dialog";
import { MediaLibraryPagination } from "@/features/media/components/library/media-library-pagination";
import { MediaLibraryToolbar } from "@/features/media/components/library/media-library-toolbar";
import { MediaPickerGrid } from "@/features/media/components/picker/media-picker-grid";
import { MediaPickerProvider } from "@/features/media/components/picker/media-picker-provider";
import type { MediaWIthRelations } from "@/features/media/types/media";
import { MousePointer2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface MediaPickerClientProps {
  media: MediaWIthRelations[];
  onConfirm: (mediaId: string) => Promise<unknown>;
  pages: number;
}

export const MediaPickerClient = ({
  media,
  pages,
  onConfirm,
}: MediaPickerClientProps) => {
  const router = useRouter();
  const [staged, setStaged] = useState<MediaWIthRelations | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  async function handleSave() {
    if (!staged) {
      return;
    }

    setIsSaving(true);

    try {
      await onConfirm(staged.mediaId);
      router.back();
      //   router.refresh();
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <MediaPickerProvider
      deletable={false}
      onSelect={setStaged}
      selectable
      selectedId={staged?.mediaId}
    >
      <div className="flex flex-col gap-4">
        <MediaLibraryToolbar />
        <MediaPickerGrid loading={false} media={media} />
        <DialogFooter>
          <div className="flex w-full items-center justify-between">
            <MediaLibraryPagination pages={pages} />

            <ButtonGroup>
              <Button onClick={() => router.back()} variant="outline">
                <X />
                Cancel
              </Button>

              <Button disabled={!staged || isSaving} onClick={handleSave}>
                <MousePointer2 />
                {isSaving ? "Saving..." : "Select"}
              </Button>
            </ButtonGroup>
          </div>
        </DialogFooter>
      </div>
    </MediaPickerProvider>
  );
};
