import { AsyncBoundary } from "@/components/boundaries/async-boundary";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function HeaderProductsPage(
  props: PageProps<"/[locale]/workspace/[organization]/products">
) {
  return (
    <header className="sticky top-0 flex h-12 shrink-0 items-center justify-between gap-2 rounded-md bg-sidebar px-4 py-2">
      <SidebarTrigger className="cursor-pointer" />

      <AsyncBoundary>
        <HeaderProductsPageWrapper {...props} />
      </AsyncBoundary>
    </header>
  );
}

async function HeaderProductsPageWrapper(
  props: PageProps<"/[locale]/workspace/[organization]/products">
) {
  const params = await props.params;

  return (
    <Link href={`/workspace/${params.organization}/products/create`}>
      <Button>
        Create Product
        <Plus />
      </Button>
    </Link>
  );
}
