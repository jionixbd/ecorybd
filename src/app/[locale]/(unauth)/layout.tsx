export default function HomeLayout({ children }: LayoutProps<"/[locale]">) {
  return (
    <main className="relative flex w-full flex-col bg-background text-foreground">
      {children}
    </main>
  );
}
