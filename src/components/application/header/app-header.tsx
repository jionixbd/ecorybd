import { BackButton } from "@/components/application/header/navigation/back";
import { ForwardButton } from "@/components/application/header/navigation/forward";
import { ButtonGroup } from "@/components/ui/button-group";
import { SidebarTrigger } from "@/components/ui/sidebar";

export const AppHeader = () => (
  <header className="sticky top-0 flex h-12 shrink-0 items-center gap-2 rounded-md bg-sidebar px-4 py-2">
    <ButtonGroup>
      <SidebarTrigger
        className="cursor-pointer"
        size={"icon"}
        variant={"outline"}
      />
      <BackButton />
      <ForwardButton />
    </ButtonGroup>
  </header>
);
