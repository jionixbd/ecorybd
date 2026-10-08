import {
  generateAlternateLanguages,
  generateMetadata,
} from "@/lib/metadata/generators";
import type { Locale } from "next-intl";
// import { getTranslations } from "next-intl/server";

export async function generateKostocareMetadata(locale: Locale) {
  //   const t = await getTranslations("metadata.pages.home");

  return await generateMetadata(
    {
      alternateLanguages: generateAlternateLanguages("/kostocare"),
      description:
        "কোষ্টকেয়ার ভেষজ পাউডার প্রাকৃতিকভাবে কোষ্ঠকাঠিন্য ও পাইলস দূর করে, পেট পরিষ্কার করে, ক্ষতিকারক টক্সিন বের করে, ক্লান্তি ও দুর্বলতা দূর করে। সম্পূর্ণ পার্শ্বপ্রতিক্রিয়া মুক্ত। উপাদান: সোনা পাতা, থানকুনি, জোয়ান, আমলকি, হরিতকি, বহেড়া, বেল চূর্ণ ইত্যাদি।",
      keywords: [
        "কোষ্টকেয়ার",
        "Kostocare",
        "কোষ্ঠকাঠিন্য",
        "পাইলস",
        "ভেষজ",
        "পাউডার",
        "টক্সিন",
        "ক্লান্তি",
        "দুর্বলতা",
        "সোনা পাতা",
        "থানকুনি",
        "জোয়ান",
        "আমলকি",
        "হরিতকি",
        "বহেড়া",
        "বেল",
        "পেট পরিষ্কার",
        "constipation",
        "piles",
        "herbal",
        "প্রাকৃতিক সমাধান",
        "পার্শ্বপ্রতিক্রিয়া মুক্ত",
        "মল ত্যাগ",
        "এনাল ফিসার",
        "কোলন ক্যান্সার",
      ],
      title: "কোষ্টকেয়ার (Kostocare) - কোষ্ঠকাঠিন্য ও পাইলসের প্রাকৃতিক সমাধান",
    },
    locale,
    "/kostocare"
  );
}
