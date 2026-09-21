import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LocaleSwitcher } from "@/features/web/components/locale-switcher";
import { ThemeSwitcher } from "@/features/web/components/theme-swicther";
import { SiGithub, SiX } from "@icons-pack/react-simple-icons";
import { Globe2 } from "lucide-react";
import Link from "next/link";

export const Dock = () => (
  <div className="sticky! bottom-2 z-20 flex w-max items-center justify-center self-center rounded-md bg-sidebar p-2 text-sidebar-foreground backdrop-blur-xl">
    <Button asChild className="p-2" size="icon" variant="ghost">
      <Link href="https://sizar.dev" target="_blank">
        <Globe2 className="size-4" />
      </Link>
    </Button>

    <Button asChild className="p-2" size="icon" variant="ghost">
      <Link href="https://github.com/sizarcorpse" target="_blank">
        <SiGithub className="size-4" />
      </Link>
    </Button>

    <Button className="p-2" size="icon" variant="ghost">
      <Link href="https://x.com/sizarcorpse" target="_blank">
        <SiX className="size-4" />
      </Link>
    </Button>

    <Separator className="mx-1 h-8" orientation="vertical" />

    <LocaleSwitcher />
    <ThemeSwitcher />

    <span className="absolute bottom-0 left-4.5 h-px w-[calc(100%-2.25rem)] bg-linear-to-r from-[#9B4DCA]/0 via-[#9B4DCA]/90 to-[#9B4DCA]/0 transition-opacity duration-500 group-hover:opacity-60" />
  </div>
);
