import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/features/data-table/lib/format-date";
import { ProductDetailCreator } from "@/features/product/components/details/product-detail-creator";
import { ProductDetailDescription } from "@/features/product/components/details/product-detail-description";
import { ProductDetailEntity } from "@/features/product/components/details/product-detail-entity";
import { ProductDetailStatus } from "@/features/product/components/details/product-detail-status";
import { ProductSettings } from "@/features/product/components/details/product-settings";
import { toProduct } from "@/features/product/dto/product";
import type { ProductWithRelations } from "@/features/product/types/product";
import { formatBDT } from "@/lib/format-bdt";

interface DetailCardProps {
  product: ProductWithRelations;
}

export const ProductDetailCard = ({ product }: DetailCardProps) => (
  <Card className="w-full">
    <CardHeader className="gap-0">
      <CardTitle>{product.name}</CardTitle>
      <CardDescription>{product.slug}</CardDescription>

      <CardAction className="flex items-center gap-2">
        <ProductDetailStatus status={product.status} />
        <ProductSettings product={toProduct({ product })} />
      </CardAction>
    </CardHeader>

    <CardContent className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <ProductDetailEntity label={"SKU"} value={product.sku} />
        <ProductDetailEntity
          bool
          label={"Featured"}
          value={product.isFeatured}
        />
        <ProductDetailEntity label={"Badge"} start value={product.badge} />
        <ProductDetailEntity
          hind
          label={"Short Description"}
          start
          value={product.tempShortDescription}
        />
        <ProductDetailEntity
          hind
          label={"Price"}
          value={formatBDT(product.price)}
        />
        <ProductDetailEntity
          label={"Sale Price"}
          mono
          value={product.salePrice}
        />
        <ProductDetailEntity
          label={"Stock"}
          mono
          value={product.stockQuantity}
        />
      </div>

      <Separator />

      <ProductDetailDescription description={product.tempDescription} />

      <Separator />

      <div className="flex flex-col gap-2">
        <ProductDetailEntity
          label={"Created By"}
          value={<ProductDetailCreator user={product.createdBy} />}
        />
        <ProductDetailEntity
          label={"Created At"}
          mono
          value={formatDate(product.createdAt)}
        />
        <ProductDetailEntity
          label={"Edited"}
          mono
          value={formatDate(product.updatedAt)}
        />
      </div>
    </CardContent>
  </Card>
);
