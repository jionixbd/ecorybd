import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductCreateForm } from "@/features/product/components/products/create-edit/product-create-form";

export default async function ProductNewPage(
  _: PageProps<"/[locale]/workspace/[organization]/products/create">
) {
  return (
    <div className="flex w-full items-center justify-center">
      <Card className="w-full max-w-4xl self-center border-0">
        <CardHeader>
          <CardTitle>General</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductCreateForm />
        </CardContent>
      </Card>
    </div>
  );
}
