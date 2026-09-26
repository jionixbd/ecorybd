import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProductMediaCard } from "@/features/product/components/product-media/product-media-card";
import type { ProductMediaWithRelations } from "@/features/product/types/product-media";
import { Plus } from "lucide-react";
import Link from "next/link";

interface ProductMediaGridProps {
  media: ProductMediaWithRelations[];
  organization: string;
  productSlug: string;
}

export const ProductMediaGrid = ({
  media,
  organization,
  productSlug,
}: ProductMediaGridProps) => (
  <Card className="w-full">
    <CardHeader>
      <CardTitle>Product Media</CardTitle>

      <CardAction>
        <Button asChild size={"icon"}>
          <Link
            href={`/workspace/${organization}/products/${productSlug}/media`}
          >
            <Plus />
          </Link>
        </Button>
      </CardAction>
    </CardHeader>

    <CardContent>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
        {media.map((m) => (
          <ProductMediaCard key={m.mediaId} media={m} />
        ))}
      </div>
    </CardContent>
  </Card>
);
