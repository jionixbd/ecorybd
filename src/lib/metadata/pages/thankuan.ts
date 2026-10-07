import {
  generateAlternateLanguages,
  generateMetadata,
} from "@/lib/metadata/generators";
import type { Locale } from "next-intl";
// import { getTranslations } from "next-intl/server";

export async function generateThankuanMetadata(locale: Locale) {
  //   const t = await getTranslations("metadata.pages.home");

  return await generateMetadata(
    {
      alternateLanguages: generateAlternateLanguages("/thankuan"),
      description:
        "থানকুয়ান পাউডার আইবিএস, পুরাতন আমাশয়, মিউকাস সমস্যা, হজম-শক্তি বৃদ্ধি, পেট ফুলে যাওয়া, ব্যাথা, ক্লান্তি দূর করে। ৭ দিনে স্বস্তি না পেলে ১০০% টাকা ফেরত। ল্যাব-পরীক্ষিত, BSTI, ISO, GMP সার্টিফাইড।",
      keywords: [
        "থানকুয়ান",
        "Thankuan",
        "IBS",
        "আমাশয়",
        "মিউকাস",
        "হজম",
        "ভেষজ",
        "পাউডার",
        "থানকুনি",
        "দুবলা ঘাস",
        "বেল",
        "জোয়ান",
        "আদা",
        "দারুচিনি",
        "পেট ফুলে যাওয়া",
        "পেট ব্যাথা",
        "ক্লান্তি",
        "ওজন কমে যাওয়া",
        "রক্ত আমাশয়",
        "জ্বালা-পোড়া",
        "পাকস্থলী",
        "ক্ষুধা বৃদ্ধি",
      ],
      title: "থানকুয়ান - আইবিএস ও আমাশয়ের প্রাকৃতিক সমাধান",
    },
    locale,
    "/thankuan"
  );
}
