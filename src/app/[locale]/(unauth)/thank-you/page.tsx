import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { getCustomerOrderSummaryUseCase } from "@/features/order/use-cases/order";
import { formatBDT } from "@/lib/format-bdt";
import { getStorefrontContext } from "@/lib/storefront/get-storefront-context";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { createSearchParamsCache, parseAsString } from "nuqs/server";
import { Suspense } from "react";

export const searchParamsCache = createSearchParamsCache({
  order: parseAsString.withDefault(""),
});

export default function ThankYouPage(props: PageProps<"/[locale]/thank-you">) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-web-background px-4 text-web-foreground">
      <Suspense fallback={<ThankYouSkeleton />}>
        <ThankYouPageWrapper {...props} />
      </Suspense>
    </div>
  );
}

async function ThankYouPageWrapper(props: PageProps<"/[locale]/thank-you">) {
  const { order } = await searchParamsCache.parse(props.searchParams);
  const context = getStorefrontContext();

  if (!order) {
    return (
      <Heading
        description=" মনে হচ্ছে আপনি সরাসরি এই পৃষ্ঠায় চলে এসেছেন। প্রদর্শনের জন্য কোনো অর্ডার তথ্য
              বা বিবরণ পাওয়া যায়নি।"
        title="এখানে দেখার মতো কিছু নেই! কোনো সক্রিয় অর্ডার পাওয়া যায়নি।"
      />
    );
  }

  const data = await getCustomerOrderSummaryUseCase({
    orderNumber: order,
    organizationId: context.organizationId,
  });

  if (!data) {
    return (
      <Heading
        description="মনে হচ্ছে আপনি ভুল বা অবৈধ অর্ডার আইডি ব্যবহার করেছেন। অনুগ্রহ করে আপনার তথ্য যাচাই করুন অথবা হোম পেজে ফিরে যান।"
        title="অর্ডার খুঁজে পাওয়া যায়নি! প্রদত্ত নম্বরটির কোনো রেকর্ড নেই।"
      />
    );
  }

  return (
    <div className="flex w-full max-w-md flex-col gap-8 text-center">
      <div className="flex justify-center">
        <div className="rounded-full bg-web-foreground/10 p-2">
          <CheckCircle2 className="h-8 w-8 text-web-foreground" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="font-bold font-hind text-3xl tracking-tight">
          আপনার অর্ডারের জন্য ধন্যবাদ!
        </h1>
        <p className="font-hind text-sm text-web-foreground/70">
          আমরা আপনার অর্ডারটি পেয়েছি এবং তা সরবরাহের জন্য প্রস্তুত করছি। আপনার ইনবক্সে একটি
          নিশ্চিতকরণ ইমেল পাঠানো হয়েছে।
        </p>
      </div>

      <Card className="bg-[#ffffff]">
        <CardHeader>
          <CardTitle className="text-start text-web-card-foreground">
            Order Number
          </CardTitle>

          <CardAction className="text-end text-web-card-foreground">
            #{data.orderNumber}
          </CardAction>
        </CardHeader>

        <CardContent className="flex flex-col gap-3">
          {data.items.map((item) => (
            <Item className="px-0" key={item.productName} size={"xs"}>
              <ItemContent>
                <ItemTitle className="font-hind text-web-card-foreground">
                  {item.productName}
                </ItemTitle>
                <ItemDescription>{item.variantName}</ItemDescription>
              </ItemContent>
              <ItemContent>
                <ItemTitle className="font-hind text-web-card-foreground">
                  {formatBDT(item.unitPrice)}{" "}
                  <span className="font-mono">১ x</span>
                </ItemTitle>
              </ItemContent>

              <ItemActions>
                <ItemTitle className="font-hind text-web-card-foreground">
                  {formatBDT(item.subtotal)}
                </ItemTitle>
              </ItemActions>
            </Item>
          ))}
          <Separator className="bg-[#173c2d]" />

          <div>
            <Item className="px-0" size={"xs"}>
              <ItemContent>
                <ItemTitle className="text-web-card-foreground">
                  Shipping
                </ItemTitle>
              </ItemContent>

              <ItemActions>
                <ItemTitle className="font-hind text-web-card-foreground">
                  {formatBDT(data.shippingTotal)}
                </ItemTitle>
              </ItemActions>
            </Item>

            <Item className="px-0" size={"xs"}>
              <ItemContent>
                <ItemTitle className="text-web-card-foreground">
                  Total
                </ItemTitle>
              </ItemContent>

              <ItemActions>
                <ItemTitle className="font-hind text-base text-web-card-foreground">
                  {formatBDT(data.total)}
                </ItemTitle>
              </ItemActions>
            </Item>
          </div>
        </CardContent>

        <CardFooter>
          <Button
            asChild
            className="ml-auto w-full max-w-max bg-[#173c2d] text-[#f8f7f1] hover:bg-[#173c2d]/90"
          >
            <Link href="#">
              Continue Shopping <ArrowRight />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

const Heading = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="w-full max-w-md space-y-4 text-center">
    <div className="flex flex-col gap-2">
      <h1 className="font-bold font-hind text-3xl tracking-tight">{title}</h1>
      <p className="font-hind text-sm text-web-card-foreground/70">
        {description}
      </p>
    </div>
    <Button
      asChild
      className="max-w-max bg-[#173c2d] text-[#f8f7f1] hover:bg-[#173c2d]/90"
    >
      <Link href="/">
        Back <ArrowRight />
      </Link>
    </Button>
  </div>
);

const ThankYouSkeleton = () => (
  <div className="flex w-full max-w-md flex-col items-center justify-center space-y-2">
    <Skeleton className="h-8 w-full bg-[#173c2d]/10" />
    <Skeleton className="h-4 w-3/4 bg-[#173c2d]/10" />
    <Skeleton className="h-4 w-2/4 bg-[#173c2d]/10" />
    <Skeleton className="h-6 w-16 bg-[#173c2d]/10" />
  </div>
);
