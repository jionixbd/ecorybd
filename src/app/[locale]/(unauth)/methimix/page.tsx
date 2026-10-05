import { AsyncBoundary } from "@/components/boundaries/async-boundary";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { CompanyLicenseGallery } from "@/components/web/pages/landing/parts/company-license-gallery";
import { ProductFeatures } from "@/components/web/pages/landing/parts/product-feaures";
import { OrderForm } from "@/components/web/pages/landing/sections/order-form";
import { Container } from "@/components/web/pages/layout/container";
import { Section } from "@/components/web/pages/layout/section";
import { H1, H2, H4 } from "@/components/web/pages/layout/typography";
import { generateHomeMetadata } from "@/lib/metadata/pages/home";
import { YouTubeEmbed } from "@next/third-parties/google";

import { ReviewCarousel } from "@/components/web/pages/landing/parts/review-carousel";
import { getLocale } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export async function generateMetadata(_: PageProps<"/[locale]">) {
  const locale = await getLocale();

  return await generateHomeMetadata(locale);
}

export default async function HomePage(_: PageProps<"/[locale]">) {
  return (
    <div className="grid">
      <HeroSection />
      <CTASection />
      <ProductFeaturesSection />
      <DoctorsConsultationSection />
      <CustomerReviewSection />
      <CompanyLicense />
      <DiscountSection />
      <AsyncBoundary>
        <OrderForm />
      </AsyncBoundary>
    </div>
  );
}

