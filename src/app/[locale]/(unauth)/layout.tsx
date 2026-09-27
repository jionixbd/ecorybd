export default function HomeLayout({ children }: LayoutProps<"/[locale]">) {
  return <main className="relative grid">{children}</main>;
}
