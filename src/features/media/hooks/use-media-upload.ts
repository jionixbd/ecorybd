"use client";

import type { Media } from "@/drizzle/schema/media";
import { createMediaAction } from "@/features/media/actions/media";
import type { MediaRouter, MediaType } from "@/features/media/types/media";
import { useUploadThing } from "@/lib/uploadthing/uploadthing";
import { useAction } from "next-safe-action/hooks";
import { useCallback, useState } from "react";

const ACCEPT_VALIDATORS: Record<MediaType, (file: File) => boolean> = {
  all: () => true,
  image: (file) =>
    file.type.startsWith("image/") && file.type !== "image/svg+xml",
  svg: (file) => file.type === "image/svg+xml",
};

const ACCEPT_ERROR_MESSAGES: Record<MediaType, string> = {
  all: "Unsupported file type.",
  image: "Only image files are allowed (SVG not supported here).",
  svg: "Only SVG files are allowed.",
};

export const useMediaUpload = ({
  fileRouter,
  maxSize,
  accept,
  onUploadComplete,
}: {
  fileRouter: MediaRouter;
  maxSize: number;
  accept: MediaType;
  onUploadComplete?: (res: Media | Media[]) => void;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const { executeAsync } = useAction(createMediaAction);

  const { startUpload, isUploading } = useUploadThing(fileRouter, {
    onClientUploadComplete: async (res) => {
      const url = res[0]?.ufsUrl ?? null;

      setUploadedUrl(url);

      if (url) {
        const result = await executeAsync({
          height: res[0].serverData.height,
          key: res[0].serverData.key,
          mimeType: res[0].serverData.mimeType,
          name: res[0].serverData.name,
          size: res[0].serverData.size,
          ufsUrl: res[0].serverData.ufsUrl,
          width: res[0].serverData.width,
        });

        if (!result.data || result.validationErrors || result.serverError) {
          setError("Failed to save media metadata to the database.");
          return;
        }

        await onUploadComplete?.(result.data);
      }

      setProgress(100);
    },
    onUploadError: (err) => {
      setError(err.message);
      setProgress(0);
    },
    onUploadProgress: (p) => setProgress(p),
  });

  const selectFile = useCallback(
    (selected: File | null) => {
      setError(null);
      setUploadedUrl(null);

      if (!selected) {
        setFile(null);
        setPreview(null);
        return;
      }

      if (!ACCEPT_VALIDATORS[accept](selected)) {
        setError(ACCEPT_ERROR_MESSAGES[accept]);
        return;
      }

      const maxBytes = maxSize * 1024 * 1024;
      if (selected.size > maxBytes) {
        setError(`Image must be under ${maxSize}MB.`);
        return;
      }

      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    },
    [maxSize, accept]
  );

  const upload = useCallback(() => {
    if (!file) {
      return;
    }
    startUpload([file]);
  }, [file, startUpload]);

  const reset = useCallback(() => {
    setFile(null);
    setPreview(null);
    setProgress(0);
    setError(null);
    setUploadedUrl(null);
  }, []);

  return {
    error,
    file,
    isUploading,
    preview,
    progress,
    reset,
    selectFile,
    upload,
    uploadedUrl,
  };
};
