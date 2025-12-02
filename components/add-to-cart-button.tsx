"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import type { Product } from "@/lib/api";
import { useCartStore } from "@/lib/store";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useState } from "react";

interface AddToCartButtonProps {
  product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);
  const { toast } = useToast();

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    if (quantity < product.stock) setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast({
      title: "Agregado al carrito",
      description: `${quantity} x ${product.name} agregado a tu carrito.`,
    });
  };

  if (product.stock === 0) {
    return (
      <Button className="w-full" size="lg" disabled>
        Agotado
      </Button>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">Cantidad</span>
        <div className="flex items-center rounded-md border border-input">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-none"
            onClick={decreaseQuantity}
            disabled={quantity <= 1}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <div className="flex h-8 w-12 items-center justify-center border-x border-input text-sm">
            {quantity}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-none"
            onClick={increaseQuantity}
            disabled={quantity >= product.stock}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        <span className="text-xs text-muted-foreground">
          {product.stock} disponibles
        </span>
      </div>

      <Button
        className="w-full transition-all hover:scale-105 hover:shadow-md active:scale-95"
        size="lg"
        onClick={handleAddToCart}
      >
        <ShoppingCart className="mr-2 h-5 w-5" />
        Agregar al Carrito
      </Button>
    </div>
  );
}
