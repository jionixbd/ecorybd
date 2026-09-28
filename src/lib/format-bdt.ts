const englishToBanglaMap: Record<string, string> = {
  "0": "০",
  "1": "১",
  "2": "২",
  "3": "৩",
  "4": "৪",
  "5": "৫",
  "6": "৬",
  "7": "৭",
  "8": "৮",
  "9": "৯",
};

export function formatBDT(amount: number | string): string {
  const numericValue =
    typeof amount === "string"
      ? Number.parseFloat(amount.replace(/[^0-9.]/g, ""))
      : amount;

  if (Number.isNaN(numericValue)) {
    return "৳ ০.০০";
  }

  const englishFormatted = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(numericValue);

  const banglaDigits = englishFormatted.replace(
    /\d/g,
    (digit) => englishToBanglaMap[digit] ?? digit
  );

  return `৳ ${banglaDigits}`;
}
