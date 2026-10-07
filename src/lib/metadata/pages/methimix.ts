import {
  generateAlternateLanguages,
  generateMetadata,
} from "@/lib/metadata/generators";
import type { Locale } from "next-intl";
// import { getTranslations } from "next-intl/server";

export async function generateMethimixMetadata(locale: Locale) {
  //   const t = await getTranslations("metadata.pages.home");

  return await generateMetadata(
    {
      alternateLanguages: generateAlternateLanguages("/methimix"),
      description:
        "মেথিমিক্স পাউডার গ্যাস্ট্রিক, টক ঢেকুর, বুকে জ্বালাপোড়া, বদহজম, কোষ্ঠকাঠিন্য ও দুর্বলতা দূর করে। ৭ দিনে স্বস্তি না পেলে ১০০% টাকা ফেরত। ল্যাব-পরীক্ষিত, BSTI, ISO, GMP সার্টিফাইড।",
      keywords: [
        "মেথিমিক্স",
        "Methimix",
        "গ্যাস্ট্রিক",
        "টক ঢেকুর",
        "বদহজম",
        "কোষ্ঠকাঠিন্য",
        "পেট ব্যথা",
        "বুকে জ্বালাপোড়া",
        "আমলকি",
        "হরিতকি",
        "বহেড়া",
        "মেথি",
        "জোয়ান",
        "ধনিয়া",
        "মৌরি",
        "প্রাকৃতিক",
        "ভেষজ",
        "পাউডার",
        "হজম",
        "ক্ষুধা",
        "গ্যাস্ট্রিক সমস্যা",
        "পেটের গ্যাস",
        "বমি ভাব",
        "ক্ষুধামন্দা",
        "দুর্বলতা",
      ],
      title: "মেথিমিক্স (Methimix) - গ্যাস্ট্রিক, বদহজম ও পেটের সমস্যার প্রাকৃতিক সমাধান",
    },
    locale,
    "/methimix"
  );
}
