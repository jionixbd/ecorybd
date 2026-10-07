import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner"; // Adjust path to your Spinner component
import { cn } from "cn";

interface OrderFormSubmitProps {
  className?: string;
  disabled?: boolean;
  form?: string;
  isNavigating?: boolean;
  isSubmittingOrder?: boolean;
}

export const OrderFormSubmit = ({
  disabled = false,
  form,
  isSubmittingOrder = false,
  isNavigating = false,
  className,
}: OrderFormSubmitProps) => {
  const isLoading = isSubmittingOrder || isNavigating;

  const label = (() => {
    if (isSubmittingOrder) {
      return "অর্ডারটি নিশ্চিত করা হচ্ছে...";
    }
    if (isNavigating) {
      return "অর্ডার সম্পন্ন হয়েছে";
    }
    return "অর্ডার করুন";
  })();

  return (
    <Button
      className={cn(
        "min-h-12 w-full bg-web-accent font-hind text-lg text-web-accent-foreground hover:bg-web-accent/80 disabled:opacity-70!",
        className
      )}
      disabled={disabled || isLoading}
      form={form}
      type="submit"
    >
      {!!isLoading && <Spinner />}
      {label}
    </Button>
  );
};
