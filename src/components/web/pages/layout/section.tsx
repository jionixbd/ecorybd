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
      className={cn("py-4 sm:py-6 md:py-8 lg:py-10 xl:py-12", className)}
      id={id}
      {...props}
    >
      {children}
    </section>
  );
}
