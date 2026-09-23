import { SidebarTrigger } from "@/components/ui/sidebar";

export default function HeaderProductCreatePage(
  _: PageProps<"/[locale]/workspace/[organization]/products">
) {
  return (
    <header className="sticky top-0 flex h-12 shrink-0 items-center gap-2 rounded-md bg-sidebar px-4 py-2">
      <SidebarTrigger className="cursor-pointer" />
    </header>
  );
}
