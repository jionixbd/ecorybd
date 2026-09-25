"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export const MediaPickerModal = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          router.back();
        }
      }}
      open
    >
      <DialogContent
        className="2xl:12 h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-none gap-0 overflow-hidden p-2 sm:max-w-none md:p-6 lg:p-8"
        showCloseButton={false}
      >
        <div className="scrollbar-none flex-1 overflow-y-auto rounded-2xl">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};
