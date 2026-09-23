export default function ProductLayout({
  detail,
  variants,
}: LayoutProps<"/[locale]/workspace/[organization]/products/[product]">) {
  return (
    <div className="flex flex-col">
      {detail}
      {variants}
    </div>
  );
}
