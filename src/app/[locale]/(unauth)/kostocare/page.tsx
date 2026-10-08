import { AsyncBoundary } from "@/components/boundaries/async-boundary";
import { features, reviews, symptoms } from "@/components/web/data/kostocare";
import { OrderForm } from "@/components/web/pages/kostocare/order-form";
import { Container } from "@/components/web/pages/layout/container";
import { CTAButton } from "@/components/web/pages/layout/cta-button";
import { FeatureCard } from "@/components/web/pages/layout/feature-card";
import { ImageCarousel } from "@/components/web/pages/layout/image-carousel";
import { Section } from "@/components/web/pages/layout/section";
import { H1, H2, Lead } from "@/components/web/pages/layout/typography";
import { generateKostocareMetadata } from "@/lib/metadata/pages/kostocare";
import { getLocale } from "next-intl/server";
import Image from "next/image";
import { Suspense } from "react";

export async function generateMetadata(_: PageProps<"/[locale]/thankuan">) {
  const locale = await getLocale();

  return await generateKostocareMetadata(locale);
}

export default async function HomePage(_: PageProps<"/[locale]/thankuan">) {
  return (
    <div className="grid">
      <Hero />
      <ProductFeatures />
      <Symptoms />
      <CustomerReview />
      <AsyncBoundary>
        <OrderForm />
      </AsyncBoundary>
    </div>
  );
}

export const Hero = () => (
  <Section className="bg-web-background" id="hero" labelledBy="hero">
    <Container className="flex flex-col items-center">
      <H1 className="flex max-w-4xl flex-col text-center text-web-foreground">
        <span>
          প্রাকৃতিক উপাদানের মাধ্যমেই{" "}
          <span className="text-web-accent">“কোষ্ঠকাঠিন্য ও পাইলস”</span> এর সমস্যা
          থেকে মুক্তি নিন
        </span>
      </H1>

      <Lead className="max-w-4xl text-center text-lg text-web-foreground tracking-tight sm:text-xl md:text-2xl">
        কোষ্ঠকাঠিন্য থেকে <span className="text-web-accent">পাইলস</span>,
        <span className="text-web-accent">ক্লোন ক্যান্সারের</span> মত মারাত্বক ব্যাধিতে
        আক্রান্ত হওয়ার আগেই দ্রুত সমাধান করুন
      </Lead>

      <Image
        alt="kostocare image"
        className="rounded-2xl"
        height={640}
        src="/images/KC-Combo-Web-Image.jpg"
        width={640}
      />

      <CTAButton label="👉 এখনই অর্ডার করুন" />
    </Container>
  </Section>
);

export const ProductFeatures = () => (
  <Section className="bg-web-secondary" id="product-features">
    <Container className="grid grid-cols-1 items-center justify-center xl:grid-cols-[1fr_720px]">
      <div className="flex flex-col items-center justify-center gap-4 xl:items-start">
        <H2 className="text-balance text-center text-web-foreground xl:text-start">
          আপনি <span className="text-web-accent">কোষ্টকেয়ার</span>
          <br />
          ভেষজ পাউডারটি কেন খাবেন?
        </H2>

        <CTAButton className="hidden xl:flex" label="👉 এখনই অর্ডার করুন" />
      </div>

      <div className="mx-auto grid max-w-3xl grid-cols-1 justify-center gap-2 sm:grid-cols-2 md:grid-cols-3">
        {features.map((feature, idx) => (
          <FeatureCard {...feature} className="lg:aspect-auto" key={idx} />
        ))}
      </div>

      <CTAButton className="mx-auto xl:hidden" label="👉 এখনই অর্ডার করুন" />
    </Container>
  </Section>
);

export const Symptoms = () => (
  <Section className="bg-web-background" id="product-features">
    <Container className="flex flex-col items-center justify-center">
      <H2 className="text-balance text-center text-web-foreground">
        <span className="text-web-destructive">কোষ্ঠকাঠিন্য</span>
        <br />
        থেকে কি কি সমস্যা হতে পারে??
      </H2>
      <div className="mx-auto grid max-w-3xl grid-cols-1 justify-center gap-2 sm:grid-cols-2 md:grid-cols-3">
        {symptoms.map((feature, idx) => (
          <FeatureCard
            {...feature}
            className="bg-web-muted lg:aspect-auto"
            key={idx}
          />
        ))}
      </div>

      <CTAButton label="👉 এখনই অর্ডার করুন" />
    </Container>
  </Section>
);

export const CustomerReview = () => (
  <Section className="bg-web-secondary" id="customer-reviews">
    <Container className="flex max-w-full flex-col items-center px-0!">
      <H2 className="text-balance px-4 text-center text-web-foreground">
        আলহামদুলিল্লাহ <span className="text-web-accent">হাজার হাজার</span>
        <br /> মানুষ উপকার পাচ্ছে ইনশাল্লাহ আপনিও পাবেন
      </H2>

      <Suspense>
        <ImageCarousel items={reviews} />
      </Suspense>
      <CTAButton label="👉 এখনই অর্ডার করুন" />
    </Container>
  </Section>
);
