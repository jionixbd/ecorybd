import { AsyncBoundary } from "@/components/boundaries/async-boundary";
import { features, reviews } from "@/components/web/data/methimix";
import { doctors, licenses } from "@/components/web/data/shared";
import { Container } from "@/components/web/pages/layout/container";
import { CTAButton } from "@/components/web/pages/layout/cta-button";
import { FeatureCard } from "@/components/web/pages/layout/feature-card";
import { ImageCarousel } from "@/components/web/pages/layout/image-carousel";
import { ImageGallery } from "@/components/web/pages/layout/image-gallery";
import { Section } from "@/components/web/pages/layout/section";
import { H1, H2, H3 } from "@/components/web/pages/layout/typography";
import { OrderForm } from "@/components/web/pages/methimix/order-form";
import { generateMethimixMetadata } from "@/lib/metadata/pages/methimix";
import { YouTubeEmbed } from "@next/third-parties/google";
import { getLocale } from "next-intl/server";
import { Suspense } from "react";

export async function generateMetadata(_: PageProps<"/[locale]">) {
  const locale = await getLocale();

  return await generateMethimixMetadata(locale);
}

export default async function HomePage(_: PageProps<"/[locale]">) {
  return (
    <div className="grid">
      <Hero />
      <CTA />
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
    <Container className="flex flex-col">
      <H1 className="flex w-full flex-col text-center text-web-foreground">
        <span>
          মাত্র <span className="text-web-accent">৭ দিন নিয়মিত</span> ব্যবহার
          <br /> করুন — স্বস্তি অনুভব না করলে
        </span>
        <span>
          <em className="text-web-accent">১০০%</em> টাকা ফেরত গ্যারান্টি!
        </span>
      </H1>

      <div className="w-full">
        <YouTubeEmbed
          params="controls=0"
          style="margin:0 auto; border-radius:16px;"
          videoid="nb4apIM9nHo"
        />
      </div>
    </Container>
  </Section>
);

export const CTA = () => (
  <Section className="bg-web-secondary" id="cta">
    <Container className="flex flex-col items-center">
      <H2 className="text-balance text-center text-web-secondary-foreground">
        <span className="text-web-accent">আপনি জানেন কি ?</span> বর্তমানে ক্যান্সার এর
        তালিকায় ১৪ তম স্থানে আছে গ্যাস্ট্রিক থেকে হওয়া ক্যান্সার রোগী
      </H2>

      <CTAButton label="👉 এখনই অর্ডার করুন" />
    </Container>
  </Section>
);

export const ProductFeatures = () => (
  <Section className="bg-web-background" id="product-features">
    <Container className="grid grid-cols-1 items-center justify-center xl:grid-cols-[1fr_720px]">
      <div className="flex flex-col items-center justify-center gap-4 xl:items-start">
        <H2 className="text-balance text-center text-web-foreground xl:text-start">
          কেন আপনি <span className="text-web-accent">মেথি মিক্স</span>
          <br /> পাউডারটি কিনবেন?
        </H2>

        <CTAButton className="hidden xl:flex" label="👉 এখনই অর্ডার করুন" />
      </div>

      <div className="mx-auto grid max-w-3xl grid-cols-1 justify-center gap-2 sm:grid-cols-2 md:grid-cols-3">
        {features.map((feature, idx) => (
          <FeatureCard {...feature} className="bg-stone-50" key={idx} />
        ))}
      </div>

      <CTAButton className="mx-auto xl:hidden" label="👉 এখনই অর্ডার করুন" />
    </Container>
  </Section>
);

export const DoctorsConsultation = () => (
  <Section className="bg-web-inverse" id="doctors-consultation">
    <Container className="flex flex-col items-center justify-center">
      <H2 className="text-balance text-center text-web-inverse-foreground">
        কাজ না করলে <span className="text-web-accent">টাকা ফেরত</span>,<br /> এই
        শর্তে অর্ডার করুন'' 👇
      </H2>

      <ImageCarousel items={doctors} layout="container" />

      <CTAButton label="👉 এখনই অর্ডার করুন" secondary />
    </Container>
  </Section>
);

export const CustomerReview = () => (
  <Section className="bg-web-background" id="customer-reviews">
    <Container className="flex max-w-full flex-col items-center px-0!">
      <H2 className="text-balance px-4 text-center text-web-foreground">
        <span className="text-web-accent">৩.৫ লক্ষের,</span>
        <br /> বেশি মানুষ ব্যবহার করে উপকার পেয়েছেন
      </H2>

      <Suspense>
        <ImageCarousel items={reviews} />
      </Suspense>

      <CTAButton label="👉 এখনই অর্ডার করুন" />
    </Container>
  </Section>
);

export const CompanyLicense = () => (
  <Section className="bg-web-secondary" id="company-license">
    <Container className="grid grid-cols-1 items-center justify-center lg:grid-cols-2">
      <div className="flex flex-col items-center gap-4 lg:items-start">
        <H2 className="text-balance text-center text-web-secondary-foreground lg:text-left">
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
      <H2 className="text-balance text-center text-web-inverse-foreground">
        মেথিমিক্স ২ ফাইল এর পূর্বের মূল্য: <span className="line-through">১৩৮০</span>{" "}
        টাকা অফার মূল্য- <span className="text-web-accent"> ৯৯০ টাকা </span>
      </H2>

      <H3 className="font-normal text-[#a8c2af]">
        (এখন অর্ডার করলে ফ্রি হোম ডেলিভারি!!)
      </H3>

      <CTAButton label="👉 এখনই অর্ডার করুন" secondary />
    </Container>
  </Section>
);
