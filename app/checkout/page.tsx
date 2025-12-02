"use client";

import { useCartStore, useSessionStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const { user, token } = useSessionStore();
  const { items, totalPrice } = useCartStore();
  const [processing, setProcessing] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (window.location.pathname === "/checkout/cancel") {
      router.replace("/cart");
    }
  }, [mounted, router]);

  const handleStripeCheckout = async () => {
    setProcessing(true);
    try {
      const productImage = items[0]?.imageUrl || "";
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/payments/stripe/test`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            amount: Math.round(totalPrice() * 100),
            currency: "usd",
            email: user?.email,
            stripeToken: "tok_visa",
            description: "Pago de prueba",
            image: productImage,
            successUrl: window.location.origin + "/checkout/confirmation",
            cancelUrl: window.location.origin + "/checkout/cancel",
          }),
        }
      );
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data?.message || "No se pudo iniciar el pago");
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setProcessing(false);
    }
  };

  // Show Stripe embedded checkout for quick test
  return (
    <div className="max-w-lg mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Pago con Stripe (Demo)</h2>
      <button
        onClick={handleStripeCheckout}
        disabled={processing}
        className="w-full py-2 px-4 bg-primary text-white rounded font-bold"
      >
        {processing ? "Redirigiendo..." : "Pagar con Stripe"}
      </button>
    </div>
  );
}
