"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import type { Product } from "@/lib/api";
import { useCartStore } from "@/lib/store";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const addItem = useCartStore((state) => state.addItem);
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (product.stock === 0 || !product.isAvailable) return;

    addItem(product);
    toast({
      title: "Agregado al carrito",
      description: `${product.name} ha sido agregado a tu carrito.`,
    });
  };

  const price = parseFloat(product.price);
  const isOutOfStock = product.stock === 0 || !product.isAvailable;

  return (
    <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={
              product.imageUrl ||
              `/placeholder.svg?height=400&width=400&query=${encodeURIComponent(
                product.name
              )}`
            }
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          {product.isFeatured && (
            <Badge className="absolute left-2 top-2">Destacado</Badge>
          )}
          {isLowStock && (
            <Badge variant="destructive" className="absolute right-2 top-2">
              Stock Bajo
            </Badge>
          )}
          {isOutOfStock && (
            <Badge variant="destructive" className="absolute right-2 bottom-2">
              Agotado
            </Badge>
          )}
        </div>
      </Link>

      <CardContent className="p-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="line-clamp-2 font-semibold text-balance hover:underline">
            {product.name}
          </h3>
        </Link>
        <p className="mt-2 text-lg font-bold">${price.toFixed(2)}</p>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full transition-all hover:scale-105 hover:shadow-md active:scale-95"
          size="sm"
          disabled={isOutOfStock}
          onClick={handleAddToCart}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {isOutOfStock ? "Agotado" : "Agregar al Carrito"}
        </Button>
      </CardFooter>
    </Card>
  );
}
