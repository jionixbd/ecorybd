import * as icons from "lucide-react";
import type * as React from "react";

interface IconPlaceholderProps extends React.ComponentProps<"svg"> {
  hugeicons?: string;
  lucide: string;
  phosphor?: string;
  remixicon?: string;
  tabler?: string;
}

function IconPlaceholder({
  lucide,
  tabler: _tabler,
  hugeicons: _hugeicons,
  phosphor: _phosphor,
  remixicon: _remixicon,
  ...props
}: IconPlaceholderProps) {
  const iconsByName = icons as unknown as Record<
    string,
    React.ComponentType<React.SVGProps<SVGSVGElement>> | undefined
  >;
  const Icon = iconsByName[lucide];

  return Icon ? <Icon {...props} /> : null;
}

export { IconPlaceholder };
