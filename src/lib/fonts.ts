import { Geist, Geist_Mono, Hind_Siliguri } from "next/font/google";

export const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const hindSans = Hind_Siliguri({
  subsets: ["bengali"],
  variable: "--font-hind",
  weight: ["400", "700"],
});
