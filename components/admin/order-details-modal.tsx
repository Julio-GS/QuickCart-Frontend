"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Order, OrderStatus } from "@/lib/types";
import { useEffect, useState } from "react";

interface OrderDetailsModalProps {
  order: Order;
  isOpen: boolean;
  onClose: () => void;
  updatingOrderId: string | null;
  onStatusUpdate: (orderId: string, newStatus: OrderStatus) => Promise<void>;
}

export function OrderDetailsModal({
  order,
  isOpen,
  onClose,
  updatingOrderId,
  onStatusUpdate,
}: OrderDetailsModalProps) {
  const [modalStatus, setModalStatus] = useState<OrderStatus>(
    order.status as OrderStatus
  );

  const handleUpdateClick = async () => {
    if (modalStatus && modalStatus !== order.status) {
      await onStatusUpdate(order.id, modalStatus);
      onClose();
    }
  };

  // Clear focus when modal closes to prevent aria-hidden warning
  useEffect(() => {
    if (!isOpen && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-[90vw] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-base md:text-lg">
            Detalle de la orden: {order.id}
          </DialogTitle>
          <DialogDescription className="mt-2 text-sm text-muted-foreground">
            Revisa y actualiza los detalles de la orden a continuación.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 md:space-y-6 py-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-2 text-sm md:text-base">
              <div>
                <span className="font-semibold">Cliente:</span>{" "}
                {(order as any).userFullName || (order as any).customer}
              </div>
              <div>
                <span className="font-semibold">Email:</span>{" "}
                {(order as any).userEmail || (order as any).email}
              </div>
              <div>
                <span className="font-semibold">Dirección de envío:</span>{" "}
                {order.deliveryAddress}
              </div>
            </div>
            <div className="space-y-2 text-sm md:text-base">
              <div className="flex flex-wrap items-center gap-2 md:gap-4">
                <span className="font-semibold">Estado:</span>
                <Select
                  value={modalStatus}
                  onValueChange={(value) =>
                    setModalStatus(value as OrderStatus)
                  }
                  disabled={updatingOrderId === order.id}
                >
                  <SelectTrigger className="w-40 min-w-[120px]">
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Processing">Processing</SelectItem>
                    <SelectItem value="Shipped">Shipped</SelectItem>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  size="sm"
                  variant="default"
                  className="mt-2 md:mt-0"
                  disabled={
                    updatingOrderId === order.id || modalStatus === order.status
                  }
                  onClick={handleUpdateClick}
                >
                  {updatingOrderId === order.id
                    ? "Actualizando..."
                    : "Actualizar"}
                </Button>
              </div>
              <div>
                <span className="font-semibold">Total:</span> $
                {(order.totalAmountInCents / 100).toFixed(2)}
              </div>
              <div>
                <span className="font-semibold">Fecha:</span>{" "}
                {new Date(order.createdAt).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
          <div className="border-t pt-4 md:pt-6">
            <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">
              Productos comprados
            </h4>
            <div className="overflow-x-auto -mx-4 px-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs md:text-sm">
                      Producto
                    </TableHead>
                    <TableHead className="text-xs md:text-sm">
                      Cantidad
                    </TableHead>
                    <TableHead className="text-xs md:text-sm">
                      Precio unitario
                    </TableHead>
                    <TableHead className="text-xs md:text-sm">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items?.map((item: any) => (
                    <TableRow key={item.id}>
                      <TableCell className="text-xs md:text-sm">
                        {item.productName}
                      </TableCell>
                      <TableCell className="text-xs md:text-sm">
                        {item.quantity}
                      </TableCell>
                      <TableCell className="text-xs md:text-sm">
                        ${(item.priceInCents / 100).toFixed(2)}
                      </TableCell>
                      <TableCell className="text-xs md:text-sm">
                        ${item.totalPrice}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
