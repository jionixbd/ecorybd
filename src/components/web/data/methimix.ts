import type { FeaturesCardProps } from "@/components/web/pages/layout/feature-card";
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
      "মেথি মিক্স সেবনে পেটের গ্যাস, পেটে-বুকে-পিঠে ব্যথা, টক ঢেকুর, বমি ভাব, ক্ষুধামন্দা, বদহজম ও দুর্বলতা দূর হবে।",
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

export const reviews = [
  {
    height: 540,
    url: "/images/rocky-khan-opt.webp",
    width: 540,
  },
  {
    height: 540,
    url: "/images/abdullah-rana-opt.webp",
    width: 540,
  },
  {
    height: 540,
    url: "/images/banty-review-opt.webp",
    width: 540,
  },
  {
    height: 540,
    url: "/images/basahr-review-opt.webp",
    width: 540,
  },
  {
    height: 540,
    url: "/images/farauk-review-opt.webp",
    width: 540,
  },
  {
    height: 540,
    url: "/images/afjal-review-opt.webp",
    width: 540,
  },
];
