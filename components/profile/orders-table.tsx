"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Order } from "@/lib/types";

interface OrdersTableProps {
  orders: Order[];
  onOrderSelect: (order: Order) => void;
}

export function OrdersTable({ orders, onOrderSelect }: OrdersTableProps) {
  if (orders.length === 0) {
    return (
      <div className="text-muted-foreground text-sm">
        No tienes órdenes registradas.
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead># Orden</TableHead>
          <TableHead>Dirección de envío</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Fecha</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{order.id}</TableCell>
            <TableCell>{order.deliveryAddress}</TableCell>
            <TableCell>
              ${(order.totalAmountInCents / 100).toFixed(2)}
            </TableCell>
            <TableCell>
              {new Date(order.createdAt).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </TableCell>
            <TableCell>{order.status}</TableCell>
            <TableCell>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onOrderSelect(order)}
              >
                Ver detalles
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
