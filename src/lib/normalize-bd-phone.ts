export const normalizeBanglaPhone = (phone: string) => {
  const banglaToEnglishMap: Record<string, string> = {
    "০": "0",
    "১": "1",
    "২": "2",
    "৩": "3",
    "৪": "4",
    "৫": "5",
    "৬": "6",
    "৭": "7",
    "৮": "8",
    "৯": "9",
  };

  return phone.replace(/[০-৯]/g, (match) => banglaToEnglishMap[match]);
};
