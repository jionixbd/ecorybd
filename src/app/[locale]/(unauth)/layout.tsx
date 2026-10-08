import { Footer } from "@/components/web/pages/layout/footer";

export default function HomeLayout({ children }: LayoutProps<"/[locale]">) {
  return (
    <main className="relative grid">
      {children}
      <Footer />
    </main>
  );
}
