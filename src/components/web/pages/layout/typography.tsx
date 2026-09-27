import { cn } from "cn";

export function H1({ className, ...props }: React.ComponentProps<"h1">) {
  return (
    <h1
      className={cn(
        "font-bold font-hind text-3xl tracking-tight sm:text-4xl md:text-5xl lg:text-6xl",
        className
      )}
      {...props}
    />
  );
}

export function H2({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      className={cn(
        "font-bold font-hind text-2xl tracking-tight sm:text-3xl md:text-4xl lg:text-5xl",
        className
      )}
      {...props}
    />
  );
}

export function H3({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      className={cn(
        "font-bold font-hind text-xl tracking-tight sm:text-2xl md:text-3xl lg:text-4xl",
        className
      )}
      {...props}
    />
  );
}

export function H4({ className, ...props }: React.ComponentProps<"h4">) {
  return (
    <h4
      className={cn(
        "font-bold font-hind text-lg tracking-tight sm:text-xl md:text-2xl",
        className
      )}
      {...props}
    />
  );
}

export function Lead({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "text-pretty font-hind text-base text-muted-foreground sm:text-lg",
        className
      )}
      {...props}
    />
  );
}

export function Text({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "text-pretty font-hind text-base text-muted-foreground leading-relaxed",
        className
      )}
      {...props}
    />
  );
}
