import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export function EmptyCart() {
  return (
    <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
        <ShoppingBag className="h-12 w-12 text-muted-foreground" />
      </div>
      <h1 className="mb-2 text-2xl font-bold">Tu carrito está vacío</h1>
      <p className="mb-8 text-muted-foreground">
        Parece que aún no has agregado nada a tu carrito.
      </p>
      <Button asChild size="lg">
        <Link href="/shop">Comenzar a Comprar</Link>
      </Button>
    </div>
  );
}
