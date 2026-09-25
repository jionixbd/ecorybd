"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { MediaThumbnail } from "@/features/media/components/media-thumbnail";
import { MediaSettingsDelete } from "@/features/media/components/settings/media-settings-delete";
import type { MediaWIthRelations } from "@/features/media/types/media";
import { formatBytes } from "@/lib/format-bytes";
import {
  Check,
  Copy,
  FileImage,
  HardDrive,
  Info,
  Ruler,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState, type Dispatch, type SetStateAction } from "react";
import { useCopyToClipboard } from "usehooks-ts";

interface MediaLibraryCardProps {
  media: MediaWIthRelations;
}

const MotionButtonGroup = motion.create(ButtonGroup);

export const MediaLibraryCard = ({ media }: MediaLibraryCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);

  const showActions = isHovered || openDelete || openInfo;

  return (
    <motion.div
      className="group/mc relative isolate overflow-hidden rounded-2xl"
      layout={false}
      onHoverEnd={() => setIsHovered(false)}
      onHoverStart={() => setIsHovered(true)}
    >
      <MediaThumbnail media={media} />

      <AnimatePresence initial={false}>
        {!!showActions && (
          <MotionButtonGroup
            animate={{ opacity: 1, width: "auto", x: 0 }}
            className="absolute inset-bs-2 inset-e-2"
            exit={{ opacity: 0, width: 0, x: 8 }}
            initial={{ opacity: 0, width: 0, x: 8 }}
            key="actions"
          >
            <MediaCopyUrl value={media.ufsUrl} />

            <MediaInfo
              media={media}
              onOpenChange={setOpenInfo}
              open={openInfo}
            />

            <MediaSettingsDelete
              mediaId={media.mediaId}
              onOpenChange={setOpenDelete}
              open={openDelete}
            />
          </MotionButtonGroup>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

function MediaInfo({
  media,
  open,
  onOpenChange,
}: {
  media: MediaWIthRelations;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}) {
  const hasSizes = media.width && media.height;

  return (
    <HoverCard onOpenChange={onOpenChange} open={open}>
      <HoverCardTrigger asChild>
        <Button size="icon" variant="default">
          <Info />
        </Button>
      </HoverCardTrigger>

      <HoverCardContent align="end" className="flex max-w-48 flex-col gap-1.25">
        <MediaEntity icon={FileImage} value={media.mimeType} />
        <MediaEntity
          icon={Ruler}
          value={hasSizes ? `${media.width} x ${media.height}` : null}
        />
        <MediaEntity
          icon={HardDrive}
          value={media.size ? formatBytes({ bytes: media.size }) : null}
        />
      </HoverCardContent>
    </HoverCard>
  );
}

function MediaEntity({
  icon: Icon,
  value,
}: {
  icon: LucideIcon;
  value: string | null;
}) {
  if (!value) {
    return null;
  }

  return (
    <div className="grid grid-cols-[16px_1fr] items-center gap-3 font-mono text-sm">
      <Icon className="size-4 text-muted-foreground" />
      {value}
    </div>
  );
}

function MediaCopyUrl({ value }: { value: string }) {
  const [, copy] = useCopyToClipboard();
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await copy(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <Button onClick={handleCopy} size="icon">
      {copied ? <Check /> : <Copy />}
    </Button>
  );
}
