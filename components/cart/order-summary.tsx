import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface OrderSummaryProps {
  subtotal: number;
  onCheckout: () => void;
  processing: boolean;
}

export function OrderSummary({
  subtotal,
  onCheckout,
  processing,
}: OrderSummaryProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">Resumen del Pedido</h2>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Envío</span>
          <span>Calculado al finalizar</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Impuestos</span>
          <span>Calculado al finalizar</span>
        </div>

        <Separator className="my-4" />

        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
      </div>

      <Button
        size="lg"
        className="w-full mt-8"
        onClick={onCheckout}
        disabled={processing}
      >
        {processing ? "Procesando..." : "Proceder al Pago"}
      </Button>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        Pago seguro con QuickCart
      </p>
    </div>
  );
}
