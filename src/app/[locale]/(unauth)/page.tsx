import { AsyncBoundary } from "@/components/boundaries/async-boundary";
import { Button } from "@/components/ui/button";
import { FluidGradient } from "@/features/web/components/fluid-gradient";
import { NewsletterSubscriptionForm } from "@/features/web/components/newsletter-subscribtion-form";
import { Link } from "@/i18n/navigation";
import { newsletterFlag } from "@/lib/feature-flags/newsletter-flag";
import { generateHomeMetadata } from "@/lib/metadata/pages/home";
import { ArrowUpRight, Rocket } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

export async function generateMetadata(_: PageProps<"/[locale]">) {
  const locale = await getLocale();

  return await generateHomeMetadata(locale);
}

export default async function HomePage(_: PageProps<"/[locale]">) {
  const t = await getTranslations("web.hero");

  return (
    <div className="w-full place-content-center place-items-center bg-zinc-950">
      <div className="relative grid h-full min-h-screen w-full bg-zinc-950">
        <FluidGradient
          className="absolute inset-0"
          colorStops={["#0A192F", "#3A0088", "#9B4DCA", "#00FFB2", "#0A192F"]}
          speed={1}
        />
        <div className="absolute inset-0 backdrop-blur-3xl" />
        <div className="relative grid h-full w-full grid-cols-1 place-content-center place-items-center gap-12 px-5">
          <HeroTitle description={t("description")} title={t("title")} />

          <HeroCTA />
          <AsyncBoundary>
            <Newsletter />
          </AsyncBoundary>
        </div>
      </div>
    </div>
  );
}

interface HeroTitleProps {
  description: string;
  title: string;
}

const HeroTitle = ({ description, title }: HeroTitleProps) => (
  <div className="flex flex-col items-center justify-center">
    <span className="line-clamp-2 min-h-8 font-light font-mono text-xs text-zinc-300 tracking-widest">
      [ v0.1 SIZAR.IO PRESENTS ]
    </span>
    <h1 className="bg-linear-to-r from-violet-100 to-violet-200 bg-clip-text font-black text-5xl text-transparent uppercase tracking-tighter sm:text-8xl md:text-[134px]">
      {title}
    </h1>
    <p className="mx-auto mt-2 max-w-3xl text-center font-extralight text-xl text-zinc-300">
      {description}
    </p>
  </div>
);

const HeroCTA = () => (
  <div>
    <Button
      asChild
      className="h-8 rounded-full bg-secondary px-8 text-secondary-foreground backdrop-blur-2xl md:h-12 dark:bg-primary dark:text-primary-foreground"
    >
      <Link href={"/onboarding"}>
        Join the first edition
        <Rocket />
      </Link>
    </Button>

    <Button
      asChild
      className="h-8 rounded-full font-normal md:h-10"
      variant={"link"}
    >
      <Link href={"/docs"}>
        Read the document
        <ArrowUpRight />
      </Link>
    </Button>
  </div>
);

const Newsletter = async () => {
  const showExample = await newsletterFlag();

  if (!showExample) {
    return null;
  }

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-2">
      {!!showExample && <NewsletterSubscriptionForm />}

      <span className="font-extralight text-[10px] text-muted-foreground tracking-wider">
        By subscribing, you agree to receive occasional notes from us.
      </span>
    </div>
  );
};
