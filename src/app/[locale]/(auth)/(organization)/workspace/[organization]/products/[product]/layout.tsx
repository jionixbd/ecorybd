export default function ProductLayout({
  detail,
  variants,
}: LayoutProps<"/[locale]/workspace/[organization]/products/[product]">) {
  return (
    <div className="flex flex-col gap-4">
      {detail}
      {variants}
    </div>
  );
}
