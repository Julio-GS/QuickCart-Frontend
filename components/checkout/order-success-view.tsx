"use client";

import { useRouter } from "next/navigation";

export function OrderSuccessView() {
  const router = useRouter();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="rounded-lg border border-border bg-card shadow-lg overflow-hidden">
        {/* Header con ícono de éxito */}
        <div className="bg-green-50 dark:bg-green-950/20 border-b border-green-200 dark:border-green-900 p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
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
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-green-900 dark:text-green-100 mb-2">
            ¡Orden Completada!
          </h1>
          <p className="text-green-700 dark:text-green-300">
            Tu pedido ha sido procesado exitosamente
          </p>
        </div>

        {/* Contenido de la orden */}
        <div className="p-8 space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-muted-foreground mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <div>
                <p className="text-sm font-medium">Confirmación por email</p>
                <p className="text-sm text-muted-foreground">
                  Recibirás un correo con los detalles de tu pedido
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-muted-foreground mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <div>
                <p className="text-sm font-medium">Seguimiento de pedido</p>
                <p className="text-sm text-muted-foreground">
                  Puedes ver el estado en tu perfil
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-muted-foreground mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                />
              </svg>
              <div>
                <p className="text-sm font-medium">Tiempo de entrega</p>
                <p className="text-sm text-muted-foreground">
                  Estimado de 3-5 días hábiles
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-border flex gap-3">
            <button
              className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-md font-semibold hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 hover:shadow-md"
              onClick={() => router.push("/profile")}
            >
              Ver Mis Pedidos
            </button>
            <button
              className="flex-1 px-6 py-3 bg-secondary text-secondary-foreground rounded-md font-semibold hover:bg-secondary/80 transition-all hover:scale-105 active:scale-95 hover:shadow-md"
              onClick={() => router.push("/shop")}
            >
              Seguir Comprando
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
