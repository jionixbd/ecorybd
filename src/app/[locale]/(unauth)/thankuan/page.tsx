import { AsyncBoundary } from "@/components/boundaries/async-boundary";
import { doctors, licenses } from "@/components/web/data/shared";
import { features, reviews, videos } from "@/components/web/data/thankuan";
import { Container } from "@/components/web/pages/layout/container";
import { CTAButton } from "@/components/web/pages/layout/cta-button";
import { FeatureCard } from "@/components/web/pages/layout/feature-card";
import { ImageCarousel } from "@/components/web/pages/layout/image-carousel";
import { ImageGallery } from "@/components/web/pages/layout/image-gallery";
import { Section } from "@/components/web/pages/layout/section";
import { H1, H2, H3, Lead } from "@/components/web/pages/layout/typography";
import { VideoCarousel } from "@/components/web/pages/layout/video-carousel";
import { OrderForm } from "@/components/web/pages/thankuan/order-form";
import { generateThankuanMetadata } from "@/lib/metadata/pages/thankuan";
import { YouTubeEmbed } from "@next/third-parties/google";
import { TriangleAlert } from "lucide-react";
import { getLocale } from "next-intl/server";
import { Suspense } from "react";

export async function generateMetadata(_: PageProps<"/[locale]/thankuan">) {
  const locale = await getLocale();

  return await generateThankuanMetadata(locale);
}

export default async function HomePage(_: PageProps<"/[locale]/thankuan">) {
  return (
    <div className="grid">
      <Hero />
      <ProductFeatures />
      <DoctorsConsultation />
      <CustomerReview />
      <CompanyLicense />
      <Discount />
      <AsyncBoundary>
        <OrderForm />
      </AsyncBoundary>
    </div>
  );
}

export const Hero = () => (
  <Section className="bg-web-background" id="hero" labelledBy="hero">
    <Container className="flex flex-col items-center">
      <H1 className="flex w-full flex-col text-center text-web-foreground">
        <span>
          মাত্র <span className="text-web-accent">৭ দিন নিয়মিত</span> ব্যবহার করুন
          <br />— স্বস্তি অনুভব না করলে
        </span>
        <span>
          <em className="text-web-accent">১০০%</em> টাকা ফেরত গ্যারান্টি!
        </span>
      </H1>

      <div className="w-full">
        <YouTubeEmbed
          params="controls=0"
          style="margin:0 auto; border-radius:16px;"
          videoid="arYfr9fK3jQ"
        />
      </div>

      <div className="grid max-w-180 grid-cols-1 items-center justify-items-center gap-4 rounded-2xl bg-web-destructive p-4 md:grid-cols-[48px_1fr]">
        <div className="flex size-8 items-center justify-center rounded-2xl bg-web-muted md:size-12">
          <TriangleAlert className="size-5 text-web-destructive md:size-8" />
        </div>

        <Lead className="text-center md:text-left">
          ibs বা আমাশয় রোগীদের বাথরুমের সাথে মিউকাস যাই এই মিউকাস যাওয়ার ফলে তার সেক্সুয়াল
          সমস্যা হতে পারে।
        </Lead>
      </div>

      <CTAButton label="👉 এখনই অর্ডার করুন" />
    </Container>
  </Section>
);

export const ProductFeatures = () => (
  <Section className="bg-web-secondary" id="product-features">
    <Container className="grid grid-cols-1 items-center justify-center xl:grid-cols-[1fr_720px]">
      <div className="flex flex-col items-center justify-center gap-4 xl:items-start">
        <H2 className="text-balance text-center text-web-foreground xl:text-start">
          কেন আপনি <span className="text-web-accent">থানকুয়ান</span>
          <br /> পাউডারটি খাবেন?
        </H2>

        <CTAButton className="hidden xl:flex" label="👉 এখনই অর্ডার করুন" />
      </div>

      <div className="mx-auto grid max-w-3xl grid-cols-1 justify-center gap-2 sm:grid-cols-2 md:grid-cols-3">
        {features.map((feature, idx) => (
          <FeatureCard {...feature} key={idx} />
        ))}
      </div>

      <CTAButton className="xl:hidden" label="👉 এখনই অর্ডার করুন" />
    </Container>
  </Section>
);

export const DoctorsConsultation = () => (
  <Section className="bg-web-inverse" id="doctors-consultation">
    <Container className="flex flex-col items-center justify-center">
      <H2 className="text-balance text-center text-web-secondary">
        কাজ না করলে <span className="text-web-accent">টাকা ফেরত</span>,<br /> এই
        শর্তে অর্ডার করুন'' 👇
      </H2>

      <ImageCarousel items={doctors} layout="container" />

      <CTAButton label="👉 এখনই অর্ডার করুন" secondary />
    </Container>
  </Section>
);

export const CustomerReview = () => (
  <Section
    className="space-y-4 bg-web-background sm:py-6 md:space-y-8"
    id="customer-reviews"
  >
    <Container className="flex max-w-full flex-col items-center px-0!">
      <H2 className="text-balance px-4 text-center text-web-foreground">
        <span className="text-web-accent">১ লক্ষের,</span>
        <br /> বেশি মানুষ ব্যবহার করে উপকার পেয়েছেন
      </H2>

      <Suspense>
        <ImageCarousel items={reviews} />
      </Suspense>
    </Container>

    <Container className="flex flex-col items-center px-0!">
      <Suspense>
        <VideoCarousel videos={videos} />
      </Suspense>

      <CTAButton label="👉 এখনই অর্ডার করুন" />
    </Container>
  </Section>
);

export const CompanyLicense = () => (
  <Section className="bg-web-secondary" id="company-license">
    <Container className="grid grid-cols-1 items-center justify-center lg:grid-cols-2">
      <div className="flex flex-col items-center gap-4 lg:items-start">
        <H2 className="text-balance text-center text-web-foreground lg:text-left">
          <span className="text-web-accent">সরকারি লাইসেন্সপ্রাপ্ত</span> পণ্য।
          নিশ্চিন্তে ব্যবহার করুন!
        </H2>

        <CTAButton className="hidden lg:flex" label="👉 এখনই অর্ডার করুন" />
      </div>

      <ImageGallery images={licenses} />

      <CTAButton className="mx-auto lg:hidden" label="👉 এখনই অর্ডার করুন" />
    </Container>
  </Section>
);

export const Discount = () => (
  <Section className="bg-web-inverse" id="product-discount">
    <Container className="flex flex-col items-center">
      <H2 className="text-balance text-center text-[#f3f5e9]">
        থানকুয়ান ২ ফাইল এর পূর্বের মূল্য: <span className="line-through">১৩৮০</span> টাকা{" "}
        <span className="text-[#e87541]">অফার মূল্য- ৯৯০ টাকা </span>
      </H2>

      <H3 className="font-normal text-[#a8c2af]">
        (এখন অর্ডার করলে ফ্রি হোম ডেলিভারি!!)
      </H3>

      <CTAButton label="👉 এখনই অর্ডার করুন" secondary />
    </Container>
  </Section>
);
