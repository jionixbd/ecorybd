import type { FeaturesCardProps } from "@/components/web/pages/layout/feature-card";
import type { ImageCarouselItem } from "@/components/web/pages/layout/image-carousel";
import type { VideoCarouselSlide } from "@/components/web/pages/layout/video-carousel-slide";
import {
  Award,
  FlaskConical,
  HandCoins,
  HeartPulse,
  ShieldCheck,
} from "lucide-react";

export const features: FeaturesCardProps[] = [
  {
    description:
      "উদ্বেগ ও বিষন্নতা সহ IBS এর সকল সমস্যায় হবে, পেট ফুলে যাওয়া, পেট বা বুকে ব্যাথা, ক্লান্তি দূর হবে, মিউকাস সমস্যা, ওজন কমে যাওয়া সাথে শারীরিক ও মানসিক দূর্বলতা দূর হবে।",
    icon: HeartPulse,
    iconBg: "#dfeee0",
    iconColor: "#45845a",
    title: "স্বাস্থ্য উপকারিতা",
  },
  {
    description:
      "নিজস্ব ফ্যাক্টরিতে অভিজ্ঞ হাকিম দ্বারা তৈরি এবং ল্যাবটেস্টকৃত। BSTI অনুমোদিত ল্যাব টেস্ট ও PCR, ISO, GMP সার্টিফাইড।",
    icon: FlaskConical,
    iconBg: "#fae5d9",
    iconColor: "#d97347",
    title: "ল্যাব-পরীক্ষিত",
  },
  {
    description:
      "দীর্ঘ পাঁচ বছর (৫) ধরে সেবা দিয়ে আসছি। লক্ষ লক্ষ মানুষ উপকার পেয়েছেন — তাদের রিভিউ আমাদের পেজে দেখতে পারবেন।",
    icon: Award,
    iconBg: "#dbe7f5",
    iconColor: "#3b6fa8",
    title: "দীর্ঘ অভিজ্ঞতা",
  },
  {
    description: "এটি সেবনে কোনো রকম পার্শ্বপ্রতিক্রিয়া নেই — ল্যাবটেস্ট এবং সার্টিফাইড।",
    icon: ShieldCheck,
    iconBg: "#eae2f5",
    iconColor: "#7a5aa8",
    title: "নিরাপদ",
  },
  {
    description:
      "মাত্র ৭ দিন নিয়মিত ব্যবহার করুন — স্বস্তি অনুভব না করলে ১০০% টাকা ফেরত গ্যারান্টি।",
    icon: HandCoins,
    iconBg: "#f7ecc9",
    iconColor: "#b8860b",
    title: "টাকা ফেরত",
  },
];

export const reviews: ImageCarouselItem[] = [
  {
    height: 500,
    url: "/images/review-tk-shahin.jpg",
    width: 500,
  },
  {
    height: 500,
    url: "/images/review-tk-shofikul-islam.jpg",
    width: 500,
  },
  {
    height: 500,
    url: "/images/review-tk-azaj.jpg",
    width: 500,
  },
  {
    height: 500,
    url: "/images/review-tk-hafizur-rahman.jpg",
    width: 500,
  },
];

export const videos: VideoCarouselSlide[] = [
  {
    alt: "Video 1",
    height: 720,
    poster: "/images/nbpwtPly0eE-HD.jpg",
    width: 1280,
    youtubeId: "nbpwtPly0eE",
  },
  {
    alt: "Video 2",
    height: 720,
    poster: "/images/04k2V5EFLII-HD.jpg",
    width: 1280,
    youtubeId: "04k2V5EFLII",
  },
  {
    alt: "Video 2",
    height: 720,
    poster: "/images/arYfr9fK3jQ-HD.jpg",
    width: 1280,
    youtubeId: "arYfr9fK3jQ",
  },
];
