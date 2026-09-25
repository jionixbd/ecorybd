import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteMediaAction } from "@/features/media/actions/media";
import { X } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import type { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

interface MediaSettingsDeleteProps {
  mediaId: string;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}

export const MediaSettingsDelete = ({
  mediaId,
  open,
  onOpenChange,
}: MediaSettingsDeleteProps) => {
  const { executeAsync, isPending } = useAction(deleteMediaAction, {
    onError({ error }) {
      toast.error(
        `[${error.serverError?.code}]: ${error.serverError?.message}`
      );
    },

    onSuccess() {
      toast.success("Media deleted successfully");
    },
  });

  const handleDelete = async () => {
    try {
      await executeAsync({
        mediaId,
      });
    } catch {}
  };

  return (
    <AlertDialog onOpenChange={onOpenChange} open={open}>
      <AlertDialogTrigger asChild>
        <Button size={"icon"} variant="default">
          <X />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Media?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This file will be permanently removed
            from your library.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isPending} onClick={handleDelete}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
