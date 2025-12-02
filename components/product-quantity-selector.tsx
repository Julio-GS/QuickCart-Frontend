"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import type { Product } from "@/lib/api";
import { useCartStore } from "@/lib/store";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useState } from "react";

interface ProductQuantitySelectorProps {
  product: Product;
}

export function ProductQuantitySelector({
  product,
}: ProductQuantitySelectorProps) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);
  const { toast } = useToast();

  const isOutOfStock = product.stock === 0 || !product.isAvailable;
  const maxQuantity = product.stock;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= maxQuantity) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (isOutOfStock) return;

    addItem(product, quantity);
    toast({
      title: "Agregado al carrito",
      description: `${quantity} ${
        quantity === 1 ? "artículo" : "artículos"
      } de ${product.name} agregado(s) a tu carrito.`,
    });
  };

  if (isOutOfStock) {
    return (
      <Button className="w-full" disabled>
        <ShoppingCart className="mr-2 h-4 w-4" />
        Agotado
      </Button>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">Cantidad:</span>
        <div className="flex items-center border rounded-lg">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
            className="h-8 w-8 p-0"
          >
            <Minus className="h-4 w-4" />
          </Button>

          <span className="px-3 py-1 text-sm font-medium min-w-8 text-center">
            {quantity}
          </span>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={quantity >= maxQuantity}
            className="h-8 w-8 p-0"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <span className="text-xs text-muted-foreground">
          {maxQuantity} disponibles
        </span>
      </div>

      <Button
        className="w-full transition-all hover:scale-105 hover:shadow-md active:scale-95"
        onClick={handleAddToCart}
        disabled={isOutOfStock}
      >
        <ShoppingCart className="mr-2 h-4 w-4" />
        Agregar al Carrito - $
        {(parseFloat(product.price) * quantity).toFixed(2)}
      </Button>
    </div>
  );
}
