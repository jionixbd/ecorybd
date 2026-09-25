"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Spinner } from "@/components/ui/spinner";
import type { Media } from "@/drizzle/schema/media";
import { useMediaUpload } from "@/features/media/hooks/use-media-upload";
import type { MediaRouter, MediaType } from "@/features/media/types/media";
import { cn } from "cn";
import { CheckCheck, ImagePlus, Upload, X } from "lucide-react";
import Image from "next/image";

const ACCEPT_ATTR: Record<MediaType, string> = {
  all: "*",
  image: "image/*,!image/svg+xml",
  svg: "image/svg+xml",
};

interface MediaUploadProps {
  accept: MediaType;
  fileRouter: MediaRouter;
  maxSize: number;
  onUploadComplete?: (res: Media | Media[]) => void;
}

export const MediaUpload = (props: MediaUploadProps) => {
  const { fileRouter, maxSize = 1, accept = "all", onUploadComplete } = props;
  const {
    file,
    preview,
    selectFile,
    upload,
    reset,
    isUploading,
    progress,
    error,
    uploadedUrl,
  } = useMediaUpload({
    accept,
    fileRouter,
    maxSize,
    onUploadComplete,
  });

  return (
    <Card className={cn("max-w-full gap-0 py-2", file && "gap-2")}>
      <CardContent className="flex flex-col px-2">
        <div
          className={cn(
            "relative flex aspect-square items-center overflow-hidden rounded-2xl border border-dashed",
            preview && "aspect-auto"
          )}
        >
          {preview ? (
            <>
              <Image
                alt="Preview"
                className="aspect-video size-full object-cover"
                height={200}
                src={preview}
                width={200}
              />

              {!(isUploading || uploadedUrl) && (
                <Button
                  className="absolute top-2 right-2"
                  onClick={reset}
                  size={"icon"}
                  type="button"
                  variant={"secondary"}
                >
                  <X />
                </Button>
              )}

              {!!isUploading && (
                <Progress
                  className="absolute bottom-0 h-1 bg-muted/50"
                  value={progress}
                />
              )}

              {!!uploadedUrl && (
                <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-card/50">
                  <CheckCheck className="size-6" />
                </div>
              )}
            </>
          ) : (
            <Label
              className="flex size-full cursor-pointer flex-col items-center justify-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              htmlFor="media-upload"
            >
              <ImagePlus className="size-8" />
              {!!error && <p className="text-destructive text-xs">{error}</p>}
            </Label>
          )}

          <Input
            accept={ACCEPT_ATTR[accept]}
            className="sr-only"
            disabled={isUploading}
            id="media-upload"
            max={1}
            multiple
            onChange={(e) => {
              const files = Array.from(e.target.files ?? []);
              if (files.length === 0) {
                return;
              }

              if (files.length > maxSize) {
                return;
              }

              selectFile(files[0]);
            }}
            type="file"
          />
        </div>
      </CardContent>

      <CardFooter className="justify-end px-2">
        {file && !uploadedUrl && (
          <Button disabled={isUploading} onClick={upload}>
            {isUploading ? <Spinner /> : <Upload />}

            {isUploading ? "Uploading..." : "Upload"}
          </Button>
        )}

        {!!uploadedUrl && (
          <Button onClick={reset} variant="outline">
            <Upload /> Upload More
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
