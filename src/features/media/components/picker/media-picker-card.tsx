"use client";

import { MediaThumbnail } from "@/features/media/components/media-thumbnail";
import { useMediaPicker } from "@/features/media/components/picker/media-picker-provider";
import type { MediaWIthRelations } from "@/features/media/types/media";
import { cn } from "cn";
import { motion } from "motion/react";

interface MediaPickerCardProps {
  media: MediaWIthRelations;
}

export const MediaPickerCard = ({ media }: MediaPickerCardProps) => {
  const { selectable, selectedId, onSelect } = useMediaPicker();
  const selected = selectedId === media.mediaId;

  const handleSelect = () => {
    if (selectable) {
      onSelect?.(media);
    }
  };

  return (
    <motion.div
      aria-pressed={selected}
      className={cn(
        "relative rounded-2xl",
        selectable && "cursor-pointer",
        selected && "ring-2 ring-primary ring-offset-2"
      )}
      layout={false}
      onClick={handleSelect}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleSelect();
        }
      }}
      role={selectable ? "button" : undefined}
      tabIndex={selectable ? 0 : undefined}
    >
      <MediaThumbnail media={media} selected={selected} />
    </motion.div>
  );
};
