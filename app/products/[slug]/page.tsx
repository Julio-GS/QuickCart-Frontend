import { ProductQuantitySelector } from "@/components/product-quantity-selector";
import { Badge } from "@/components/ui/badge";
import { getProductBySlug } from "@/lib/api";
import { AlertTriangle, Check } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  try {
    // Next.js 15+ requires awaiting params
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
      notFound();
    }

    const isLowStock = product.stock > 0 && product.stock <= 5;
    const outOfStock = product.stock === 0;
    const price = parseFloat(product.price);

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-2 lg:gap-16">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
            <Image
              src={
                product.imageUrl ||
                `/placeholder.svg?height=600&width=600&query=${encodeURIComponent(
                  product.name
                )}`
              }
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            {product.isFeatured && (
              <Badge className="absolute left-4 top-4 text-base">
                Destacado
              </Badge>
            )}
          </div>

          <div className="flex flex-col justify-center space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                {product.name}
              </h1>
              <div className="mt-4 flex items-center gap-4">
                <span className="text-3xl font-bold">${price.toFixed(2)}</span>
                {outOfStock ? (
                  <Badge variant="destructive">Agotado</Badge>
                ) : isLowStock ? (
                  <Badge
                    variant="destructive"
                    className="flex items-center gap-1"
                  >
                    <AlertTriangle className="h-3 w-3" />
                    Stock Bajo: {product.stock} disponibles
                  </Badge>
                ) : (
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1 text-green-600"
                  >
                    <Check className="h-3 w-3" />
                    Disponible
                  </Badge>
                )}
              </div>
            </div>

            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <p className="text-lg text-muted-foreground">
                {product.description}
              </p>
            </div>

            <div className="space-y-4 border-t border-border pt-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Categoría</span>
                <span className="text-sm text-muted-foreground capitalize">
                  {product.category}
                </span>
              </div>

              <ProductQuantitySelector product={product} />
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
