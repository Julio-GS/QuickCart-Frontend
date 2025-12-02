import { useToast } from "@/components/ui/use-toast";
import { createCheckoutSession } from "@/lib/api";
import { CartItem } from "@/lib/store";
import { useState } from "react";

interface UseCheckoutOptions {
  userId: string | undefined;
  token: string | null;
  items: CartItem[];
}

export function useCheckout({ userId, token, items }: UseCheckoutOptions) {
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();

  const handleCheckout = async () => {
    if (!userId || !token) {
      toast({
        title: "Autenticación Requerida",
        description: "Por favor inicia sesión para proceder con el pago",
        variant: "destructive",
      });
      return;
    }

    if (items.length === 0) {
      toast({
        title: "Carrito Vacío",
        description: "Agrega productos antes de proceder al pago",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);

    try {
      const session = await createCheckoutSession(userId, items, token);

      if (!session.stripeUrl) {
        throw new Error("No checkout URL returned");
      }

      window.location.href = session.stripeUrl;
    } catch (error: any) {
      toast({
        title: "Fallo en el Pago",
        description:
          error.message ||
          "No se pudo iniciar el proceso de pago. Por favor intenta de nuevo.",
        variant: "destructive",
      });
      setProcessing(false);
    }
  };

  return { handleCheckout, processing };
}