export const HeroSection = () => (
  <Section className="bg-[#f8f7f1]" id="hero" labelledBy="hero">
    <Container className="flex flex-col">
      <H1 className="flex w-full flex-col text-center text-[#173c2d]">
        <span>
          মাত্র <span className="text-[#e87541]">৭ দিন নিয়মিত</span> ব্যবহার করুন
          <br />— স্বস্তি অনুভব না করলে
        </span>
        <span>
          <em className="text-[#e87541]">১০০%</em> টাকা ফেরত গ্যারান্টি!
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

export const CTASection = () => (
  <Section className="bg-[#edf1e8]" id="cta">
    <Container className="flex flex-col items-center">
      <H2 className="text-balance text-center text-[#173c2d]">
        <span className="text-[#e87541]">আপনি জানেন কি ?</span> বর্তমানে ক্যান্সার এর
        তালিকায় ১৪ তম স্থানে আছে গ্যাস্ট্রিক থেকে হওয়া ক্যান্সার রোগী
      </H2>

      <Button
        asChild
        className="max-w-max bg-[#173c2d] px-6 py-6 font-hind text-[#f8f7f1] text-base hover:bg-[#e87541] sm:px-6 lg:px-10 lg:text-lg"
      >
        <Link href="#order-form">👉 এখনই অর্ডার করুন</Link>
      </Button>
    </Container>
  </Section>
);

export const ProductFeaturesSection = () => (
  <Section className="bg-[#f8f7f1]" id="product-features">
    <Container className="grid grid-cols-1 items-center justify-center xl:grid-cols-[1fr_720px]">
      <div className="flex flex-col items-center justify-center gap-4 xl:items-start">
        <H2 className="text-balance text-center text-[#173c2d] xl:text-start">
          কেন আপনি <span className="text-[#e87541]">মেথি মিক্স</span>
          <br /> পাউডারটি কিনবেন?
        </H2>
        <Button
          asChild
          className="max-w-max bg-[#173c2d] px-6 py-6 font-hind text-[#f8f7f1] text-base hover:bg-[#e87541] sm:px-6 lg:px-10 lg:text-lg"
        >
          <Link href="#order-form">👉 এখনই অর্ডার করুন</Link>
        </Button>
      </div>

      <ProductFeatures />

      <Button
        asChild
        className="mx-auto max-w-max bg-[#173c2d] px-6 py-6 font-hind text-[#f8f7f1] text-base hover:bg-[#e87541] sm:px-6 lg:px-10 lg:text-lg xl:hidden"
      >
        <Link href="#order-form">👉 এখনই অর্ডার করুন</Link>
      </Button>
    </Container>
  </Section>
);

const doctors = [
  {
    height: 500,
    url: "/images/hero-1-opt.webp",
    width: 500,
  },
  {
    height: 500,
    url: "/images/hero-2-opt.webp",
    width: 500,
  },
  {
    height: 500,
    url: "/images/hero-3-opt.webp",
    width: 500,
  },
];

export const DoctorsConsultationSection = () => (
  <Section className="bg-[#183d2d]" id="doctors-consultation">
    <Container className="flex flex-col items-center justify-center">
      <H2 className="text-balance text-center text-[#f3f5e9]">
        কাজ না করলে <span className="text-[#e87541]">টাকা ফেরত</span>,<br /> এই শর্তে
        অর্ডার করুন'' 👇
      </H2>

      <Carousel
        opts={{
          align: "start",
        }}
      >
        <CarouselContent>
          {doctors.map((doctor, idx) => (
            <CarouselItem
              className="flex basis-3/3 overflow-hidden pl-4 sm:basis-2/3 md:basis-1/3"
              key={idx}
            >
              <Image
                alt="image"
                className="rounded-2xl"
                height={doctor.height}
                src={doctor.url}
                width={doctor.width}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <Button
        asChild
        className="max-w-max bg-[#e87541] px-6 py-6 font-hind text-[#f8f7f1] text-base hover:bg-[#f0b273] sm:px-6 lg:px-10 lg:text-lg"
      >
        <Link href="#order-form">👉 এখনই অর্ডার করুন</Link>
      </Button>
    </Container>
  </Section>
);

export const CustomerReviewSection = () => (
  <Section className="bg-[#edf1e8]" id="customer-reviews">
    <Container className="flex max-w-full flex-col items-center px-0!">
      <H2 className="text-balance px-4 text-center text-[#244737]">
        <span className="text-[#e87541]">৩.৫ লক্ষের,</span>
        <br /> বেশি মানুষ ব্যবহার করে উপকার পেয়েছেন
      </H2>

      <Suspense>
        <ReviewCarousel />
      </Suspense>

      <Button
        asChild
        className="mx-auto max-w-max bg-[#173c2d] px-6 py-6 font-hind text-[#f8f7f1] text-base hover:bg-[#e87541] sm:px-6 lg:px-10 lg:text-lg"
      >
        <Link href="#order-form">👉 এখনই অর্ডার করুন</Link>
      </Button>
    </Container>
  </Section>
);

export const CompanyLicense = () => (
  <Section className="bg-[#f8f7f1]" id="company-license">
    <Container className="grid grid-cols-1 items-center justify-center lg:grid-cols-2">
      <div className="flex flex-col items-center gap-4 lg:items-start">
        <H2 className="text-balance text-center text-[#244737] lg:text-left">
          <span className="text-[#e87541]">সরকারি লাইসেন্সপ্রাপ্ত</span> পণ্য। নিশ্চিন্তে
          ব্যবহার করুন!
        </H2>

        <Button
          asChild
          className="hidden max-w-max bg-[#173c2d] px-6 py-6 font-hind text-[#f8f7f1] text-base hover:bg-[#e87541] sm:px-6 lg:flex lg:px-10 lg:text-lg"
        >
          <Link href="#order-form">👉 এখনই অর্ডার করুন</Link>
        </Button>
      </div>

      <CompanyLicenseGallery />

      <Button
        asChild
        className="mx-auto max-w-max bg-[#173c2d] px-6 py-6 font-hind text-[#f8f7f1] text-base hover:bg-[#e87541] sm:px-6 lg:hidden lg:px-10 lg:text-lg"
      >
        <Link href="#order-form">👉 এখনই অর্ডার করুন</Link>
      </Button>
    </Container>
  </Section>
);

export const DiscountSection = () => (
  <Section className="bg-[#183d2d]" id="product-discount">
    <Container className="flex flex-col items-center">
      <H2 className="text-balance text-center text-[#f3f5e9]">
        মেথিমিক্স ২ ফাইল এর পূর্বের মূল্য: <span className="line-through">১৩৮০</span>{" "}
        টাকা অফার মূল্য- <span className="text-[#e87541]"> ৯৯০ টাকা </span>
      </H2>

      <H4 className="font-normal text-[#a8c2af]">
        (এখন অর্ডার করলে ফ্রি হোম ডেলিভারি!!)
      </H4>

      <Button
        asChild
        className="max-w-max bg-[#e87541] px-6 py-6 font-hind text-[#f8f7f1] text-base hover:bg-[#f0b273] sm:px-6 lg:px-10 lg:text-lg"
      >
        <Link href="#order-form">👉 এখনই অর্ডার করুন</Link>
      </Button>
    </Container>
  </Section>
);
