import { Slot } from "@radix-ui/react-slot";

interface EventBoundaryProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean;
  preventDefault?: boolean;
}

const stopEvent = (
  e: React.MouseEvent<HTMLElement>,
  preventDefault?: boolean
) => {
  if (preventDefault) {
    e.preventDefault();
  }

  e.stopPropagation();
};

export const EventBoundary = ({
  asChild = false,
  preventDefault = false,
  onClick,
  onDoubleClick,
  ...props
}: EventBoundaryProps) => {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      {...props}
      onClick={(e) => {
        stopEvent(e, preventDefault);
        onClick?.(e);
      }}
      onDoubleClick={(e) => {
        stopEvent(e, preventDefault);
        onDoubleClick?.(e);
      }}
    />
  );
};
