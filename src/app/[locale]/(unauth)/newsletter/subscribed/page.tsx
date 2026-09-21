import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Link } from "@/i18n/navigation";
import { AlertTriangle, CheckCircle2, Undo2, UserX2 } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

export default async function NewsletterSubscribedPage(
  props: PageProps<"/[locale]/newsletter/subscribed">
) {
  const t = await getTranslations("newsletter.hero");

  return (
    <div className="flex h-svh items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-muted/10 p-0">
        <CardContent className="p-0">
          <div className="full relative flex aspect-video flex-col items-center justify-center">
            <PageTitle
              badge={t("badge")}
              motto={t("motto")}
              title={t("appName")}
            />
          </div>
          <Suspense fallback={null}>
            <NewsletterSubscriberStatus
              params={props.params}
              searchParams={props.searchParams}
            />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}

interface TitleProps {
  badge: string;
  motto: string;
  title: string;
}

const PageTitle = ({ motto, title, badge }: TitleProps) => (
  <div className="flex flex-col items-center justify-center">
    <span className="line-clamp-2 min-h-8 font-light font-mono text-xs text-zinc-300 tracking-widest">
      [ {badge} ]
    </span>
    <h1 className="bg-linear-to-r from-violet-100 to-violet-200 bg-clip-text font-black text-4xl text-transparent uppercase tracking-tighter md:text-6xl">
      {title}
    </h1>
    <p className="mx-auto mt-2 max-w-3xl text-center font-extralight text-sm text-zinc-300">
      {motto}
    </p>
  </div>
);

const NewsletterSubscriberStatus = async ({
  searchParams,
}: PageProps<"/[locale]/newsletter/subscribed">) => {
  const t = await getTranslations("newsletter");
  const { status: rawStatus } = await searchParams;

  const status: StatusType =
    rawStatus && (rawStatus as string) in STATUS_CONFIG
      ? (rawStatus as StatusType)
      : "invalid";

  const config = STATUS_CONFIG[status];
  const Icon = config.icon;

  return (
    <Empty className="h-full pt-0">
      <EmptyHeader>
        <EmptyMedia className={config.bgColor} variant="icon">
          <Icon className={config.iconColor} />
        </EmptyMedia>
        <EmptyTitle>{t(`${status}.title`)}</EmptyTitle>
        <EmptyDescription className="max-w-sm text-pretty">
          {t(`${status}.description`)}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button asChild variant="default">
          <Link href={"/"}>
            <Undo2 data-icon="inline-start" />
            {t(`${status}.home`)}
          </Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
};

type StatusType =
  | "subscribed"
  | "unsubscribed"
  | "already_subscribed"
  | "invalid";

const STATUS_CONFIG: Record<
  StatusType,
  {
    icon: typeof CheckCircle2;
    iconColor: string;
    bgColor: string;
    title: string;
    description: string;
  }
> = {
  already_subscribed: {
    bgColor: "bg-blue-500/10",
    description:
      "Your email address is already active on our newsletter list. No further action is required.",
    icon: CheckCircle2,
    iconColor: "text-blue-500",
    title: "Already Subscribed",
  },
  invalid: {
    bgColor: "bg-destructive/10",
    description:
      "This confirmation link is invalid or has expired. Please try submitting your email address again.",
    icon: AlertTriangle,
    iconColor: "text-destructive",
    title: "Invalid or Expired Link",
  },
  subscribed: {
    bgColor: "bg-emerald-500/10",
    description:
      "Thank you for confirming your email. You're officially on the list and will receive our latest updates directly to your inbox.",
    icon: CheckCircle2,
    iconColor: "text-emerald-500",
    title: "Subscription Confirmed!",
  },
  unsubscribed: {
    bgColor: "bg-amber-500/10",
    description:
      "You have been removed from our newsletter distribution list. We're sorry to see you go!",
    icon: UserX2,
    iconColor: "text-amber-500",
    title: "Unsubscribed Successfully",
  },
};
