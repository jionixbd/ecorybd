interface ProductDetailDescriptionProps {
  description: string;
}

export const ProductDetailDescription = ({
  description,
}: ProductDetailDescriptionProps) => (
  <div className="grid grid-cols-1 items-center gap-1 py-2">
    <span className="text-muted-foreground"> Description</span>
    <div
      className="typeset whitespace-pre-wrap font-hind font-normal!"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: OK
      dangerouslySetInnerHTML={{ __html: description }}
    />
  </div>
);
