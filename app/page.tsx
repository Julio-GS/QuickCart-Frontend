import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { getFeaturedProducts } from "@/lib/api";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function HomePage() {
  let featuredProducts = [];

  try {
    const data = await getFeaturedProducts();
    featuredProducts = Array.isArray(data) ? data : data.data || [];
  } catch (error) {
    featuredProducts = [];
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-16 rounded-lg bg-linear-to-r from-muted to-muted/50 px-8 py-16 text-center md:px-16 md:py-24">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-balance md:text-6xl">
          Bienvenido a QuickCart
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground text-pretty">
          Descubre productos de calidad a precios inmejorables. Compra
          electrónicos, artículos para el hogar, moda y más.
        </p>
        <Button size="lg" asChild>
          <Link href="/shop">
            Comprar Ahora
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </section>

      {/* Featured Products */}
      <section>
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">
            Productos Destacados
          </h2>
          <Button variant="ghost" asChild>
            <Link href="/shop">
              Ver Todo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mt-16">
        <h2 className="mb-8 text-3xl font-bold tracking-tight">
          Comprar por Categoría
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              name: "Electrónicos",
              slug: "electronicos",
              image: "electronics",
            },
            {
              name: "Hogar y Jardín",
              slug: "hogar-y-jardin",
              image: "home and garden",
            },
            { name: "Ropa", slug: "ropa", image: "clothing" },
            { name: "Libros", slug: "libros", image: "books" },
          ].map((category) => (
            <Link
              key={category.slug}
              href={`/shop?category=${category.slug}`}
              className="group relative aspect-square overflow-hidden rounded-lg bg-muted transition-transform hover:scale-105"
            >
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
