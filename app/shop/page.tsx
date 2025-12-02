import { ProductCard } from "@/components/product-card";
import ShopFilters from "@/components/shop/filters";
import { MobileFilters } from "@/components/shop/mobile-filters";
import { Button } from "@/components/ui/button";
import { getProducts } from "@/lib/api";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface ShopPageProps {
  searchParams: {
    search?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    inStock?: string;
    sortBy?: string;
    sortOrder?: string;
    page?: string;
  };
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const limit = 12;

  // Transformar slug de categoría a nombre con espacios para la API
  const categoryName = params.category
    ? params.category.replace(/-/g, " ")
    : undefined;

  const productsData = await getProducts({
    search: params.search,
    category: categoryName,
    minPrice: params.minPrice ? Number(params.minPrice) : undefined,
    maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
    inStock: params.inStock === "true",
    sortBy: params.sortBy,
    sortOrder: params.sortOrder,
    page,
    limit,
  });

  // Handle different API response structures
  const products = Array.isArray(productsData)
    ? productsData
    : productsData.data || [];
  const meta =
    (productsData as any).meta || (productsData as any).pagination || {};
  const totalPages = meta.totalPages || meta.pages || 1;
  const currentPage = meta.page || page;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Shop</h1>

      <div className="grid gap-8 lg:grid-cols-[250px_1fr]">
        <aside className="hidden lg:block">
          <ShopFilters />
        </aside>

        <main>
          {/* Mobile Filters */}
          <MobileFilters />

          {products.length === 0 ? (
            <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-dashed">
              <p className="text-lg text-muted-foreground">No products found</p>
              <Button variant="link" asChild className="mt-2">
                <Link href="/shop">Clear filters</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product: any) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-8 flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  disabled={currentPage <= 1}
                  asChild={currentPage > 1}
                >
                  {currentPage > 1 ? (
                    <Link
                      href={{ query: { ...params, page: currentPage - 1 } }}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Link>
                  ) : (
                    <span>
                      <ChevronLeft className="h-4 w-4" />
                    </span>
                  )}
                </Button>

                <span className="text-sm font-medium">
                  Page {currentPage} of {totalPages}
                </span>

                <Button
                  variant="outline"
                  size="icon"
                  disabled={currentPage >= totalPages}
                  asChild={currentPage < totalPages}
                >
                  {currentPage < totalPages ? (
                    <Link
                      href={{ query: { ...params, page: currentPage + 1 } }}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  ) : (
                    <span>
                      <ChevronRight className="h-4 w-4" />
                    </span>
                  )}
                </Button>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
