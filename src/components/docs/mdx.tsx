import { File } from "@/components/docs/mdx/file";
import { Files, Folder } from "fumadocs-ui/components/files";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    File,
    Files,
    Folder,
    ...components,
  };
}

export const useMDXComponents = getMDXComponents;
