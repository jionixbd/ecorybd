import { FileIcon } from "@react-symbols/icons/utils";
import { File as FilePrimitive } from "fumadocs-ui/components/files";

interface FileProps extends React.ComponentProps<typeof FilePrimitive> {}

export const File = ({ ...props }: FileProps) => (
  <FilePrimitive
    icon={<FileIcon autoAssign={true} fileName={props.name} />}
    {...props}
  />
);
