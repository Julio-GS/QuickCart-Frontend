"use client";

import { Button } from "@/components/ui/button";
import { CartItem as CartItemType } from "@/lib/store";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <div className="flex gap-4 rounded-lg border border-border p-4">
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md bg-muted">
        <Image
          src={
            item.imageUrl ||
            `/placeholder.svg?height=100&width=100&query=${encodeURIComponent(
              item.name
            )}`
          }
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex justify-between gap-2">
          <div>
            <h3 className="font-semibold">
              <Link href={`/products/${item.slug}`} className="hover:underline">
                {item.name}
              </Link>
            </h3>
            <p className="text-sm text-muted-foreground capitalize">
              {item.category}
            </p>
          </div>
          <p className="font-bold">
            ${(Number(item.price) * item.quantity).toFixed(2)}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center rounded-md border border-input">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none"
              onClick={() =>
                onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
              }
              disabled={item.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <div className="flex h-8 w-10 items-center justify-center border-x border-input text-sm">
              {item.quantity}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none"
              onClick={() =>
                onUpdateQuantity(
                  item.id,
                  Math.min(item.stock, item.quantity + 1)
                )
              }
              disabled={item.quantity >= item.stock}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={() => onRemove(item.id)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Eliminar
          </Button>
        </div>
      </div>
    </div>
  );
}
