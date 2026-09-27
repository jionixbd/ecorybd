import { cn } from "cn";

export function Container({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-7xl gap-4 px-4 sm:gap-6 sm:px-6 lg:gap-8 lg:px-8",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
