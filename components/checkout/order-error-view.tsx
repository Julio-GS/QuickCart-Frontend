"use client";

import { useRouter } from "next/navigation";

export function OrderErrorView() {
  const router = useRouter();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="rounded-lg border border-border bg-card shadow-lg overflow-hidden">
        {/* Header con ícono de error */}
        <div className="bg-red-50 dark:bg-red-950/20 border-b border-red-200 dark:border-red-900 p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-red-900 dark:text-red-100 mb-2">
            Error en el Pedido
          </h1>
          <p className="text-red-700 dark:text-red-300">
            No se pudo completar tu orden
          </p>
        </div>

        {/* Contenido */}
        <div className="p-8 space-y-6">
          <p className="text-center text-muted-foreground">
            Hubo un problema al procesar tu pedido. Por favor, intenta
            nuevamente o contacta a soporte si el problema persiste.
          </p>

          <div className="pt-6 border-t border-border flex gap-3">
            <button
              className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-md font-semibold hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 hover:shadow-md"
              onClick={() => router.push("/cart")}
            >
              Volver al Carrito
            </button>
            <button
              className="flex-1 px-6 py-3 bg-secondary text-secondary-foreground rounded-md font-semibold hover:bg-secondary/80 transition-all hover:scale-105 active:scale-95 hover:shadow-md"
              onClick={() => router.push("/shop")}
            >
              Continuar Comprando
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
