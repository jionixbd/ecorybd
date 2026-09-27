import { cn } from "cn";

type SectionProps = React.ComponentProps<"section"> & {
  id: string;
  labelledBy?: string;
};

export function Section({
  id,
  className,
  labelledBy,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      aria-labelledby={labelledBy}
      className={cn("py-16 sm:py-24 lg:py-32", className)}
      id={id}
      {...props}
    >
      {children}
    </section>
  );
}
