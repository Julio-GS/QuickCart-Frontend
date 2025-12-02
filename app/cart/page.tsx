"use client";

import { CartItem } from "@/components/cart/cart-item";
import { CartSkeleton } from "@/components/cart/cart-skeleton";
import { EmptyCart } from "@/components/cart/empty-cart";
import { OrderSummary } from "@/components/cart/order-summary";
import { Button } from "@/components/ui/button";
import { useCheckout } from "@/lib/hooks/use-checkout";
import { useCartStore, useSessionStore } from "@/lib/store";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } =
    useCartStore();
  const { user, token } = useSessionStore();
  const [mounted, setMounted] = useState(false);

  const { handleCheckout, processing } = useCheckout({
    userId: user?.id,
    token,
    items,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by showing skeleton until mounted
  if (!mounted) {
    return <CartSkeleton />;
  }

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Carrito de Compras</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <Button variant="outline" onClick={clearCart}>
              Vaciar Carrito
            </Button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <OrderSummary
            subtotal={totalPrice()}
            onCheckout={handleCheckout}
            processing={processing}
          />
        </div>
      </div>
    </div>
  );
}
