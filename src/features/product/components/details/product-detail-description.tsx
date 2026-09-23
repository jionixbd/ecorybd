interface ProductDetailDescriptionProps {
  description: string;
}

export const ProductDetailDescription = ({
  description,
}: ProductDetailDescriptionProps) => (
  <div className="grid grid-cols-1 items-center gap-1 py-2">
    <span className="text-muted-foreground"> Description</span>
    <article className="">{description}</article>
  </div>
);
