"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Order, OrderStatus } from "@/lib/types";
import { useState } from "react";
import { OrderDetailsModal } from "./order-details-modal";

const STATUS_STYLES: Record<
  OrderStatus,
  {
    label: string;
    variant: "default" | "secondary" | "destructive" | "outline";
  }
> = {
  Pending: { label: "Pending", variant: "secondary" },
  Processing: { label: "Processing", variant: "default" },
  Shipped: { label: "Shipped", variant: "default" },
  Delivered: { label: "Delivered", variant: "outline" },
  Cancelled: { label: "Cancelled", variant: "destructive" },
};

interface OrdersTableProps {
  orders: Order[];
  updatingOrderId: string | null;
  onStatusUpdate: (orderId: string, newStatus: OrderStatus) => Promise<void>;
}

export function OrdersTable({
  orders,
  updatingOrderId,
  onStatusUpdate,
}: OrdersTableProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <>
      <div className="overflow-x-auto -mx-2 md:mx-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[60px] md:hidden">Acciones</TableHead>
              <TableHead className="min-w-[100px]">Order ID</TableHead>
              <TableHead className="min-w-[150px]">Cliente</TableHead>
              <TableHead className="min-w-[80px]">Total</TableHead>
              <TableHead className="min-w-[100px]">Estado</TableHead>
              <TableHead className="min-w-[120px]">Fecha</TableHead>
              <TableHead className="text-right min-w-[120px] hidden md:table-cell">
                Acciones
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order: any) => (
              <TableRow key={order.id}>
                <TableCell className="md:hidden">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewDetails(order)}
                    className="text-xs h-8 w-12"
                  >
                    Acciones
                  </Button>
                </TableCell>
                <TableCell className="font-medium text-xs md:text-sm">
                  {order.id}
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium text-xs md:text-sm">
                      {order.userFullName || order.customer}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {order.userEmail || order.email}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-xs md:text-sm">
                  ${(order.totalAmountInCents / 100).toFixed(2)}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      STATUS_STYLES[(order.status as OrderStatus) || "Pending"]
                        .variant
                    }
                    className="text-xs"
                  >
                    {
                      STATUS_STYLES[(order.status as OrderStatus) || "Pending"]
                        .label
                    }
                  </Badge>
                </TableCell>
                <TableCell className="text-xs md:text-sm">
                  {new Date(order.createdAt).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </TableCell>
                <TableCell className="text-right hidden md:table-cell">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewDetails(order)}
                    className="text-xs"
                  >
                    Acciones
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {/* Placeholder rows to keep table height stable */}
            {orders.length < 5 &&
              Array.from({ length: 5 - orders.length }).map((_, idx) => (
                <TableRow
                  key={`placeholder-${idx}`}
                  className="opacity-0 pointer-events-none"
                >
                  <TableCell>—</TableCell>
                  <TableCell>—</TableCell>
                  <TableCell>—</TableCell>
                  <TableCell>—</TableCell>
                  <TableCell>—</TableCell>
                  <TableCell>—</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          updatingOrderId={updatingOrderId}
          onStatusUpdate={onStatusUpdate}
        />
      )}
    </>
  );
}
