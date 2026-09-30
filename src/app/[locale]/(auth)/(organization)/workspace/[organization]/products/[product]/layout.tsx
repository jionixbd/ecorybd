export default async function ProductLayout({
  detail,
  variants,
  modal,
  images,
  children,
}: LayoutProps<"/[locale]/workspace/[organization]/products/[product]">) {
  return (
    <>
      <div className="flex flex-col gap-4">
        {detail}
        {images}
        {variants}
      </div>
      {modal}
      {children}
    </>
  );
}
